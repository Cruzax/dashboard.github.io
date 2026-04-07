// =============================================================
// volume.js — Master volume for all native audio/video elements
// =============================================================

const ICONS = ['🔇', '🔈', '🔉', '🔊'];

function getIcon(val) {
  if (val === 0)   return ICONS[0];
  if (val < 0.34)  return ICONS[1];
  if (val < 0.67)  return ICONS[2];
  return ICONS[3];
}

function applyVolume(val) {
  document.querySelectorAll('audio, video').forEach(el => {
    el.volume = val;
  });
}

export function initVolume() {
  const slider = document.getElementById('volume-slider');
  const icon   = document.getElementById('volume-icon');
  if (!slider || !icon) return;

  const saved = parseFloat(localStorage.getItem('dashboard_volume') ?? '1');
  slider.value = saved;
  slider.style.setProperty('--vol', (saved * 100) + '%');
  icon.textContent = getIcon(saved);
  applyVolume(saved);

  slider.addEventListener('input', () => {
    const val = parseFloat(slider.value);
    slider.style.setProperty('--vol', (val * 100) + '%');
    icon.textContent = getIcon(val);
    applyVolume(val);
    localStorage.setItem('dashboard_volume', val);
  });

  // Apply to any audio/video added later
  new MutationObserver(() => {
    applyVolume(parseFloat(slider.value));
  }).observe(document.body, { childList: true, subtree: true });
}
