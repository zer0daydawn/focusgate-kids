
function uiText(cfg, en, fr) {
  return cfg?.settings?.language === 'fr' ? fr : en;
}
/**
 * FocusGate Kids Content Script
 * Wildcard URL Pattern Matching Engine at document_start & pushState
 */
(function() {
  
function matchesWildcardPattern(targetUrl, pattern) {
  if (!targetUrl || !pattern) return false;
  var urlStr = targetUrl.trim().toLowerCase();
  var urlObj;
  try {
    urlObj = new URL(urlStr.startsWith('http') ? urlStr : ('https://' + urlStr));
  } catch (e) {
    return false;
  }

  var targetHost = urlObj.hostname.toLowerCase();
  if (targetHost.startsWith('www.')) targetHost = targetHost.slice(4);
  var targetPath = urlObj.pathname.toLowerCase();

  var p = pattern.trim().toLowerCase();
  if (p.startsWith('https://')) p = p.slice(8);
  else if (p.startsWith('http://')) p = p.slice(7);
  else if (p.startsWith('*://')) p = p.slice(4);
  if (p.startsWith('www.')) p = p.slice(4);
  if (p.startsWith('*.')) p = p.slice(2);

  var slashIdx = p.indexOf('/');
  var pHost = slashIdx !== -1 ? p.slice(0, slashIdx) : p;
  var pPath = slashIdx !== -1 ? p.slice(slashIdx) : '';

  // Host match: exact domain or any subdomain (e.g. m.youtube.com ends with .youtube.com)
  var hostMatches = (targetHost === pHost) || targetHost.endsWith('.' + pHost);
  if (!hostMatches) {
    return false;
  }

  // If pattern has no path or path is /* or /, then ALL sub-paths (/shorts, /live, /feed, /watch) are blocked!
  if (!pPath || pPath === '/' || pPath === '/*') {
    return true;
  }

  var cleanPPath = pPath;
  while (cleanPPath.endsWith('*')) cleanPPath = cleanPPath.slice(0, -1);
  if (!cleanPPath.startsWith('/')) {
    cleanPPath = '/' + cleanPPath;
  }

  // Exact sub-path match or sub-path with extra segments/parameters
  if (targetPath === cleanPPath || targetPath.startsWith(cleanPPath + '/') || targetPath.startsWith(cleanPPath + '?')) {
    return true;
  }

  // Middle wildcards support
  if (pPath.includes('*')) {
    var parts = pPath.split('*').map(function(s) { return s.trim(); }).filter(Boolean);
    var lastIdx = 0;
    var allFound = true;
    for (var i = 0; i < parts.length; i++) {
      var idx = targetPath.indexOf(parts[i], lastIdx);
      if (idx === -1) {
        allFound = false;
        break;
      }
      lastIdx = idx + parts[i].length;
    }
    if (allFound) return true;
  }

  return targetPath.startsWith(cleanPPath);
}


  function parseTime(t) {
    const parts = (t || '0:0').split(':').map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  }

  function inRange(cur, start, end) {
    if (start <= end) return cur >= start && cur < end;
    return cur >= start || cur < end;
  }

  function getLocalDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function getBlockingContext(cfg) {
    const categories = new Set();
    const reasons = [];
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const dayOfWeek = now.getDay();
    const dateStr = getLocalDateString(now);

    const activeRules = (cfg.scheduleRules || []).filter(
      r => r.isActive && (r.daysOfWeek || []).includes(dayOfWeek)
    );

    for (const rule of activeRules) {
      const matchesTime = inRange(currentMinutes, parseTime(rule.startTime), parseTime(rule.endTime));
      const shouldBlock =
        (rule.mode === 'block_during' && matchesTime) ||
        (rule.mode === 'allow_only_during' && !matchesTime);

      if (!shouldBlock) continue;
      (rule.appliedCategories || []).forEach(c => categories.add(c));
      reasons.push(rule.mode === 'allow_only_during' ? `Outside ${rule.title}` : rule.title);
    }

    // Date overrides affect only selected categories.
    const override = (cfg.dateOverrides || []).find(o => o.date === dateStr);
    if (override) {
      const selected = override.appliedCategories || [];
      if (override.action === 'all_day_block') {
        selected.forEach(c => categories.add(c));
        reasons.push(override.title || 'Date override');
      } else if (override.action === 'all_day_allow') {
        selected.forEach(c => categories.delete(c));
        reasons.push(override.title || 'Date allow override');
      } else if (override.action === 'custom_window' && override.startTime && override.endTime &&
                 inRange(currentMinutes, parseTime(override.startTime), parseTime(override.endTime))) {
        selected.forEach(c => categories.add(c));
        reasons.push(override.title || 'Date override');
      }
    }

    return { categories, reason: reasons.filter(Boolean).join(', ') };
  }


  function applyQuotaBlocks(blocking, cfg, dailyQuotaUsage) {
    const today = getLocalDateString(new Date());
    const usage = (dailyQuotaUsage && dailyQuotaUsage.date === today) ? dailyQuotaUsage : { secondsByCategory: {} };
    for (const quota of (cfg.settings?.usageQuotas || [])) {
      if (!quota.isActive || Number(quota.dailyMinutes) <= 0) continue;
      const used = Number(usage.secondsByCategory?.[quota.category] || 0);
      if (used >= Number(quota.dailyMinutes) * 60) {
        blocking.categories.add(quota.category);
        if (!blocking.reason.includes('Daily quota reached')) {
          blocking.reason = [blocking.reason, 'Daily quota reached'].filter(Boolean).join(', ');
        }
      }
    }
    return blocking;
  }


  let graceBanner = null;

  function getBlockingCategoriesAt(cfg, when) {
    const categories = new Set();
    const currentMinutes = when.getHours() * 60 + when.getMinutes();
    const dayOfWeek = when.getDay();
    const dateStr = getLocalDateString(when);

    const activeRules = (cfg.scheduleRules || []).filter(
      r => r.isActive && (r.daysOfWeek || []).includes(dayOfWeek)
    );
    for (const rule of activeRules) {
      const matchesTime = inRange(currentMinutes, parseTime(rule.startTime), parseTime(rule.endTime));
      const shouldBlock =
        (rule.mode === 'block_during' && matchesTime) ||
        (rule.mode === 'allow_only_during' && !matchesTime);
      if (shouldBlock) (rule.appliedCategories || []).forEach(c => categories.add(c));
    }

    const override = (cfg.dateOverrides || []).find(o => o.date === dateStr);
    if (override) {
      const selected = override.appliedCategories || [];
      if (override.action === 'all_day_block') selected.forEach(c => categories.add(c));
      else if (override.action === 'all_day_allow') selected.forEach(c => categories.delete(c));
      else if (override.action === 'custom_window' && override.startTime && override.endTime &&
               inRange(currentMinutes, parseTime(override.startTime), parseTime(override.endTime))) {
        selected.forEach(c => categories.add(c));
      }
    }
    return categories;
  }

  function findUpcomingScheduleBlock(cfg, category, graceMinutes) {
    const now = new Date();
    if (getBlockingCategoriesAt(cfg, now).has(category)) return null;

    const nextBoundary = new Date(now);
    nextBoundary.setSeconds(0, 0);
    nextBoundary.setMinutes(nextBoundary.getMinutes() + 1);

    const maxChecks = Math.max(1, Number(graceMinutes || 5)) + 1;
    for (let i = 0; i < maxChecks; i++) {
      const candidate = new Date(nextBoundary.getTime() + i * 60000);
      const remainingMs = candidate.getTime() - now.getTime();
      if (remainingMs > Number(graceMinutes || 5) * 60000) break;
      if (getBlockingCategoriesAt(cfg, candidate).has(category)) {
        return { remainingMs, boundary: candidate };
      }
    }
    return null;
  }

  function findQuotaWarning(cfg, category, dailyQuotaUsage, graceMinutes) {
    const quota = (cfg.settings?.usageQuotas || []).find(q => q.category === category && q.isActive && Number(q.dailyMinutes) > 0);
    if (!quota) return null;
    const today = getLocalDateString(new Date());
    const usage = (dailyQuotaUsage && dailyQuotaUsage.date === today) ? dailyQuotaUsage : { secondsByCategory: {} };
    const used = Number(usage.secondsByCategory?.[category] || 0);
    const limit = Number(quota.dailyMinutes) * 60;
    const remaining = limit - used;
    if (remaining > 0 && remaining <= Number(graceMinutes || 5) * 60) return { remainingSeconds: remaining };
    return null;
  }

  function hideGraceBanner() {
    if (graceBanner && graceBanner.isConnected) graceBanner.remove();
    graceBanner = null;
  }

  function showGraceBanner(siteName, message, detail) {
    if (!document.documentElement) return;
    if (!graceBanner || !graceBanner.isConnected) {
      graceBanner = document.createElement('div');
      graceBanner.id = 'focusgate-grace-warning';
      graceBanner.style.cssText = [
        'position:fixed','top:16px','left:50%','transform:translateX(-50%)','z-index:2147483647',
        'background:#111827','color:#fff','border:1px solid #f59e0b','border-radius:12px','box-shadow:0 12px 36px rgba(0,0,0,.35)',
        'padding:12px 16px','font-family:Arial,sans-serif','min-width:280px','max-width:520px','text-align:center','pointer-events:none'
      ].join(';');
      document.documentElement.appendChild(graceBanner);
    }
    graceBanner.innerHTML = '<div style="font-size:14px;font-weight:700;">' + escapeBanner(siteName) + '</div>' +
      '<div style="font-size:13px;margin-top:3px;">' + escapeBanner(message) + '</div>' +
      (detail ? '<div style="font-size:11px;color:#fcd34d;margin-top:3px;">' + escapeBanner(detail) + '</div>' : '');
  }

  function escapeBanner(value) {
    return String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function formatCountdown(ms) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  function checkUrlAndBlock() {
    const fullUrl = window.location.href.toLowerCase();

    chrome.storage.local.get(['focusGateConfig', 'emergencyPassExpiry', 'dailyQuotaUsage'], (data) => {
      const passExpiry = data.emergencyPassExpiry || 0;
      if (Date.now() < passExpiry) return;

      const cfg = data.focusGateConfig;
      if (!cfg || !cfg.settings?.globalEnabled) return;

      const matchedSite = (cfg.sites || []).find(site => site.enabled && matchesWildcardPattern(fullUrl, site.domain));
      if (!matchedSite) { hideGraceBanner(); return; }

      const blocking = applyQuotaBlocks(getBlockingContext(cfg), cfg, data.dailyQuotaUsage);
      if (blocking.categories.has(matchedSite.category)) {
        hideGraceBanner();
        try {
          document.querySelectorAll('video, audio').forEach(el => { el.pause(); el.src = ''; });
        } catch(e) {}

        const redirectUrl = chrome.runtime.getURL('blocked.html') +
          '?site=' + encodeURIComponent(matchedSite.name) +
          '&domain=' + encodeURIComponent(matchedSite.domain) +
          '&reason=' + encodeURIComponent(blocking.reason || 'Blocked by schedule');

        window.location.replace(redirectUrl);
        return;
      }

      if (cfg.settings?.gracePeriodEnabled === false) { hideGraceBanner(); return; }
      const graceMinutes = Math.max(1, Math.min(30, Number(cfg.settings?.gracePeriodMinutes || 5)));

      const scheduleWarning = findUpcomingScheduleBlock(cfg, matchedSite.category, graceMinutes);
      if (scheduleWarning) {
        showGraceBanner(matchedSite.name, uiText(cfg, 'will be blocked in ', 'sera bloqué dans ') + formatCountdown(scheduleWarning.remainingMs), uiText(cfg, 'Scheduled access period ending soon', 'La période d’accès autorisée se termine bientôt'));
        return;
      }

      const quotaWarning = findQuotaWarning(cfg, matchedSite.category, data.dailyQuotaUsage, graceMinutes);
      if (quotaWarning) {
        const mins = Math.max(1, Math.ceil(quotaWarning.remainingSeconds / 60));
        showGraceBanner(matchedSite.name, uiText(cfg, 'will be blocked in about ' + mins + ' minute' + (mins === 1 ? '' : 's'), 'sera bloqué dans environ ' + mins + ' minute' + (mins === 1 ? '' : 's')), uiText(cfg, 'Daily usage quota almost reached', 'Quota quotidien presque atteint'));
        return;
      }

      hideGraceBanner();
    });
  }

  checkUrlAndBlock();

  window.addEventListener('yt-navigate-start', checkUrlAndBlock);
  window.addEventListener('yt-navigate-finish', checkUrlAndBlock);
  window.addEventListener('popstate', checkUrlAndBlock);

  const origPush = history.pushState;
  history.pushState = function() {
    origPush.apply(this, arguments);
    checkUrlAndBlock();
  };
  const origReplace = history.replaceState;
  history.replaceState = function() {
    origReplace.apply(this, arguments);
    checkUrlAndBlock();
  };

  setInterval(checkUrlAndBlock, 800);

  // Count only active, visible use. The background service worker validates
  // that this tab is active and its Chrome window is focused before adding time.
  setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    try {
      chrome.runtime.sendMessage({ type: 'USAGE_HEARTBEAT', url: window.location.href }, () => {
        void chrome.runtime.lastError;
      });
    } catch (e) {}
  }, 10000);
})();
