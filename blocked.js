async function applyBlockPageTheme() {
  try {
    const data = await chrome.storage.local.get(['focusGateConfig']);
    const theme = data.focusGateConfig?.settings?.blockPageTheme === 'playful' ? 'playful' : 'calm';
    document.body.dataset.theme = theme;
  } catch (_) {
    document.body.dataset.theme = 'calm';
  }
}

applyBlockPageTheme();
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.focusGateConfig) applyBlockPageTheme();
});

const tr = (text) => window.fgI18n ? window.fgI18n.t(text) : text;
const params = new URLSearchParams(window.location.search);
let siteName = params.get('site');
let domain = params.get('domain');

if (!domain && document.referrer) {
  try {
    const u = new URL(document.referrer);
    domain = u.hostname + u.pathname;
    siteName = u.hostname.replace(/^www\./, '');
  } catch(e) {}
}

if (siteName) {
  document.getElementById('siteTitle').textContent = siteName + tr(' is Paused Right Now');
}
if (domain) {
  document.getElementById('domainName').textContent = domain;
}

document.getElementById('btnBack').addEventListener('click', () => {
  window.history.back();
  setTimeout(() => {
    window.location.href = 'https://www.google.com';
  }, 300);
});

const pinBox = document.getElementById('pinBox');
const btnAskParent = document.getElementById('btnAskParent');
const pinInput = document.getElementById('pinInput');
const btnSubmitPin = document.getElementById('btnSubmitPin');
const pinError = document.getElementById('pinError');

btnAskParent.addEventListener('click', () => {
  pinBox.style.display = pinBox.style.display === 'block' ? 'none' : 'block';
  if (pinBox.style.display === 'block') pinInput.focus();
});

btnSubmitPin.addEventListener('click', () => {
  const pin = pinInput.value;
  if (!pin) return;

  chrome.runtime.sendMessage({ type: 'VERIFY_PIN_AND_PASS', pin, minutes: 15 }, (res) => {
    if (res && res.success) {
      if (domain && !domain.includes('blocked.html')) {
        window.location.href = domain.startsWith('http') ? domain : ('https://' + domain);
      } else {
        window.history.back();
      }
    } else {
      pinError.style.display = 'block';
      pinError.textContent = res?.error || tr('Incorrect Parent PIN. Please try again.');
      pinInput.value = '';
    }
  });
});
