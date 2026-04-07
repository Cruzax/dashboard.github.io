// =============================================================
// youtube.js — Widget YouTube (dernières vidéos d'une chaîne)
// Nécessite l'ID de chaîne (commence par UC) dans config.js
// =============================================================

import CONFIG from '../../config.js';

export function initYoutube() {
  const container = document.getElementById('youtube-embed');
  if (!container) return;

  const channelId = CONFIG.youtubeChannelId;

  // ID non configuré → message explicatif
  if (!channelId || channelId.startsWith('UCxxxxxxx')) {
    container.innerHTML = `
      <div class="youtube__placeholder">
        Colle l'ID de la chaîne Alderiate<br>dans <code>config.js</code><br>
        <small>(commence par UC…)</small>
      </div>
    `;
    return;
  }

  // L'ID de la playlist "uploads" d'une chaîne = UU + tout ce qui suit UC
  const uploadsPlaylistId = 'UU' + channelId.slice(2);

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed?listType=playlist&list=${uploadsPlaylistId}&index=1`;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';

  container.appendChild(iframe);
}
