// =============================================================
// weather.js — Widget Météo
// Fetch OpenWeatherMap API (clé dans config.js)
// =============================================================

import CONFIG from '../../config.js';

// Correspondance code météo OWM → emoji
const WEATHER_EMOJIS = {
  Thunderstorm: '⛈️',
  Drizzle:      '🌦️',
  Rain:         '🌧️',
  Snow:         '❄️',
  Mist:         '🌫️',
  Smoke:        '🌫️',
  Haze:         '🌫️',
  Dust:         '🌫️',
  Fog:          '🌫️',
  Sand:         '🌫️',
  Ash:          '🌋',
  Squall:       '💨',
  Tornado:      '🌪️',
  Clear:        '☀️',
  Clouds:       '☁️',
};

export function initWeather() {
  const container = document.getElementById('weather-content');
  if (!container) return;

  fetchWeather(container);
}

async function fetchWeather(container) {
  const { weatherApiKey, weatherCity, weatherUnits, locale } = CONFIG;

  // Vérification de la clé API
  if (!weatherApiKey || weatherApiKey === 'YOUR_API_KEY') {
    renderError(container, 'Clé API manquante — renseigne weatherApiKey dans config.js');
    return;
  }

  const unitSymbol = weatherUnits === 'imperial' ? '°F' : weatherUnits === 'standard' ? 'K' : '°C';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(weatherCity)}&appid=${weatherApiKey}&units=${weatherUnits}&lang=fr`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      // Code HTTP d'erreur (ex. 401 clé invalide, 404 ville introuvable)
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || `Erreur HTTP ${res.status}`);
    }

    const data = await res.json();
    renderWeather(container, data, unitSymbol, locale);
  } catch (err) {
    renderError(container, `Météo indisponible : ${err.message}`);
  }
}

function renderWeather(container, data, unitSymbol, locale) {
  const mainGroup  = data.weather[0]?.main ?? 'Clear';
  const emoji      = WEATHER_EMOJIS[mainGroup] ?? '🌡️';
  const temp       = Math.round(data.main.temp);
  const condition  = data.weather[0]?.description ?? '';
  const humidity   = data.main.humidity;
  const city       = data.name;

  container.innerHTML = `
    <div class="weather__body">
      <div class="weather__city">${city}</div>
      <div class="weather__main">
        <span class="weather__icon">${emoji}</span>
        <span class="weather__temp">${temp}${unitSymbol}</span>
      </div>
      <div class="weather__condition">${condition}</div>
      <div class="weather__humidity">Humidité : <span>${humidity}%</span></div>
    </div>
  `;
}

function renderError(container, message) {
  container.innerHTML = `
    <div class="weather__error">
      <span>⚠️</span>
      <span>${message}</span>
    </div>
  `;
}
