'use strict';

// Sub-channel size in CU as a function of bit rate (kbit/s).
// Source: ETSI EN 300 401 V2.1.1 (2017-01), clause 6.2.1, tables 9 and 10.
// EEP-A: bit rate = 8n kbit/s  -> 1-A 12n, 2-A 8n, 3-A 6n, 4-A 4n CU
// EEP-B: bit rate = 32n kbit/s -> 1-B 27n, 2-B 21n, 3-B 18n, 4-B 15n CU
const EEPA = {
  '1-A':{8:12,16:24,24:36,32:48,40:60,48:72,56:84,64:96,72:108,80:120,88:132,96:144,104:156,112:168,120:180,128:192,136:204,144:216,152:228,160:240,168:252,176:264,184:276,192:288},
  '2-A':{8:8,16:16,24:24,32:32,40:40,48:48,56:56,64:64,72:72,80:80,88:88,96:96,104:104,112:112,120:120,128:128,136:136,144:144,152:152,160:160,168:168,176:176,184:184,192:192},
  '3-A':{8:6,16:12,24:18,32:24,40:30,48:36,56:42,64:48,72:54,80:60,88:66,96:72,104:78,112:84,120:90,128:96,136:102,144:108,152:114,160:120,168:126,176:132,184:138,192:144},
  '4-A':{8:4,16:8,24:12,32:16,40:20,48:24,56:28,64:32,72:36,80:40,88:44,96:48,104:52,112:56,120:60,128:64,136:68,144:72,152:76,160:80,168:84,176:88,184:92,192:96}
};
const EEPB = {
  '1-B':{32:27,64:54,96:81,128:108,160:135,192:162},
  '2-B':{32:21,64:42,96:63,128:84,160:105,192:126},
  '3-B':{32:18,64:36,96:54,128:72,160:90,192:108},
  '4-B':{32:15,64:30,96:45,128:60,160:75,192:90}
};

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
    q4: 'Ottima', u4: 'Musica hi-fi / premium'
  },
  en: {
    title: 'DAB+ · CU ↔ Bitrate Calculator',
    description: 'Two-way Capacity Units / bitrate calculator for DAB+ according to ETSI EN 300 401',
    chip: 'Calculator',
    subtitle: 'Two-way Capacity Units / bitrate conversion according to ETSI EN 300 401',
    langLabel: 'Language',
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
    q4: 'Excellent', u4: 'Hi-fi / premium music'
  }
};

const LANG_KEY = 'com.onairgarage.dabcalculator.lang';

function detectLang(){
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && I18N[saved]) return saved;
  } catch (e) {}
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'];
  return String(langs[0]).toLowerCase().startsWith('it') ? 'it' : 'en';
}

let lang = detectLang();
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
  $('lang-switch').setAttribute('aria-label', t('langLabel'));
  $('btn-it').classList.toggle('on', lang === 'it');
  $('btn-en').classList.toggle('on', lang === 'en');
  $('btn-it').setAttribute('aria-pressed', String(lang === 'it'));
  $('btn-en').setAttribute('aria-pressed', String(lang === 'en'));
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
$('btn-it').addEventListener('click', () => setLang('it'));
$('btn-en').addEventListener('click', () => setLang('en'));
$('prot-sel').addEventListener('change', onProtChange);
$('cu-sel').addEventListener('change', render);
$('br-sel').addEventListener('change', render);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => {});
  });
}

applyLang();
buildProtSel(); buildInputSel(); render();
