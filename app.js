'use strict';

// Sub-channel sizes (EEPA, EEPB) come from eep.js: ETSI EN 300 401 V2.1.1, clause 6.2.1, tables 9 and 10.

// Indicative quality bands (editorial, not part of the ETSI standard).
const QUALITY = [
  {max:40,   key:'q1', cls:'q1'},
  {max:72,   key:'q2', cls:'q2'},
  {max:112,  key:'q3', cls:'q3'},
  {max:9999, key:'q4', cls:'q4'}
];
function getQ(br){ return QUALITY.find(q => br <= q.max) || QUALITY[3]; }

const I18N = {
  it: {
    title: 'DAB+ · Calcolatore CU ↔ Bitrate',
    description: 'Calcolatore bidirezionale Capacity Units / Bitrate per DAB+ secondo ETSI EN 300 401',
    chip: 'Calcolatore',
    subtitle: 'Conversione bidirezionale Capacity Units / Bitrate secondo ETSI EN 300 401',
    langLabel: 'Lingua',
    install: 'Installa app',
    iosHint: 'Tocca Condividi → Aggiungi alla schermata Home',
    close: 'Chiudi',
    profile: 'Profilo EEP',
    direction: 'Direzione',
    dirCu: 'CU → Bitrate',
    dirBr: 'Bitrate → CU',
    protection: 'Livello di protezione',
    cuAssigned: 'CU assegnate',
    brTarget: 'Bitrate target',
    resBitrate: 'Bitrate risultante',
    resCu: 'CU richieste',
    tableLabel: 'Tabella completa — protezione selezionata',
    thBitrate: 'Bitrate (kbps)',
    thCu: 'CU richieste',
    thQuality: 'Qualità (indicativa)',
    thUse: 'Uso tipico',
    note: 'Valori CU da ETSI EN 300 401 V2.1.1, tabelle 9 (EEP-A) e 10 (EEP-B). Qualità e uso tipico sono solo indicativi.',
    q1: 'Bassa',  u1: 'Dati, parlato mono',
    q2: 'Media',  u2: 'News, parlato stereo',
    q3: 'Buona',  u3: 'Musica generalista',
    q4: 'Ottima', u4: 'Musica hi-fi / premium',
    "help": "Come funziona",
    "helpTitle": "Come funziona",
    "langLabel2": "Lingua",
    "hWhat": "Cosa fa",
    "pWhat": "Converte tra la dimensione di un sottocanale DAB+ in Capacity Unit (CU) e il suo bitrate, per i due profili Equal Error Protection di ETSI EN 300 401.",
    "hFormulas": "Formule",
    "fA": "EEP-A (tabella 9): bitrate 8n kbit/s. Dimensione 12n CU (1-A), 8n (2-A), 6n (3-A), 4n (4-A), con n intero ≥ 1.",
    "fB": "EEP-B (tabella 10): bitrate 32n kbit/s. Dimensione 27n CU (1-B), 21n (2-B), 18n (3-B), 15n (4-B), con n intero ≥ 1.",
    "fC": "Una trama di multiplex DAB ha 864 CU da 64 bit: un sottocanale deve starci dentro.",
    "hRange": "Valori mostrati",
    "pRange": "Le tabelle elencano 8–192 kbit/s per EEP-A e 32–192 kbit/s per EEP-B, l'intervallo usato dai servizi DAB+; lo standard ammette qualsiasi n ≥ 1 che stia in 864 CU. Qualità e uso tipico sono indicazioni editoriali e non fanno parte dello standard.",
    "hValid": "Validazione (verificata a settembre 2026)",
    "v1": "Ogni valore coincide con le formule delle tabelle 9 e 10 (test automatico) e rispetta CU × 64 bit = bit netti per trama da 24 ms ÷ rate di codifica.",
    "v2": "Formule lette in ETSI EN 300 401 V2.1.1 (2017-01), clausola 6.2.1. La bozza V2.2.1 (2026-02) ha tabelle identiche.",
    "v3": "Non validato: una configurazione reale di multiplexer. Non è uno strumento certificato.",
    "hSources": "Fonti",
    "src1": "ETSI EN 300 401 V2.1.1 (2017-01), clausola 6.2.1",
    "src2": "Bozza ETSI EN 300 401 V2.2.1 (2026-02): stesse tabelle",
    "hInstall": "Installa come app",
    "pInstall": "Il calcolatore si può installare come una normale app su computer, smartphone e tablet. Si apre poi in una finestra tutta sua e funziona offline.",
    "i1": "Chrome, Edge e altri browser Chromium (computer, Android): premi «Installa app» in alto, oppure usa l'icona di installazione nella barra degli indirizzi o nel menu del browser.",
    "i2": "iPhone e iPad (Safari): tocca il pulsante Condividi, poi «Aggiungi alla schermata Home».",
    "i3": "Safari su Mac (macOS Sonoma o successivo): menu File, poi «Aggiungi al Dock».",
    "i4": "Alcuni browser (ad esempio Firefox su computer) non offrono l'installazione. L'app funziona comunque in una scheda e resta disponibile offline dopo la prima visita.",
    "hPrivacy": "Lingua e privacy",
    "pPrivacy": "L'app si apre sempre in inglese; cambia la lingua in alto e la scelta viene ricordata su questo dispositivo. Tutto gira nel tuo browser e nulla viene inviato altrove.",
    "updateMsg": "È pronta una nuova versione.",
    "updateReload": "Ricarica",
    "updateLater": "Più tardi"
  },
  en: {
    title: 'DAB+ · CU ↔ Bitrate Calculator',
    description: 'Two-way Capacity Units / bitrate calculator for DAB+ according to ETSI EN 300 401',
    chip: 'Calculator',
    subtitle: 'Two-way Capacity Units / bitrate conversion according to ETSI EN 300 401',
    langLabel: 'Language',
    install: 'Install app',
    iosHint: 'Tap Share → Add to Home Screen',
    close: 'Close',
    profile: 'EEP profile',
    direction: 'Direction',
    dirCu: 'CU → Bitrate',
    dirBr: 'Bitrate → CU',
    protection: 'Protection level',
    cuAssigned: 'Assigned CU',
    brTarget: 'Target bitrate',
    resBitrate: 'Resulting bitrate',
    resCu: 'Required CU',
    tableLabel: 'Full table — selected protection level',
    thBitrate: 'Bitrate (kbps)',
    thCu: 'Required CU',
    thQuality: 'Quality (indicative)',
    thUse: 'Typical use',
    note: 'CU values from ETSI EN 300 401 V2.1.1, tables 9 (EEP-A) and 10 (EEP-B). Quality and typical use are indicative only.',
    q1: 'Low',       u1: 'Data, mono speech',
    q2: 'Medium',    u2: 'News, stereo speech',
    q3: 'Good',      u3: 'General music',
    q4: 'Excellent', u4: 'Hi-fi / premium music',
    "help": "How it works",
    "helpTitle": "How it works",
    "langLabel2": "Language",
    "hWhat": "What it does",
    "pWhat": "Converts between the size of a DAB+ sub-channel in Capacity Units (CU) and its bit rate, for the two Equal Error Protection profiles of ETSI EN 300 401.",
    "hFormulas": "Formulas",
    "fA": "EEP-A (table 9): bit rate 8n kbit/s. Size 12n CU (1-A), 8n (2-A), 6n (3-A), 4n (4-A), with n an integer ≥ 1.",
    "fB": "EEP-B (table 10): bit rate 32n kbit/s. Size 27n CU (1-B), 21n (2-B), 18n (3-B), 15n (4-B), with n an integer ≥ 1.",
    "fC": "A DAB multiplex frame has 864 CU of 64 bits each: a sub-channel must fit in it.",
    "hRange": "Values shown",
    "pRange": "The tables list 8–192 kbit/s for EEP-A and 32–192 kbit/s for EEP-B, the range used for DAB+ services; the standard allows any n ≥ 1 that fits in 864 CU. Quality and typical use are editorial guidance and are not part of the standard.",
    "hValid": "Validation (checked September 2026)",
    "v1": "Every value equals the formulas of tables 9 and 10 (automated test), and satisfies CU × 64 bits = net bits per 24 ms frame ÷ coding rate.",
    "v2": "Formulas read in ETSI EN 300 401 V2.1.1 (2017-01), clause 6.2.1. The draft V2.2.1 (2026-02) has identical tables.",
    "v3": "Not validated: a real multiplexer configuration. Not a certified tool.",
    "hSources": "Sources",
    "src1": "ETSI EN 300 401 V2.1.1 (2017-01), clause 6.2.1",
    "src2": "Draft ETSI EN 300 401 V2.2.1 (2026-02): same tables",
    "hInstall": "Install as an app",
    "pInstall": "The calculator can be installed like a normal app on computer, phone and tablet. It then opens in its own window and works offline.",
    "i1": "Chrome, Edge and other Chromium browsers (computer, Android): press “Install app” at the top, or use the install icon in the address bar or the browser menu.",
    "i2": "iPhone and iPad (Safari): tap the Share button, then “Add to Home Screen”.",
    "i3": "Safari on Mac (macOS Sonoma or later): File menu, then “Add to Dock”.",
    "i4": "Some browsers (for example Firefox on computer) do not offer installation. The app still works in a tab and stays available offline after the first visit.",
    "hPrivacy": "Language and privacy",
    "pPrivacy": "The app always opens in English; change the language at the top and the choice is remembered on this device. Everything runs in your browser and nothing is sent anywhere.",
    "updateMsg": "A new version is ready.",
    "updateReload": "Reload",
    "updateLater": "Later"
  },
  es: {
    "title": "DAB+ · Calculadora CU ↔ Bitrate",
    "description": "Calculadora bidireccional Capacity Units / bitrate para DAB+ según ETSI EN 300 401",
    "chip": "Calculadora",
    "subtitle": "Conversión bidireccional Capacity Units / bitrate según ETSI EN 300 401",
    "langLabel": "Idioma",
    "install": "Instalar app",
    "iosHint": "Toca Compartir → Añadir a pantalla de inicio",
    "close": "Cerrar",
    "profile": "Perfil EEP",
    "direction": "Dirección",
    "dirCu": "CU → Bitrate",
    "dirBr": "Bitrate → CU",
    "protection": "Nivel de protección",
    "cuAssigned": "CU asignadas",
    "brTarget": "Bitrate objetivo",
    "resBitrate": "Bitrate resultante",
    "resCu": "CU necesarias",
    "tableLabel": "Tabla completa — protección seleccionada",
    "thBitrate": "Bitrate (kbps)",
    "thCu": "CU necesarias",
    "thQuality": "Calidad (orientativa)",
    "thUse": "Uso típico",
    "note": "Valores CU de ETSI EN 300 401 V2.1.1, tablas 9 (EEP-A) y 10 (EEP-B). Calidad y uso típico son solo orientativos.",
    "q1": "Baja",
    "u1": "Datos, voz mono",
    "q2": "Media",
    "u2": "Noticias, voz estéreo",
    "q3": "Buena",
    "u3": "Música general",
    "q4": "Excelente",
    "u4": "Música hi-fi / premium",
    "help": "Cómo funciona",
    "helpTitle": "Cómo funciona",
    "langLabel2": "Idioma",
    "hWhat": "Qué hace",
    "pWhat": "Convierte entre el tamaño de un subcanal DAB+ en Capacity Units (CU) y su bitrate, para los dos perfiles Equal Error Protection de ETSI EN 300 401.",
    "hFormulas": "Fórmulas",
    "fA": "EEP-A (tabla 9): bitrate 8n kbit/s. Tamaño 12n CU (1-A), 8n (2-A), 6n (3-A), 4n (4-A), con n entero ≥ 1.",
    "fB": "EEP-B (tabla 10): bitrate 32n kbit/s. Tamaño 27n CU (1-B), 21n (2-B), 18n (3-B), 15n (4-B), con n entero ≥ 1.",
    "fC": "Una trama de multiplex DAB tiene 864 CU de 64 bits: un subcanal debe caber en ella.",
    "hRange": "Valores mostrados",
    "pRange": "Las tablas muestran 8–192 kbit/s para EEP-A y 32–192 kbit/s para EEP-B, el rango usado por los servicios DAB+; el estándar admite cualquier n ≥ 1 que quepa en 864 CU. Calidad y uso típico son orientaciones editoriales y no forman parte del estándar.",
    "hValid": "Validación (comprobada en septiembre de 2026)",
    "v1": "Cada valor coincide con las fórmulas de las tablas 9 y 10 (prueba automática) y cumple CU × 64 bits = bits netos por trama de 24 ms ÷ tasa de codificación.",
    "v2": "Fórmulas leídas en ETSI EN 300 401 V2.1.1 (2017-01), cláusula 6.2.1. El borrador V2.2.1 (2026-02) tiene tablas idénticas.",
    "v3": "No validado: una configuración real de multiplexor. No es una herramienta certificada.",
    "hSources": "Fuentes",
    "src1": "ETSI EN 300 401 V2.1.1 (2017-01), cláusula 6.2.1",
    "src2": "Borrador ETSI EN 300 401 V2.2.1 (2026-02): mismas tablas",
    "hInstall": "Instalar como app",
    "pInstall": "La calculadora se puede instalar como una app normal en ordenador, móvil y tableta. Después se abre en su propia ventana y funciona sin conexión.",
    "i1": "Chrome, Edge y otros navegadores Chromium (ordenador, Android): pulsa «Instalar app» arriba, o usa el icono de instalación de la barra de direcciones o el menú del navegador.",
    "i2": "iPhone y iPad (Safari): toca el botón Compartir y luego «Añadir a pantalla de inicio».",
    "i3": "Safari en Mac (macOS Sonoma o posterior): menú Archivo y luego «Añadir al Dock».",
    "i4": "Algunos navegadores (por ejemplo Firefox en ordenador) no ofrecen la instalación. La app funciona igualmente en una pestaña y sigue disponible sin conexión tras la primera visita.",
    "hPrivacy": "Idioma y privacidad",
    "pPrivacy": "La app siempre se abre en inglés; cambia el idioma arriba y la elección se recuerda en este dispositivo. Todo se ejecuta en tu navegador y no se envía nada.",
    "updateMsg": "Hay una nueva versión lista.",
    "updateReload": "Recargar",
    "updateLater": "Luego"
  }
};

const LANG_KEY = 'com.onairgarage.dabcalculator.lang';

// Always opens in English; only a choice made by hand is remembered.
function loadLang(){
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && I18N[saved]) return saved;
  } catch (e) {}
  return 'en';
}

const VERSION = '2026.9.1';
let lang = loadLang();
let mode = 'A', dir = 'cu';

const $ = id => document.getElementById(id);
function t(key){ return I18N[lang][key]; }

function esc(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function applyLang(){
  document.documentElement.lang = lang;
  document.title = t('title');
  document.querySelector('meta[name="description"]').setAttribute('content', t('description'));
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  $('lang-switch').setAttribute('aria-label', t('langLabel'));
  ['en', 'it', 'es'].forEach(l => {
    $('btn-' + l).classList.toggle('on', lang === l);
    $('btn-' + l).setAttribute('aria-pressed', String(lang === l));
  });
}
function setLang(l){
  lang = l;
  try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
  applyLang(); render();
}

function currentTable(){
  return (mode === 'A' ? EEPA : EEPB)[$('prot-sel').value];
}
function entries(){
  return Object.entries(currentTable()).map(([br,cu])=>({br:parseInt(br,10),cu})).sort((a,b)=>a.br-b.br);
}
function setToggle(onId, offId){
  $(onId).classList.add('on');  $(onId).setAttribute('aria-pressed', 'true');
  $(offId).classList.remove('on'); $(offId).setAttribute('aria-pressed', 'false');
}
function setMode(m){
  mode = m;
  m === 'A' ? setToggle('btn-a','btn-b') : setToggle('btn-b','btn-a');
  buildProtSel(); buildInputSel(); render();
}
function setDir(d){
  dir = d;
  d === 'cu' ? setToggle('btn-cu','btn-br') : setToggle('btn-br','btn-cu');
  $('input-cu-wrap').hidden = d !== 'cu';
  $('input-br-wrap').hidden = d !== 'br';
  buildInputSel(); render();
}
function fillSelect(sel, items, cur){
  sel.innerHTML = items.map(i=>`<option value="${esc(i.value)}"${i.value===cur?' selected':''}>${esc(i.label)}</option>`).join('');
}
function buildProtSel(){
  const sel=$('prot-sel'), cur=sel.value;
  const opts=mode==='A'?['1-A','2-A','3-A','4-A']:['1-B','2-B','3-B','4-B'];
  fillSelect(sel, opts.map(o=>({value:o,label:o})), cur);
  if(!opts.includes(cur)) sel.value=opts[1];
}
function buildInputSel(){
  const ent=entries();
  if(dir==='cu'){
    const sel=$('cu-sel'), cur=sel.value;
    fillSelect(sel, ent.map(e=>({value:String(e.cu),label:e.cu+' CU'})), cur);
    if(!ent.find(e=>String(e.cu)===cur)) sel.value=ent[0].cu;
  } else {
    const sel=$('br-sel'), cur=sel.value;
    fillSelect(sel, ent.map(e=>({value:String(e.br),label:e.br+' kbps'})), cur);
    if(!ent.find(e=>String(e.br)===cur)) sel.value=ent[0].br;
  }
}
function onProtChange(){ buildInputSel(); render(); }

function qualityHtml(q){
  const n = q.key.slice(1);
  return `<span class="badge ${q.cls}">${esc(t('q'+n))}</span>`;
}

function render(){
  const ent=entries();
  const prot=$('prot-sel').value;
  let found, resVal, resUnit, resLabel, code;
  if(dir==='cu'){
    const selCu=parseInt($('cu-sel').value,10);
    found=ent.find(e=>e.cu===selCu);
    resLabel=t('resBitrate'); resUnit='kbps';
    if(found){ resVal=found.br; code=`${prot} · ${selCu} CU → ${found.br} kbps`; }
  } else {
    const selBr=parseInt($('br-sel').value,10);
    found=ent.find(e=>e.br===selBr);
    resLabel=t('resCu'); resUnit='CU';
    if(found){ resVal=found.cu; code=`${prot} · ${found.br} kbps → ${found.cu} CU`; }
  }
  $('res-label').textContent=resLabel;
  $('res-val').textContent=found?resVal:'—';
  $('res-unit').textContent=found?resUnit:'';
  if(found){
    const q=getQ(found.br), n=q.key.slice(1);
    $('res-extra').innerHTML=`${qualityHtml(q)}
      <span class="res-uso">${esc(t('u'+n))}</span>
      <span class="res-code">${esc(code)}</span>`;
  } else {
    $('res-extra').innerHTML='';
  }

  const tbody=$('ref-body');
  tbody.innerHTML='';
  ent.forEach(e=>{
    const q=getQ(e.br), n=q.key.slice(1);
    const isActive=found&&e.br===found.br;
    const tr=document.createElement('tr');
    if(isActive) tr.classList.add('active');
    tr.innerHTML=`<td>${e.br}${isActive?' <span class="arrow">◀</span>':''}</td>
      <td class="cu">${e.cu}</td>
      <td>${qualityHtml(q)}</td>
      <td class="uso">${esc(t('u'+n))}</td>`;
    tbody.appendChild(tr);
  });
}

$('btn-a').addEventListener('click', () => setMode('A'));
$('btn-b').addEventListener('click', () => setMode('B'));
$('btn-cu').addEventListener('click', () => setDir('cu'));
$('btn-br').addEventListener('click', () => setDir('br'));
['en', 'it', 'es'].forEach(l => $('btn-' + l).addEventListener('click', () => setLang(l)));
$('prot-sel').addEventListener('change', onProtChange);
$('cu-sel').addEventListener('change', render);
$('br-sel').addEventListener('change', render);

// --- Install button -------------------------------------------------------
// Chrome, Edge, Android: native prompt via beforeinstallprompt.
// iPhone/iPad: no such event, so the button shows a short "Add to Home Screen" hint.
let deferredPrompt = null;
const standaloneMQ = window.matchMedia('(display-mode: standalone)');
const isStandalone = () => standaloneMQ.matches || navigator.standalone === true;
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function updateInstallUI(){
  const canInstall = !isStandalone();
  $('install-btn').hidden = !canInstall;
  if (!canInstall) $('ios-hint').hidden = true;
  $('install-btn').setAttribute('aria-expanded', String(!$('ios-hint').hidden));
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  updateInstallUI();
});
window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  updateInstallUI();
});
standaloneMQ.addEventListener('change', updateInstallUI);

$('install-btn').addEventListener('click', async () => {
  if (deferredPrompt) {
    const prompt = deferredPrompt;
    deferredPrompt = null;
    prompt.prompt();
    try { await prompt.userChoice; } catch (e) {}
    updateInstallUI();
  } else if (isIOS) {
    $('ios-hint').hidden = !$('ios-hint').hidden;
    updateInstallUI();
  } else {
    openHelp('help-install');   // no install prompt here (Safari on Mac, Firefox...): show the steps
  }
});
$('ios-hint-close').addEventListener('click', () => {
  $('ios-hint').hidden = true;
  updateInstallUI();
  $('install-btn').focus();
});

// --- Help dialog ------------------------------------------------------------
const helpDlg = $('help-dlg');
function openHelp(anchor){
  if (helpDlg.showModal) { if (!helpDlg.open) helpDlg.showModal(); } else helpDlg.setAttribute('open', '');
  const target = anchor ? $(anchor) : null;
  if (target && target.scrollIntoView) target.scrollIntoView();
}
$('help-btn').addEventListener('click', () => openHelp());
$('help-close').addEventListener('click', () => helpDlg.close());
helpDlg.addEventListener('click', e => { if (e.target === helpDlg) helpDlg.close(); });

// --- Offline support and "new version ready" banner ------------------------
if ('serviceWorker' in navigator) {
  const banner = $('update-banner');
  let reloaded = false;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { scope: './' }).then(reg => {
      reg.addEventListener('updatefound', () => {
        const installing = reg.installing;
        if (!installing) return;
        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) banner.hidden = false;
        });
      });
      $('update-reload').addEventListener('click', () => { if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' }); });
      $('update-later').addEventListener('click', () => { banner.hidden = true; });
    }).catch(() => {});
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloaded) return;
      reloaded = true;
      location.reload();
    });
  });
}

$('ver').textContent = 'v' + VERSION;
applyLang();
updateInstallUI();
buildProtSel(); buildInputSel(); render();
