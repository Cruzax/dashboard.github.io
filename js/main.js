// =============================================================
// main.js — Point d'entrée du dashboard
// =============================================================

import { initClock }    from './widgets/clock.js';
import { initDarkMode } from './widgets/darkmode.js';
import { initStats }    from './widgets/stats.js';
import { initChrono }   from './widgets/chrono.js';
import { initSessions }  from './widgets/sessions.js';
import { initChecklist } from './widgets/checklist.js';
import { initStreak }    from './widgets/streak.js';

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initClock();
  initStats();
  initChrono();
  initSessions();
  initChecklist();
  initStreak();

  // Splash — bouton Start
  document.getElementById('start-btn')?.addEventListener('click', () => {
    document.body.classList.add('started');
  });
});
