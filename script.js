/* ============================================================
   POMODORO RGB — script.js
   ============================================================ */
'use strict';

// ===== CONSTANTS =============================================

const CIRCUMFERENCE = 2 * Math.PI * 140; // ≈ 879.65

const PALETTES = [
  { name: 'Roxo RGB',      primary: '#7B2FBE', secondary: '#1A6DFF', accent: '#FF2D55' },
  { name: 'Azul Neon',     primary: '#1A6DFF', secondary: '#00E5FF', accent: '#FF6BF8' },
  { name: 'Vermelho Fogo', primary: '#FF2D55', secondary: '#FF8C00', accent: '#7B2FBE' },
  { name: 'Verde Matrix',  primary: '#00C97A', secondary: '#00B4D8', accent: '#FF2D55' },
  { name: 'Dourado',       primary: '#FFB800', secondary: '#FF6B35', accent: '#9B3FDE' },
  { name: 'Rosa Cyber',    primary: '#FF6BF8', secondary: '#9B3FDE', accent: '#00E5FF' },
];

const SOLID_GRADIENTS = [
  { name: 'Roxo Profundo',  css: 'linear-gradient(135deg,#0D0620 0%,#1A0A3D 50%,#0D1B4A 100%)' },
  { name: 'Azul Noturno',   css: 'linear-gradient(135deg,#030B1A 0%,#071628 50%,#071E45 100%)' },
  { name: 'Vazio Escuro',   css: 'linear-gradient(135deg,#0A0010 0%,#120020 50%,#000810 100%)' },
  { name: 'Brasa',          css: 'linear-gradient(135deg,#1A0505 0%,#2D0D0A 50%,#1A0820 100%)' },
  { name: 'Matrix',         css: 'linear-gradient(135deg,#010B05 0%,#031A0C 50%,#041A18 100%)' },
  { name: 'Nebulosa',       css: 'linear-gradient(135deg,#030210 0%,#0A0530 50%,#180520 100%)' },
];

const BG_IMAGES = {
  rpg: [
    { label: 'Floresta Mágica',  url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=75&fit=crop' },
    { label: 'Matrix Code',      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=75&fit=crop' },
    { label: 'Portal Arcano',    url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=75&fit=crop' },
    { label: 'Caverna Mística',  url: 'https://images.unsplash.com/photo-1505816014357-96b5ff457e9a?w=1920&q=75&fit=crop' },
    { label: 'Floresta Sombria', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=75&fit=crop' },
    { label: 'Neon Cidade',      url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1920&q=75&fit=crop' },
  ],
  nature: [
    { label: 'Alpes',            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=75&fit=crop' },
    { label: 'Lago Espelhado',   url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1920&q=75&fit=crop' },
    { label: 'Vale Verde',       url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=75&fit=crop' },
    { label: 'Aurora Boreal',    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=75&fit=crop' },
    { label: 'Cachoeira',        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1920&q=75&fit=crop' },
    { label: 'Montanha Névoa',   url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=75&fit=crop' },
  ],
  focus: [
    { label: 'Biblioteca',       url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=75&fit=crop' },
    { label: 'Galáxia',          url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=75&fit=crop' },
    { label: 'Mesa Zen',         url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=75&fit=crop' },
    { label: 'Nebulosa',         url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=75&fit=crop' },
    { label: 'Cidade Noturna',   url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=75&fit=crop' },
    { label: 'Escritório Neon',  url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1920&q=75&fit=crop' },
  ],
};

const QUOTES = [
  { text: 'Foco não é sobre fazer mais coisas. É sobre fazer as coisas certas.',           author: 'Warren Buffett' },
  { text: 'A disciplina é a ponte entre metas e conquistas.',                               author: 'Jim Rohn' },
  { text: 'O homem que move montanhas começa carregando pequenas pedras.',                  author: 'Confúcio' },
  { text: 'A persistência é o caminho do êxito.',                                           author: 'Charles Chaplin' },
  { text: 'Vença seus medos ou eles vencerão você.',                                        author: 'Mark Twain' },
  { text: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.',                 author: 'Robert Collier' },
  { text: 'Concentração é a raiz de toda capacidade do homem.',                             author: 'Ralph Waldo Emerson' },
  { text: 'Comece onde você está. Use o que você tem. Faça o que você pode.',               author: 'Arthur Ashe' },
  { text: 'A mente que se abre a uma nova ideia jamais volta ao seu tamanho original.',     author: 'Albert Einstein' },
  { text: 'O único jeito de fazer um ótimo trabalho é amar o que você faz.',               author: 'Steve Jobs' },
  { text: 'Sem disciplina, não há vida.',                                                   author: 'Fyodor Dostoevsky' },
  { text: 'A diferença entre o possível e o impossível está na determinação de uma pessoa.',author: 'Tommy Lasorda' },
  { text: 'Faça o que deve ser feito. Quando não sabe, pergunte-se em silêncio.',          author: 'Marcus Aurelius' },
  { text: 'Nada na vida deve ser temido, somente compreendido.',                            author: 'Marie Curie' },
  { text: 'Pense grande. Comece pequeno. Aja agora.',                                      author: 'Robin Sharma' },
];

// ===== STATE ================================================
let state = {
  mode: 'idle',           // idle | focus | paused | break | longBreak
  prevMode: null,
  intervalId: null,
  secondsLeft: 0,
  totalSeconds: 0,
  sessionsCompleted: 0,
  soundEnabled: true,
  themeColor: '#7B2FBE',
  themeSecondary: '#1A6DFF',
  themeAccent: '#FF2D55',
  currentBg: { type: 'solid', value: SOLID_GRADIENTS[0].css },
  currentBgCat: 'solid',
  overlayOpacity: 50,
  quoteIndex: 0,
  config: {
    focus: 25,
    break: 5,
    longBreak: 15,
    sessionsUntilLong: 4,
  },
};

// ===== DOM CACHE ============================================
const D = {};

function cacheDOM() {
  const g = id => document.getElementById(id);
  D.bgLayer         = g('bg-layer');
  D.bgOverlay       = g('bg-overlay');
  D.canvas          = g('particles-canvas');
  D.btnColor        = g('btn-color');
  D.btnBg           = g('btn-bg');
  D.btnSound        = g('btn-sound');
  D.soundIcon       = g('sound-icon');
  D.dropColor       = g('dropdown-color');
  D.dropBg          = g('dropdown-bg');
  D.paletteGrid     = g('palette-grid');
  D.customColor     = g('custom-color');
  D.bgTabs          = document.querySelectorAll('.bg-tab');
  D.bgGallery       = g('bg-gallery');
  D.uploadZone      = g('upload-zone');
  D.bgUploadInput   = g('bg-upload-input');
  D.overlaySlider   = g('overlay-slider');
  D.overlayPct      = g('overlay-pct');
  D.modeLabel       = g('mode-label');
  D.sessionNum      = g('session-num');
  D.sessionTotal    = g('session-total');
  D.ringFill        = g('ring-fill');
  D.gradStop0       = g('grad-stop-0');
  D.gradStop1       = g('grad-stop-1');
  D.gradStop2       = g('grad-stop-2');
  D.timerTime       = g('timer-time');
  D.timerSub        = g('timer-sub');
  D.btnStart        = g('btn-start');
  D.btnReset        = g('btn-reset');
  D.btnSkip         = g('btn-skip');
  D.configPanel     = g('config-panel');
  D.cfgFocus        = g('cfg-focus');
  D.cfgBreak        = g('cfg-break');
  D.cfgLongBreak    = g('cfg-longBreak');
  D.cfgSessions     = g('cfg-sessionsUntilLong');
  D.sessionDots     = g('session-dots');
  D.totalSessions   = g('total-sessions');
  D.quoteContent    = g('quote-content');
  D.quoteText       = g('quote-text');
  D.quoteAuthor     = g('quote-author');
  D.modalBackdrop   = g('modal-backdrop');
  D.modalEmoji      = g('modal-emoji');
  D.modalTitle      = g('modal-title');
  D.modalMsg        = g('modal-msg');
  D.modalCta        = g('modal-cta');
}

// ===== AUDIO ================================================
let _audioCtx = null;

function getAudioCtx() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!_audioCtx || _audioCtx.state === 'closed') _audioCtx = new AC();
  if (_audioCtx.state === 'suspended') _audioCtx.resume();
  return _audioCtx;
}

/** Tibetan bowl — soothing end-of-focus sound */
function playFocusAlarm() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioCtx();
    [[432, 0.40], [648, 0.20], [864, 0.10], [1080, 0.05]].forEach(([freq, vol]) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = ctx.currentTime;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(vol, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 4);
      osc.start(t);
      osc.stop(t + 4.1);
    });
  } catch (e) { /* audio blocked — ignore */ }
}

/** Rising chime C5→E5→G5→C6 — energising break-end sound */
function playBreakAlarm() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioCtx();
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.14;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.38, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
      osc.start(t);
      osc.stop(t + 0.7);
    });
  } catch (e) { /* audio blocked */ }
}

/** Subtle click on start */
function playClick() {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioCtx();
    const buf  = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.04), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.007));
    }
    const src  = ctx.createBufferSource();
    const gain = ctx.createGain();
    src.buffer = buf;
    gain.gain.value = 0.14;
    src.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  } catch (e) { /* audio blocked */ }
}

// ===== TIMER LOGIC ==========================================

function secondsForMode(mode) {
  if (mode === 'focus')     return state.config.focus * 60;
  if (mode === 'longBreak') return state.config.longBreak * 60;
  return state.config.break * 60;
}

function startTimer() {
  if (state.mode === 'idle') {
    state.mode = 'focus';
    state.secondsLeft  = secondsForMode('focus');
    state.totalSeconds = state.secondsLeft;
    playClick();
  } else if (state.mode === 'paused') {
    state.mode = state.prevMode;
  }
  clearInterval(state.intervalId);
  state.intervalId = setInterval(tick, 1000);
  document.body.classList.add('is-running');
  updateAll();
  D.configPanel.classList.add('disabled');
}

function pauseTimer() {
  if (state.mode === 'idle' || state.mode === 'paused') return;
  clearInterval(state.intervalId);
  document.body.classList.remove('is-running');
  state.prevMode = state.mode;
  state.mode = 'paused';
  updateAll();
}

function resetTimer() {
  clearInterval(state.intervalId);
  document.body.classList.remove('is-running');
  state.mode        = 'idle';
  state.prevMode    = null;
  state.secondsLeft = state.config.focus * 60;
  state.totalSeconds = state.secondsLeft;
  D.configPanel.classList.remove('disabled');
  updateAll();
}

function skipCurrentPhase() {
  if (state.mode === 'idle') return;
  clearInterval(state.intervalId);
  state.secondsLeft = 0;
  onTimerEnd();
}

function tick() {
  if (state.secondsLeft <= 0) {
    clearInterval(state.intervalId);
    onTimerEnd();
    return;
  }
  state.secondsLeft--;
  updateDisplay();
  updateRing();
}

function onTimerEnd() {
  document.body.classList.remove('is-running');

  if (state.mode === 'focus') {
    state.sessionsCompleted++;
    D.totalSessions.textContent = state.sessionsCompleted;
    playFocusAlarm();

    const isLong = (state.sessionsCompleted % state.config.sessionsUntilLong) === 0;
    state.mode = isLong ? 'longBreak' : 'break';
    showModal('focusDone', isLong);

  } else if (state.mode === 'break' || state.mode === 'longBreak') {
    playBreakAlarm();
    state.mode = 'focus';
    showModal('breakDone');
  }

  updateAll();
  updateSessionDots();
  saveState();
}

function continueTimer() {
  hideModal();
  state.secondsLeft  = secondsForMode(state.mode);
  state.totalSeconds = state.secondsLeft;
  clearInterval(state.intervalId);
  state.intervalId   = setInterval(tick, 1000);
  document.body.classList.add('is-running');
  updateAll();
}

// ===== UI UPDATES ===========================================

function updateAll() {
  updateDisplay();
  updateRing();
  updateModeBadge();
  updateStartButton();
  updateSessionDots();
}

function updateDisplay() {
  const mins = String(Math.floor(state.secondsLeft / 60)).padStart(2, '0');
  const secs = String(state.secondsLeft % 60).padStart(2, '0');
  D.timerTime.textContent = `${mins}:${secs}`;
  D.timerSub.textContent  = getModeSub();
  document.title = state.mode !== 'idle'
    ? `${mins}:${secs} — ${getModeLabel()} | Pomodoro RGB`
    : 'Pomodoro RGB — Foco Total';
}

function updateRing() {
  const progress = state.totalSeconds > 0 ? state.secondsLeft / state.totalSeconds : 1;
  const offset   = CIRCUMFERENCE * (1 - progress);
  D.ringFill.style.strokeDashoffset = offset;
}

function getModeLabel() {
  return { idle: 'READY', focus: 'FOCUS', paused: 'PAUSE', break: 'BREAK', longBreak: 'LONG BREAK' }[state.mode] || 'READY';
}

function getModeSub() {
  return {
    idle:      'pronto para começar',
    focus:     'em foco — keep going! 🔥',
    paused:    'pausado — pausado',
    break:     'descansando — you earned it! ☕',
    longBreak: 'pausa longa — relax! 😌',
  }[state.mode] || 'pronto';
}

function updateModeBadge() {
  D.modeLabel.textContent   = getModeLabel();
  D.sessionNum.textContent  = state.sessionsCompleted + 1;
  D.sessionTotal.textContent = state.config.sessionsUntilLong;
}

function updateStartButton() {
  const { mode } = state;
  const icons = {
    play:  `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>`,
    pause: `<svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>`,
  };
  if (mode === 'idle')   D.btnStart.innerHTML = `${icons.play} Iniciar`;
  else if (mode === 'paused') D.btnStart.innerHTML = `${icons.play} Retomar`;
  else                   D.btnStart.innerHTML = `${icons.pause} Pausar`;
}

function updateSessionDots() {
  const total     = state.config.sessionsUntilLong;
  const completed = state.sessionsCompleted % total;
  D.sessionDots.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('div');
    dot.className = 's-dot';
    if (i < completed)                             dot.classList.add('done');
    if (i === completed && state.mode === 'focus') dot.classList.add('active');
    D.sessionDots.appendChild(dot);
  }
}

// ===== MODAL ================================================

function showModal(type, isLong) {
  if (type === 'focusDone') {
    D.modalEmoji.textContent = isLong ? '🏆' : '✅';
    D.modalTitle.textContent = isLong ? 'Ciclo Completo!' : 'Sessão Completa!';
    D.modalMsg.textContent   = isLong
      ? 'Incrível! Você completou um ciclo inteiro. Hora de uma pausa longa e merecida!'
      : 'Ótimo trabalho! Faça uma pausa rápida e volte mais forte!';
  } else {
    D.modalEmoji.textContent = '⚡';
    D.modalTitle.textContent = 'Hora de Focar!';
    D.modalMsg.textContent   = 'A pausa acabou — hora de voltar ao modo foco. Você consegue!';
  }
  D.modalBackdrop.style.display = 'flex';
}

function hideModal() {
  D.modalBackdrop.style.display = 'none';
}

// ===== QUOTES ===============================================
let _quoteInterval = null;

function rotateQuote(next = false) {
  if (next) state.quoteIndex = (state.quoteIndex + 1) % QUOTES.length;
  const q = QUOTES[state.quoteIndex];
  D.quoteContent.classList.add('fading');
  setTimeout(() => {
    D.quoteText.textContent   = `"${q.text}"`;
    D.quoteAuthor.textContent = `— ${q.author}`;
    D.quoteContent.classList.remove('fading');
  }, 420);
}

function startQuoteRotation() {
  rotateQuote();
  _quoteInterval = setInterval(() => rotateQuote(true), 30000);
}

// ===== PARTICLES ============================================
function initParticles() {
  const canvas = D.canvas;
  const ctx    = canvas.getContext('2d');

  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const pts = Array.from({ length: 55 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    a: Math.random() * 0.35 + 0.08,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const hex = state.themeColor || '#7B2FBE';
    const alpha255 = n => Math.min(255, Math.floor(n * 255)).toString(16).padStart(2, '0');

    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = hex + alpha255(p.a);
      ctx.fill();
      p.x = (p.x + p.vx + canvas.width)  % canvas.width;
      p.y = (p.y + p.vy + canvas.height) % canvas.height;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ===== COLOR THEME ==========================================

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function setTheme(primary, secondary, accent) {
  secondary = secondary || '#1A6DFF';
  accent    = accent    || '#FF2D55';

  const root = document.documentElement;
  root.style.setProperty('--primary',       primary);
  root.style.setProperty('--primary-rgb',   hexToRgb(primary));
  root.style.setProperty('--secondary',     secondary);
  root.style.setProperty('--secondary-rgb', hexToRgb(secondary));
  root.style.setProperty('--accent',        accent);
  root.style.setProperty('--accent-rgb',    hexToRgb(accent));

  // Update SVG gradient stops directly (CSS vars don't work in SVG presentation attrs)
  D.gradStop0.setAttribute('stop-color', primary);
  D.gradStop1.setAttribute('stop-color', secondary);
  D.gradStop2.setAttribute('stop-color', accent);

  state.themeColor     = primary;
  state.themeSecondary = secondary;
  state.themeAccent    = accent;
}

function buildPaletteGrid() {
  D.paletteGrid.innerHTML = '';
  PALETTES.forEach(p => {
    const btn = document.createElement('button');
    btn.className   = 'palette-dot';
    btn.style.background = p.primary;
    btn.title       = p.name;
    if (p.primary === state.themeColor) btn.classList.add('active');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.palette-dot').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setTheme(p.primary, p.secondary, p.accent);
      D.customColor.value = p.primary;
      saveState();
    });
    D.paletteGrid.appendChild(btn);
  });
}

// ===== BACKGROUND ===========================================

function renderBgGallery(cat) {
  D.bgGallery.innerHTML = '';

  const items = cat === 'solid' ? SOLID_GRADIENTS : (BG_IMAGES[cat] || []);

  items.forEach(item => {
    const thumb = document.createElement('div');
    thumb.className = 'bg-thumb';

    const label = document.createElement('div');
    label.className = 'bg-thumb-label';
    label.textContent = item.name || item.label;

    if (cat === 'solid') {
      const inner = document.createElement('div');
      inner.className = 'bg-thumb-solid';
      inner.style.background = item.css;
      thumb.appendChild(inner);
      thumb.addEventListener('click', () => {
        document.querySelectorAll('.bg-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        applyBg({ type: 'solid', value: item.css });
      });
    } else {
      const img = document.createElement('img');
      img.src     = item.url;
      img.alt     = item.label;
      img.loading = 'lazy';
      thumb.appendChild(img);
      thumb.addEventListener('click', () => {
        document.querySelectorAll('.bg-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        applyBg({ type: 'image', value: item.url });
      });
    }

    thumb.appendChild(label);
    D.bgGallery.appendChild(thumb);
  });
}

function applyBg(bg) {
  state.currentBg = bg;
  if (bg.type === 'solid') {
    D.bgLayer.style.backgroundImage = bg.value;
    D.bgLayer.style.backgroundSize  = 'auto';
  } else {
    D.bgLayer.style.backgroundImage    = `url('${bg.value}')`;
    D.bgLayer.style.backgroundSize     = 'cover';
    D.bgLayer.style.backgroundPosition = 'center';
    D.bgLayer.style.backgroundAttachment = 'fixed';
  }
  saveState();
}

function applyOverlay(val) {
  D.bgOverlay.style.background = `rgba(10, 8, 18, ${val / 100})`;
}

function initBgGallery() {
  renderBgGallery('solid');

  D.bgTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      D.bgTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      state.currentBgCat = cat;

      if (cat === 'upload') {
        D.bgGallery.style.display  = 'none';
        D.uploadZone.style.display = 'block';
      } else {
        D.bgGallery.style.display  = 'grid';
        D.uploadZone.style.display = 'none';
        renderBgGallery(cat);
      }
    });
  });

  D.bgUploadInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => applyBg({ type: 'image', value: ev.target.result });
    reader.readAsDataURL(file);
  });
}

// ===== DROPDOWNS ============================================

function openDropdown(el) {
  closeDropdowns();
  el.classList.add('open');
}

function closeDropdowns() {
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
}

// ===== LOCAL STORAGE ========================================
const LS_KEY = 'pomodoro-rgb-v2';

function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      config:          state.config,
      themeColor:      state.themeColor,
      themeSecondary:  state.themeSecondary,
      themeAccent:     state.themeAccent,
      currentBg:       state.currentBg,
      overlayOpacity:  state.overlayOpacity,
      soundEnabled:    state.soundEnabled,
      sessionsCompleted: state.sessionsCompleted,
      quoteIndex:      state.quoteIndex,
    }));
  } catch (e) { /* storage full or private mode */ }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY));
    if (!saved) return;
    if (saved.config)                               state.config             = { ...state.config, ...saved.config };
    if (saved.themeColor)                           state.themeColor         = saved.themeColor;
    if (saved.themeSecondary)                       state.themeSecondary     = saved.themeSecondary;
    if (saved.themeAccent)                          state.themeAccent        = saved.themeAccent;
    if (saved.currentBg)                            state.currentBg          = saved.currentBg;
    if (typeof saved.overlayOpacity === 'number')   state.overlayOpacity     = saved.overlayOpacity;
    if (typeof saved.soundEnabled   === 'boolean')  state.soundEnabled       = saved.soundEnabled;
    if (typeof saved.sessionsCompleted === 'number') state.sessionsCompleted = saved.sessionsCompleted;
    if (typeof saved.quoteIndex === 'number')        state.quoteIndex        = saved.quoteIndex;
  } catch (e) { /* corrupt data */ }
}

function applyLoadedState() {
  // Config inputs
  D.cfgFocus.value    = state.config.focus;
  D.cfgBreak.value    = state.config.break;
  D.cfgLongBreak.value = state.config.longBreak;
  D.cfgSessions.value = state.config.sessionsUntilLong;

  // Theme
  setTheme(state.themeColor, state.themeSecondary, state.themeAccent);
  D.customColor.value = state.themeColor;

  // Background
  applyBg(state.currentBg || { type: 'solid', value: SOLID_GRADIENTS[0].css });

  // Overlay
  D.overlaySlider.value      = state.overlayOpacity;
  D.overlayPct.textContent   = `${state.overlayOpacity}%`;
  applyOverlay(state.overlayOpacity);

  // Sound
  D.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';

  // Sessions counter
  D.totalSessions.textContent = state.sessionsCompleted;

  // Initial timer
  state.secondsLeft  = state.config.focus * 60;
  state.totalSeconds = state.secondsLeft;
}

// ===== EVENT LISTENERS ======================================

function bindEvents() {

  // --- Timer controls ---
  D.btnStart.addEventListener('click', () => {
    if (state.mode === 'idle' || state.mode === 'paused') startTimer();
    else pauseTimer();
  });

  D.btnReset.addEventListener('click', () => {
    resetTimer();
    saveState();
  });

  D.btnSkip.addEventListener('click', skipCurrentPhase);

  // --- Sound toggle ---
  D.btnSound.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    D.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
    saveState();
  });

  // --- Dropdown toggles ---
  D.btnColor.addEventListener('click', e => {
    e.stopPropagation();
    D.dropColor.classList.contains('open') ? closeDropdowns() : openDropdown(D.dropColor);
  });

  D.btnBg.addEventListener('click', e => {
    e.stopPropagation();
    D.dropBg.classList.contains('open') ? closeDropdowns() : openDropdown(D.dropBg);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.ctrl-wrap')) closeDropdowns();
  });

  // Stop propagation inside dropdowns so clicking inside doesn't close them
  D.dropColor.addEventListener('click', e => e.stopPropagation());
  D.dropBg.addEventListener('click', e => e.stopPropagation());

  // --- Custom color picker ---
  D.customColor.addEventListener('input', e => {
    setTheme(e.target.value, state.themeSecondary, state.themeAccent);
    document.querySelectorAll('.palette-dot').forEach(b => b.classList.remove('active'));
    saveState();
  });

  // --- Overlay slider ---
  D.overlaySlider.addEventListener('input', e => {
    const val = parseInt(e.target.value);
    state.overlayOpacity = val;
    D.overlayPct.textContent = `${val}%`;
    applyOverlay(val);
    saveState();
  });

  // --- Number +/− buttons ---
  document.querySelectorAll('.num-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const field   = btn.dataset.field;
      const delta   = parseInt(btn.dataset.delta);
      const inputEl = document.getElementById(`cfg-${field}`);
      if (!inputEl) return;
      let val = parseInt(inputEl.value) + delta;
      val = Math.max(parseInt(inputEl.min || 1), Math.min(parseInt(inputEl.max || 120), val));
      inputEl.value = val;
      state.config[field] = val;
      onConfigChange(field);
    });
  });

  // --- Direct input changes ---
  ['cfg-focus', 'cfg-break', 'cfg-longBreak', 'cfg-sessionsUntilLong'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', () => {
      const field = id.replace('cfg-', '');
      let val = parseInt(el.value);
      val = Math.max(parseInt(el.min || 1), Math.min(parseInt(el.max || 120), val));
      el.value = val;
      state.config[field] = val;
      onConfigChange(field);
    });
  });

  // --- Modal ---
  D.modalCta.addEventListener('click', continueTimer);
  D.modalBackdrop.addEventListener('click', e => {
    if (e.target === D.modalBackdrop) continueTimer();
  });

  // --- Keyboard shortcuts ---
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.code === 'Space') {
      e.preventDefault();
      if (D.modalBackdrop.style.display !== 'none') { continueTimer(); return; }
      if (state.mode === 'idle' || state.mode === 'paused') startTimer();
      else pauseTimer();
    }
    if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey) resetTimer();
    if (e.code === 'KeyS' && !e.ctrlKey && !e.metaKey) skipCurrentPhase();
  });
}

function onConfigChange(field) {
  if ((field === 'focus') && (state.mode === 'idle')) {
    state.secondsLeft  = state.config.focus * 60;
    state.totalSeconds = state.secondsLeft;
    updateDisplay();
    updateRing();
  }
  if (field === 'sessionsUntilLong') {
    updateSessionDots();
    D.sessionTotal.textContent = state.config.sessionsUntilLong;
  }
  saveState();
}

// ===== INIT =================================================

function init() {
  cacheDOM();
  loadState();
  applyLoadedState();
  buildPaletteGrid();
  initBgGallery();
  initParticles();
  bindEvents();
  startQuoteRotation();
  updateAll();
}

document.addEventListener('DOMContentLoaded', init);

