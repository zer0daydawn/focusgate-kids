const tr = (text) => window.fgI18n ? window.fgI18n.t(text) : text;
async function initPopup() {
  const data = await chrome.storage.local.get(['focusGateConfig', 'emergencyPassExpiry']);
  const config = data.focusGateConfig;
  const passExpiry = data.emergencyPassExpiry || 0;

  const headingEl = document.getElementById('statusHeading');
  const detailsEl = document.getElementById('statusDetails');
  const badgeEl = document.getElementById('badgeState');

  if (Date.now() < passExpiry) {
    const minsLeft = Math.ceil((passExpiry - Date.now()) / 60000);
    headingEl.textContent = tr('Parent Pass Active');
    detailsEl.textContent = minsLeft + ' ' + tr('minutes left before shield re-engages');
    badgeEl.textContent = 'PASS';
    badgeEl.style.color = '#38bdf8';
    badgeEl.style.background = '#38bdf822';
    return;
  }

  if (!config || !config.settings?.globalEnabled) {
    headingEl.textContent = tr('Protection Paused');
    detailsEl.textContent = tr('Enabled via Parent Dashboard');
    badgeEl.textContent = tr('PAUSED');
    badgeEl.style.color = '#94a3b8';
    badgeEl.style.background = '#94a3b822';
    return;
  }

  headingEl.textContent = tr('Brain-Rot Shield Active');
  detailsEl.textContent = tr('Guarding YouTube Shorts, TikTok & Social');
  badgeEl.textContent = tr('PROTECTED');
  badgeEl.style.color = '#818cf8';
  badgeEl.style.background = '#818cf822';
}

document.getElementById('btnUnlockPass').addEventListener('click', () => {
  const pin = document.getElementById('parentPinInput').value;
  const resultEl = document.getElementById('pinResult');
  if (!pin) return;

  chrome.runtime.sendMessage({ type: 'VERIFY_PIN_AND_PASS', pin, minutes: 15 }, (res) => {
    if (res && res.success) {
      resultEl.style.color = '#22c55e';
      resultEl.textContent = tr('✓ Pass granted for 15 minutes!');
      initPopup();
    } else {
      resultEl.style.color = '#f43f5e';
      resultEl.textContent = res?.error || tr('Wrong PIN');
    }
  });
});

document.getElementById('btnOpenDashboard').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

const popupLanguageSelect = document.getElementById('popupLanguageSelect');
if (popupLanguageSelect) {
  chrome.storage.local.get(['focusGateConfig']).then(data => {
    popupLanguageSelect.value = data.focusGateConfig?.settings?.language === 'fr' ? 'fr' : 'en';
  });
  popupLanguageSelect.addEventListener('change', () => window.fgI18n?.setLanguage(popupLanguageSelect.value));
}

initPopup();
