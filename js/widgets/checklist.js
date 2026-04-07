// =============================================================
// checklist.js — Persist state + daily reset at 4:00 AM
// =============================================================

const STATE_KEY = 'dashboard_checklist_state';
const DATE_KEY  = 'dashboard_checklist_date';

// Returns a string like "2026-04-07" but treats 00:00–03:59 as still "yesterday"
function getResetDay() {
  const now = new Date();
  if (now.getHours() < 4) {
    now.setDate(now.getDate() - 1);
  }
  return now.toISOString().slice(0, 10);
}

export function initChecklist() {
  const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
  if (!checkboxes.length) return;

  const today = getResetDay();
  const lastDate = localStorage.getItem(DATE_KEY);

  if (lastDate !== today) {
    // New day — reset everything
    checkboxes.forEach(cb => { cb.checked = false; });
    localStorage.setItem(DATE_KEY, today);
    localStorage.removeItem(STATE_KEY);
  } else {
    // Restore saved state
    const saved = JSON.parse(localStorage.getItem(STATE_KEY) || '[]');
    checkboxes.forEach((cb, i) => { cb.checked = !!saved[i]; });
  }

  // Save on every change
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const state = Array.from(checkboxes).map(c => c.checked);
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    });
  });

  // Schedule next check at 4:00 AM
  scheduleReset(checkboxes);
}

function scheduleReset(checkboxes) {
  const now = new Date();
  const next4am = new Date(now);
  next4am.setHours(4, 0, 0, 0);
  if (now >= next4am) next4am.setDate(next4am.getDate() + 1);

  const delay = next4am - now;
  setTimeout(() => {
    checkboxes.forEach(cb => { cb.checked = false; });
    localStorage.setItem(DATE_KEY, getResetDay());
    localStorage.removeItem(STATE_KEY);
    scheduleReset(checkboxes); // reschedule for next day
  }, delay);
}
