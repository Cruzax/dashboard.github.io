const STORAGE_KEY = 'dashboard_klik_count';

export function initKlik() {
  const display = document.getElementById('klik-display');
  const btn     = document.querySelector('.punch-btn');
  if (!display || !btn) return;

  let count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  display.textContent = count.toLocaleString('fr-FR');

  btn.addEventListener('click', () => {
    count += 1;
    localStorage.setItem(STORAGE_KEY, count);
    display.textContent = count.toLocaleString('fr-FR');
  });
}
