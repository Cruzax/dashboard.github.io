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
    localStorage.setItem(STORAGE_KEY, '0');
    display.textContent = '0';
  });
}
