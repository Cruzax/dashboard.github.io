// =============================================================
// quote.js — Widget Citation du Jour
// Source  : https://api.quotable.kurokeita.dev/api/quotes/random
// Traduction EN→FR : MyMemory (gratuit, sans clé)
// =============================================================

const STORAGE_KEY   = 'dashboard_quote_v2';
const QUOTE_API     = 'https://api.quotable.kurokeita.dev/api/quotes/random';
const TRANSLATE_API = 'https://api.mymemory.translated.net/get';

export function initQuote() {
  const textEl     = document.getElementById('quote-text');
  const authorEl   = document.getElementById('quote-author');
  const refreshBtn = document.getElementById('quote-refresh');
  if (!textEl || !authorEl || !refreshBtn) return;

  loadQuote(textEl, authorEl, false);

  refreshBtn.addEventListener('click', () => {
    animateSpin(refreshBtn);
    loadQuote(textEl, authorEl, true);
  });
}

async function loadQuote(textEl, authorEl, forceRefresh) {
  // Utilise le cache sauf si on force
  if (!forceRefresh) {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached) {
      try {
        const { content, author } = JSON.parse(cached);
        renderQuote(textEl, authorEl, content, author);
        return;
      } catch {
        // Cache corrompu — on refetch
      }
    }
  }

  // Affiche un état de chargement
  textEl.classList.remove('quote__error');
  textEl.textContent   = 'Chargement…';
  authorEl.textContent = '';

  try {
    // 1. Récupère la citation
    const quoteRes = await fetch(QUOTE_API);
    if (!quoteRes.ok) throw new Error(`API citation : HTTP ${quoteRes.status}`);
    const quoteData = await quoteRes.json();

    // Structure de la réponse : { data: { content, author: { name } } }
    const rawContent = quoteData?.data?.content;
    const author     = quoteData?.data?.author?.name ?? '—';
    if (!rawContent) throw new Error('Réponse API inattendue');

    // 2. Traduit EN → FR via MyMemory
    const translated = await translateToFrench(rawContent);

    // 3. Affiche et met en cache
    renderQuote(textEl, authorEl, translated, author);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ content: translated, author }));

  } catch (err) {
    renderError(textEl, authorEl, `Citation indisponible : ${err.message}`);
  }
}

// Traduit un texte anglais en français via MyMemory
async function translateToFrench(text) {
  try {
    const url = `${TRANSLATE_API}?q=${encodeURIComponent(text)}&langpair=en|fr`;
    const res  = await fetch(url);
    if (!res.ok) return text; // Fallback : texte original si la traduction échoue

    const data = await res.json();
    const translated = data?.responseData?.translatedText;

    // MyMemory renvoie parfois le texte original ou un message d'erreur
    if (!translated || translated.toUpperCase() === text.toUpperCase()) return text;
    return translated;
  } catch {
    return text; // Fallback silencieux
  }
}

function renderQuote(textEl, authorEl, content, author) {
  textEl.classList.remove('quote__error');
  textEl.textContent   = content;
  authorEl.textContent = author;
}

function renderError(textEl, authorEl, message) {
  textEl.classList.add('quote__error');
  textEl.textContent   = message;
  authorEl.textContent = '';
}

function animateSpin(btn) {
  btn.classList.remove('spinning');
  void btn.offsetWidth;
  btn.classList.add('spinning');
  btn.addEventListener('transitionend', () => btn.classList.remove('spinning'), { once: true });
}
