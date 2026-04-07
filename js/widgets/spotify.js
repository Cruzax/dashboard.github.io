// =============================================================
// spotify.js — Widget Spotify via iFrame Embed API
// Playlist : https://open.spotify.com/playlist/37i9dQZF1DZ06evO27hNED
// API docs : https://developer.spotify.com/documentation/embeds
// =============================================================

const PLAYLIST_URI = 'spotify:playlist:37i9dQZF1DZ06evO27hNED';

export function initSpotify() {
  // L'API Spotify appelle cette fonction globale quand elle est prête.
  // Si le script API est déjà chargé avant ce module, on relance manuellement.
  if (window.SpotifyIframeApi) {
    setupController(window.SpotifyIframeApi);
    return;
  }

  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    window.SpotifyIframeApi = IFrameAPI;
    setupController(IFrameAPI);
  };
}

function setupController(IFrameAPI) {
  const target = document.getElementById('spotify-embed-target');
  if (!target) return;

  IFrameAPI.createController(
    target,
    {
      uri:    PLAYLIST_URI,
      width:  '100%',
      height: '100%',
    },
    (controller) => {
      bindControls(controller);
    }
  );
}

function bindControls(ctrl) {
  const btnPrev   = document.getElementById('sp-prev');
  const btnToggle = document.getElementById('sp-toggle');
  const btnNext   = document.getElementById('sp-next');
  const volSlider = document.getElementById('sp-volume');
  const iconPlay  = document.getElementById('sp-icon-play');
  const iconPause = document.getElementById('sp-icon-pause');

  btnPrev  ?.addEventListener('click', () => ctrl.previousTrack());
  btnNext  ?.addEventListener('click', () => ctrl.nextTrack());
  btnToggle?.addEventListener('click', () => ctrl.togglePlay());

  // Volume (0–1) + mise à jour visuelle de la jauge
  function updateVolumeFill(val) {
    volSlider?.style.setProperty('--val', val);
  }

  volSlider?.addEventListener('input', (e) => {
    ctrl.setVolume(e.target.value / 100);
    updateVolumeFill(e.target.value);
  });

  // Sync icône play/pause selon l'état du lecteur
  ctrl.addListener('playback_update', (e) => {
    const playing = !e.data.isPaused;
    if (iconPlay)  iconPlay.style.display  = playing ? 'none'  : '';
    if (iconPause) iconPause.style.display = playing ? ''      : 'none';
  });

  // Volume initial
  const initVol = volSlider?.value ?? 80;
  ctrl.setVolume(initVol / 100);
  updateVolumeFill(initVol);
}
