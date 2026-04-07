// =============================================================
// darkmode.js — Toggle dark / light mode
// Mémorise le choix dans localStorage
// =============================================================

export function initDarkMode() {
  const checkbox = document.getElementById('darkmode-checkbox');
  if (!checkbox) return;

  // Restaure la préférence sauvegardée
  // checked = true → mode clair | checked = false → mode sombre (défaut)
  const saved = localStorage.getItem('dashboard_theme');
  if (saved === 'light') {
    checkbox.checked = true;
    document.body.classList.add('light-mode');
  }

  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      document.body.classList.add('light-mode');
      localStorage.setItem('dashboard_theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('dashboard_theme', 'dark');
    }
  });
}
