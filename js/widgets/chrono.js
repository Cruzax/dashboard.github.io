const STORAGE_KEY = 'dashboard_chrono_elapsed';

export function initChrono() {
  const display = document.getElementById('chrono-display');
  if (!display) return;

  let elapsed = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  let startTime = null;
  let rafId = null;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function render(ms) {
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    display.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  function tick() {
    render(elapsed + (Date.now() - startTime));
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (startTime !== null) return;
    startTime = Date.now();
    tick();
  }

  function pause() {
    if (startTime === null) return;
    elapsed += Date.now() - startTime;
    startTime = null;
    cancelAnimationFrame(rafId);
    localStorage.setItem(STORAGE_KEY, elapsed);
  }

  render(elapsed);
  start();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pause();
    } else {
      start();
    }
  });

  window.addEventListener('beforeunload', pause);
}
