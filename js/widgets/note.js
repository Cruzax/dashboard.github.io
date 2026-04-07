// =============================================================
// note.js — Widget Note Rapide
// Persistance via localStorage, sauvegarde automatique à chaque frappe
// =============================================================

const STORAGE_KEY = 'dashboard_note';
const SAVE_DELAY  = 600; // ms de debounce avant sauvegarde

export function initNote() {
  const textarea  = document.getElementById('note-textarea');
  const statusEl  = document.getElementById('note-status');
  if (!textarea || !statusEl) return;

  // Restaure le contenu sauvegardé
  textarea.value = localStorage.getItem(STORAGE_KEY) ?? '';

  // Sauvegarde avec debounce pour ne pas écrire à chaque touche
  let debounceTimer;

  textarea.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    statusEl.textContent = '';
    statusEl.classList.remove('saved');

    debounceTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, textarea.value);
      showSaved(statusEl);
    }, SAVE_DELAY);
  });
}

function showSaved(el) {
  el.textContent = '✓ Sauvegardé';
  el.classList.add('saved');

  // Efface le message après 2 secondes
  setTimeout(() => {
    el.textContent = '';
    el.classList.remove('saved');
  }, 2000);
}
