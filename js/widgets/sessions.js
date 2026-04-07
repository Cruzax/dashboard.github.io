const STORAGE_KEY = 'dashboard_runs_songes';

export function initSessions() {
  const display   = document.getElementById('sessions-display');
  const resetBtn  = document.getElementById('reset-sessions-btn');
  const incBtn    = document.getElementById('sessions-increment');
  const decBtn    = document.getElementById('sessions-decrement');
  if (!display) return;

  let count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  display.textContent = count;

  incBtn?.addEventListener('click', () => {
    count += 1;
    localStorage.setItem(STORAGE_KEY, count);
    display.textContent = count;
  });

  decBtn?.addEventListener('click', () => {
    count = Math.max(0, count - 1);
    localStorage.setItem(STORAGE_KEY, count);
    display.textContent = count;
  });

  resetBtn?.addEventListener('click', () => {
    count = 0;
    localStorage.setItem(STORAGE_KEY, 0);
    display.textContent = 0;
  });
}
