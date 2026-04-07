// =============================================================
// clock.js — Widget Horloge
// Cible les éléments de la card uiverse : clock-hm, clock-s, clock-date
// =============================================================

import CONFIG from '../../config.js';

export function initClock() {
  const hmEl   = document.getElementById('clock-hm');    // HH:MM
  const secEl  = document.getElementById('clock-s');     // :SS
  const dateEl = document.getElementById('clock-date');  // jour date

  if (!hmEl || !secEl || !dateEl) return;

  tick();
  setInterval(tick, 1000);

  function tick() {
    const now = new Date();

    // Heures et minutes
    hmEl.textContent = now.toLocaleTimeString(CONFIG.locale, {
      hour:   '2-digit',
      minute: '2-digit',
    });

    // Secondes (dans le time-sub-text)
    const s = String(now.getSeconds()).padStart(2, '0');
    secEl.textContent = `:${s}`;

    // Date : "lundi 30 mars 2026"
    dateEl.textContent = now.toLocaleDateString(CONFIG.locale, {
      weekday: 'long',
      day:     'numeric',
      month:   'long',
      year:    'numeric',
    });
  }
}
