const STORAGE_KEY = 'dashboard_sessions';

export function initSessions() {
  const display = document.getElementById('sessions-display');
  const resetBtn = document.getElementById('reset-sessions-btn');
  if (!display) return;

  // Increment on each visit
  let count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10) + 1;
  localStorage.setItem(STORAGE_KEY, count);
  display.textContent = count.toLocaleString('fr-FR');

  resetBtn?.addEventListener('click', () => {
    count = 0;
    localStorage.setItem(STORAGE_KEY, '0');
    display.textContent = '0';
  });

  document.getElementById('sessions-increment')?.addEventListener('click', () => {
    count += 1;
    localStorage.setItem(STORAGE_KEY, count);
    display.textContent = count.toLocaleString('fr-FR');
  });

  document.getElementById('sessions-decrement')?.addEventListener('click', () => {
    count = Math.max(0, count - 1);
    localStorage.setItem(STORAGE_KEY, count);
    display.textContent = count.toLocaleString('fr-FR');
  });
}
