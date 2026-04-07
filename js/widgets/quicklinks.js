// =============================================================
// quicklinks.js — Widget Liens Rapides
// Modifie le tableau LINKS ci-dessous pour personnaliser tes liens
// =============================================================

// --- Configuration des liens (facile à éditer) ---
const LINKS = [
  { label: 'GitHub',    icon: '🐙', url: 'https://github.com' },
  { label: 'Notion',    icon: '📝', url: 'https://notion.so' },
  { label: 'YouTube',   icon: '▶️',  url: 'https://youtube.com' },
  { label: 'Figma',     icon: '🎨', url: 'https://figma.com' },
  { label: 'ChatGPT',   icon: '🤖', url: 'https://chat.openai.com' },
];

export function initQuickLinks() {
  const list = document.getElementById('quicklinks-list');
  if (!list) return;

  // Génère un <li> par lien
  list.innerHTML = LINKS.map(link => `
    <li class="quicklinks__item">
      <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">
        <span class="quicklinks__icon">${link.icon}</span>
        <span class="quicklinks__label">${escapeHtml(link.label)}</span>
      </a>
    </li>
  `).join('');
}

// Échappement minimal pour éviter l'injection HTML dans les labels
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
