// =============================================================
// main.js — Point d'entrée du dashboard
// =============================================================

import { initClock }    from './widgets/clock.js';
import { initDarkMode } from './widgets/darkmode.js';
import { initStats }    from './widgets/stats.js';

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initClock();
  initStats();

  // Splash — bouton Start
  document.getElementById('start-btn')?.addEventListener('click', () => {
    document.body.classList.add('started');
  });
});
