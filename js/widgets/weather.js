// =============================================================
// weather.js — Widget Météo via Open-Meteo (gratuit, sans clé)
// Coordonnées fixes : Bavans 25550 (47.4833, 6.7667)
// =============================================================

const WMO_LABEL = {
  0:'Ciel dégagé', 1:'Principalement dégagé', 2:'Partiellement nuageux', 3:'Couvert',
  45:'Brouillard', 48:'Brouillard givrant',
  51:'Bruine légère', 53:'Bruine modérée', 55:'Bruine dense',
  61:'Pluie légère', 63:'Pluie modérée', 65:'Pluie forte',
  71:'Neige légère', 73:'Neige modérée', 75:'Neige forte', 77:'Grésil',
  80:'Averses légères', 81:'Averses modérées', 82:'Averses violentes',
  85:'Averses de neige', 86:'Averses de neige fortes',
  95:'Orage', 96:'Orage avec grêle', 99:'Orage fort avec grêle',
};
const WMO_ICON = {
  0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️', 45:'🌫️', 48:'🌫️',
  51:'🌦️', 53:'🌦️', 55:'🌧️', 61:'🌧️', 63:'🌧️', 65:'🌧️',
  71:'🌨️', 73:'🌨️', 75:'❄️', 77:'🌨️',
  80:'🌦️', 81:'🌧️', 82:'⛈️', 85:'🌨️', 86:'❄️',
  95:'⛈️', 96:'⛈️', 99:'⛈️',
};

const AQI_LABELS = ['Très bon', 'Bon', 'Moyen', 'Dégradé', 'Très dégradé'];
const AQI_COLORS = ['limegreen', '#7bc67e', '#f0c040', '#f08030', '#e05050'];

const LAT = 47.4833;
const LON = 6.7667;

const API_URL =
  'https://api.open-meteo.com/v1/forecast' +
  `?latitude=${LAT}&longitude=${LON}` +
  '&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,surface_pressure,weather_code' +
  '&wind_speed_unit=kmh&timezone=Europe%2FParis';

export function initWeather() {
  const root = document.getElementById('weather-root');
  if (!root) return;
  fetchWeather(root);
}

async function fetchWeather(root) {
  try {
    const res  = await fetch(API_URL);
    const data = await res.json();
    const c    = data.current;

    const code      = c.weather_code;
    const icon      = WMO_ICON[code]  ?? '🌡️';
    const condition = WMO_LABEL[code] ?? 'Inconnu';
    const temp      = Math.round(c.temperature_2m);
    const feels     = Math.round(c.apparent_temperature);
    const humidity  = Math.round(c.relative_humidity_2m);
    const wind      = Math.round(c.wind_speed_10m);
    const pressure  = Math.round(c.surface_pressure);

    const aqiIdx = humidity < 20 ? 1 : humidity < 40 ? 0 : humidity < 60 ? 1 : humidity < 80 ? 2 : 3;

    root.innerHTML = `
      <div class="wm-wrap">
        <div class="wm-card">
          <span class="wm-emoji">${icon}</span>
          <div class="wm-temp">${temp}&thinsp;°C</div>
          <div class="wm-city">Bavans, Doubs</div>
          <div class="wm-cond">${condition}</div>
        </div>
        <div class="wm-back">
          <div class="wm-upper">
            <div class="wm-detail">💧<br><span>${humidity}%</span><br>Humidité</div>
            <div class="wm-detail">💨<br><span>${wind}&thinsp;km/h</span><br>Vent</div>
          </div>
          <div class="wm-lower">
            <div class="wm-detail">🌡️<br><span>${feels}&thinsp;°C</span><br>Ressenti</div>
            <div class="wm-detail">🔵<br><span>${pressure}</span><br>mbar</div>
            <div class="wm-aqi" style="background:${AQI_COLORS[aqiIdx]};">${AQI_LABELS[aqiIdx]}</div>
          </div>
        </div>
      </div>
    `;
  } catch {
    root.innerHTML = '<p class="wm-error">Météo indisponible</p>';
  }
}
