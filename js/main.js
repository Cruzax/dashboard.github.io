// =============================================================
// main.js — Point d'entrée du dashboard
// =============================================================

import { initClock }    from './widgets/clock.js';
import { initDarkMode } from './widgets/darkmode.js';
import { initChrono }   from './widgets/chrono.js';
import { initSessions }  from './widgets/sessions.js';
import { initStreak }    from './widgets/streak.js';
import { initKlik }      from './widgets/klik.js';
import { initWeather }   from './widgets/weather.js';

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initClock();
  initChrono();
  initSessions();
  initStreak();
  initKlik();
  initWeather();

  // Splash — bouton Start
  document.getElementById('start-btn')?.addEventListener('click', () => {
    document.body.classList.add('started');
  });
});
