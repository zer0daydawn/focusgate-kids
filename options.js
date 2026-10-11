let currentConfig = null;
let isParentUnlocked = false;
let dailyQuotaUsage = null;
const tr = (text) => window.fgI18n ? window.fgI18n.t(text) : text;

const DEFAULT_CFG = {
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

  var targetHost = urlObj.hostname.toLowerCase().replace(/^www\./, '');
  var targetPath = urlObj.pathname.toLowerCase();

  var p = pattern.trim().toLowerCase();
  p = p.replace(/^https?:\/\//, '');
  p = p.replace(/^\*:\/\//, '');
  p = p.replace(/^www\./, '');
  p = p.replace(/^\*\./, '');

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

  var cleanPPath = pPath.replace(/\*+$/, '');
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


function ensureQuotaConfig(cfg) {
  cfg.settings = cfg.settings || {};
  if (!cfg.settings.language) cfg.settings.language = 'en';
  if (!['calm', 'playful'].includes(cfg.settings.blockPageTheme)) cfg.settings.blockPageTheme = 'calm';
  const defaults = [
    { category: 'short_video', dailyMinutes: 30, isActive: false },
    { category: 'social', dailyMinutes: 30, isActive: false },
    { category: 'gaming', dailyMinutes: 30, isActive: false },
    { category: 'long_video', dailyMinutes: 45, isActive: false },
    { category: 'custom', dailyMinutes: 30, isActive: false }
  ];
  const existing = Array.isArray(cfg.settings.usageQuotas) ? cfg.settings.usageQuotas : [];
  for (const q of defaults) {
    if (!existing.some(x => x.category === q.category)) existing.push(q);
  }
  cfg.settings.usageQuotas = existing;
  if (typeof cfg.settings.gracePeriodEnabled !== 'boolean') cfg.settings.gracePeriodEnabled = true;
  if (!Number.isFinite(Number(cfg.settings.gracePeriodMinutes))) cfg.settings.gracePeriodMinutes = 5;
  return cfg;
}

async function loadConfig() {
  const data = await chrome.storage.local.get(['focusGateConfig', 'dailyQuotaUsage']);
  currentConfig = ensureQuotaConfig(data.focusGateConfig || DEFAULT_CFG);
  dailyQuotaUsage = data.dailyQuotaUsage || null;
  if (data.focusGateConfig && (!data.focusGateConfig.settings?.usageQuotas || typeof data.focusGateConfig.settings?.gracePeriodEnabled !== 'boolean' || !Number.isFinite(Number(data.focusGateConfig.settings?.gracePeriodMinutes)) || !['calm', 'playful'].includes(data.focusGateConfig.settings?.blockPageTheme))) {
    await chrome.storage.local.set({ focusGateConfig: currentConfig });
  }
  renderAll();
}

async function saveConfig() {
  await chrome.storage.local.set({ focusGateConfig: currentConfig });
  chrome.runtime.sendMessage({ type: 'REFRESH_RULES' });
  renderAll();
}

// Navigation Tabs
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.getAttribute('data-tab');
    document.getElementById(target).classList.add('active');
  });
});

document.getElementById('btnGoSchedules').addEventListener('click', () => {
  document.querySelector('[data-tab="tab-schedules"]').click();
});

// Parent Lock
const btnPinLock = document.getElementById('btnPinLock');
const pinLockText = document.getElementById('pinLockText');
const pinModal = document.getElementById('pinModal');
const modalPinInput = document.getElementById('modalPinInput');
const modalPinError = document.getElementById('modalPinError');
const btnVerifyModal = document.getElementById('btnVerifyModal');
const btnCancelModal = document.getElementById('btnCancelModal');

btnPinLock.addEventListener('click', () => {
  if (isParentUnlocked) {
    isParentUnlocked = false;
    renderLockState();
  } else {
    modalPinInput.value = '';
    modalPinError.style.display = 'none';
    pinModal.style.display = 'flex';
    modalPinInput.focus();
  }
});

btnCancelModal.addEventListener('click', () => {
  pinModal.style.display = 'none';
});

btnVerifyModal.addEventListener('click', () => {
  const correct = currentConfig?.settings?.parentPin || '1234';
  if (modalPinInput.value === correct) {
    isParentUnlocked = true;
    pinModal.style.display = 'none';
    renderLockState();
  } else {
    modalPinError.style.display = 'block';
  }
});

function renderLockState() {
  if (isParentUnlocked) {
    btnPinLock.classList.add('unlocked');
    pinLockText.textContent = tr('Parent Unlocked');
    document.getElementById('statLockState').textContent = tr('UNLOCKED');
    document.getElementById('statLockState').style.color = '#fbbf24';
  } else {
    btnPinLock.classList.remove('unlocked');
    pinLockText.textContent = tr('PIN Locked');
    document.getElementById('statLockState').textContent = tr('4-Digit PIN');
    document.getElementById('statLockState').style.color = '#ffffff';
  }
}

// Master Shield Toggle
const btnMasterShield = document.getElementById('btnMasterShield');
btnMasterShield.addEventListener('click', () => {
  if (!isParentUnlocked) {
    btnPinLock.click();
    return;
  }
  currentConfig.settings.globalEnabled = !currentConfig.settings.globalEnabled;
  saveConfig();
});

// Grant 15 min pass
document.getElementById('btnPass15').addEventListener('click', () => {
  if (!isParentUnlocked) {
    btnPinLock.click();
    return;
  }
  const expiry = Date.now() + 15 * 60 * 1000;
  chrome.storage.local.set({ emergencyPassExpiry: expiry }, () => {
    chrome.runtime.sendMessage({ type: 'REFRESH_RULES' });
    alert(tr('15-Minute screen pass granted for your child!'));
  });
});

function renderAll() {
  if (!currentConfig) return;

  if (currentConfig.settings.globalEnabled) {
    btnMasterShield.className = 'btn-shield';
    btnMasterShield.textContent = tr('● Shield Active');
  } else {
    btnMasterShield.className = 'btn-shield off';
    btnMasterShield.textContent = tr('○ Shield Off');
  }

  renderLockState();
  const themeSelect = document.getElementById('blockPageThemeSelect');
  if (themeSelect) themeSelect.value = currentConfig.settings?.blockPageTheme === 'playful' ? 'playful' : 'calm';

  // Timeline
  const bar = document.getElementById('timelineBar');
  bar.innerHTML = '';
  const now = new Date();
  const day = now.getDay();
  for (let h = 0; h < 24; h++) {
    const slot = document.createElement('div');
    slot.className = 'timeline-hour';
    const min = h * 60 + 30;
    let isBlocked = false;
    for (const rule of (currentConfig.scheduleRules || [])) {
      if (rule.isActive && rule.daysOfWeek.includes(day)) {
        const [sh, sm] = (rule.startTime || '0:0').split(':').map(Number);
        const [eh, em] = (rule.endTime || '0:0').split(':').map(Number);
        const s = sh * 60 + sm;
        const e = eh * 60 + em;
        const inR = s <= e ? (min >= s && min < e) : (min >= s || min < e);
        if (rule.mode === 'block_during' && inR) { isBlocked = true; break; }
        if (rule.mode === 'allow_only_during' && !inR) { isBlocked = true; break; }
      }
    }
    slot.classList.add(isBlocked ? 'blocked' : 'open');
    slot.title = h + ':00 - ' + (isBlocked ? 'Blocked Routine' : 'Allowed');
    bar.appendChild(slot);
  }

  // Sites Table
  const sitesTbody = document.getElementById('sitesTableBody');
  sitesTbody.innerHTML = '';
  (currentConfig.sites || []).forEach(site => {
    const rowEl = document.createElement('tr');
    rowEl.innerHTML = `
      <td><strong>${site.name}</strong></td>
      <td style="font-family: monospace; color: #a1a1aa;">${site.domain}</td>
      <td><span style="color: #38bdf8; font-size: 11px;">/shorts · /live · /feed auto-blocked</span></td>
      <td>
        <button class="btn-toggle ${site.enabled ? 'active' : 'inactive'}" data-siteid="${site.id}">
          ${site.enabled ? tr('Guarded by Schedule') : tr('Allowed All Times')}
        </button>
      </td>
    `;
    sitesTbody.appendChild(rowEl);
  });

  document.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!isParentUnlocked) {
        btnPinLock.click();
        return;
      }
      const id = btn.getAttribute('data-siteid');
      const targetSite = currentConfig.sites.find(s => s.id === id);
      if (targetSite) {
        targetSite.enabled = !targetSite.enabled;
        saveConfig();
      }
    });
  });

  // Schedules Table
  const schedTbody = document.getElementById('schedulesTableBody');
  schedTbody.innerHTML = '';
  const dayLabels = [tr('Sun'), tr('Mon'), tr('Tue'), tr('Wed'), tr('Thu'), tr('Fri'), tr('Sat')];
  (currentConfig.scheduleRules || []).forEach(r => {
    const rowEl = document.createElement('tr');
    rowEl.innerHTML = `
      <td><strong>${escapeHtml(r.title || 'Untitled')}</strong></td>
      <td style="font-family: monospace;">${escapeHtml(r.startTime || '')} – ${escapeHtml(r.endTime || '')}</td>
      <td style="color: #a1a1aa;">${(r.daysOfWeek || []).map(d => dayLabels[d]).join(', ')}</td>
      <td>${r.mode === 'block_during' ? tr('Blocked Window') : tr('Allowed Window')}</td>
      <td><button class="btn-toggle ${r.isActive ? 'active' : 'inactive'}" data-ruleid="${r.id}">${r.isActive ? tr('Active') : tr('Off')}</button></td>
      <td style="white-space:nowrap;"><button class="btn-secondary btn-edit-schedule" data-ruleid="${r.id}" style="padding:5px 9px;">${tr('Edit')}</button> <button class="btn-secondary btn-delete-schedule" data-ruleid="${r.id}" style="padding:5px 9px;color:#fda4af;">${tr('Delete')}</button></td>
    `;
    schedTbody.appendChild(rowEl);
  });

  document.querySelectorAll('[data-ruleid].btn-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!requireParentUnlock()) return;
      const rule = (currentConfig.scheduleRules || []).find(r => r.id === btn.dataset.ruleid);
      if (rule) { rule.isActive = !rule.isActive; saveConfig(); }
    });
  });
  document.querySelectorAll('.btn-edit-schedule').forEach(btn => btn.addEventListener('click', () => openScheduleEditor(btn.dataset.ruleid)));
  document.querySelectorAll('.btn-delete-schedule').forEach(btn => btn.addEventListener('click', () => deleteSchedule(btn.dataset.ruleid)));

  // Date Overrides
  const overrideBox = document.getElementById('dateOverridesList');
  overrideBox.innerHTML = '';
  (currentConfig.dateOverrides || []).slice().sort((a,b) => (a.date || '').localeCompare(b.date || '')).forEach(o => {
    const item = document.createElement('div');
    item.style.cssText = 'padding: 10px 14px; background: #18181b; border: 1px solid #27272a; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; gap:12px; align-items: center; font-size: 13px;';
    const cats = (o.appliedCategories || []).join(', ') || 'all configured categories';
    item.innerHTML = `
      <div style="min-width:0;">
        <strong style="color: white;">${escapeHtml(o.title || 'Date override')}</strong> (${escapeHtml(o.date || '')})
        <div style="font-size: 11px; color: #a1a1aa; margin-top:2px;">${escapeHtml(o.notes || '')}</div>
        <div style="font-size: 10px; color: #71717a; margin-top:3px;">Categories: ${escapeHtml(cats)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;white-space:nowrap;">
        <span style="color: ${o.action === 'all_day_block' ? '#f43f5e' : '#34d399'}; font-weight: 500;">${o.action === 'all_day_block' ? 'All-Day Blocked' : 'All-Day Allowed'}</span>
        <button class="btn-secondary btn-edit-date" data-overrideid="${o.id}" style="padding:5px 9px;">Edit</button>
        <button class="btn-secondary btn-delete-date" data-overrideid="${o.id}" style="padding:5px 9px;color:#fda4af;">Delete</button>
      </div>
    `;
    overrideBox.appendChild(item);
  });
  if (!(currentConfig.dateOverrides || []).length) {
    overrideBox.innerHTML = '<div style="color:#71717a;font-size:12px;">No date overrides configured.</div>';
  }
  document.querySelectorAll('.btn-edit-date').forEach(btn => btn.addEventListener('click', () => openDateEditor(btn.dataset.overrideid)));
  document.querySelectorAll('.btn-delete-date').forEach(btn => btn.addEventListener('click', () => deleteDateOverride(btn.dataset.overrideid)));

  // Daily usage quotas
  const quotaRows = document.getElementById('quotaRows');
  if (quotaRows) {
    quotaRows.innerHTML = '';
    const labels = { short_video: tr('Short video'), social: tr('Social'), gaming: tr('Gaming'), long_video: tr('Long video'), custom: tr('Custom') };
    const today = new Date().toLocaleDateString('en-CA');
    const usage = (dailyQuotaUsage && dailyQuotaUsage.date === today) ? dailyQuotaUsage.secondsByCategory || {} : {};
    const quotas = currentConfig.settings.usageQuotas || [];
    quotas.forEach(q => {
      const usedSec = Number(usage[q.category] || 0);
      const limitSec = Math.max(1, Number(q.dailyMinutes || 0) * 60);
      const pct = Math.min(100, Math.round((usedSec / limitSec) * 100));
      const usedMin = Math.floor(usedSec / 60);
      const remainMin = Math.max(0, Math.ceil((limitSec - usedSec) / 60));
      const row = document.createElement('div');
      row.style.cssText = 'display:grid;grid-template-columns:1.2fr 120px 100px 1fr;gap:12px;align-items:center;padding:10px 12px;background:#18181b;border:1px solid #27272a;border-radius:7px;';
      row.innerHTML = `
        <div><strong>${labels[q.category] || escapeHtml(q.category)}</strong><div style="font-size:10px;color:#71717a;margin-top:2px;">${usedMin} min used · ${remainMin} min remaining</div></div>
        <div><input class="quota-minutes" data-category="${q.category}" type="number" min="1" max="1440" value="${Number(q.dailyMinutes || 30)}" style="width:72px;padding:7px;background:#09090b;border:1px solid #3f3f46;color:white;border-radius:6px;"> <span style="font-size:11px;color:#a1a1aa;">min</span></div>
        <button class="btn-toggle quota-toggle ${q.isActive ? 'active' : 'inactive'}" data-category="${q.category}">${q.isActive ? tr('Enabled') : tr('Off')}</button>
        <div><div style="height:7px;background:#27272a;border-radius:999px;overflow:hidden;"><div style="height:100%;width:${pct}%;background:currentColor;color:${pct >= 100 ? '#f43f5e' : '#6366f1'};"></div></div><div style="font-size:10px;color:#71717a;margin-top:3px;">${pct}% of daily quota</div></div>`;
      quotaRows.appendChild(row);
    });

    quotaRows.querySelectorAll('.quota-toggle').forEach(btn => btn.addEventListener('click', () => {
      if (!requireParentUnlock()) return;
      const q = (currentConfig.settings.usageQuotas || []).find(x => x.category === btn.dataset.category);
      if (q) { q.isActive = !q.isActive; saveConfig(); }
    }));
    quotaRows.querySelectorAll('.quota-minutes').forEach(input => input.addEventListener('change', () => {
      if (!requireParentUnlock()) { renderAll(); return; }
      const q = (currentConfig.settings.usageQuotas || []).find(x => x.category === input.dataset.category);
      if (q) { q.dailyMinutes = Math.max(1, Math.min(1440, Number(input.value) || 1)); saveConfig(); }
    }));
  }

  // Grace-period warning controls
  const graceEnabled = document.getElementById('gracePeriodEnabled');
  const graceMinutes = document.getElementById('gracePeriodMinutes');
  if (graceEnabled) graceEnabled.checked = currentConfig.settings.gracePeriodEnabled !== false;
  if (graceMinutes) graceMinutes.value = Math.max(1, Math.min(30, Number(currentConfig.settings.gracePeriodMinutes || 5)));

  // Advanced text
  document.getElementById('configText').value = JSON.stringify(currentConfig, null, 2);
  if (window.fgI18n) window.fgI18n.apply();
}


// Add site form
const addSiteBox = document.getElementById('addSiteBox');
document.getElementById('btnShowAddSite').addEventListener('click', () => {
  if (!isParentUnlocked) {
    btnPinLock.click();
    return;
  }
  addSiteBox.style.display = 'block';
});
document.getElementById('btnCancelAddSite').addEventListener('click', () => {
  addSiteBox.style.display = 'none';
});
document.getElementById('btnSaveNewSite').addEventListener('click', () => {
  const name = document.getElementById('newSiteName').value.trim();
  const domain = document.getElementById('newSiteDomain').value.trim().toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '');
  const cat = document.getElementById('newSiteCat').value;
  if (!domain) return;

  currentConfig.sites.unshift({
    id: 'site-' + Date.now(),
    name: name || domain,
    domain: domain,
    category: cat,
    enabled: true,
    brainrotScore: 'high'
  });
  saveConfig();
  addSiteBox.style.display = 'none';
  document.getElementById('newSiteName').value = '';
  document.getElementById('newSiteDomain').value = '';
});

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

function requireParentUnlock() {
  if (isParentUnlocked) return true;
  btnPinLock.click();
  return false;
}

function getCheckedValues(containerId) {
  return Array.from(document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`)).map(el => {
    const n = Number(el.value);
    return Number.isNaN(n) ? el.value : n;
  });
}

function setCheckedValues(containerId, values) {
  const set = new Set(values || []);
  document.querySelectorAll(`#${containerId} input[type="checkbox"]`).forEach(el => {
    const numeric = Number(el.value);
    el.checked = set.has(el.value) || (!Number.isNaN(numeric) && set.has(numeric));
  });
}

function openScheduleEditor(ruleId = '') {
  if (!requireParentUnlock()) return;
  const editor = document.getElementById('scheduleEditor');
  const rule = ruleId ? (currentConfig.scheduleRules || []).find(r => r.id === ruleId) : null;
  document.getElementById('scheduleEditorTitle').textContent = rule ? tr('Edit Schedule') : tr('Add Schedule');
  document.getElementById('scheduleEditId').value = rule?.id || '';
  document.getElementById('scheduleTitle').value = rule?.title || '';
  document.getElementById('scheduleStart').value = rule?.startTime || '16:00';
  document.getElementById('scheduleEnd').value = rule?.endTime || '18:00';
  document.getElementById('scheduleMode').value = rule?.mode || 'block_during';
  setCheckedValues('scheduleDays', rule?.daysOfWeek || [1,2,3,4,5]);
  setCheckedValues('scheduleCategories', rule?.appliedCategories || ['short_video','social','gaming','custom']);
  editor.style.display = 'block';
  editor.scrollIntoView({behavior:'smooth', block:'center'});
}

function closeScheduleEditor() {
  document.getElementById('scheduleEditor').style.display = 'none';
  document.getElementById('scheduleEditId').value = '';
}

function deleteSchedule(ruleId) {
  if (!requireParentUnlock()) return;
  const rule = (currentConfig.scheduleRules || []).find(r => r.id === ruleId);
  if (!rule || !confirm(`Delete schedule "${rule.title}"?`)) return;
  currentConfig.scheduleRules = (currentConfig.scheduleRules || []).filter(r => r.id !== ruleId);
  saveConfig();
}

function openDateEditor(overrideId = '') {
  if (!requireParentUnlock()) return;
  const editor = document.getElementById('dateOverrideEditor');
  const item = overrideId ? (currentConfig.dateOverrides || []).find(o => o.id === overrideId) : null;
  document.getElementById('dateEditorTitle').textContent = item ? tr('Edit Date Override') : tr('Add Date Override');
  document.getElementById('dateEditId').value = item?.id || '';
  document.getElementById('overrideDate').value = item?.date || new Date().toLocaleDateString('en-CA');
  document.getElementById('overrideTitle').value = item?.title || '';
  document.getElementById('overrideAction').value = item?.action || 'all_day_block';
  document.getElementById('overrideNotes').value = item?.notes || '';
  setCheckedValues('overrideCategories', item?.appliedCategories || ['short_video','social','gaming','long_video','custom']);
  editor.style.display = 'block';
  editor.scrollIntoView({behavior:'smooth', block:'center'});
}

function closeDateEditor() {
  document.getElementById('dateOverrideEditor').style.display = 'none';
  document.getElementById('dateEditId').value = '';
}

function deleteDateOverride(overrideId) {
  if (!requireParentUnlock()) return;
  const item = (currentConfig.dateOverrides || []).find(o => o.id === overrideId);
  if (!item || !confirm(`Delete date override "${item.title}"?`)) return;
  currentConfig.dateOverrides = (currentConfig.dateOverrides || []).filter(o => o.id !== overrideId);
  saveConfig();
}

document.getElementById('btnAddSchedule').addEventListener('click', () => openScheduleEditor());
document.getElementById('btnCancelSchedule').addEventListener('click', closeScheduleEditor);
document.getElementById('btnSaveSchedule').addEventListener('click', () => {
  if (!requireParentUnlock()) return;
  const title = document.getElementById('scheduleTitle').value.trim();
  const startTime = document.getElementById('scheduleStart').value;
  const endTime = document.getElementById('scheduleEnd').value;
  const daysOfWeek = getCheckedValues('scheduleDays');
  const appliedCategories = getCheckedValues('scheduleCategories');
  if (!title || !startTime || !endTime) return alert(tr('Enter a name, start time, and end time.'));
  if (!daysOfWeek.length) return alert(tr('Select at least one day.'));
  if (!appliedCategories.length) return alert(tr('Select at least one category.'));
  const id = document.getElementById('scheduleEditId').value;
  const existing = id ? (currentConfig.scheduleRules || []).find(r => r.id === id) : null;
  const value = { id: id || 'sched-' + Date.now(), title, daysOfWeek, startTime, endTime, mode: document.getElementById('scheduleMode').value, appliedCategories, isActive: existing ? existing.isActive !== false : true };
  currentConfig.scheduleRules = currentConfig.scheduleRules || [];
  if (existing) Object.assign(existing, value); else currentConfig.scheduleRules.push(value);
  closeScheduleEditor();
  saveConfig();
});

document.getElementById('btnAddDateOverride').addEventListener('click', () => openDateEditor());
document.getElementById('btnCancelDateOverride').addEventListener('click', closeDateEditor);
document.getElementById('btnSaveDateOverride').addEventListener('click', () => {
  if (!requireParentUnlock()) return;
  const date = document.getElementById('overrideDate').value;
  const title = document.getElementById('overrideTitle').value.trim();
  const appliedCategories = getCheckedValues('overrideCategories');
  if (!date || !title) return alert(tr('Enter a date and name.'));
  if (!appliedCategories.length) return alert(tr('Select at least one category.'));
  const id = document.getElementById('dateEditId').value;
  const existing = id ? (currentConfig.dateOverrides || []).find(o => o.id === id) : null;
  const value = { id: id || 'override-' + Date.now(), date, title, action: document.getElementById('overrideAction').value, appliedCategories, notes: document.getElementById('overrideNotes').value.trim() };
  currentConfig.dateOverrides = currentConfig.dateOverrides || [];
  if (existing) Object.assign(existing, value); else currentConfig.dateOverrides.push(value);
  closeDateEditor();
  saveConfig();
});

document.getElementById('gracePeriodEnabled').addEventListener('change', (e) => {
  if (!requireParentUnlock()) { renderAll(); return; }
  currentConfig.settings.gracePeriodEnabled = !!e.target.checked;
  saveConfig();
});

document.getElementById('gracePeriodMinutes').addEventListener('change', (e) => {
  if (!requireParentUnlock()) { renderAll(); return; }
  currentConfig.settings.gracePeriodMinutes = Math.max(1, Math.min(30, Number(e.target.value) || 5));
  saveConfig();
});

document.getElementById('btnResetUsage').addEventListener('click', async () => {
  if (!requireParentUnlock()) return;
  if (!confirm(tr("Reset all usage counters for today?"))) return;
  dailyQuotaUsage = { date: new Date().toLocaleDateString('en-CA'), secondsByCategory: {} };
  await chrome.storage.local.set({ dailyQuotaUsage });
  chrome.runtime.sendMessage({ type: 'REFRESH_RULES' });
  renderAll();
});

// Keep quota meters fresh while the dashboard is open.
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.dailyQuotaUsage) {
    dailyQuotaUsage = changes.dailyQuotaUsage.newValue || null;
    renderAll();
  }
});

// Simulator with Wildcard Engine
document.getElementById('btnRunSim').addEventListener('click', () => {
  const url = document.getElementById('simUrl').value.trim().toLowerCase();
  const timeStr = document.getElementById('simTime').value;
  const statusEl = document.getElementById('simStatus');
  const reasonEl = document.getElementById('simReason');

  // Match using Wildcard Matching Engine
  const matched = (currentConfig.sites || []).find(s => s.enabled && matchesWildcardPattern(url, s.domain));
  if (!matched) {
    statusEl.textContent = 'Access Permitted · Unrestricted Site';
    statusEl.style.color = '#34d399';
    reasonEl.textContent = url + ' does not match any blocked pattern in your list.';
    return;
  }

  const [th, tm] = timeStr.split(':').map(Number);
  const min = (th || 0) * 60 + (tm || 0);
  const now = new Date();
  const day = now.getDay();
  let blocked = false;
  let ruleTitle = '';

  for (const rule of (currentConfig.scheduleRules || [])) {
    if (rule.isActive && rule.daysOfWeek.includes(day)) {
      const [sh, sm] = (rule.startTime || '0:0').split(':').map(Number);
      const [eh, em] = (rule.endTime || '0:0').split(':').map(Number);
      const s = sh * 60 + sm;
      const e = eh * 60 + em;
      const inR = s <= e ? (min >= s && min < e) : (min >= s || min < e);
      if (rule.mode === 'block_during' && inR) {
        blocked = true;
        ruleTitle = rule.title;
        break;
      }
    }
  }

  if (blocked) {
    statusEl.textContent = 'Shield Active · ' + matched.name + ' Sub-Path Blocked';
    statusEl.style.color = '#f43f5e';
    reasonEl.textContent = 'Matched pattern "' + matched.domain + '" under schedule "' + ruleTitle + '" at ' + timeStr;
  } else {
    statusEl.textContent = 'Access Permitted · Allowed Play Window';
    statusEl.style.color = '#34d399';
    reasonEl.textContent = 'Outside restricted hours. Child can browse ' + matched.name;
  }
});

// Save JSON
document.getElementById('btnSaveJson').addEventListener('click', () => {
  if (!isParentUnlocked) {
    btnPinLock.click();
    return;
  }
  try {
    const val = JSON.parse(document.getElementById('configText').value);
    currentConfig = val;
    saveConfig();
    document.getElementById('saveJsonStatus').textContent = tr('✓ Saved successfully!');
    setTimeout(() => { document.getElementById('saveJsonStatus').textContent = ''; }, 3000);
  } catch (err) {
    alert(tr('Invalid JSON: ') + err.message);
  }
});


const languageSelect = document.getElementById('languageSelect');
if (languageSelect) {
  chrome.storage.local.get(['focusGateConfig']).then(data => {
    languageSelect.value = data.focusGateConfig?.settings?.language === 'fr' ? 'fr' : 'en';
  });
  languageSelect.addEventListener('change', () => window.fgI18n?.setLanguage(languageSelect.value));
}

const blockPageThemeSelect = document.getElementById('blockPageThemeSelect');
if (blockPageThemeSelect) {
  chrome.storage.local.get(['focusGateConfig']).then(data => {
    blockPageThemeSelect.value = data.focusGateConfig?.settings?.blockPageTheme === 'playful' ? 'playful' : 'calm';
  });
  blockPageThemeSelect.addEventListener('change', async () => {
    if (!currentConfig) return;
    if (!isParentUnlocked) {
      blockPageThemeSelect.value = currentConfig.settings?.blockPageTheme === 'playful' ? 'playful' : 'calm';
      btnPinLock.click();
      return;
    }
    currentConfig.settings = currentConfig.settings || {};
    currentConfig.settings.blockPageTheme = blockPageThemeSelect.value === 'playful' ? 'playful' : 'calm';
    await saveConfig();
  });
}

loadConfig();
