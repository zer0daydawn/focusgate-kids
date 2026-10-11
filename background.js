/**
 * FocusGate Kids Background Service Worker (Manifest V3)
 * Monitors schedules, tabs, and declarativeNetRequest rules
 */

const DEFAULT_CONFIG = {
  "sites": [
    {
      "id": "site-tiktok",
      "name": "TikTok",
      "domain": "tiktok.com",
      "category": "short_video",
      "enabled": true,
      "description": "Rapid dopamine loops, infinite scrolling videos",
      "color": "#00F2FE",
      "brainrotScore": "extreme"
    },
    {
      "id": "site-yt-shorts",
      "name": "YouTube & Shorts",
      "domain": "youtube.com",
      "category": "short_video",
      "enabled": true,
      "description": "YouTube Shorts and algorithmic recommendations",
      "color": "#FF0000",
      "brainrotScore": "extreme"
    },
    {
      "id": "site-instagram",
      "name": "Instagram & Reels",
      "domain": "instagram.com",
      "category": "short_video",
      "enabled": true,
      "description": "Reels and infinite explore page",
      "color": "#E4405F",
      "brainrotScore": "extreme"
    },
    {
      "id": "site-snapchat",
      "name": "Snapchat Web",
      "domain": "snapchat.com",
      "category": "social",
      "enabled": true,
      "description": "Streaks, spotlight feed, and messaging",
      "color": "#FFFC00",
      "brainrotScore": "high"
    },
    {
      "id": "site-discord",
      "name": "Discord Web",
      "domain": "discord.com",
      "category": "social",
      "enabled": true,
      "description": "Gaming chat servers and notification spam",
      "color": "#5865F2",
      "brainrotScore": "medium"
    },
    {
      "id": "site-x",
      "name": "X (Twitter)",
      "domain": "x.com",
      "category": "social",
      "enabled": true,
      "description": "Rage bait, endless feed, trending arguments",
      "color": "#1DA1F2",
      "brainrotScore": "high"
    },
    {
      "id": "site-reddit",
      "name": "Reddit",
      "domain": "reddit.com",
      "category": "social",
      "enabled": true,
      "description": "Forums, memes, and endless scrolling",
      "color": "#FF4500",
      "brainrotScore": "high"
    },
    {
      "id": "site-roblox",
      "name": "Roblox Web",
      "domain": "roblox.com",
      "category": "gaming",
      "enabled": true,
      "description": "Online multiplayer games and microtransactions",
      "color": "#E02424",
      "brainrotScore": "high"
    },
    {
      "id": "site-twitch",
      "name": "Twitch",
      "domain": "twitch.tv",
      "category": "gaming",
      "enabled": true,
      "description": "Livestreams, gaming broadcasts, chat hype",
      "color": "#9146FF",
      "brainrotScore": "high"
    },
    {
      "id": "site-kick",
      "name": "Kick Streams",
      "domain": "kick.com",
      "category": "gaming",
      "enabled": true,
      "description": "Livestreaming and casino/gaming feeds",
      "color": "#53FC18",
      "brainrotScore": "extreme"
    },
    {
      "id": "site-netflix",
      "name": "Netflix",
      "domain": "netflix.com",
      "category": "long_video",
      "enabled": true,
      "description": "Cartoons, movies, binge-watching shows",
      "color": "#E50914",
      "brainrotScore": "medium"
    },
    {
      "id": "site-disney",
      "name": "Disney+",
      "domain": "disneyplus.com",
      "category": "long_video",
      "enabled": false,
      "description": "Kid cartoons and movies (allowed by default for family time)",
      "color": "#113CCF",
      "brainrotScore": "medium"
    }
  ],
  "scheduleRules": [
    {
      "title": "test",
      "daysOfWeek": [
        1,
        2,
        3,
        4,
        5
      ],
      "startTime": "18:00",
      "endTime": "19:00",
      "mode": "block_during",
      "appliedCategories": [
        "short_video",
        "gaming",
        "social",
        "custom"
      ],
      "isActive": true,
      "id": "sched-1790978545096"
    },
    {
      "id": "sched-school-hours",
      "title": "School Hours Blackout",
      "daysOfWeek": [
        1,
        2,
        3,
        4,
        5
      ],
      "startTime": "08:00",
      "endTime": "15:30",
      "mode": "block_during",
      "appliedCategories": [
        "short_video",
        "social",
        "long_video",
        "gaming",
        "custom"
      ],
      "isActive": true,
      "purposeBadge": "school"
    },
    {
      "id": "sched-homework-time",
      "title": "Homework & Reading Time",
      "daysOfWeek": [
        1,
        2,
        3,
        4,
        5
      ],
      "startTime": "16:00",
      "endTime": "18:00",
      "mode": "block_during",
      "appliedCategories": [
        "short_video",
        "social",
        "gaming",
        "custom"
      ],
      "isActive": true,
      "purposeBadge": "homework"
    },
    {
      "id": "sched-healthy-bedtime",
      "title": "Night Sleep Sanctuary",
      "daysOfWeek": [
        0,
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "startTime": "20:30",
      "endTime": "07:00",
      "mode": "block_during",
      "appliedCategories": [
        "short_video",
        "social",
        "long_video",
        "gaming",
        "custom"
      ],
      "isActive": true,
      "purposeBadge": "bedtime"
    },
    {
      "id": "sched-weekend-allowance",
      "title": "Saturday Video & Cartoon Window",
      "daysOfWeek": [
        6
      ],
      "startTime": "10:00",
      "endTime": "12:00",
      "mode": "allow_only_during",
      "appliedCategories": [
        "long_video"
      ],
      "isActive": false,
      "purposeBadge": "reward"
    }
  ],
  "dateOverrides": [
    {
      "id": "override-exam-prep",
      "date": "2026-10-14",
      "title": "School Exam Preparation Day",
      "action": "all_day_block",
      "appliedCategories": [
        "short_video",
        "social",
        "gaming",
        "long_video"
      ],
      "notes": "No games or short videos allowed all day to prepare for test."
    },
    {
      "id": "override-family-sunday",
      "date": "2026-10-25",
      "title": "Family Movie & Board Game Sunday",
      "action": "all_day_allow",
      "appliedCategories": [
        "long_video"
      ],
      "notes": "Disney+ and Netflix movie access allowed for family night."
    }
  ],
  "settings": {
    "language": "en",
    "globalEnabled": true,
    "parentPin": "1234",
    "isParentUnlocked": false,
    "antiBrainrotPreset": "strict_child",
    "blockPageStyle": "kid_friendly",
    "blockPageTheme": "calm",
    "customEncouragement": "Real adventures happen in the real world! Give your brain a break from the screen.",
    "showAlternativeActivities": true,
    "dailyScreenTimeMinutes": 45,
    "usageQuotas": [
      {"category":"short_video","dailyMinutes":30,"isActive":false},
      {"category":"social","dailyMinutes":30,"isActive":false},
      {"category":"gaming","dailyMinutes":30,"isActive":false},
      {"category":"long_video","dailyMinutes":45,"isActive":false},
      {"category":"custom","dailyMinutes":30,"isActive":false}
    ],
    "allowEmergencyParentPass": true,
    "emergencyPassDurationMinutes": 15,
    "gracePeriodEnabled": true,
    "gracePeriodMinutes": 5
  },
  "lastSynced": "2026-10-02T22:10:36.772Z"
};


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


async function ensureSchedulerAndRules() {
  // Align the recurring check to the next exact clock-minute boundary.
  // This makes a rule beginning at 19:30 enforce at 19:30:00 rather than
  // up to almost a minute after the extension/service worker started.
  const now = new Date();
  const nextMinute = new Date(now);
  nextMinute.setSeconds(0, 0);
  nextMinute.setMinutes(nextMinute.getMinutes() + 1);

  chrome.alarms.create('evaluateSchedule', {
    when: nextMinute.getTime(),
    periodInMinutes: 1
  });

  await updateBlockingRules();
}

// Initialize on install/update.
chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.local.get(['focusGateConfig']);
  if (!existing.focusGateConfig) {
    await chrome.storage.local.set({ focusGateConfig: DEFAULT_CONFIG });
  } else {
    const migrated = existing.focusGateConfig;
    migrated.settings = migrated.settings || {};
    let changed = false;
    if (!Array.isArray(migrated.settings.usageQuotas)) {
      migrated.settings.usageQuotas = DEFAULT_CONFIG.settings.usageQuotas;
      changed = true;
    }
    if (typeof migrated.settings.gracePeriodEnabled !== 'boolean') {
      migrated.settings.gracePeriodEnabled = true;
      changed = true;
    }
    if (!Number.isFinite(Number(migrated.settings.gracePeriodMinutes))) {
      migrated.settings.gracePeriodMinutes = 5;
      changed = true;
    }
    if (!['calm', 'playful'].includes(migrated.settings.blockPageTheme)) {
      migrated.settings.blockPageTheme = 'calm';
      changed = true;
    }
    if (changed) await chrome.storage.local.set({ focusGateConfig: migrated });
  }
  await ensureSchedulerAndRules();
  console.log('[FocusGate Kids] Initialized successfully');
});

// MV3 service workers can stop between events. Recreate the scheduler/rules
// whenever Chrome starts so blocking never depends on a past install event.
chrome.runtime.onStartup.addListener(async () => {
  await ensureSchedulerAndRules();
});

// Apply option/popup changes immediately, including newly-added custom URLs.
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'local') return;
  if (changes.focusGateConfig || changes.emergencyPassExpiry) {
    updateBlockingRules();
  }
});

// Periodic alarm listener
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'evaluateSchedule') {
    await updateBlockingRules();
  }
});

// Tab navigation listener (Immediate blocking of tabs when navigating)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const url = changeInfo.url || tab.url;
  if (!url) return;
  if (shouldSkipTabUrl(url)) return;
  await checkAndRedirectTab(tabId, url);
});

// Listen for messages from popup, options or blocked page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'REFRESH_RULES') {
    updateBlockingRules().then(() => sendResponse({ success: true }));
    return true;
  }
  if (message.type === 'VERIFY_PIN_AND_PASS') {
    handleParentPass(message.pin, message.minutes || 15).then(result => sendResponse(result));
    return true;
  }
  if (message.type === 'USAGE_HEARTBEAT') {
    recordUsageHeartbeat(sender, message.url || sender?.tab?.url || '').then(result => sendResponse(result));
    return true;
  }
});

async function handleParentPass(pin, minutes) {
  const data = await chrome.storage.local.get(['focusGateConfig']);
  const cfg = data.focusGateConfig || DEFAULT_CONFIG;
  const correctPin = cfg.settings?.parentPin || '1234';

  if (String(pin).trim() !== String(correctPin).trim()) {
    return { success: false, error: 'Incorrect Parent PIN' };
  }

  const expiry = Date.now() + (minutes * 60 * 1000);
  await chrome.storage.local.set({ emergencyPassExpiry: expiry });
  await updateBlockingRules();
  return { success: true, expiry };
}

function parseTime(t) {
  const [h, m] = (t || '0:0').split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

function inRange(cur, start, end) {
  if (start <= end) return cur >= start && cur < end;
  return cur >= start || cur < end;
}

function getLocalDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function domainPatternToDnrFilter(pattern) {
  if (!pattern) return null;
  let p = String(pattern).trim().toLowerCase();
  if (p.startsWith('https://')) p = p.slice(8);
  else if (p.startsWith('http://')) p = p.slice(7);
  else if (p.startsWith('*://')) p = p.slice(4);
  if (p.startsWith('www.')) p = p.slice(4);
  if (p.startsWith('*.')) p = p.slice(2);

  const slashIdx = p.indexOf('/');
  const host = slashIdx >= 0 ? p.slice(0, slashIdx) : p;
  let path = slashIdx >= 0 ? p.slice(slashIdx) : '';
  if (!host) return null;

  // DNR urlFilter: || anchors at a domain boundary and * is a wildcard.
  // A bare host therefore covers http/https plus all subdomains and paths.
  if (!path || path === '/' || path === '/*') return `||${host}^`;

  // Preserve explicit path wildcards from custom entries.
  if (!path.startsWith('/')) path = '/' + path;
  return `||${host}${path}`;
}

function getBlockedCategories(config) {
  const blockedCategories = new Set();
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const dayOfWeek = now.getDay();
  const dateStr = getLocalDateString(now);

  // Build the normal recurring-schedule result first.
  const activeRules = (config.scheduleRules || []).filter(
    r => r.isActive && (r.daysOfWeek || []).includes(dayOfWeek)
  );
  for (const rule of activeRules) {
    const s = parseTime(rule.startTime);
    const e = parseTime(rule.endTime);
    const matchesTime = inRange(currentMinutes, s, e);
    if ((rule.mode === 'block_during' && matchesTime) ||
        (rule.mode === 'allow_only_during' && !matchesTime)) {
      (rule.appliedCategories || []).forEach(c => blockedCategories.add(c));
    }
  }

  // A date override changes only its selected categories; other categories keep their routine.
  const override = (config.dateOverrides || []).find(o => o.date === dateStr);
  if (override) {
    const categories = override.appliedCategories || [];
    if (override.action === 'all_day_block') {
      categories.forEach(c => blockedCategories.add(c));
    } else if (override.action === 'all_day_allow') {
      categories.forEach(c => blockedCategories.delete(c));
    } else if (override.action === 'custom_window' && override.startTime && override.endTime) {
      const inWindow = inRange(currentMinutes, parseTime(override.startTime), parseTime(override.endTime));
      if (inWindow) categories.forEach(c => blockedCategories.add(c));
    }
  }

  return blockedCategories;
}


function getQuotaForCategory(config, category) {
  return (config.settings?.usageQuotas || []).find(q => q.category === category && q.isActive && Number(q.dailyMinutes) > 0) || null;
}

function normalizeDailyUsage(raw) {
  const today = getLocalDateString(new Date());
  if (!raw || raw.date !== today) return { date: today, secondsByCategory: {} };
  return { date: today, secondsByCategory: raw.secondsByCategory || {} };
}

function applyQuotaBlocks(blockedCategories, config, rawUsage) {
  const usage = normalizeDailyUsage(rawUsage);
  for (const quota of (config.settings?.usageQuotas || [])) {
    if (!quota.isActive || Number(quota.dailyMinutes) <= 0) continue;
    const used = Number(usage.secondsByCategory?.[quota.category] || 0);
    const limit = Number(quota.dailyMinutes) * 60;
    if (used >= limit) blockedCategories.add(quota.category);
  }
  return blockedCategories;
}

function findMatchingSite(config, url) {
  return (config.sites || []).find(site => site.enabled && matchesWildcardPattern(url, site.domain)) || null;
}

async function recordUsageHeartbeat(sender, url) {
  const tab = sender?.tab;
  if (!tab || tab.id == null || !tab.active || !url || shouldSkipTabUrl(url)) return { counted: false };

  try {
    const win = await chrome.windows.get(tab.windowId);
    if (!win.focused) return { counted: false };
  } catch (e) {
    return { counted: false };
  }

  const data = await chrome.storage.local.get(['focusGateConfig', 'dailyQuotaUsage', 'emergencyPassExpiry']);
  const cfg = data.focusGateConfig || DEFAULT_CONFIG;
  if (!cfg.settings?.globalEnabled) return { counted: false };
  if (Date.now() < (data.emergencyPassExpiry || 0)) return { counted: false };

  const site = findMatchingSite(cfg, url);
  if (!site) return { counted: false };

  const quota = getQuotaForCategory(cfg, site.category);
  if (!quota) return { counted: false };

  // Only consume quota while the category is otherwise permitted by schedule/date rules.
  const scheduleBlocks = getBlockedCategories(cfg);
  if (scheduleBlocks.has(site.category)) return { counted: false };

  const usage = normalizeDailyUsage(data.dailyQuotaUsage);
  const before = Number(usage.secondsByCategory[site.category] || 0);
  const limitSeconds = Number(quota.dailyMinutes) * 60;
  if (before >= limitSeconds) return { counted: false, exhausted: true };

  // Content scripts heartbeat every 10 seconds while visible. Cap at the quota.
  const after = Math.min(limitSeconds, before + 10);
  usage.secondsByCategory[site.category] = after;
  await chrome.storage.local.set({ dailyQuotaUsage: usage });

  const exhaustedNow = before < limitSeconds && after >= limitSeconds;
  if (exhaustedNow) await updateBlockingRules();
  return { counted: true, category: site.category, usedSeconds: after, limitSeconds, exhausted: exhaustedNow };
}

function shouldSkipTabUrl(url) {
  if (!url) return true;
  return url.startsWith('chrome:') ||
    url.startsWith('chrome-extension:') ||
    url.startsWith('edge:') ||
    url.startsWith('about:') ||
    url.startsWith('devtools:') ||
    url.startsWith('view-source:') ||
    url.includes('blocked.html');
}

async function checkAndRedirectTab(tabId, url, context = null) {
  if (shouldSkipTabUrl(url)) return false;

  let cfg;
  let blockedCategories;

  if (context) {
    cfg = context.cfg;
    blockedCategories = context.blockedCategories;
  } else {
    const data = await chrome.storage.local.get(['focusGateConfig', 'emergencyPassExpiry', 'dailyQuotaUsage']);
    const passExpiry = data.emergencyPassExpiry || 0;
    if (Date.now() < passExpiry) return false;

    cfg = data.focusGateConfig || DEFAULT_CONFIG;
    if (!cfg.settings?.globalEnabled) return false;
    blockedCategories = applyQuotaBlocks(getBlockedCategories(cfg), cfg, data.dailyQuotaUsage);
  }

  if (!cfg.settings?.globalEnabled || blockedCategories.size === 0) return false;

  for (const site of (cfg.sites || [])) {
    if (!site.enabled || !blockedCategories.has(site.category)) continue;

    if (matchesWildcardPattern(url, site.domain)) {
      const redirectUrl = chrome.runtime.getURL('blocked.html') +
        '?site=' + encodeURIComponent(site.name) +
        '&domain=' + encodeURIComponent(site.domain);

      try {
        await chrome.tabs.update(tabId, { url: redirectUrl });
        console.log('[FocusGate] Actively redirected blocked tab:', tabId, url);
        return true;
      } catch (err) {
        // The tab may have been closed/replaced while the scan was running.
        console.debug('[FocusGate] Could not redirect tab', tabId, err);
      }
      break;
    }
  }

  return false;
}

async function enforceOpenTabs(cfg, blockedCategories) {
  if (!cfg.settings?.globalEnabled || blockedCategories.size === 0) return;

  let tabs = [];
  try {
    tabs = await chrome.tabs.query({});
  } catch (err) {
    console.error('[FocusGate] Unable to enumerate open tabs:', err);
    return;
  }

  const context = { cfg, blockedCategories };
  await Promise.all(
    tabs
      .filter(tab => tab.id != null && !shouldSkipTabUrl(tab.url))
      .map(tab => checkAndRedirectTab(tab.id, tab.url, context))
  );
}

let blockingRulesUpdateQueue = Promise.resolve();

function updateBlockingRules() {
  // Serialize rule refreshes. Multiple Chrome events can fire at nearly the same
  // time; without a queue, two updates can both attempt to add rule IDs 100+
  // and Chrome rejects the second transaction as duplicate IDs.
  blockingRulesUpdateQueue = blockingRulesUpdateQueue
    .catch(() => {})
    .then(() => updateBlockingRulesInternal());
  return blockingRulesUpdateQueue;
}

async function updateBlockingRulesInternal() {
  const data = await chrome.storage.local.get(['focusGateConfig', 'emergencyPassExpiry', 'dailyQuotaUsage']);
  const cfg = data.focusGateConfig || DEFAULT_CONFIG;
  const passExpiry = data.emergencyPassExpiry || 0;

  if (Date.now() < passExpiry) {
    await clearDynamicRules();
    chrome.action.setBadgeText({ text: 'PASS' });
    chrome.action.setBadgeBackgroundColor({ color: '#10B981' });
    return;
  }

  if (!cfg.settings?.globalEnabled) {
    await clearDynamicRules();
    chrome.action.setBadgeText({ text: 'OFF' });
    chrome.action.setBadgeBackgroundColor({ color: '#6B7280' });
    return;
  }

  const blockedCategories = applyQuotaBlocks(getBlockedCategories(cfg), cfg, data.dailyQuotaUsage);
  const sitesToBlock = (cfg.sites || []).filter(
    s => s.enabled && blockedCategories.has(s.category)
  );

  if (sitesToBlock.length === 0) {
    await clearDynamicRules();
    chrome.action.setBadgeText({ text: 'OPEN' });
    chrome.action.setBadgeBackgroundColor({ color: '#10B981' });
    return;
  }

  const dynamicRules = [];
  let ruleId = 100;

  for (const site of sitesToBlock) {
    const urlFilter = domainPatternToDnrFilter(site.domain);
    if (!urlFilter) continue;

    dynamicRules.push({
      id: ruleId++,
      priority: 1,
      action: {
        type: 'redirect',
        redirect: { extensionPath: '/blocked.html' }
      },
      condition: {
        urlFilter,
        resourceTypes: ['main_frame']
      }
    });
  }

  try {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const removeRuleIds = existingRules.map(r => r.id);

    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds,
      addRules: dynamicRules
    });
  } catch(err) {
    console.error('[FocusGate] Error updating dynamic rules:', err);
  }

  // Active tab enforcement: DNR guarantees future navigations are blocked,
  // while this scan immediately removes already-open prohibited pages.
  await enforceOpenTabs(cfg, blockedCategories);

  chrome.action.setBadgeText({ text: 'KIDS' });
  chrome.action.setBadgeBackgroundColor({ color: '#6366F1' });
}

async function clearDynamicRules() {
  try {
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const removeRuleIds = existingRules.map(r => r.id);
    if (removeRuleIds.length > 0) {
      await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds });
    }
  } catch(e) {}
}
