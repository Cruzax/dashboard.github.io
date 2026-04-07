// =============================================================
// streak.js — Daily login streak
// =============================================================

const STREAK_KEY = 'dashboard_streak';
const DATE_KEY   = 'dashboard_streak_date';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function initStreak() {
  const el = document.getElementById('streak-display');
  if (!el) return;

  const today    = todayStr();
  const lastDate = localStorage.getItem(DATE_KEY);
  let   streak   = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);

  if (!lastDate) {
    // First ever visit
    streak = 1;
  } else if (lastDate === today) {
    // Already counted today, just display
  } else if (lastDate === yesterdayStr()) {
    // Consecutive day → increment
    streak += 1;
  } else {
    // Missed a day → reset
    streak = 1;
  }

  localStorage.setItem(STREAK_KEY, streak);
  localStorage.setItem(DATE_KEY, today);

  el.textContent = streak;
}
