// =============================================================
// stats.js — Count-up animé au chargement de la page
// =============================================================

export function initStats() {
  const els = document.querySelectorAll('.stat-card__value[data-count]');
  if (!els.length) return;

  els.forEach(el => {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix  || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 2200; // ms
    const start    = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const value    = eased * target;

      el.textContent = (decimals > 0
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString('fr-FR')
      ) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
    }

    // Petit délai pour que la page soit visible avant de lancer
    setTimeout(() => requestAnimationFrame(tick), 300);
  });
}
