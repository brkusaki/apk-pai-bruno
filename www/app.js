/* Pai da Maya — app do Bruno 💙
   Tudo fica salvo só neste celular (localStorage + IndexedDB para as fotos). */
(() => {
'use strict';
const LS = 'pai:v1';
const MIN = 60e3, H = 60 * MIN, DIA = 24 * H;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const G = window.GUIAS || [], CATS = window.CATS || [], FASES = window.FASES || [];
G.sort((a, b) => CATS.findIndex(c => c[0] === a.cat) - CATS.findIndex(c => c[0] === b.cat));
const ic = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${(window.ICONES || {})[n] || ''}</svg>`;

/* ---------------- Dados ---------------- */
let LEU_OK = true;
function carregar() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch { LEU_OK = false; return {}; } }
const S = carregar();
S.cfg = Object.assign({ pai: 'Bruno', mae: 'Maíra', bebe: 'Maya', nasc: '', tema: 'auto', luz: 45, voz: true, sempre: false, assistente: 'Bento' }, S.cfg || {});
for (const k of ['ped', 'est', 'compras', 'diario', 'rot', 'marcosX', 'cartas']) S[k] = Array.isArray(S[k]) ? S[k] : [];
S.nid = S.nid || 100;
S.lidos = S.lidos && typeof S.lidos === 'object' ? S.lidos : {};
S.fav = S.fav && typeof S.fav === 'object' ? S.fav : {};
S.marcos = S.marcos && typeof S.marcos === 'object' ? S.marcos : {};
const cfg = S.cfg;
const salvar = () => { if (!LEU_OK) return; try { localStorage.setItem(LS, JSON.stringify(S)); } catch { toast('Sem espaço para salvar!'); } };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const proxNid = () => (S.nid = S.nid >= 2e9 ? 100 : S.nid + 1);

/* ---------------- Utilidades ---------------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const hora = t => { const d = new Date(t); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
const data = t => { const d = new Date(t); return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); };
const mesmoDia = (a, b) => new Date(a).toDateString() === new Date(b).toDateString();
const dataHora = t => (mesmoDia(t, Date.now()) ? 'Hoje' : mesmoDia(t, Date.now() - DIA) ? 'Ontem' : data(t)) + ' às ' + hora(t);
const inicioDia = (t = Date.now()) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return +d; };
const paraInput = t => { const d = new Date(t); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + 'T' + hora(t); };
const deInput = v => { const t = v ? +new Date(v) : NaN; return isNaN(t) ? Date.now() : t; };
const crono = ms => { ms = Math.max(0, ms); const t = Math.floor(ms / 1000), h = Math.floor(t / 3600); return (h ? h + ':' + pad(Math.floor(t / 60) % 60) : Math.floor(t / 60)) + ':' + pad(t % 60); };
const dur = ms => { const m = Math.round(ms / MIN); if (m < 1) return '<1 min'; if (m < 60) return m + ' min'; return Math.floor(m / 60) + 'h' + (m % 60 ? ' ' + pad(m % 60) : ''); };
const rel = t => Date.now() - t < MIN ? 'agora' : 'há ' + dur(Date.now() - t);
const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const plural = (n, s, p) => n + ' ' + (n === 1 ? s : p);

function toast(msg, ms = 2600) {
  const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, ms);
  const lf = $('#luzFala'); if (lf && !$('#luz').hidden) { lf.textContent = msg; clearTimeout(toast.l); toast.l = setTimeout(() => lf.textContent = '', 7000); }
}
function modal(html, centro) { $('#modal').classList.toggle('centro', !!centro); $('#modalBox').innerHTML = html; $('#modal').hidden = false; }
function fecharModal() { $('#modal').hidden = true; $('#modalBox').innerHTML = ''; edFoto = null; }
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') fecharModal(); });

function saudacao() { const h = new Date().getHours(); return h < 5 ? 'Boa madrugada' : h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'; }
const nascida = () => !!cfg.nasc;
function idadeBebe() {
  const n = +new Date(cfg.nasc); const d = Math.floor((inicioDia() - inicioDia(n)) / DIA);
  let txt;
  if (d <= 0) txt = 'nasceu hoje';
  else if (d < 14) txt = plural(d, 'dia', 'dias');
  else if (d < 60) { const r = d % 7; txt = plural(Math.floor(d / 7), 'semana', 'semanas') + (r ? ' e ' + plural(r, 'dia', 'dias') : ''); }
  else { const m = Math.floor(d / 30.44); txt = plural(m, 'mês', 'meses'); }
  return { d, txt, diaVida: d + 1 };
}
function diaDeVida(ts) {
  if (!nascida()) return '';
  const d = Math.floor((inicioDia(ts) - inicioDia(+new Date(cfg.nasc))) / DIA) + 1;
  return d >= 1 ? 'Dia ' + d + ' da ' + cfg.bebe : 'Antes de a ' + cfg.bebe + ' nascer';
}

/* ---------------- Plugins / notificações ---------------- */
const CAP = window.Capacitor;
const NATIVO = !!(CAP && CAP.isNativePlatform && CAP.isNativePlatform());
const plugin = n => NATIVO ? (CAP.Plugins[n] || CAP.registerPlugin(n)) : null;
const LN = plugin('LocalNotifications');
const webTimers = {};
const N = {
  async iniciar() {
    if (!LN) return;
    try { await LN.createChannel({ id: 'pai', name: 'Lembretes', description: 'Pedidos da Maíra e avisos', importance: 5, visibility: 1, vibration: true }); } catch {}
    LN.addListener('localNotificationActionPerformed', e => { const x = e.notification && e.notification.extra; if (x && x.tab) ir(x.tab); });
  },
  async status() {
    if (LN) { try { return (await LN.checkPermissions()).display; } catch { return 'erro'; } }
    return 'Notification' in window ? Notification.permission : 'indisponivel';
  },
  async pedir() {
    if (LN) { let p = await LN.checkPermissions(); if (p.display !== 'granted') p = await LN.requestPermissions(); return p.display === 'granted'; }
    if ('Notification' in window) return (await Notification.requestPermission()) === 'granted';
    return false;
  },
  async agendar(id, title, body, quando, tab) {
    if (LN) { try { await LN.schedule({ notifications: [{ id, title, body, channelId: 'pai', smallIcon: 'ic_stat_icon', schedule: { at: new Date(quando), allowWhileIdle: true }, extra: { tab } }] }); } catch (e) { console.warn('agendar', e); } return; }
    clearTimeout(webTimers[id]);
    const ms = quando - Date.now();
    if (ms > 0 && ms < 2 ** 31 - 1) webTimers[id] = setTimeout(() => { if ('Notification' in window && Notification.permission === 'granted') new Notification(title, { body }); }, ms);
  },
  async cancelar(id) {
    if (LN) { try { await LN.cancel({ notifications: [{ id }] }); } catch {} return; }
    clearTimeout(webTimers[id]);
  },
};
async function reagendarTudo() { for (const p of S.ped) if (!p.feito && p.lembrete && p.lembrete > Date.now()) await N.agendar(p.nid, 'Pedido da ' + cfg.mae, p.t, p.lembrete, 'pedidos'); }

/* ---------------- Fotos (IndexedDB) ---------------- */
const abrirDB = () => new Promise((res, rej) => { const r = indexedDB.open('pai-fotos', 1); r.onupgradeneeded = () => r.result.createObjectStore('f'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
async function fotoSalvar(id, blob) { const db = await abrirDB(); return new Promise((res, rej) => { const t = db.transaction('f', 'readwrite'); t.objectStore('f').put(blob, id); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
async function fotoLer(id) { const db = await abrirDB(); return new Promise((res, rej) => { const r = db.transaction('f').objectStore('f').get(id); r.onsuccess = () => res(r.result || null); r.onerror = () => rej(r.error); }); }
async function fotoApagar(id) { try { const db = await abrirDB(); await new Promise(res => { const t = db.transaction('f', 'readwrite'); t.objectStore('f').delete(id); t.oncomplete = res; t.onerror = res; }); } catch {} delete URLS[id]; }
const URLS = {};
async function carregarFotos() {
  for (const img of $$('img[data-foto]')) {
    const id = img.dataset.foto;
    try { if (!URLS[id]) { const b = await fotoLer(id); if (b) URLS[id] = URL.createObjectURL(b); } if (URLS[id]) img.src = URLS[id]; else img.remove(); } catch { img.remove(); }
  }
}
async function reduzir(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('imagem inválida')); i.src = url; });
    const k = Math.min(1, 1100 / Math.max(img.width, img.height));
    const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return await new Promise(r => c.toBlob(r, 'image/jpeg', .82));
  } finally { URL.revokeObjectURL(url); }
}

/* ---------------- Atualização automática ---------------- */
const SITE = 'https://brkusaki.github.io/apk-pai-bruno/';
const VERSAO = window.VERSAO || 0;
const UPD = plugin('CapacitorUpdater');
if (UPD) UPD.notifyAppReady().catch(() => {});
let PRONTA = null, ultimaBusca = 0, ERRO_ATUALIZ = '';
async function lerJSON(url) {
  const HTTP = NATIVO && CAP.Plugins.CapacitorHttp;
  if (HTTP) {
    const r = await HTTP.get({ url, headers: { 'Cache-Control': 'no-cache' } });
    if (r.status !== 200) throw new Error('servidor respondeu ' + r.status);
    return typeof r.data === 'string' ? JSON.parse(r.data) : r.data;
  }
  const r = await fetch(url, { cache: 'no-store' }); if (!r.ok) throw new Error('servidor respondeu ' + r.status); return r.json();
}
async function procurarAtualizacao(manual) {
  if (!UPD) { if (manual) toast('A atualização automática funciona no app instalado'); return; }
  if (!manual && Date.now() - ultimaBusca < 20 * MIN) return;
  ultimaBusca = Date.now();
  let etapa = 'verificar';
  try {
    const v = await lerJSON(SITE + 'versao.json?t=' + Date.now());
    if (!(v.versao > VERSAO)) { ERRO_ATUALIZ = ''; if (manual) toast('Já está na versão mais nova ✅'); return; }
    if (!PRONTA || PRONTA.versao !== v.versao) {
      if (manual) toast('Baixando atualização...', 8000);
      etapa = 'baixar';
      const b = await UPD.download({ url: SITE + 'www.zip?v=' + v.versao, version: String(v.versao), checksum: v.sha256 || '' });
      etapa = 'preparar';
      await UPD.next({ id: b.id });
      PRONTA = { id: b.id, versao: v.versao, novidades: v.novidades || '' };
    }
    ERRO_ATUALIZ = ''; render();
  } catch (e) {
    const msg = (e && (e.message || e.errorMessage)) || String(e);
    ERRO_ATUALIZ = `Erro ao ${etapa}: ${msg}`; console.warn('atualizacao', e);
    if (manual) toast(ERRO_ATUALIZ.slice(0, 140), 7000);
    if (V.tab === 'mais') render();
  }
}
function cardAtualizacao() {
  if (!PRONTA) return '';
  return `<div class="card linha entre" style="border-color:var(--verde)"><span class="linha"><i class="bolha b-verde">${ic('sparkles')}</i><span><b>Atualização pronta</b><br><small>${esc(PRONTA.novidades) || 'Melhorias no app'}</small></span></span><button class="btn verde mini" data-a="aplicarAtualiz">Atualizar</button></div>`;
}

/* ---------------- Tema ---------------- */
const SB = plugin('StatusBar');
function tema() {
  const h = new Date().getHours();
  const noite = cfg.tema === 'noite' || (cfg.tema === 'auto' && (h >= 19 || h < 6));
  document.documentElement.classList.toggle('noite', noite);
  const cor = noite ? '#0f1b24' : '#eaf1f4';
  document.querySelector('meta[name=theme-color]').content = cor;
  if (SB && $('#luz').hidden) { SB.setBackgroundColor({ color: cor }).catch(() => {}); SB.setStyle({ style: noite ? 'DARK' : 'LIGHT' }).catch(() => {}); }
  $('#btnTema').innerHTML = ic(noite ? 'sun' : 'moon');
}

/* ---------------- Telas ---------------- */
const V = { tab: 'inicio', est: 'itens', guia: null, cat: 'todos', fase: '', q: '' };
const baixos = () => S.est.filter(i => i.qtd != null && i.qtd <= i.min);
const abertos = () => S.ped.filter(p => !p.feito).sort((a, b) => b.criado - a.criado);
const diarioOrd = () => S.diario.slice().sort((a, b) => b.ts - a.ts);

function itemPedido(p) {
  return `<div class="item ${p.feito ? 'feito' : ''}">
    <button class="tick ${p.feito ? 'on' : ''}" data-a="pedFeito" data-id="${p.id}" aria-label="${p.feito ? 'Reabrir' : 'Marcar como feito'}">${ic('check')}</button>
    <div class="txt"><b>${esc(p.t)}</b><br><small>${p.feito ? 'Feito ' + dataHora(p.feito) : 'Pedido ' + dataHora(p.criado)}</small>${p.lembrete && !p.feito ? ` <span class="tag ouro">🔔 ${p.lembrete < Date.now() ? 'avisou' : 'avisa'} ${dataHora(p.lembrete)}</span>` : ''}</div>
    <button class="btn sec mini" data-a="pedDel" data-id="${p.id}" aria-label="Apagar">${ic('trash-2')}</button>
  </div>`;
}

function telaInicio() {
  let h = cardAtualizacao();
  if (nascida()) {
    const i = idadeBebe();
    h += `<div class="capa"><div class="deco">${ic('baby')}</div><div class="rotulo">${esc(cfg.bebe)}</div><div class="grande">${i.d <= 0 ? 'Nasceu hoje!' : i.txt}</div><div class="sub">Dia ${i.diaVida} de vida · nasceu ${data(+new Date(cfg.nasc))}</div></div>`;
  } else {
    h += `<div class="capa"><div class="deco">${ic('baby')}</div><div class="rotulo">Pai a caminho</div><div class="grande">A ${esc(cfg.bebe)} está chegando</div><div class="sub">Quando ela nascer, é só avisar aqui.</div><button class="btn" data-a="nasceu">${ic('heart')} A ${esc(cfg.bebe)} nasceu!</button></div>`;
  }
  h += cardRotinaResumo();
  if (nascida()) h += cardMarcosInicio();
  const prox = proximoGuia(), lidosN = G.filter(g => S.lidos[g.id]).length;
  h += `<div class="sec-titulo"><h3>Guia do Pai</h3><button class="btn sec mini" data-a="ir" data-t="guia">Ver tudo (${lidosN}/${G.length})</button></div><p class="mute" style="margin:-4px 0 8px">Para esta fase: ${esc(nomeFase(faseAtual()))}</p>`;
  if (prox) h += itemGuia(prox);
  h += `<div class="grade"><button class="acao" data-a="guiaAbrir" data-id="sos-bebe" style="margin:0"><i class="bolha b-alerta" style="font-size:1.3rem">🚨</i><span>Alerta da Maya</span></button><a class="acao" href="tel:192" style="margin:0"><i class="bolha b-alerta" style="font-size:1.3rem">🚑</i><span>SAMU 192</span></a></div>`;
  h += `<button class="acao" data-a="luzAbrir"><i class="bolha b-alerta">${ic('moon')}</i><span>Modo plantão<small>Tela vermelha com botões grandes, para a madrugada</small></span></button>`;
  h += cardCartasInicio();

  const ab = abertos();
  h += `<div class="sec-titulo"><h3>Pedidos da ${esc(cfg.mae)}</h3><button class="btn sec mini" data-a="ir" data-t="pedidos">Ver todos</button></div><div class="card">`;
  h += ab.length ? ab.slice(0, 3).map(itemPedido).join('') + (ab.length > 3 ? `<p class="mute" style="text-align:center;margin-bottom:0">+ ${ab.length - 3} pedidos</p>` : '') : `<div class="vazio">Nenhum pedido em aberto 🎉</div>`;
  h += `</div>`;

  const bx = baixos();
  h += `<div class="sec-titulo"><h3>Estoque</h3><button class="btn sec mini" data-a="ir" data-t="estoque">Abrir</button></div><div class="card">`;
  h += bx.length ? bx.slice(0, 4).map(i => `<div class="item"><i class="bolha b-ouro">${ic('package')}</i><div class="txt"><b>${esc(i.nome)}</b><br><small>${i.qtd} ${esc(i.un)} (mínimo ${i.min})</small></div><span class="tag alerta">acabando</span></div>`).join('') : `<div class="vazio">${S.est.length ? 'Tudo em dia ✅' : 'Cadastre fraldas, lenços e o que não pode faltar.'}</div>`;
  h += `</div>`;

  const ult = diarioOrd()[0];
  h += `<div class="sec-titulo"><h3>Diário da ${esc(cfg.bebe)}</h3><button class="btn mini" data-a="diaNovo">${ic('plus')} Escrever</button></div><div class="card">`;
  h += ult ? entradaDiario(ult, true) : `<div class="vazio">Escreva a primeira entrada: como foi o dia de hoje?</div>`;
  h += `</div>`;
  return h;
}

function telaPedidos() {
  const ab = abertos(), fe = S.ped.filter(p => p.feito).sort((a, b) => b.feito - a.feito).slice(0, 15);
  const chips = ['Trazer água', 'Fazer um lanche', 'Passar na farmácia', 'Comprar fraldas', 'Dar banho na ' + cfg.bebe].map(t => `<button class="chip" data-a="pedChip" data-t="${esc(t)}">${esc(t)}</button>`).join('');
  let h = `<h2>Pedidos da ${esc(cfg.mae)}</h2><div class="card">
    <div class="addlinha"><input id="pedTxt" placeholder="O que ela pediu?" maxlength="140" autocomplete="off"><button class="btn" data-a="pedAdd" aria-label="Adicionar">${ic('plus')}</button></div>
    <label for="pedQuando">Me avisar</label>
    <select id="pedQuando"><option value="">Sem lembrete</option><option value="15">Daqui a 15 minutos</option><option value="30">Daqui a 30 minutos</option><option value="60">Daqui a 1 hora</option><option value="120">Daqui a 2 horas</option><option value="noite">Hoje às 20h (ou amanhã, se já passou)</option><option value="manha">Amanhã às 8h</option></select>
    <div class="chips" style="margin-top:12px">${chips}</div></div>`;
  h += `<div class="sec-titulo"><h3>Em aberto (${ab.length})</h3></div><div class="card">${ab.length ? ab.map(itemPedido).join('') : '<div class="vazio">Nenhum pedido em aberto 🎉</div>'}</div>`;
  if (fe.length) h += `<details class="card"><summary><b>Feitos (${fe.length})</b></summary>${fe.map(itemPedido).join('')}<button class="btn sec bloco" style="margin-top:12px" data-a="pedLimpar">Limpar feitos</button></details>`;
  return h;
}

function telaEstoque() {
  const bx = baixos();
  let h = `<h2>Estoque da casa</h2><div class="abas"><button class="${V.est === 'itens' ? 'on' : ''}" data-a="estTab" data-t="itens">Itens (${S.est.length})</button><button class="${V.est === 'compras' ? 'on' : ''}" data-a="estTab" data-t="compras">Lista de compras (${bx.length + S.compras.length})</button></div>`;
  if (V.est === 'itens') {
    h += S.est.length ? S.est.map(i => {
      const baixo = i.qtd != null && i.qtd <= i.min;
      return `<div class="card ${baixo ? 'alerta' : ''}"><div class="linha entre"><button class="txt" style="text-align:left;flex:1;min-width:0" data-a="estEditar" data-id="${i.id}"><b>${esc(i.nome)}</b><br><small>${i.qtd == null ? '<span class="tag ouro">contar</span>' : esc(i.un) + ' · mínimo ' + i.min}</small>${baixo ? ' <span class="tag alerta">acabando</span>' : ''}</button>
        <div class="qtd"><button data-a="estMenos" data-id="${i.id}" aria-label="Menos">${ic('minus')}</button><b class="num">${i.qtd == null ? '–' : i.qtd}</b><button class="mais" data-a="estMais" data-id="${i.id}" aria-label="Mais">${ic('plus')}</button></div></div></div>`;
    }).join('') : `<div class="card vazio">Nada cadastrado ainda.</div>`;
    h += `<button class="btn bloco" style="margin-top:6px" data-a="estNovo">${ic('plus')} Novo item</button>`;
    if (!S.est.length) h += `<button class="btn sec bloco" style="margin-top:10px" data-a="estPresets">Adicionar itens básicos de bebê</button>`;
  } else {
    h += `<div class="card"><h3>Acabando</h3>${bx.length ? bx.map(i => `<div class="item"><div class="txt"><b>${esc(i.nome)}</b><br><small>restam ${i.qtd} ${esc(i.un)}</small></div><button class="btn verde mini" data-a="comprei" data-id="${i.id}">${ic('check')} Comprei</button></div>`).join('') : '<div class="vazio">Nada acabando 🎉</div>'}</div>
    <div class="card"><h3>Outras compras</h3><div class="addlinha"><input id="compraTxt" placeholder="Ex.: shampoo, bolsa térmica" maxlength="80" autocomplete="off"><button class="btn" data-a="compraNova" aria-label="Adicionar">${ic('plus')}</button></div>
    ${S.compras.map(c => `<div class="item"><button class="tick" data-a="compraOk" data-id="${c.id}" aria-label="Comprado">${ic('check')}</button><div class="txt"><b>${esc(c.t)}</b></div><button class="btn sec mini" data-a="compraDel" data-id="${c.id}" aria-label="Apagar">${ic('trash-2')}</button></div>`).join('')}</div>`;
    if (bx.length || S.compras.length) h += `<button class="btn bloco" data-a="compartilharLista">${ic('share-2')} Enviar lista (WhatsApp etc.)</button>`;
  }
  return h;
}

function entradaDiario(e, resumo) {
  const tags = { marco: ['Marco ⭐', 'ouro'], frase: ['Frase 💬', 'verde'], momento: ['Momento', ''] };
  const [tn, tc] = tags[e.tag] || tags.momento;
  return `<div class="entrada"><div class="cab"><span class="tag ${tc}">${tn}</span><small>${dataHora(e.ts)}</small></div>
    ${diaDeVida(e.ts) ? `<small>${esc(diaDeVida(e.ts))}</small>` : ''}
    ${e.t ? `<p>${esc(resumo && e.t.length > 220 ? e.t.slice(0, 220) + '…' : e.t)}</p>` : ''}
    ${e.foto ? `<img data-foto="${e.id}" alt="Foto da entrada">` : ''}
    <button class="btn sec mini" data-a="diaEditar" data-id="${e.id}">${ic('pencil')} Editar</button></div>`;
}
function telaDiario() {
  const l = diarioOrd();
  return `<h2>Diário da ${esc(cfg.bebe)}</h2><button class="btn bloco" data-a="diaNovo">${ic('plus')} Nova entrada</button>
  <div class="grade" style="margin-top:10px"><button class="btn sec" data-a="ir" data-t="marcos">⭐ Marcos</button><button class="btn sec" data-a="ir" data-t="cartas">💌 Cartinhas</button></div>
  <div class="card">${l.length ? l.map(e => entradaDiario(e)).join('') : `<div class="vazio">Aqui ficam os momentos, os marcos e as frases que você não quer esquecer.</div>`}</div>`;
}


/* ---------------- Rotina da Maya ---------------- */
const rotOrd = () => S.rot.slice().sort((a, b) => b.ini - a.ini);
const rodando = tipo => S.rot.find(r => r.tipo === tipo && !r.fim);
const ultimoDe = tipo => rotOrd().find(r => r.tipo === tipo);
const LADO = { E: 'peito esquerdo', D: 'peito direito', M: 'mamadeira' };
const FR = { xixi: 'Xixi 💧', coco: 'Cocô 💩', ambos: 'Xixi e cocô 💧💩' };
function tituloRot(r) {
  if (r.tipo === 'mam') return 'Mamada · ' + (LADO[r.lado] || 'peito') + (r.lado === 'M' && r.ml ? ' · ' + r.ml + ' ml' : '');
  if (r.tipo === 'sono') return 'Sono';
  if (r.tipo === 'fr') return 'Fralda · ' + (FR[r.fr] || 'fralda');
  return 'Banho';
}
const iconeRot = r => ({ mam: '🍼', sono: '😴', fr: '🧷', banho: '🛁' }[r.tipo]);
const durRot = r => (r.tipo === 'mam' && r.lado === 'M') || r.tipo === 'fr' || r.tipo === 'banho' ? 0 : (r.fim || Date.now()) - r.ini;
function resumoDia(t0 = inicioDia()) {
  const l = S.rot.filter(r => r.ini >= t0 && r.ini < t0 + DIA);
  const mam = l.filter(r => r.tipo === 'mam');
  return {
    mam: mamadasLista(t0).filter(x => x.ini < t0 + DIA).length, peitoMs: mam.filter(r => r.lado !== 'M').reduce((a, r) => a + durRot(r), 0), ml: mam.filter(r => r.lado === 'M').reduce((a, r) => a + (+r.ml || 0), 0),
    sonoMs: l.filter(r => r.tipo === 'sono').reduce((a, r) => a + durRot(r), 0),
    xixi: l.filter(r => r.tipo === 'fr' && r.fr !== 'coco').length, coco: l.filter(r => r.tipo === 'fr' && r.fr !== 'xixi').length,
    banho: l.filter(r => r.tipo === 'banho').length, lista: l,
  };
}
function blocoAtivos() {
  let x = '';
  const m = rodando('mam'), z = rodando('sono');
  if (m) x += `<div class="card ativo"><div class="rotulo">Mamando agora · ${LADO[m.lado]}</div><div class="grande num" data-desde="${m.ini}">${crono(Date.now() - m.ini)}</div><div class="linha" style="margin-top:12px;flex-wrap:wrap"><button class="btn verde" data-a="rotParar" data-id="${m.id}">Terminar</button>${m.lado !== 'M' ? `<button class="btn sec" data-a="mamTrocar" data-id="${m.id}">Trocar de lado</button>` : ''}</div></div>`;
  if (z) x += `<div class="card ativo"><div class="rotulo">Dormindo desde ${hora(z.ini)}</div><div class="grande num" data-desde="${z.ini}">${crono(Date.now() - z.ini)}</div><div class="linha" style="margin-top:12px"><button class="btn verde" data-a="rotParar" data-id="${z.id}">Acordou</button></div></div>`;
  return x;
}
function linhaRot(r) {
  const d = durRot(r);
  return `<div class="item"><i class="bolha b-pri" style="font-size:1.3rem">${iconeRot(r)}</i><div class="txt"><b>${esc(tituloRot(r))}</b><br><small>${dataHora(r.ini)}${d ? ' · ' + (r.fim ? dur(d) : 'em andamento') : ''}${r.obs ? ' · ' + esc(r.obs) : ''}</small></div><button class="btn sec mini" data-a="rotEditar" data-id="${r.id}" aria-label="Editar">${ic('pencil')}</button></div>`;
}
function cardRotinaResumo() {
  const r = resumoDia(), u = ultimoDe('mam');
  return `<div class="sec-titulo"><h3>Rotina da ${esc(cfg.bebe)}</h3><button class="btn sec mini" data-a="ir" data-t="rotina">Abrir</button></div>${blocoAtivos()}
  <div class="card"><div class="grade3"><div class="stat"><b>${u ? '<span data-rel="' + u.ini + '">' + rel(u.ini) + '</span>' : '–'}</b><small>última mamada</small></div><div class="stat"><b>${r.xixi}💧 ${r.coco}💩</b><small>fraldas hoje</small></div><div class="stat"><b>${r.sonoMs ? dur(r.sonoMs) : '–'}</b><small>sono hoje</small></div></div></div>`;
}
function telaRotina() {
  const r = resumoDia(), m = rodando('mam'), z = rodando('sono');
  const ult = t => { const u = ultimoDe(t); return u ? rel(u.ini) : 'ainda não registrado'; };
  let h = `<h2>Rotina da ${esc(cfg.bebe)}</h2>` + blocoAtivos();
  h += `<div class="grade">
    <button class="acao" data-a="${m ? 'rotParar' : 'mamAbrir'}" data-id="${m ? m.id : ''}" style="margin:0;flex-direction:column;align-items:flex-start"><i class="bolha b-ouro" style="font-size:1.4rem">🍼</i><span>${m ? 'Terminar mamada' : 'Mamada'}<small data-rel-txt="mam">${ult('mam')}</small></span></button>
    <button class="acao" data-a="${z ? 'rotParar' : 'sonoIni'}" data-id="${z ? z.id : ''}" style="margin:0;flex-direction:column;align-items:flex-start"><i class="bolha b-pri" style="font-size:1.4rem">😴</i><span>${z ? 'Acordou' : 'Dormiu'}<small>${ult('sono')}</small></span></button>
    <button class="acao" data-a="frAbrir" style="margin:0;flex-direction:column;align-items:flex-start"><i class="bolha b-verde" style="font-size:1.4rem">🧷</i><span>Fralda<small>${ult('fr')}</small></span></button>
    <button class="acao" data-a="banhoReg" style="margin:0;flex-direction:column;align-items:flex-start"><i class="bolha b-pri" style="font-size:1.4rem">🛁</i><span>Banho<small>${ult('banho')}</small></span></button>
  </div>`;
  h += `<div class="sec-titulo"><h3>Hoje</h3></div><div class="card"><div class="grade3"><div class="stat"><b>${r.mam}</b><small>mamadas</small></div><div class="stat"><b>${r.xixi}💧 ${r.coco}💩</b><small>fraldas</small></div><div class="stat"><b>${r.sonoMs ? dur(r.sonoMs) : '–'}</b><small>sono</small></div></div>
    <p class="mute" style="margin:12px 0 0;font-size:.88rem">${r.peitoMs ? 'No peito: ' + dur(r.peitoMs) + '. ' : ''}${r.ml ? 'Mamadeira: ' + r.ml + ' ml. ' : ''}${r.banho ? 'Banho: ' + r.banho + '. ' : ''}A partir do 5º dia, o esperado são 6 ou mais fraldas com xixi por dia.</p></div>`;
  const l = rotOrd().filter(x => x.ini >= inicioDia() - DIA);
  h += `<div class="sec-titulo"><h3>Hoje e ontem</h3></div><div class="card">${l.length ? l.map(linhaRot).join('') : '<div class="vazio">Nada registrado ainda. Toque num botão acima.</div>'}</div>`;
  h += `<button class="btn sec bloco" data-a="rotEnviar">${ic('share-2')} Enviar resumo do dia (WhatsApp, pediatra)</button><button class="btn sec bloco" style="margin-top:10px" data-a="luzAbrir">🌙 Modo plantão (botões grandes)</button>`;
  return h;
}
function modalRot(r) {
  const tp = r.tipo, ts = r.ini;
  const lado = tp === 'mam' ? `<label>Tipo</label><select id="rLado">${Object.entries(LADO).map(([k, n]) => `<option value="${k}" ${r.lado === k ? 'selected' : ''}>${n}</option>`).join('')}</select><label>Mililitros (só mamadeira)</label><input id="rMl" type="number" inputmode="numeric" min="0" value="${r.ml || ''}">` : '';
  const fr = tp === 'fr' ? `<label>O que foi</label><select id="rFr">${Object.entries(FR).map(([k, n]) => `<option value="${k}" ${r.fr === k ? 'selected' : ''}>${n}</option>`).join('')}</select>` : '';
  const durc = (tp === 'mam' && r.lado !== 'M') || tp === 'sono' ? (r.fim ? `<label>Duração (minutos)</label><input id="rDur" type="number" inputmode="numeric" min="0" value="${Math.round((r.fim - r.ini) / MIN)}">` : `<p class="mute">Em andamento. Termine pelo botão na tela.</p>`) : '';
  modal(`<h2>${iconeRot(r)} ${esc(tituloRot(r))}</h2>${lado}${fr}<label>Início</label><input id="rIni" type="datetime-local" value="${paraInput(ts)}">${durc}<label>Observação (opcional)</label><input id="rObs" maxlength="80" value="${esc(r.obs || '')}">
  <div class="linha" style="margin-top:18px"><button class="btn bloco" data-a="rotSalvar" data-id="${r.id}">Salvar</button><button class="btn perigo" data-a="rotExcluir" data-id="${r.id}" aria-label="Excluir">${ic('trash-2')}</button></div>`);
}
function textoDia() {
  const r = resumoDia();
  const l = r.lista.slice().sort((a, b) => a.ini - b.ini).map(x => `${hora(x.ini)} ${tituloRot(x)}${durRot(x) ? ' (' + dur(durRot(x)) + ')' : ''}${x.obs ? ' - ' + x.obs : ''}`);
  return `Rotina da ${cfg.bebe} - ${data(Date.now())}\nMamadas: ${r.mam}${r.peitoMs ? ' (peito ' + dur(r.peitoMs) + ')' : ''}${r.ml ? ', mamadeira ' + r.ml + ' ml' : ''}\nFraldas: ${r.xixi} com xixi, ${r.coco} com cocô\nSono: ${r.sonoMs ? dur(r.sonoMs) : '-'}\nBanhos: ${r.banho}\n\n` + l.join('\n');
}

/* ---------------- Guia do Pai ---------------- */
const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const guiaPorId = id => G.find(g => g.id === id);
const faseAtual = () => {
  if (!cfg.nasc) return 'pre';
  const d = Math.floor((inicioDia() - inicioDia(+new Date(cfg.nasc))) / DIA);
  return d <= 7 ? 's1' : d <= 30 ? 'm1' : d <= 91 ? 'm2' : d <= 182 ? 'm4' : d <= 273 ? 'm7' : 'm10';
};
const nomeFase = k => (FASES.find(f => f[0] === k) || [0, ''])[1];
const naFase = (g, f) => !!(g.fase && g.fase.includes(f));
const proximoGuia = () => G.find(g => !S.lidos[g.id] && naFase(g, faseAtual())) || G.find(g => !S.lidos[g.id]);
function itemGuia(g) {
  return `<button class="acao" data-a="guiaAbrir" data-id="${g.id}"><i class="bolha ${g.cat === 'sos' ? 'b-alerta' : 'b-pri'}" style="font-size:1.4rem">${g.e}</i><span style="flex:1;min-width:0">${esc(g.t)}<small>${esc(g.r)}</small></span>${S.lidos[g.id] ? '<span class="tag verde">lido</span>' : ''}</button>`;
}
function guiasVisiveis() {
  const q = norm(V.q);
  const fa = V.fase === 'agora' ? faseAtual() : V.fase;
  return G.filter(g => (V.cat === 'todos' || (V.cat === 'fav' ? S.fav[g.id] : g.cat === V.cat)) && (!fa || naFase(g, fa)) && (!q || norm([g.t, g.r, ...g.p].join(' ')).includes(q)));
}
function listaGuias() {
  const l = guiasVisiveis();
  if (!l.length && V.cat === 'fav') return '<div class="card vazio">Toque na ⭐ dentro de um guia para guardar aqui os que você mais usa.</div>';
  return l.length ? l.map(itemGuia).join('') : '<div class="card vazio">Nada encontrado. Tente outra palavra.</div>';
}
function detalheGuia(g) {
  if (!g) { V.guia = null; return telaGuia(); }
  const cat = (CATS.find(c => c[0] === g.cat) || [0, ''])[1];
  let ord = guiasVisiveis(); if (!ord.some(x => x.id === g.id)) ord = G;
  const pos = ord.findIndex(x => x.id === g.id), ant = ord[pos - 1], prox = ord[pos + 1];
  const nav = `<div class="card"><button class="btn bloco" data-a="guiaProx" data-id="${g.id}" data-n="${prox ? prox.id : ''}">${S.lidos[g.id] ? '' : '✅ '}${S.lidos[g.id] ? 'Próximo guia' : 'Li tudo, ir para o próximo'}${prox ? '' : ' (fim da lista)'}</button>
    ${prox ? `<p class="mute" style="margin:8px 0 0;font-size:.88rem;text-align:center">A seguir: ${prox.e} ${esc(prox.t)}</p>` : ''}
    <div class="linha" style="margin-top:12px"><button class="btn sec" style="flex:1" data-a="guiaAbrir" data-id="${ant ? ant.id : g.id}" ${ant ? '' : 'disabled'}>← Anterior</button><button class="btn sec" style="flex:1" data-a="guiaAbrir" data-id="${prox ? prox.id : g.id}" ${prox ? '' : 'disabled'}>Próximo →</button></div>
    <p class="mute" style="margin:10px 0 0;font-size:.8rem;text-align:center">Guia ${pos + 1} de ${ord.length}</p></div>`;
  return `<div class="linha" style="justify-content:space-between"><button class="btn sec mini" data-a="guiaVoltar">← Guia</button><button class="btn sec mini" data-a="guiaFav" data-id="${g.id}" aria-label="Favorito">${S.fav[g.id] ? '⭐ Favorito' : '☆ Favoritar'}</button></div>
  <div class="card" style="margin-top:12px"><div class="rotulo">${esc(cat)}</div>
    <h2 style="margin-top:6px">${g.e} ${esc(g.t)}</h2><p class="mute">${esc(g.r)}</p>
    <ol class="passos ${g.lista ? 'bolinhas' : ''}">${g.p.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
    <div class="linha" style="margin-top:14px;flex-wrap:wrap"><button class="btn" data-a="passoAbrir" data-id="${g.id}">Um passo por vez</button><button class="btn sec" data-a="guiaLido" data-id="${g.id}">${S.lidos[g.id] ? '✅ Lido' : 'Marcar como lido'}</button></div></div>
  ${g.a && g.a.length ? `<div class="card alerta"><h3>⚠️ Atenção</h3>${g.a.map(x => `<p>${esc(x)}</p>`).join('')}</div>` : ''}
  ${g.d ? `<div class="card" style="border-color:var(--ouro);background:var(--ouro-s)"><h3>💡 Dica de pai</h3><p style="margin:0">${esc(g.d)}</p></div>` : ''}
  <p class="mute" style="font-size:.8rem;text-align:center">Fonte: ${esc(g.f || 'Boas práticas')}. Não substitui o pediatra.</p>
  ${nav}`;
}
function telaGuia() {
  if (V.guia) return detalheGuia(guiaPorId(V.guia));
  const lidos = G.filter(g => S.lidos[g.id]).length;
  return `<h2>Guia do Pai</h2><p class="mute">Passo a passo para quem está começando. Você leu ${lidos} de ${G.length}. Guia de apoio: não substitui o pediatra.</p>
  <div class="barra"><i style="width:${Math.round(lidos / G.length * 100)}%"></i></div>
  <input id="gq" type="search" placeholder="Buscar: banho, febre, cólica..." value="${esc(V.q)}" autocomplete="off">
  <p class="rotulo" style="margin:12px 0 4px">Fase da Maya</p>
  <div class="abas">${[['', 'Todas'], ['agora', '📍 Agora'], ...FASES].map(([k, n]) => `<button class="${V.fase === k ? 'on' : ''}" data-a="guiaFase" data-t="${k}">${n}</button>`).join('')}</div>
  <p class="rotulo" style="margin:12px 0 4px">Assunto</p>
  <div class="abas">${[['todos', 'Todos'], ['fav', '⭐ Favoritos'], ...CATS].map(([k, n]) => `<button class="${V.cat === k ? 'on' : ''}" data-a="guiaCat" data-t="${k}">${n}</button>`).join('')}</div>
  <div id="guiaLista">${listaGuias()}</div>`;
}
const PS = { g: null, i: 0 };
function passoRender() {
  const g = PS.g, n = g.p.length;
  $('#passoT').textContent = g.t;
  $('#passoN').textContent = (g.lista ? 'Item ' : 'Passo ') + (PS.i + 1) + ' de ' + n;
  $('#passoTxt').textContent = g.p[PS.i];
  $('#passoA').disabled = PS.i === 0;
  $('#passoP').textContent = PS.i === n - 1 ? 'Concluir' : 'Próximo';
}
function passo(abrir, g) {
  $('#passo').hidden = !abrir;
  if (abrir && g) { PS.g = g; PS.i = 0; passoRender(); telaAcesa(true); } else telaAcesa(false);
}
$('#passoX').addEventListener('click', () => passo(false));
$('#passoA').addEventListener('click', () => { if (PS.i > 0) { PS.i--; passoRender(); } });
$('#passoP').addEventListener('click', () => {
  if (PS.i < PS.g.p.length - 1) { PS.i++; passoRender(); return; }
  S.lidos[PS.g.id] = S.lidos[PS.g.id] || Date.now(); salvar(); passo(false); render(); toast('Guia concluído ✅ Veja o próximo logo abaixo');
});

function telaMais() {
  return `<h2>Mais</h2>
  <div class="card"><h3>Aparência</h3><div class="chips">${[['auto', 'Automático'], ['claro', 'Claro'], ['noite', 'Escuro']].map(([k, n]) => `<button class="chip ${cfg.tema === k ? 'on' : ''}" data-a="tema" data-t="${k}">${n}</button>`).join('')}</div><p class="mute">No automático, fica escuro das 19h às 6h.</p></div>
  <div class="card"><h3>Nascimento da ${esc(cfg.bebe)}</h3><div class="linha entre"><span>${cfg.nasc ? dataHora(+new Date(cfg.nasc)) : 'Ainda não nasceu'}</span><button class="btn sec mini" data-a="nasceu">${cfg.nasc ? 'Alterar' : 'Definir'}</button></div><p class="mute">Usado para contar a idade e os dias de vida no app.</p></div>
  <div class="card"><h3>Assistente de voz 🎤</h3><label>Nome do assistente (você diz “Olá ${esc(nomeIA())}”)</label><input id="cfgIA" maxlength="14" value="${esc(nomeIA())}">
    <div class="linha entre" style="margin-top:14px"><span>Falar as respostas</span><input type="checkbox" id="cfgVoz" ${cfg.voz !== false ? 'checked' : ''}></div>
    <div class="linha entre" style="margin-top:10px"><span>Ouvir sempre (experimental)<br><small class="mute">Só com o app aberto e a tela ligada</small></span><input type="checkbox" id="cfgSempre" ${cfg.sempre ? 'checked' : ''}></div>
    <button class="btn sec bloco" style="margin-top:14px" data-a="vozAbrirAc">🎤 Abrir assistente</button><button class="btn sec bloco" style="margin-top:10px" data-a="vozTeste">🔧 Testar voz e microfone</button></div>
  <div class="card"><h3>Notificações</h3><div class="linha entre"><span id="notifStatus" class="mute">verificando...</span><button class="btn sec mini" data-a="notifPedir">Permitir</button></div></div>
  <div class="card"><h3>Dados</h3><p class="mute">Tudo fica só neste celular. Se trocar de aparelho, leve um backup (as fotos não vão no backup).</p>
    <div class="chips"><button class="btn sec mini" data-a="backup">${ic('download')} Backup</button><button class="btn sec mini" data-a="restaurar">Restaurar</button><button class="btn sec mini" data-a="exportarDiario">${ic('share-2')} Enviar diário</button></div></div>
  <div class="card"><div class="linha entre"><span><h3>Versão ${VERSAO || 'de teste'}</h3><small>${PRONTA ? 'Versão ' + PRONTA.versao + ' pronta para instalar' : 'O app se atualiza sozinho quando tem internet'}</small>${ERRO_ATUALIZ ? `<br><small style="color:var(--alerta)">${esc(ERRO_ATUALIZ)}</small>` : ''}</span><button class="btn sec mini" data-a="${PRONTA ? 'aplicarAtualiz' : 'buscarAtualiz'}">${PRONTA ? 'Atualizar' : 'Procurar'}</button></div></div>`;
}

function render() {
  tema();
  const d = new Date();
  $('#saudacao').textContent = `${saudacao()}, ${cfg.pai}`;
  $('#subtitulo').textContent = `${DIAS[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}`;
  $$('#nav button').forEach(b => b.classList.toggle('ativo', b.dataset.tab === V.tab));
  const sy = window.scrollY;
  $('#view').innerHTML = { inicio: telaInicio, guia: telaGuia, rotina: telaRotina, pedidos: telaPedidos, estoque: telaEstoque, diario: telaDiario, mais: telaMais, marcos: telaMarcos, cartas: telaCartas }[V.tab]();
  window.scrollTo(0, sy);
  carregarFotos();
  if (!$('#luz').hidden) pintarPlantao();
  if (V.tab === 'mais') N.status().then(s => { const el = $('#notifStatus'); if (el) el.textContent = s === 'granted' ? '✅ Ativadas' : '⚠️ Não ativadas: toque em Permitir'; });
}
function ir(tab) { V.tab = tab; V.guia = null; window.scrollTo(0, 0); render(); }

/* ---------------- Modais ---------------- */
let edFoto = null, edFotoApagar = false, edTag = 'momento';
function modalDiario(e) {
  edFoto = null; edFotoApagar = false; edTag = e ? e.tag || 'momento' : 'momento';
  const ts = e ? e.ts : Date.now();
  modal(`<h2>${e ? 'Editar entrada' : 'Nova entrada'}</h2>
  <textarea id="dTxt" placeholder="O que aconteceu hoje com a ${esc(cfg.bebe)}?">${esc(e ? e.t : '')}</textarea>
  <label>Tipo</label><div class="chips" id="dTags">${[['momento', 'Momento'], ['marco', 'Marco ⭐'], ['frase', 'Frase 💬']].map(([k, n]) => `<button class="chip ${edTag === k ? 'on' : ''}" data-a="diaTag" data-t="${k}">${n}</button>`).join('')}</div>
  <label>Quando</label><input id="dQuando" type="datetime-local" value="${paraInput(ts)}">
  <label>Foto</label><div id="dPrev" class="foto-prev" ${e && e.foto ? `data-foto-id="${e.id}"` : ''}>${e && e.foto ? '' : 'Sem foto'}</div>
  <div class="chips" style="margin-top:10px"><button class="btn sec mini" data-a="diaCam">${ic('camera')} Tirar foto</button><button class="btn sec mini" data-a="diaGal">${ic('image')} Galeria</button>${e && e.foto ? `<button class="btn sec mini" data-a="diaFotoRemover">${ic('trash-2')} Remover</button>` : ''}</div>
  <input id="fCam" type="file" accept="image/*" capture="environment" hidden><input id="fGal" type="file" accept="image/*" hidden>
  <div class="linha" style="margin-top:18px"><button class="btn bloco" data-a="diaSalvar" data-id="${e ? e.id : ''}">Salvar</button>${e ? `<button class="btn perigo" data-a="diaExcluir" data-id="${e.id}" aria-label="Excluir">${ic('trash-2')}</button>` : ''}</div>`);
  if (e && e.foto) fotoLer(e.id).then(b => { const p = $('#dPrev'); if (b && p) { p.style.backgroundImage = `url(${URL.createObjectURL(b)})`; } });
}
function modalItem(i) {
  modal(`<h2>${i ? 'Editar item' : 'Novo item'}</h2>
  <label>Nome</label><input id="eNome" value="${esc(i ? i.nome : '')}" placeholder="Ex.: Fraldas P" maxlength="40">
  <div class="grade"><div><label>Quantidade agora</label><input id="eQtd" type="number" inputmode="numeric" min="0" value="${i && i.qtd != null ? i.qtd : ''}" placeholder="?"></div>
  <div><label>Avisar quando for até</label><input id="eMin" type="number" inputmode="numeric" min="0" value="${i ? i.min : 1}"></div></div>
  <label>Unidade</label><input id="eUn" value="${esc(i ? i.un : 'un')}" placeholder="un, pacotes, caixas" maxlength="14">
  <div class="linha" style="margin-top:18px"><button class="btn bloco" data-a="estSalvar" data-id="${i ? i.id : ''}">Salvar</button>${i ? `<button class="btn perigo" data-a="estExcluir" data-id="${i.id}" aria-label="Excluir">${ic('trash-2')}</button>` : ''}</div>`);
}

/* ---------------- Ações ---------------- */
const lembreteEm = v => {
  if (!v) return null;
  if (v === 'noite' || v === 'manha') {
    const d = new Date(); d.setHours(v === 'noite' ? 20 : 8, 0, 0, 0);
    if (v === 'manha' || +d <= Date.now()) d.setDate(d.getDate() + 1);
    return +d;
  }
  return Date.now() + (+v) * MIN;
};
const byId = (arr, id) => arr.find(x => x.id === id);
function textoCompras() {
  const l = baixos().map(i => `• ${i.nome} (acabando)`).concat(S.compras.map(c => `• ${c.t}`));
  return 'Lista de compras da ' + cfg.bebe + ':\n' + l.join('\n');
}
async function compartilhar(titulo, texto) {
  const SH = plugin('Share');
  try { if (SH) return await SH.share({ title: titulo, text: texto, dialogTitle: 'Enviar' }); if (navigator.share) return await navigator.share({ title: titulo, text: texto }); await navigator.clipboard.writeText(texto); toast('Copiado!'); } catch (e) { if (e && /cancel|abort/i.test(e.message || e.name || '')) return; try { await navigator.clipboard.writeText(texto); toast('Copiado!'); } catch { toast('Não consegui compartilhar'); } }
}
const PRESETS = [['Fraldas', 'un', 20], ['Lenços umedecidos', 'pacotes', 1], ['Pomada de assadura', 'un', 1], ['Algodão', 'pacotes', 1], ['Cotonetes', 'caixas', 1], ['Sabonete líquido', 'un', 1]];

const ACOES = {
  /* rotina */
  mamAbrir: () => {
    const u = rotOrd().find(r => r.tipo === 'mam' && r.lado !== 'M'); const prox = u ? (u.lado === 'E' ? 'D' : 'E') : null;
    modal(`<h2>🍼 Mamada</h2>${prox ? `<p class="mute">A última no peito foi no ${u.lado === 'E' ? 'esquerdo' : 'direito'}. Comece pelo ${prox === 'E' ? 'esquerdo' : 'direito'}.</p>` : ''}
    <button class="btn bloco" style="margin-top:8px" data-a="mamIni" data-l="E">Peito esquerdo${prox === 'E' ? ' (sugerido)' : ''}</button>
    <button class="btn bloco" style="margin-top:10px" data-a="mamIni" data-l="D">Peito direito${prox === 'D' ? ' (sugerido)' : ''}</button>
    <h3 style="margin-top:18px">Mamadeira</h3><div class="addlinha"><input id="mMl" type="number" inputmode="numeric" min="0" placeholder="ml (opcional)"><button class="btn" data-a="mamMl">Registrar</button></div>`, true);
  },
  mamIni: el => { S.rot.push({ id: uid(), tipo: 'mam', ini: Date.now(), fim: null, lado: el.dataset.l }); salvar(); fecharModal(); render(); vibrar(); },
  mamMl: () => { const ml = Math.max(0, +$('#mMl').value || 0), t = Date.now(); S.rot.push({ id: uid(), tipo: 'mam', ini: t, fim: t, lado: 'M', ml: ml || undefined }); salvar(); fecharModal(); render(); toast('Mamadeira registrada'); },
  mamTrocar: el => { const r = byId(S.rot, el.dataset.id); if (!r) return; const t = Date.now(); r.fim = t; S.rot.push({ id: uid(), tipo: 'mam', ini: t, fim: null, lado: r.lado === 'E' ? 'D' : 'E' }); salvar(); render(); vibrar(); },
  sonoIni: () => { S.rot.push({ id: uid(), tipo: 'sono', ini: Date.now(), fim: null }); salvar(); render(); vibrar(); },
  rotParar: el => { const r = byId(S.rot, el.dataset.id); if (!r) return; r.fim = Date.now(); salvar(); render(); toast(tituloRot(r).split(' · ')[0] + ': ' + dur(r.fim - r.ini)); },
  frAbrir: () => modal(`<h2>🧷 Fralda</h2><div class="grade"><button class="btn" data-a="frReg" data-t="xixi">Xixi 💧</button><button class="btn" data-a="frReg" data-t="coco">Cocô 💩</button></div><button class="btn bloco" style="margin-top:12px" data-a="frReg" data-t="ambos">Xixi e cocô 💧💩</button>`, true),
  frReg: el => { S.rot.push({ id: uid(), tipo: 'fr', ini: Date.now(), fim: Date.now(), fr: el.dataset.t }); salvar(); fecharModal(); render(); vibrar(); toast('Fralda registrada'); },
  banhoReg: () => { S.rot.push({ id: uid(), tipo: 'banho', ini: Date.now(), fim: Date.now() }); salvar(); render(); toast('Banho registrado 🛁'); },
  rotEditar: el => { const r = byId(S.rot, el.dataset.id); if (r) modalRot(r); },
  rotSalvar: el => {
    const r = byId(S.rot, el.dataset.id); if (!r) return;
    const ini = deInput($('#rIni').value), era = r.fim ? r.fim - r.ini : 0;
    r.ini = ini; r.obs = $('#rObs').value.trim() || undefined;
    if ($('#rLado')) { r.lado = $('#rLado').value; r.ml = r.lado === 'M' ? (+$('#rMl').value || undefined) : undefined; }
    if ($('#rFr')) r.fr = $('#rFr').value;
    if ($('#rDur')) r.fim = ini + Math.max(0, +$('#rDur').value || 0) * MIN; else if (r.fim) r.fim = ini + era;
    salvar(); fecharModal(); render();
  },
  rotExcluir: el => { S.rot = S.rot.filter(r => r.id !== el.dataset.id); salvar(); fecharModal(); render(); },
  rotEnviar: () => compartilhar('Rotina da ' + cfg.bebe, textoDia()),
  ir: el => ir(el.dataset.t),
  guiaAbrir: el => { V.tab = 'guia'; V.guia = el.dataset.id; window.scrollTo(0, 0); render(); },
  guiaVoltar: () => { V.guia = null; render(); },
  guiaFase: el => { V.fase = el.dataset.t; render(); },
  guiaCat: el => { V.cat = el.dataset.t; render(); },
  guiaFav: el => { const id = el.dataset.id; if (S.fav[id]) delete S.fav[id]; else S.fav[id] = 1; salvar(); render(); },
  guiaProx: el => { const id = el.dataset.id; S.lidos[id] = S.lidos[id] || Date.now(); salvar(); const n = el.dataset.n; if (n) { V.guia = n; window.scrollTo(0, 0); render(); toast('Guia marcado como lido ✅'); } else { V.guia = null; render(); toast('Você chegou ao fim da lista 🎉'); } },
  guiaLido: el => { const id = el.dataset.id; if (S.lidos[id]) delete S.lidos[id]; else S.lidos[id] = Date.now(); salvar(); render(); },
  passoAbrir: el => passo(true, guiaPorId(el.dataset.id)),
  nasceu: () => modal(`<h2>A ${esc(cfg.bebe)} nasceu! 💙</h2><label>Data e hora do nascimento</label><input id="nNasc" type="datetime-local" value="${paraInput(cfg.nasc ? +new Date(cfg.nasc) : Date.now())}"><button class="btn bloco" style="margin-top:18px" data-a="nasceuOk">Salvar</button>${cfg.nasc ? '<button class="btn sec bloco" style="margin-top:10px" data-a="nasceuLimpar">Remover data</button>' : ''}`, true),
  nasceuLimpar: () => { cfg.nasc = ''; salvar(); fecharModal(); render(); agendarMesversarios(); },
  nasceuOk: () => { cfg.nasc = new Date(deInput($('#nNasc').value)).toISOString(); salvar(); fecharModal(); render(); toast('Parabéns, pai! 💙', 4000); N.pedir().then(() => agendarMesversarios()); },

  /* pedidos */
  pedChip: el => { const i = $('#pedTxt'); i.value = el.dataset.t; i.focus(); },
  pedAdd: async () => {
    const t = $('#pedTxt').value.trim(); if (!t) return toast('Escreva o pedido');
    const lem = lembreteEm($('#pedQuando').value);
    const p = { id: uid(), nid: proxNid(), t, criado: Date.now(), feito: null, lembrete: lem };
    S.ped.push(p); salvar(); render(); vibrar();
    if (lem) { if (await N.pedir()) await N.agendar(p.nid, 'Pedido da ' + cfg.mae, t, lem, 'pedidos'); else toast('Ative as notificações em Mais para receber o aviso', 4500); }
  },
  pedFeito: el => { const p = byId(S.ped, el.dataset.id); if (!p) return; p.feito = p.feito ? null : Date.now(); if (p.feito) N.cancelar(p.nid); else if (p.lembrete > Date.now()) N.agendar(p.nid, 'Pedido da ' + cfg.mae, p.t, p.lembrete, 'pedidos'); salvar(); render(); },
  pedDel: el => { const p = byId(S.ped, el.dataset.id); if (p) N.cancelar(p.nid); S.ped = S.ped.filter(x => x.id !== el.dataset.id); salvar(); render(); },
  pedLimpar: () => { S.ped = S.ped.filter(p => !p.feito); salvar(); render(); },

  /* estoque */
  estTab: el => { V.est = el.dataset.t; render(); },
  estMais: el => { const i = byId(S.est, el.dataset.id); i.qtd = (i.qtd ?? 0) + 1; salvar(); render(); },
  estMenos: el => { const i = byId(S.est, el.dataset.id); if (i.qtd == null) return; i.qtd = Math.max(0, i.qtd - 1); salvar(); render(); if (i.qtd <= i.min) vibrar(40); },
  estNovo: () => modalItem(null),
  estEditar: el => modalItem(byId(S.est, el.dataset.id)),
  estSalvar: el => {
    const nome = $('#eNome').value.trim(); if (!nome) return toast('Dê um nome ao item');
    const q = $('#eQtd').value, d = { nome, qtd: q === '' ? null : Math.max(0, +q), min: Math.max(0, +$('#eMin').value || 0), un: $('#eUn').value.trim() || 'un' };
    const i = el.dataset.id ? byId(S.est, el.dataset.id) : null;
    if (i) Object.assign(i, d); else S.est.push(Object.assign({ id: uid() }, d));
    salvar(); fecharModal(); render();
  },
  estExcluir: el => { S.est = S.est.filter(i => i.id !== el.dataset.id); salvar(); fecharModal(); render(); },
  estPresets: () => { for (const [nome, un, min] of PRESETS) S.est.push({ id: uid(), nome, un, min, qtd: null }); salvar(); render(); toast('Toque no item para dizer quanto você tem'); },
  comprei: el => { const i = byId(S.est, el.dataset.id); modal(`<h2>Comprei: ${esc(i.nome)}</h2><label>Quantos ${esc(i.un)} entraram?</label><input id="cQtd" type="number" inputmode="numeric" min="1" value="1"><button class="btn bloco" style="margin-top:18px" data-a="compreiOk" data-id="${i.id}">Adicionar ao estoque</button>`, true); },
  compreiOk: el => { const i = byId(S.est, el.dataset.id), n = Math.max(1, +$('#cQtd').value || 1); i.qtd = (i.qtd ?? 0) + n; salvar(); fecharModal(); render(); toast('Estoque atualizado ✅'); },
  compraNova: () => { const t = $('#compraTxt').value.trim(); if (!t) return; S.compras.push({ id: uid(), t }); salvar(); render(); },
  compraOk: el => { S.compras = S.compras.filter(c => c.id !== el.dataset.id); salvar(); render(); toast('Riscado da lista ✅'); },
  compraDel: el => { S.compras = S.compras.filter(c => c.id !== el.dataset.id); salvar(); render(); },
  compartilharLista: () => compartilhar('Lista de compras', textoCompras()),

  /* diário */
  diaNovo: () => modalDiario(null),
  diaEditar: el => modalDiario(byId(S.diario, el.dataset.id)),
  diaTag: el => { edTag = el.dataset.t; $$('#dTags .chip').forEach(c => c.classList.toggle('on', c.dataset.t === edTag)); },
  diaCam: () => $('#fCam').click(),
  diaGal: () => $('#fGal').click(),
  diaFotoRemover: () => { edFoto = null; edFotoApagar = true; const p = $('#dPrev'); p.style.backgroundImage = ''; p.textContent = 'Sem foto'; },
  diaSalvar: async el => {
    const t = $('#dTxt').value.trim();
    if (!t && !edFoto && !(el.dataset.id && !edFotoApagar && byId(S.diario, el.dataset.id)?.foto)) return toast('Escreva algo ou coloque uma foto');
    const ts = deInput($('#dQuando').value);
    let e = el.dataset.id ? byId(S.diario, el.dataset.id) : null;
    if (!e) { e = { id: uid(), foto: false }; S.diario.push(e); }
    Object.assign(e, { t, ts, tag: edTag });
    try {
      if (edFoto) { await fotoSalvar(e.id, edFoto); delete URLS[e.id]; e.foto = true; }
      else if (edFotoApagar && e.foto) { await fotoApagar(e.id); e.foto = false; }
    } catch (err) { toast('Não consegui salvar a foto'); console.warn(err); }
    salvar(); fecharModal(); render(); toast('Salvo no diário 💙');
  },
  diaExcluir: async el => { const e = byId(S.diario, el.dataset.id); if (e && e.foto) await fotoApagar(e.id); S.diario = S.diario.filter(x => x.id !== el.dataset.id); salvar(); fecharModal(); render(); },

  /* mais */
  tema: el => { cfg.tema = el.dataset.t; salvar(); render(); },
  notifPedir: async () => { const ok = await N.pedir(); toast(ok ? 'Notificações ativadas ✅' : 'Permissão negada. Ative nas configurações do Android.', 4000); render(); },
  backup: () => compartilhar('Backup Maya', JSON.stringify({ app: 'pai-da-maya', quando: Date.now(), cfg: S.cfg, ped: S.ped, est: S.est, compras: S.compras, diario: S.diario.map(e => ({ ...e, foto: false })), rot: S.rot, lidos: S.lidos, fav: S.fav, marcos: S.marcos, marcosX: S.marcosX, cartas: S.cartas })),
  restaurar: () => modal(`<h2>Restaurar backup</h2><p class="mute">Cole o texto do backup. Isso substitui o que está no app agora.</p><textarea id="rTxt" placeholder="Cole aqui"></textarea><button class="btn perigo bloco" style="margin-top:14px" data-a="restaurarOk">Restaurar</button>`),
  restaurarOk: () => {
    try {
      const b = JSON.parse($('#rTxt').value.trim());
      if (b.app !== 'pai-da-maya') throw new Error('não é um backup deste app');
      Object.assign(S.cfg, b.cfg || {}); S.ped = b.ped || []; S.est = b.est || []; S.compras = b.compras || []; S.diario = b.diario || []; S.rot = b.rot || []; S.lidos = b.lidos || S.lidos; S.fav = b.fav || {}; S.marcos = b.marcos || {}; S.marcosX = b.marcosX || []; S.cartas = b.cartas || [];
      salvar(); fecharModal(); reagendarTudo(); agendarMesversarios(); render(); toast('Backup restaurado ✅');
    } catch (e) { toast('Backup inválido: ' + (e.message || '').slice(0, 80), 4000); }
  },
  exportarDiario: () => {
    const l = diarioOrd().slice().reverse(); if (!l.length) return toast('O diário está vazio');
    compartilhar('Diário da ' + cfg.bebe, `Diário da ${cfg.bebe}\n\n` + l.map(e => `${dataHora(e.ts)}${diaDeVida(e.ts) ? ' · ' + diaDeVida(e.ts) : ''}\n${e.t || '(só foto)'}`).join('\n\n'));
  },
  buscarAtualiz: () => procurarAtualizacao(true),
  aplicarAtualiz: () => { if (PRONTA && UPD) { toast('Atualizando...'); salvar(); UPD.set({ id: PRONTA.id }); } },
  luzAbrir: () => luz(true),
  /* marcos */
  marcoTog: el => {
    const id = el.dataset.id, m = todosMarcos().find(x => x.id === id); if (!m) return;
    V.mx = V.mx || {}; V.mx[m.fase || id.split('-')[0]] = true;
    if (S.marcos[id]) { delete S.marcos[id]; S.diario = S.diario.filter(e => e.mid !== id); salvar(); render(); return; }
    const ts = Date.now(); S.marcos[id] = ts;
    S.diario.push({ id: uid(), ts, t: `Marco: ${m.t} 🎉`, tag: 'marco', mid: id });
    salvar(); render(); vibrar(60); toast('Marco registrado! 🎉 Foi para o Diário.');
  },
  marcoAdd: el => { const f = el.dataset.f, i = $('#mx-' + f), t = i ? i.value.trim() : ''; if (!t) return toast('Escreva o marco'); S.marcosX.push({ id: 'x' + uid(), fase: f, t }); V.mx = V.mx || {}; V.mx[f] = true; salvar(); render(); },
  /* cartinhas */
  cartaNova: el => modalCarta(null, el.dataset.p),
  cartaEditar: el => { const c = byId(S.cartas, el.dataset.id); if (c) modalCarta(c); },
  cartaSalvar: el => {
    const t = $('#cTxt').value.trim(), para = $('#cPara').value; if (!t) return toast('Escreva a carta primeiro');
    const c = el.dataset.id && byId(S.cartas, el.dataset.id);
    if (c) Object.assign(c, { t, para }); else S.cartas.push({ id: uid(), ts: Date.now(), para, t });
    salvar(); fecharModal(); render(); toast('Carta guardada 💌');
  },
  cartaExcluir: el => { if (!el.dataset.sure) { el.dataset.sure = 1; el.textContent = 'Apagar?'; return; } S.cartas = S.cartas.filter(x => x.id !== el.dataset.id); salvar(); fecharModal(); render(); },
  cartaEnviar: el => { const c = byId(S.cartas, el.dataset.id); if (c) compartilhar('Carta para a ' + cfg.bebe, textoCarta(c)); },
  cartasEnviar: () => compartilhar('Cartinhas para a ' + cfg.bebe, cartasOrd().map(textoCarta).join('\n\n-----\n\n')),
  /* plantão / assistente */
  rotDesfazer: () => { const u = rotOrd()[0]; if (!u) return toast('Nada para desfazer'); S.rot = S.rot.filter(x => x.id !== u.id); salvar(); render(); toast('Desfeito: ' + semEmoji(tituloRot(u))); },
  vozTeste: () => diagVoz(),
  vozChip: el => comando(el.dataset.t),
  vozAbrirAc: () => vozAbrir(true, false),
};
function vibrar(ms = 30) { try { navigator.vibrate && navigator.vibrate(ms); } catch {} }

document.addEventListener('click', e => { const el = e.target.closest('[data-a]'); if (el && ACOES[el.dataset.a]) { e.preventDefault(); ACOES[el.dataset.a](el); } });
document.addEventListener('toggle', e => { const d = e.target; if (d.matches && d.matches('details.fasebox')) { V.mx = V.mx || {}; V.mx[d.dataset.k] = d.open; } }, true);
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !e.target.matches('#pedTxt,#compraTxt')) return;
  e.preventDefault(); const b = e.target.parentElement.querySelector('button[data-a]'); if (b) b.click();
});
document.addEventListener('input', e => { if (e.target.id === 'gq') { V.q = e.target.value; const l = $('#guiaLista'); if (l) l.innerHTML = listaGuias(); } });
document.addEventListener('change', async e => {
  const el = e.target;
  if (el.id === 'cfgNasc') { cfg.nasc = el.value ? new Date(deInput(el.value)).toISOString() : ''; salvar(); toast('Salvo ✅'); agendarMesversarios(); }
  if (el.id === 'cfgIA') { cfg.assistente = el.value.trim() || 'Bento'; salvar(); toast(`Agora é só dizer “Olá ${nomeIA()}”`); }
  if (el.id === 'cfgVoz') { cfg.voz = el.checked; salvar(); if (!cfg.voz) calar(); }
  if (el.id === 'cfgSempre') ligarSempre(el.checked).then(() => { const c = $('#cfgSempre'); if (c) c.checked = !!cfg.sempre; });
  if ((el.id === 'fCam' || el.id === 'fGal') && el.files[0]) {
    try { edFoto = await reduzir(el.files[0]); edFotoApagar = false; const p = $('#dPrev'); if (p) { p.style.backgroundImage = `url(${URL.createObjectURL(edFoto)})`; p.textContent = ''; } } catch { toast('Não consegui abrir essa imagem'); }
    el.value = '';
  }
});
$$('#nav button').forEach(b => { b.insertAdjacentHTML('afterbegin', `<i>${ic(b.dataset.ic)}</i>`); b.addEventListener('click', () => ir(b.dataset.tab)); });
$('#btnMais').innerHTML = ic('settings');
$('#btnMais').addEventListener('click', () => ir('mais'));
$('#btnTema').addEventListener('click', () => { cfg.tema = document.documentElement.classList.contains('noite') ? 'claro' : 'noite'; salvar(); render(); });

/* ---------------- Marcos do mês ---------------- */
const MARCOS = window.MARCOS || {};
const FASES_M = FASES.filter(f => MARCOS[f[0]]);
const marcosDaFase = f => [...(MARCOS[f] || []), ...S.marcosX.filter(x => x.fase === f)];
const todosMarcos = () => FASES_M.flatMap(f => marcosDaFase(f[0]));
const faseMarcos = () => { const f = faseAtual(); return f === 'pre' ? 's1' : f; };
const marcosProg = f => { const l = marcosDaFase(f); return [l.filter(m => S.marcos[m.id]).length, l.length]; };
function itemMarco(m) {
  const ts = S.marcos[m.id];
  return `<button class="marco ${ts ? 'ok' : ''}" data-a="marcoTog" data-id="${m.id}"><i>${ts ? '✅' : '⬜'}</i><span>${esc(m.t)}${ts ? `<small>${data(ts)}${diaDeVida(ts) ? ' · ' + diaDeVida(ts) : ''}</small>` : ''}</span></button>`;
}
function cardMarcosInicio() {
  const f = faseMarcos(), [ok, tot] = marcosProg(f), pend = marcosDaFase(f).filter(m => !S.marcos[m.id]).slice(0, 3);
  return `<div class="sec-titulo"><h3>Marcos: ${esc(nomeFase(f).replace(/^\p{Extended_Pictographic}\S*\s/u, ''))}</h3><button class="btn sec mini" data-a="ir" data-t="marcos">Abrir</button></div>
  <div class="card"><div class="linha entre"><b>Ela já faz isso?</b><small class="mute">${ok} de ${tot}</small></div><div class="barra"><i style="width:${tot ? Math.round(ok / tot * 100) : 0}%"></i></div>
  ${pend.length ? pend.map(itemMarco).join('') : '<div class="vazio">Todos os marcos desta fase 🎉</div>'}</div>`;
}
function telaMarcos() {
  const atual = faseMarcos(), ordem = [atual, ...FASES_M.map(f => f[0]).filter(k => k !== atual)];
  const total = todosMarcos(), feitos = total.filter(m => S.marcos[m.id]).length;
  let h = `<div class="linha" style="justify-content:space-between"><button class="btn sec mini" data-a="ir" data-t="inicio">← Início</button></div>
  <h2 style="margin-top:10px">Marcos da ${esc(cfg.bebe)} ⭐</h2><p class="mute">Cada bebê tem o seu ritmo: use como um álbum, não como uma prova. Marque quando ela fizer pela primeira vez. Cada marco também vai para o Diário. Se algo preocupar, converse com o pediatra.</p>
  <div class="barra"><i style="width:${total.length ? Math.round(feitos / total.length * 100) : 0}%"></i></div><p class="mute" style="margin:0 0 8px">${feitos} de ${total.length} marcos registrados</p>`;
  for (const k of ordem) {
    const [ok, tot] = marcosProg(k);
    h += `<details class="fasebox" data-k="${k}" ${k === atual || (V.mx && V.mx[k]) ? 'open' : ''}><summary><span>${esc(nomeFase(k))}${k === atual && cfg.nasc ? ' <span class="tag verde">agora</span>' : ''}</span><small>${ok}/${tot}</small></summary>
    ${marcosDaFase(k).map(itemMarco).join('')}
    <div class="addlinha" style="margin-top:10px"><input id="mx-${k}" maxlength="80" placeholder="Seu próprio marco..."><button class="btn" data-a="marcoAdd" data-f="${k}">Adicionar</button></div></details>`;
  }
  if (guiaPorId('sinais-alerta-desenvolvimento')) h += `<button class="acao" data-a="guiaAbrir" data-id="sinais-alerta-desenvolvimento"><i class="bolha b-ouro" style="font-size:1.4rem">🚩</i><span>Sinais de alerta no desenvolvimento<small>Quando conversar com o pediatra</small></span></button>`;
  return h;
}

/* ---------------- Cartinhas para a Maya ---------------- */
const PARA = [['pre', 'Antes de você nascer'], ['nasc', 'Quando você nasceu'], ...Array.from({ length: 24 }, (_, i) => ['m' + (i + 1), i + 1 === 12 ? '1 ano (12 meses)' : i + 1 === 24 ? '2 anos (24 meses)' : (i + 1) + (i ? ' meses' : ' mês')]), ['livre', 'Para ler quando crescer']];
const paraNome = k => (PARA.find(p => p[0] === k) || [0, 'Carta'])[1];
const paraOrd = k => PARA.findIndex(p => p[0] === k);
const cartasOrd = () => S.cartas.slice().sort((a, b) => paraOrd(a.para) - paraOrd(b.para) || a.ts - b.ts);
function mesesVida(ref = Date.now()) {
  const n = new Date(cfg.nasc), r = new Date(ref);
  let m = (r.getFullYear() - n.getFullYear()) * 12 + r.getMonth() - n.getMonth(); if (r.getDate() < n.getDate()) m--;
  return Math.max(0, m);
}
function dataMesversario(m) {
  const n = new Date(cfg.nasc), d = new Date(n.getFullYear(), n.getMonth() + m, 1, 20, 0, 0);
  d.setDate(Math.min(n.getDate(), new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()));
  return +d;
}
const proxMesversario = () => {
  if (!nascida()) return null;
  for (let m = mesesVida() ; m <= 24; m++) if (m >= 1 && dataMesversario(m) > Date.now() - 4 * H) return { m, t: dataMesversario(m) };
  return null;
};
const nomeMes = m => m === 12 ? '1 ano' : m === 24 ? '2 anos' : m + (m === 1 ? ' mês' : ' meses');
async function agendarMesversarios() {
  if (!nascida()) return;
  for (let m = 1; m <= 24; m++) {
    const id = 9000 + m, t = dataMesversario(m);
    await N.cancelar(id);
    if (t > Date.now()) await N.agendar(id, `🎉 ${cfg.bebe} faz ${nomeMes(m)} hoje!`, 'Que tal escrever uma cartinha para ela guardar? 💌', t, 'cartas');
  }
}
function cardCartasInicio() {
  const pm = proxMesversario(), n = S.cartas.length;
  const sub = pm ? `Próximo mesversário: ${nomeMes(pm.m)} em ${data(pm.t)}` : nascida() ? 'Escreva para ela ler quando crescer' : 'Escreva antes de ela nascer';
  return `<button class="acao" data-a="ir" data-t="cartas"><i class="bolha b-ouro" style="font-size:1.4rem">💌</i><span>Cartinhas para a ${esc(cfg.bebe)}<small>${n ? n + (n === 1 ? ' carta guardada · ' : ' cartas guardadas · ') : ''}${sub}</small></span></button>`;
}
function telaCartas() {
  const l = cartasOrd(), pm = proxMesversario();
  let h = `<div class="linha" style="justify-content:space-between"><button class="btn sec mini" data-a="ir" data-t="inicio">← Início</button></div>
  <h2 style="margin-top:10px">Cartinhas para a ${esc(cfg.bebe)} 💌</h2>
  <p class="mute">Escreva um pouquinho todo mês. Um dia ela vai ler tudo isso. ${pm ? `O app avisa no mesversário (próximo: ${nomeMes(pm.m)}, ${data(pm.t)}).` : nascida() ? '' : 'Quando ela nascer, o app avisa a cada mesversário.'}</p>
  <button class="btn bloco" data-a="cartaNova" data-p="${pm ? 'm' + pm.m : nascida() ? 'livre' : 'pre'}">${ic('plus')} Escrever carta</button>`;
  h += l.length ? l.map(c => `<button class="card carta" data-a="cartaEditar" data-id="${c.id}"><div class="linha entre"><span class="tag ouro">${esc(paraNome(c.para))}</span><small class="mute">${data(c.ts)}</small></div><p>${esc(c.t.length > 160 ? c.t.slice(0, 160) + '…' : c.t)}</p></button>`).join('') : `<div class="card vazio">Nenhuma carta ainda. Comece contando como foi o dia em que você descobriu que ela vinha.</div>`;
  if (l.length) h += `<button class="btn sec bloco" data-a="cartasEnviar">${ic('share-2')} Enviar todas (guardar ou mandar para a ${esc(cfg.mae)})</button>`;
  return h;
}
function modalCarta(c, para) {
  const sel = c ? c.para : para;
  modal(`<h2>💌 ${c ? 'Carta' : 'Nova carta'}</h2><label>Para quando</label><select id="cPara">${PARA.map(([k, n]) => `<option value="${k}" ${k === sel ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select>
  <label>Querida ${esc(cfg.bebe)},</label><textarea id="cTxt" style="min-height:240px" placeholder="Hoje você...">${esc(c ? c.t : '')}</textarea>
  <div class="linha" style="margin-top:16px"><button class="btn bloco" data-a="cartaSalvar" data-id="${c ? c.id : ''}">Guardar</button>${c ? `<button class="btn sec" data-a="cartaEnviar" data-id="${c.id}" aria-label="Enviar">${ic('share-2')}</button><button class="btn perigo" data-a="cartaExcluir" data-id="${c.id}" aria-label="Excluir">${ic('trash-2')}</button>` : ''}</div>`);
}
const textoCarta = c => `💌 ${paraNome(c.para)} (${data(c.ts)})\n\nQuerida ${cfg.bebe},\n\n${c.t}\n\nCom amor, ${cfg.pai === 'Bruno' ? 'seu pai' : cfg.pai}`;

/* ---------------- Assistente de voz ---------------- */
const temPlug = n => { try { return !NATIVO || !!CAP.isPluginAvailable(n); } catch { return false; } };
const SR = NATIVO && temPlug('SpeechRecognition') ? plugin('SpeechRecognition') : null, TTS = NATIVO && temPlug('TextToSpeech') ? plugin('TextToSpeech') : null;
const erroTxt = e => String((e && (e.message || e.errorMessage || e.code)) || e || '').slice(0, 140);
const SEM_APK = 'Falta o microfone nesta versão do app. Instale o APK novo (aba Releases no GitHub) por cima do atual.';
const nomeIA = () => (cfg.assistente || 'Bento').trim() || 'Bento';
const A = { log: [], pend: null, pendAte: 0, ocupado: false, falando: false, loop: false, erro: '', web: null, lembretes: {} };
const esperar = ms => new Promise(r => setTimeout(r, ms));
/* chamadas nativas podem nunca responder: sempre com prazo */
const nat = (p, ms = 4000) => Promise.race([Promise.resolve(p), esperar(ms).then(() => { throw new Error('sem resposta do Android (' + ms / 1000 + 's)'); })]);
const lev = (a, b) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
const limpo = s => norm(s).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const SAUDACAO = ['ola', 'oi', 'ei', 'ey', 'hey', 'opa', 'alo', 'eai', 'fala'];
/* "Olá Bento, ..." -> { resto: "..." } ; senão null */
function acordou(texto) {
  const orig = String(texto || '').trim().split(/\s+/).filter(Boolean);
  const w = orig.map(x => norm(x).replace(/[^a-z0-9]/g, ''));
  const nome = norm(nomeIA()).replace(/[^a-z0-9]/g, '');
  const tol = nome.length >= 6 ? 2 : nome.length >= 4 ? 1 : 0;
  for (let i = 0; i < w.length; i++) {
    if (lev(w[i], nome) > tol) continue;
    if ((i > 0 && SAUDACAO.includes(w[i - 1])) || (i === 0 && lev(w[i], nome) === 0)) return { resto: orig.slice(i + 1).join(' ').replace(/^[,.\s]+/, '') };
  }
  return null;
}

const NUM = { zero: 0, um: 1, uma: 1, dois: 2, duas: 2, tres: 3, quatro: 4, cinco: 5, seis: 6, sete: 7, oito: 8, nove: 9, dez: 10, onze: 11, doze: 12, treze: 13, quatorze: 14, catorze: 14, quinze: 15, dezesseis: 16, dezessete: 17, dezoito: 18, dezenove: 19, vinte: 20, trinta: 30, quarenta: 40, cinquenta: 50, sessenta: 60, setenta: 70, oitenta: 80, noventa: 90, cem: 100, cento: 100, duzentos: 200, trezentos: 300, quatrocentos: 400, quinhentos: 500 };
/* primeiro número no texto já normalizado: { n, i (índice da próxima palavra) } ou null */
function numero(t) {
  const w = t.split(' ');
  for (let i = 0; i < w.length; i++) {
    if (/^\d+$/.test(w[i])) return { n: +w[i], i: i + 1 };
    if (w[i] in NUM) {
      let n = NUM[w[i]], ult = n, j = i + 1;
      while (j + 1 < w.length && w[j] === 'e' && w[j + 1] in NUM && NUM[w[j + 1]] < ult) { n += NUM[w[j + 1]]; ult = NUM[w[j + 1]]; j += 2; }
      return { n, i: j };
    }
  }
  return null;
}
/* "20 minutos", "meia hora", "uma hora e meia" -> minutos ou null */
function minutosDe(t) {
  if (/\bmeia hora\b/.test(t)) return 30;
  const x = numero(t); if (!x) return null;
  const resto = t.split(' ').slice(x.i).join(' ');
  if (/^(horas?|h)\b/.test(resto)) return x.n * 60 + (/^horas? e meia\b/.test(resto) ? 30 : 0);
  if (/^(min|minutos?)\b/.test(resto)) return x.n;
  if (/^segundos?\b/.test(resto)) return Math.max(1, Math.round(x.n / 60));
  return null;
}
const falaHora = t => { const d = new Date(t), h = d.getHours(), m = d.getMinutes(); return (h === 1 ? 'uma hora' : h === 0 ? 'meia-noite' : h + ' horas') + (m ? ' e ' + m : ''); };
const asHora = t => (new Date(t).getHours() === 1 ? 'à ' : 'às ') + falaHora(t);
const falaDur = ms => {
  const m = Math.round(ms / MIN); if (m < 1) return 'menos de 1 minuto';
  const h = Math.floor(m / 60), r = m % 60;
  return (h ? h + (h === 1 ? ' hora' : ' horas') : '') + (h && r ? ' e ' : '') + (r ? r + (r === 1 ? ' minuto' : ' minutos') : '');
};
const falaAtras = ms => ms < MIN ? 'agora há pouco' : 'há ' + falaDur(ms);

/* mamadas agrupadas: trocar de lado não conta como outra mamada */
function mamadasLista(desde = 0) {
  const s = S.rot.filter(r => r.tipo === 'mam' && r.ini >= desde).sort((a, b) => a.ini - b.ini), out = []; let fimAnt = 0;
  for (const r of s) { if (!out.length || r.ini - fimAnt > 25 * MIN) out.push({ ini: r.ini }); fimAnt = Math.max(fimAnt, r.fim || r.ini); }
  return out;
}
function proxMamada() {
  const l = mamadasLista(Date.now() - 3 * DIA); if (!l.length) return null;
  const iv = []; for (let i = 1; i < l.length; i++) { const d = l[i].ini - l[i - 1].ini; if (d > 40 * MIN && d < 8 * H) iv.push(d); }
  const rec = iv.slice(-6), media = rec.length ? rec.reduce((a, b) => a + b, 0) / rec.length : 0;
  return { ult: l[l.length - 1].ini, media, n: rec.length, quando: media ? l[l.length - 1].ini + media : 0 };
}
const ladoSug = () => { const u = rotOrd().find(r => r.tipo === 'mam' && r.lado !== 'M'); return u ? (u.lado === 'E' ? 'D' : 'E') : 'E'; };
const nomeLado = l => l === 'E' ? 'esquerdo' : 'direito';
function reg(o) { S.rot.push(Object.assign({ id: uid() }, o)); salvar(); render(); vibrar(); }

/* ----- fala e escuta ----- */
const semEmoji = s => String(s).replace(/[\u{1F000}-\u{1FFFF}\u{2190}-\u{27BF}\u{FE0F}★]/gu, '').replace(/\s+/g, ' ').trim();
async function falar(txt) {
  dizer('ia', txt);
  if (cfg.voz === false) return;
  const f = semEmoji(txt); if (!f) return;
  A.falando = true; await pararEscuta(); A.erroTTS = '';
  const web = () => new Promise(res => { try { const u = new SpeechSynthesisUtterance(f); u.lang = 'pt-BR'; u.onend = u.onerror = res; speechSynthesis.cancel(); speechSynthesis.speak(u); setTimeout(res, 3000 + f.length * 90); } catch { res(); } });
  try {
    if (TTS) {
      const t0 = Date.now(); await nat(TTS.speak({ text: f, lang: 'pt-BR', rate: 1.0, pitch: 1.0, volume: 1.0, category: 'ambient' }), 5000 + f.length * 120);
      if (Date.now() - t0 < 300 + f.length * 15) { A.erroTTS = 'terminou rápido demais (sem som?)'; if ('speechSynthesis' in window) await web(); }
    } else if ('speechSynthesis' in window) await web();
  } catch (e) { A.erroTTS = erroTxt(e); if ('speechSynthesis' in window) await web(); }
  A.falando = false;
}
async function calar() { try { if (TTS) await nat(TTS.stop(), 1500); } catch {} try { 'speechSynthesis' in window && speechSynthesis.cancel(); } catch {} A.falando = false; }
async function pararTudo() { await calar(); await pararEscuta(); A.ouvindo = false; A.ocupado = false; estado(''); toast('Parei de falar e de ouvir'); }
async function pararEscuta() { try { if (SR) await nat(SR.stop(), 1500); } catch {} try { A.web && A.web.abort(); } catch {} }
async function garantirMic() {
  if (!SR) return true;
  try {
    const av = await nat(SR.available(), 5000);
    if (!av.available) { A.erro = 'Este celular não tem reconhecimento de voz disponível. Use o campo de texto.'; return false; }
    let p = await nat(SR.checkPermissions(), 5000);
    if (p.speechRecognition !== 'granted') p = await nat(SR.requestPermissions(), 60000);
    if (p.speechRecognition !== 'granted') { A.erro = 'Preciso da permissão do microfone. Ative em Configurações do Android › Apps › Maya › Permissões.'; return false; }
    return true;
  } catch (e) { A.erro = 'Não consegui acessar o microfone: ' + erroTxt(e); return false; }
}
/* escuta uma frase e devolve o texto ('' se não ouviu) */
async function ouvirUma() {
  A.erro = ''; A.ultErro = '';
  if (NATIVO && !SR) { A.erro = SEM_APK; A.fatal = true; return ''; }
  if (SR) {
    if (!(await garantirMic())) { A.fatal = true; return ''; }
    try { await nat(SR.stop(), 1500); } catch {}
    try {
      const r = await Promise.race([SR.start({ language: 'pt-BR', maxResults: 3, partialResults: false, popup: false }), esperar(15000).then(() => { throw new Error('tempo esgotado'); })]);
      A.fatal = false; A.falhas = 0;
      return ((r && r.matches && r.matches[0]) || '').trim();
    } catch (e) { A.ultErro = erroTxt(e); A.falhas = (A.falhas || 0) + 1; nat(SR.stop(), 1500).catch(() => {}); return ''; }
  }
  const W = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!W) { A.erro = 'Este navegador não tem reconhecimento de voz. Use o campo de texto.'; A.fatal = true; return ''; }
  return new Promise(res => {
    let fim = false; const r = new W(); A.web = r; r.lang = 'pt-BR'; r.interimResults = false; r.maxAlternatives = 1;
    r.onresult = e => { fim = true; res(((e.results[0] || [])[0] || {}).transcript || ''); };
    r.onerror = e => { if (e.error === 'not-allowed') { A.erro = 'Permita o microfone no navegador.'; A.fatal = true; } if (!fim) { fim = true; res(''); } };
    r.onend = () => { if (!fim) { fim = true; res(''); } };
    try { r.start(); } catch { res(''); }
  });
}

/* ----- interface (overlay + plantão + toast) ----- */
function dizer(quem, txt) {
  A.log.push([quem, txt]); if (A.log.length > 40) A.log.shift();
  pintarVoz();
  if ($('#voz').hidden) toast((quem === 'eu' ? '🎤 ' : '') + txt, 4500);
  else if (!$('#luz').hidden) toast(txt, 6000);
}
function estado(txt) {
  A.estado = txt || '';
  const e = $('#vozEstado'); if (e) e.textContent = A.estado || ((cfg.sempre ? `Aguardando “Olá ${nomeIA()}”` : 'Toque no microfone e fale') + (A.ouvi ? ` · ouvi: ${A.ouvi}` : ''));
  $('#vozMic').classList.toggle('on', !!A.ouvindo);
  $('#micFab').classList.toggle('on', !!cfg.sempre);
  const lm = $('#luzMic'); if (lm) lm.classList.toggle('on', !!A.ouvindo);
  if (A.estado && !$('#luz').hidden) { const lf = $('#luzFala'); if (lf) lf.textContent = A.estado; }
}
const EXEMPLOS = ['começar mamada esquerda', 'terminar mamada', 'quando é a próxima mamada', 'fralda de cocô', 'ela dormiu', 'quantas fraldas hoje', 'resumo do dia', 'me avise em 20 minutos', 'guia de cólica'];
function pintarVoz() {
  const lg = $('#vozLog'); if (!lg || $('#voz').hidden) return;
  lg.innerHTML = A.log.length ? A.log.map(([q, t]) => `<div class="bal ${q}">${esc(t)}</div>`).join('') : `<p class="mute" style="text-align:center">Diga “Olá ${esc(nomeIA())}” e peça o que quiser, ou toque nas sugestões.</p>`;
  lg.scrollTop = lg.scrollHeight;
}
function vozAbrir(abrir, ouvir) {
  $('#voz').hidden = !abrir;
  if (abrir) {
    $('#vozNome').textContent = '🎤 ' + nomeIA();
    $('#vozChips').innerHTML = EXEMPLOS.map(x => `<button class="chip" data-a="vozChip" data-t="${esc(x)}">${esc(x)}</button>`).join('');
    $('#vozOpt').innerHTML = `<label class="sw"><input type="checkbox" id="vozFalar" ${cfg.voz !== false ? 'checked' : ''}> Falar as respostas</label><label class="sw"><input type="checkbox" id="vozSempre" ${cfg.sempre ? 'checked' : ''}> Ouvir sempre “Olá ${esc(nomeIA())}” (experimental)</label>`;
    if (!A.loop && !A.falando && A.ocupado && !A.ouvindoDesde) { A.ocupado = false; A.ouvindo = false; }
    pintarVoz(); estado(A.estado);
    if (ouvir) escutarComando();
  } else { calar(); if (A.ouvindo || A.ocupado) { pararEscuta(); if (!A.loop) { A.ouvindo = false; A.ocupado = false; } } estado(''); }
}
async function escutarComando() {
  if (A.ocupado) { calar(); pararEscuta(); if (!A.loop) { A.ocupado = false; A.ouvindo = false; } estado(''); return; }
  A.ocupado = true; A.ouvindo = true; await calar(); estado('Ouvindo…');
  try {
    let t = await ouvirUma();
    if (!t) { A.ouvindo = false; estado(''); await falar(A.erro || 'Não ouvi nada' + (A.ultErro ? ' (' + A.ultErro + ')' : '') + '. Toque no microfone e fale de novo.'); return; }
    const w = acordou(t); if (w) t = w.resto;
    if (!t) { A.ouvindo = false; await falar('Olá, como posso ajudar?'); A.ouvindo = true; estado('Ouvindo…'); t = await ouvirUma(); }
    A.ouvindo = false; estado('');
    if (t) await comando(t); else await falar('Não ouvi nada. Toque no microfone e fale de novo.');
  } finally { A.ouvindo = false; A.ocupado = false; estado(''); }
}
async function comando(t) {
  dizer('eu', t); estado('Pensando…');
  let r; try { r = await interpretar(t); } catch (e) { console.warn(e); r = 'Deu um erro aqui. Tente de novo.'; }
  estado(''); if (r) await falar(r);
}
async function loopSempre() {
  if (A.loop || !cfg.sempre) return; A.loop = true; telaAcesa(true);
  try {
    while (cfg.sempre && !document.hidden) {
      if (A.falando || A.ocupado) { await esperar(400); continue; }
      estado('');
      const t = await ouvirUma();
      A.ouvi = t ? '“' + t.slice(0, 40) + '”' : (A.ultErro ? '(' + A.ultErro + ')' : ''); estado('');
      if (A.fatal) { cfg.sempre = false; salvar(); await falar(A.erro || 'Não consegui ouvir. Desliguei o modo “ouvir sempre”.'); break; }
      if (!t) { if ((A.falhas || 0) > 6) { cfg.sempre = false; salvar(); await falar('O reconhecimento de voz está falhando neste celular. Desliguei o modo ouvir sempre. ' + (A.ultErro || '')); break; } await esperar(A.falhas > 2 ? 3000 : 300); continue; }
      const w = acordou(t); if (!w || A.ocupado) continue;
      A.ocupado = true;
      try {
        let c = w.resto;
        if (!c) { await falar('Olá, como posso ajudar?'); A.ouvindo = true; estado('Ouvindo…'); c = await ouvirUma(); A.ouvindo = false; estado(''); }
        if (c) await comando(c); else await falar('Não ouvi o pedido. Me chame de novo.');
      } finally { A.ocupado = false; A.ouvindo = false; estado(''); }
    }
  } finally { A.loop = false; estado(''); render(); telaAcesa(!!cfg.sempre); if (!cfg.sempre) telaAcesa(false); }
}
async function diagVoz() {
  /* se um teste anterior travou, este toque o destrava */
  A.diag = true; A.ocupado = true; A.ouvindo = false; A.falando = false; estado('Testando…');
  const eu = A.diagId = (A.diagId || 0) + 1, p = m => dizer('ia', m);
  try {
    p('Teste iniciado. App nativo: ' + (NATIVO ? 'sim' : 'não') + ' · microfone: ' + (SR ? 'ok' : 'AUSENTE (instale o APK novo)') + ' · fala: ' + (TTS ? 'ok' : 'AUSENTE (instale o APK novo)'));
    if (NATIVO && !SR) return;
    p('1/4 Parando qualquer escuta em andamento...'); await pararEscuta(); await calar();
    if (SR) { try { p('2/4 Microfone: disponível=' + (await nat(SR.available(), 5000)).available + ', permissão=' + (await nat(SR.checkPermissions(), 5000)).speechRecognition); } catch (e) { p('2/4 Erro no microfone: ' + erroTxt(e)); } }
    if (TTS) {
      try { p('3/4 Fala em português suportada: ' + (await nat(TTS.isLanguageSupported({ lang: 'pt-BR' }), 5000)).supported); } catch (e) { p('3/4 Idioma da fala: ' + erroTxt(e)); }
      try { const v = (await nat(TTS.getSupportedVoices(), 5000)).voices || []; p('Vozes instaladas: ' + v.length + ' (em português: ' + v.filter(x => /pt/i.test(x.lang || '')).length + ')'); } catch (e) { p('Vozes: ' + erroTxt(e)); }
    }
    const cv = cfg.voz; cfg.voz = true; A.erroTTS = ''; const t0 = Date.now();
    p('4/4 Falando agora... (volume de MÍDIA alto)');
    await falar('Teste de voz. Se você ouviu isso, a fala está funcionando.'); cfg.voz = cv;
    p((A.erroTTS ? 'Fala com problema: ' + A.erroTTS : 'Fala sem erro') + ` (durou ${Math.round((Date.now() - t0) / 100) / 10}s)`);
    p('Agora diga “olá” (até 15 segundos)...');
    A.ouvindo = true; estado('Ouvindo…'); const t = await ouvirUma(); A.ouvindo = false; estado('');
    p(t ? 'Entendi: “' + t + '”' : 'Não ouvi nada. ' + (A.erro || A.ultErro || 'Sem erro registrado.'));
  } catch (e) { p('Erro no teste: ' + erroTxt(e)); }
  finally { A.ouvindo = false; A.ocupado = false; A.diag = false; estado(''); }
}
async function ligarSempre(on) {
  cfg.sempre = !!on; salvar();
  if (on) { if (!(await garantirMic())) { cfg.sempre = false; salvar(); toast(A.erro, 5000); estado(''); return; } toast(`Pronto. Diga “Olá ${nomeIA()}”. Mantenha o app aberto.`, 4500); loopSempre(); }
  else { await pararEscuta(); telaAcesa(false); }
  estado('');
}

/* ----- interpretação dos comandos (regras em português, sem internet) ----- */
const tem = (t, rx) => rx.test(t);
const PARADAS = new Set('o a os as um uma de da do das dos no na nos nas em para por com que e ou me eu ela ele maya como faco fazer faz guia sobre sei quero preciso ensina explica passo'.split(' '));
function buscarGuia(t) {
  const q = t.split(' ').filter(x => x.length > 2 && !PARADAS.has(x));
  if (!q.length) return null;
  let melhor = null, pt = 0;
  for (const g of G) {
    const ti = norm(g.t), re = norm(g.r), pa = norm(g.p.join(' '));
    let s = 0; for (const w of q) { const stem = w.length > 5 ? w.slice(0, w.length - 1) : w; if (ti.includes(stem)) s += 4; if (re.includes(stem)) s += 2; if (pa.includes(stem)) s += 1; }
    if (s > pt) { pt = s; melhor = g; }
  }
  return pt >= 3 ? melhor : null;
}
const nomeAtv = r => r.tipo === 'mam' ? (r.lado === 'M' ? 'mamadeira' : 'mamada') : r.tipo === 'sono' ? 'soneca' : r.tipo === 'fr' ? 'fralda' : 'banho';
function pendente(tipo, extra) { A.pend = Object.assign({ tipo }, extra); A.pendAte = Date.now() + 90e3; }

async function interpretar(orig) {
  const t = limpo(orig), b = cfg.bebe;
  if (A.pend && Date.now() > A.pendAte) A.pend = null;

  /* resposta a uma pergunta que o assistente fez */
  if (A.pend) {
    const p = A.pend;
    if (tem(t, /\b(cancela|cancelar|deixa|esquece|nao precisa|nada)\b/)) { A.pend = null; return 'Tudo bem, deixei para lá.'; }
    if (p.tipo === 'fralda') {
      const co = tem(t, /\b(coco|cocozinho|fezes|popo|numero dois|caca)\b/), xi = tem(t, /\b(xixi|pipi|urina|numero um)\b/), dois = tem(t, /\b(dois|ambos|os dois|as duas|tudo)\b/);
      if (co || xi || dois) { A.pend = null; return registrarFralda(co && xi || dois ? 'ambos' : co ? 'coco' : 'xixi'); }
      return 'Foi xixi, cocô ou os dois?';
    }
    if (p.tipo === 'ml') {
      const x = numero(t);
      if (x || tem(t, /\b(nao sei|sem medir|nao medi|nao)\b/)) { A.pend = null; const ml = x ? x.n : 0, tt = Date.now(); reg({ tipo: 'mam', ini: tt, fim: tt, lado: 'M', ml: ml || undefined }); return ml ? `Anotei mamadeira de ${ml} mililitros.` : 'Anotei a mamadeira.'; }
      return 'Quantos mililitros? Se não sabe, diga “não sei”.';
    }
    if (p.tipo === 'sim') {
      if (tem(t, /\b(sim|isso|pode|claro|quero|confirma|ok|manda)\b/)) { A.pend = null; return await p.fn(); }
      if (tem(t, /\b(nao|nunca|deixa)\b/)) { A.pend = null; return 'Ok, não fiz nada.'; }
    }
    if (p.tipo === 'nota') { A.pend = null; return anotar(orig); }
    if (p.tipo === 'lembrete') {
      const m = minutosDe(t) || (numero(t) || {}).n;
      if (m) { A.pend = null; return lembrar(m, p.txt); }
      return 'Em quantos minutos?';
    }
  }

  if (tem(t, /^(para|parar|pare|silencio|calar|cala a boca|chega)( de falar)?$/)) { await calar(); return ''; }
  if (!t) return 'Não entendi. Diga, por exemplo: começar mamada esquerda.';

  /* emergência */
  if (tem(t, /\b(nao respira|parou de respirar|azul|azulad[ao]|roxo|roxa|convuls\w*|desmai\w*|engasg\w*|sangrando|socorro|emergencia|samu|desacordad[ao]|molinh[ao] demais)\b/)) {
    vozAbrir(false); luz(false); ir('guia'); V.guia = 'sos-bebe'; render();
    return `Se a ${b} não respira, está azulada, desacordada, engasgada ou convulsionando, ligue 192 agora. Abri o guia de emergência na tela.`;
  }
  if (tem(t, /\b(ajuda|ajudar|o que (voce )?(faz|sabe)|comandos|exemplos|o que (eu )?posso (falar|pedir|dizer))\b/) && !tem(t, /\b(guia|como)\b/)) {
    return 'Posso registrar mamada, fralda, sono e banho, dizer quando foi a última mamada e quando deve ser a próxima, fazer resumo do dia, criar lembrete, anotar no diário e abrir guias. Por exemplo: começar mamada esquerda.';
  }
  if (tem(t, /\b(desfaz\w*|apaga\w* o ultimo|errei|cancela\w* o ultimo|foi engano)\b/)) {
    const u = rotOrd()[0]; if (!u) return 'Não tem nada registrado para desfazer.';
    S.rot = S.rot.filter(x => x.id !== u.id); salvar(); render(); return `Desfeito. Apaguei o último registro: ${semEmoji(tituloRot(u)).toLowerCase()}.`;
  }

  /* perguntas sobre mamada */
  if (tem(t, /\bproxim\w* (mamada|mamar|vez)\b|\bquando (ela )?(vai|deve|tem que|precisa|volta a) mamar\b|\bquando (e|sera|seria) (a )?proxim/)) {
    const p = proxMamada(); if (!p) return 'Ainda não tenho mamadas anotadas para estimar. Registre algumas e eu calculo.';
    if (p.n < 2) return `A última mamada foi ${falaAtras(Date.now() - p.ult)}. Preciso de mais mamadas registradas para estimar a próxima. Em recém-nascido, o normal é mamar sempre que pedir.`;
    const dif = p.quando - Date.now();
    return `Pelas últimas mamadas, a ${b} mama a cada ${falaDur(p.media)}. ` + (dif > 0 ? `A próxima deve ser por volta ${asHora(p.quando).replace(/^às /, 'das ').replace(/^à /, 'da ')}, daqui a ${falaDur(dif)}.` : `Já deu a hora: pelo ritmo seria por volta ${asHora(p.quando).replace(/^às /, 'das ').replace(/^à /, 'da ')}.`) + ' É só uma estimativa; se ela pedir antes, ofereça.';
  }
  if (tem(t, /\b(ha|faz) quanto tempo (que )?(ela )?(mamou|comeu|mama)|\bquando (foi|ela mamou|mamou)\b|\bultim\w* mamada\b|\bquando foi a ultima\b/) && !tem(t, /fralda|dorm|banho/)) {
    const m = rodando('mam'); if (m) return `Ela está mamando agora, há ${falaDur(Date.now() - m.ini)}.`;
    const u = ultimoDe('mam'); if (!u) return 'Ainda não tem mamada registrada.';
    return `A última mamada foi ${falaAtras(Date.now() - u.ini)}, ${asHora(u.ini)}, ${u.lado === 'M' ? 'na mamadeira' + (u.ml ? ' com ' + u.ml + ' mililitros' : '') : 'no peito ' + nomeLado(u.lado) + (u.fim ? ', durou ' + falaDur(u.fim - u.ini) : '')}.`;
  }
  if (tem(t, /\bquanto tempo\b.*\b(mamando|mamada|mamou)\b|\b(mamando|mamada) (ha|faz) quanto\b/)) {
    const m = rodando('mam'); if (m) return `Ela está mamando há ${falaDur(Date.now() - m.ini)}, no peito ${nomeLado(m.lado)}.`;
    const u = rotOrd().find(r => r.tipo === 'mam' && r.fim && r.lado !== 'M'); return u ? `A última mamada no peito durou ${falaDur(u.fim - u.ini)}.` : 'Ainda não tem mamada registrada.';
  }
  if (tem(t, /\bqual (lado|peito)\b|\bde que lado\b|\bpor qual (lado|peito)\b/)) {
    return `A última mamada no peito foi no ${ultimoLado() ? nomeLado(ultimoLado()) : 'lado que ainda não anotei'}. Comece pelo ${nomeLado(ladoSug())}.`;
  }

  /* perguntas: fralda, sono, banho, resumo, idade, hora */
  if (tem(t, /\b(quantas?|quanto|resumo|como foi|balanco)\b.*\bfraldas?\b|\bfraldas? (hoje|do dia)\b/)) { const r = resumoDia(); return `Hoje foram ${plural(r.xixi, 'fralda', 'fraldas')} com xixi e ${r.coco} com cocô.`; }
  if (tem(t, /\b(ultima|quando)\b.*\b(fralda|troca|trocou)\b|\bfralda\b.*\b(ultima|quando)\b|\bquando (trocou|trocamos|foi trocad)/)) { const u = ultimoDe('fr'); return u ? `A última fralda foi ${falaAtras(Date.now() - u.ini)}, de ${u.fr === 'ambos' ? 'xixi e cocô' : u.fr === 'coco' ? 'cocô' : 'xixi'}.` : 'Ainda não tem fralda registrada.'; }
  if (tem(t, /\b(quanto|quantas horas)\b.*\b(dormiu|sono|dormindo|dorme)\b|\bsono (de )?hoje\b/)) { const r = resumoDia(), z = rodando('sono'); return z ? `Ela está dormindo há ${falaDur(Date.now() - z.ini)}. Hoje, no total, ${falaDur(r.sonoMs)} de sono.` : r.sonoMs ? `Hoje ela dormiu ${falaDur(r.sonoMs)} no total.` : 'Ainda não tem sono registrado hoje.'; }
  if (tem(t, /\b(quando|ha quanto tempo|faz quanto tempo)\b.*\b(dormiu|acordou)\b|\b(esta|ta) (dormindo|acordad[ao])\b|\bultim\w* soneca\b/)) {
    const z = rodando('sono'); if (z) return `Ela está dormindo desde ${asHora(z.ini)}, há ${falaDur(Date.now() - z.ini)}.`;
    const u = ultimoDe('sono'); return u ? `Ela acordou ${falaAtras(Date.now() - (u.fim || u.ini))}, depois de dormir ${falaDur(durRot(u))}.` : 'Ainda não tem sono registrado.';
  }
  if (tem(t, /\b(ultimo|quando)\b.*\bbanho\b|\bbanho\b.*\b(ultimo|quando)\b/)) { const u = ultimoDe('banho'); return u ? `O último banho foi ${falaAtras(Date.now() - u.ini)}.` : 'Ainda não tem banho registrado.'; }
  if (tem(t, /\b(resumo|como foi o dia|como esta o dia|balanco|como foi hoje)\b/)) {
    const r = resumoDia(), nm = mamadasLista(inicioDia()).length;
    return `Hoje: ${nm} ${nm === 1 ? 'mamada' : 'mamadas'}${r.ml ? ', com ' + r.ml + ' mililitros de mamadeira' : ''}, ${plural(r.xixi, 'fralda', 'fraldas')} com xixi, ${r.coco} com cocô, ${r.sonoMs ? falaDur(r.sonoMs) + ' de sono' : 'sem sono registrado'}${r.banho ? ' e ' + r.banho + ' banho' : ''}.`;
  }
  if (tem(t, /\b(que horas|horas sao|hora (e|sao))\b/)) return (new Date().getHours() === 1 ? 'É ' : 'São ') + falaHora(Date.now()) + '.';
  if (tem(t, /\b(que dia|data de hoje|dia e hoje)\b/)) return `Hoje é ${DIAS[new Date().getDay()]}, ${new Date().getDate()} de ${MESES[new Date().getMonth()]}.`;
  if (tem(t, /\b(idade|quantos (dias|meses|anos)|quanto tempo (ela )?tem|quantas semanas)\b/)) return nascida() ? `A ${b} tem ${idadeBebe().txt}.` : `A ${b} ainda não nasceu no app.`;

  /* lembrete */
  if (tem(t, /\b(me )?(avis\w*|lembr\w*|desperta\w*|alarme|timer|temporizador)\b|\bdaqui a\b|\bme chama (em|daqui)\b/)) {
    const m = minutosDe(t), mt = t.match(/\b(?:para|pra|de|que)\s+(.{3,60})$/); const txt = mt ? mt[1].replace(/^(que )?/, '') : '';
    if (!m) { pendente('lembrete', { txt }); return 'Em quantos minutos?'; }
    return lembrar(m, txt);
  }

  if (tem(t, /\b(ler|leia|le|le os|ler os|continua\w*)\b.*\bpassos?\b|\bleia (o )?guia\b/) && A.guiaAtual) return lerGuia(A.guiaAtual);
  if (tem(t, /\b(guia|como|me ensina|ensina|me explica|passo a passo|o que fazer|o que eu faco)\b/) || tem(t, /\b(colica|febre|choro|chora|refluxo|umbigo|assadura|vacina|soluco|arroto|mamilo|gases?)\b/)) {
    const g = buscarGuia(t);
    if (g) { A.guiaAtual = g.id; vozAbrir(false); luz(false); ir('guia'); V.guia = g.id; render(); pendente('sim', { fn: () => lerGuia(g.id) }); return `Abri o guia ${g.t}. ${g.r} Quer que eu leia os passos?`; }
    V.q = t.replace(/\b(guia|como|de|do|da|me|ensina|explica)\b/g, '').trim(); vozAbrir(false); luz(false); ir('guia'); return 'Não achei um guia exato. Mostrei a lista de guias com a sua busca.';
  }


  /* registrar: mamada */
  if (tem(t, /\bmamadeira\b/) && !tem(t, /\bquando|ultim/)) {
    const x = numero(t); if (x && x.n >= 5) { const tt = Date.now(); reg({ tipo: 'mam', ini: tt, fim: tt, lado: 'M', ml: x.n }); return `Anotei mamadeira de ${x.n} mililitros.`; }
    pendente('ml'); return 'Quantos mililitros? Se não sabe, diga “não sei”.';
  }
  if (tem(t, /\b(trocar|trocou|troca|troquei|outro|outra|mudar|muda|virar|passa(r|ndo)? para)\b.*\b(lado|peito)\b|\b(lado|peito)\b.*\b(trocar|trocou|outro)\b|\btroca de lado\b/)) {
    const m = rodando('mam'); if (!m || m.lado === 'M') return 'Não tem mamada no peito em andamento. Diga: começar mamada esquerda ou direita.';
    ACOES.mamTrocar({ dataset: { id: m.id } }); return `Troquei: agora no peito ${nomeLado(m.lado === 'E' ? 'D' : 'E')}. A primeira parte durou ${falaDur(Date.now() - m.ini)}.`;
  }
  if (tem(t, /\b(termin\w*|acab\w*|parou?|parar|pare|fim|encerr\w*|finaliz\w*|soltou|largou)\b.*\b(mamad\w*|mamar|mamando|peito)\b|\b(mamad\w*|peito)\b.*\b(termin\w*|acab\w*|parou|fim|encerr\w*)\b|\bterminou\b$/)) {
    const m = rodando('mam'); if (!m) return 'Não tem mamada em andamento.';
    m.fim = Date.now(); salvar(); render(); return `Mamada anotada: ${falaDur(m.fim - m.ini)} no peito ${nomeLado(m.lado)}. A próxima pode começar pelo ${nomeLado(ladoSug())}.`;
  }
  if (tem(t, /\b(mamada|mamar|mamando|mama|peito|amament\w*)\b/) && !tem(t, /\b(quando|quanto|qual|ultim\w*)\b/)) {
    const ja = rodando('mam');
    const l = tem(t, /\besquerd\w*\b/) ? 'E' : tem(t, /\bdireit\w*\b/) ? 'D' : ladoSug();
    const sug = !tem(t, /\b(esquerd\w*|direit\w*)\b/);
    const inicia = () => { const m = rodando('mam'); if (m) m.fim = Date.now(); reg({ tipo: 'mam', ini: Date.now(), fim: null, lado: l }); return `Cronometrando a mamada no peito ${nomeLado(l)}${sug ? ', o lado sugerido' : ''}. Quando acabar, diga terminar mamada.`; };
    if (ja) { pendente('sim', { fn: async () => { const r = inicia(); return r; } }); return `Já tem uma mamada em andamento, há ${falaDur(Date.now() - ja.ini)}. Quer que eu termine e comece outra?`; }
    return inicia();
  }

  /* registrar: fralda, sono, banho */
  if (tem(t, /\b(fralda|xixi|coco|cocozinho|fezes|popo|cac[ao])\b/)) {
    const co = tem(t, /\b(coco|cocozinho|fezes|popo|caca)\b/), xi = tem(t, /\b(xixi|pipi|urina)\b/), dois = tem(t, /\b(dois|ambos|os dois|tudo)\b/);
    if (co || xi || dois) return registrarFralda(co && xi || dois ? 'ambos' : co ? 'coco' : 'xixi');
    pendente('fralda'); return 'Foi xixi, cocô ou os dois?';
  }
  if (tem(t, /\b(acordou|acordando|despertou|acabou o sono|terminou o sono|fim da soneca)\b/)) {
    const z = rodando('sono'); if (!z) return 'Não tem sono em andamento.';
    z.fim = Date.now(); salvar(); render(); return `Sono anotado: ${falaDur(z.fim - z.ini)}.`;
  }
  if (tem(t, /\b(dormiu|dormindo|vai dormir|foi dormir|adormeceu|pegou no sono|dormir|soneca)\b/)) {
    if (rodando('sono')) return 'Já estou cronometrando o sono dela.';
    reg({ tipo: 'sono', ini: Date.now(), fim: null }); return `Ok, ${b} dormiu ${asHora(Date.now())}. Cronometrando o sono. Quando ela acordar, diga acordou.`;
  }
  if (tem(t, /\b(banho|banhei|banhou|tomou banho)\b/)) { reg({ tipo: 'banho', ini: Date.now(), fim: Date.now() }); return 'Banho anotado.'; }

  /* diário */
  if (tem(t, /\b(diario|marco)\b/) && tem(t, /\b(anota\w*|escrev\w*|registr\w*|salv\w*|coloc\w*|guard\w*|adicion\w*)\b/)) {
    const m = orig.match(/di[aá]rio\s*(?:que|:|,)?\s*(.+)$/i); const txt = m ? m[1].trim() : '';
    if (!txt) { pendente('nota'); return 'O que devo anotar no diário?'; }
    return anotar(txt);
  }

  /* abrir telas e guias */
  if (tem(t, /\b(plantao|modo noturno|luz vermelha|modo madrugada)\b/)) { vozAbrir(false); luz(true); return 'Abrindo o modo plantão.'; }
  const TELAS = [[/\b(rotina)\b/, 'rotina', 'a rotina'], [/\b(pedidos?)\b/, 'pedidos', 'os pedidos'], [/\b(estoque)\b/, 'estoque', 'o estoque'], [/\b(diario)\b/, 'diario', 'o diário'], [/\b(marcos?)\b/, 'marcos', 'os marcos'], [/\b(cart\w+)\b/, 'cartas', 'as cartinhas'], [/\b(inicio|home|tela inicial|principal)\b/, 'inicio', 'o início'], [/\b(configuracoes?|ajustes|mais)\b/, 'mais', 'as configurações']];
  if (tem(t, /\b(abr\w+|mostr\w+|ir|va|vai|leva\w*|volt\w+)\b/) && !tem(t, /\bguia\b/)) {
    const tl = TELAS.find(x => x[0].test(t)); if (tl) { vozAbrir(false); luz(false); ir(tl[1]); return 'Abrindo ' + tl[2] + '.'; }
  }

  if (tem(t, /\b(obrigad\w*|valeu|brigad\w*)\b/)) return 'De nada! Conte comigo.';
  if (tem(t, /^(ola|oi|bom dia|boa tarde|boa noite|e ai|ei)\b/)) return 'Olá, como posso ajudar?';
  return 'Não entendi. Tente: começar mamada esquerda, quando é a próxima mamada, fralda de cocô, ela dormiu, ou resumo do dia.';
}
const ultimoLado = () => { const u = rotOrd().find(r => r.tipo === 'mam' && r.lado !== 'M'); return u ? u.lado : null; };
function registrarFralda(k) { reg({ tipo: 'fr', ini: Date.now(), fim: Date.now(), fr: k }); const r = resumoDia(); return `Anotei fralda de ${k === 'ambos' ? 'xixi e cocô' : k === 'coco' ? 'cocô' : 'xixi'}. Hoje já são ${r.xixi} com xixi e ${r.coco} com cocô.`; }
function anotar(txt) {
  const e = { id: uid(), ts: Date.now(), t: String(txt).trim().replace(/^./, c => c.toUpperCase()), tag: 'momento' };
  S.diario.push(e); salvar(); render(); return 'Anotei no diário.';
}
function lerGuia(id) {
  const g = guiaPorId(id); if (!g) return 'Não achei esse guia.';
  A.pend = null;
  return g.p.map((x, i) => `Passo ${i + 1}. ${x}`).join(' ') + (g.a && g.a.length ? ' Atenção: ' + g.a.join(' ') : '');
}
function lembrar(min, txt) {
  min = Math.max(1, Math.min(min, 24 * 60)); const quando = Date.now() + min * MIN, id = proxNid(), msg = txt || 'Hora do lembrete';
  salvar(); N.agendar(id, 'Lembrete da ' + cfg.bebe, msg, quando, 'inicio');
  clearTimeout(A.lembretes[id]); A.lembretes[id] = setTimeout(() => { if (!document.hidden) { vibrar(300); falar('Lembrete: ' + msg + '.'); } }, min * MIN);
  return `Certo, aviso em ${falaDur(min * MIN)}${txt ? ': ' + txt : ''}.`;
}

/* ---------------- Modo plantão ---------------- */
const mamandoAgora = () => rodando('mam');
function htmlPlantao() {
  const m = rodando('mam'), z = rodando('sono'), r = resumoDia(), u = ultimoDe('mam'), pm = proxMamada();
  let h = '';
  if (m) h += `<div class="pl-ativo"><div class="rot">Mamando · ${esc(LADO[m.lado])}</div><div class="num" data-desde="${m.ini}">${crono(Date.now() - m.ini)}</div></div>`;
  if (z) h += `<div class="pl-ativo"><div class="rot">Dormindo desde ${hora(z.ini)}</div><div class="num" data-desde="${z.ini}">${crono(Date.now() - z.ini)}</div></div>`;
  h += `<div class="pl-info">Última mamada: ${u ? rel(u.ini) : '–'}${pm && pm.quando ? ' · próxima ~ ' + hora(pm.quando) : ''}</div><div class="pl-grade">`;
  if (m) {
    h += `<button class="pl-bt" data-a="rotParar" data-id="${m.id}"><b>✅</b>Terminar mamada</button>`;
    h += m.lado !== 'M' ? `<button class="pl-bt" data-a="mamTrocar" data-id="${m.id}"><b>🔄</b>Trocar lado</button>` : '<span></span>';
  } else {
    const s = ladoSug();
    h += `<button class="pl-bt" data-a="mamIni" data-l="E"><b>🍼</b>Mamada esquerda${s === 'E' ? ' ★' : ''}</button><button class="pl-bt" data-a="mamIni" data-l="D"><b>🍼</b>Mamada direita${s === 'D' ? ' ★' : ''}</button>`;
  }
  h += `<button class="pl-bt" data-a="frReg" data-t="xixi"><b>💧</b>Xixi</button><button class="pl-bt" data-a="frReg" data-t="coco"><b>💩</b>Cocô</button>`;
  h += `<button class="pl-bt" data-a="frReg" data-t="ambos"><b>💧💩</b>Os dois</button>`;
  h += z ? `<button class="pl-bt" data-a="rotParar" data-id="${z.id}"><b>☀️</b>Acordou</button>` : `<button class="pl-bt" data-a="sonoIni"><b>😴</b>Dormiu</button>`;
  h += `</div><div class="pl-info">Hoje: ${mamadasLista(inicioDia()).length} mamadas · ${r.xixi}💧 ${r.coco}💩${r.sonoMs ? ' · sono ' + dur(r.sonoMs) : ''}</div>
  <button class="pl-peq" data-a="rotDesfazer">↩ Desfazer último registro</button>`;
  return h;
}
function pintarPlantao() { const p = $('#luzPainel'); if (p && !$('#luz').hidden) p.innerHTML = htmlPlantao(); }

/* ---------------- Modo plantão (luz vermelha + botões grandes) ---------------- */
let wake = null, luzTimer = 0;
async function telaAcesa(on) {
  try {
    if (on) { if ('wakeLock' in navigator && !wake) wake = await navigator.wakeLock.request('screen'); }
    else if (wake && $('#luz').hidden && $('#passo').hidden && !cfg.sempre) { await wake.release(); wake = null; }
  } catch {}
}
function luzBrilho() { $('#luz').style.setProperty('--v', (cfg.luz || 45) / 100); $('#luzBrilho').value = cfg.luz || 45; }
async function luz(abrir) {
  const el = $('#luz');
  if (!abrir && el.hidden) return;
  el.hidden = !abrir;
  clearInterval(luzTimer);
  if (abrir) {
    luzBrilho(); $('#luzFala').textContent = '';
    let n = 0; const t = () => { $('#luzHora').textContent = hora(Date.now()); if (++n % 30 === 0) pintarPlantao(); }; t(); pintarPlantao(); luzTimer = setInterval(t, 1000);
    telaAcesa(true);
    if (SB) { SB.setBackgroundColor({ color: '#000000' }).catch(() => {}); SB.setStyle({ style: 'DARK' }).catch(() => {}); }
  } else {
    telaAcesa(false);
    tema();
  }
}
$('#luzSair').addEventListener('click', () => luz(false));
$('#luzMic').addEventListener('click', () => escutarComando());
$('#luzBrilho').addEventListener('input', e => { cfg.luz = +e.target.value; luzBrilho(); });
$('#luzBrilho').addEventListener('change', salvar);

/* assistente: botões e opções do overlay */
$('#micFab').addEventListener('click', () => vozAbrir(true, true));
$('#vozX').addEventListener('click', () => vozAbrir(false));
$('#vozMic').addEventListener('click', () => escutarComando());
$('#vozParar').addEventListener('click', () => pararTudo());
$('#vozTeste').addEventListener('click', () => diagVoz());
$('#vozForm').addEventListener('submit', e => { e.preventDefault(); const i = $('#vozTxt'), v = i.value.trim(); if (!v) return; i.value = ''; const w = acordou(v); comando(w && w.resto ? w.resto : v); });
$('#vozOpt').addEventListener('change', e => {
  if (e.target.id === 'vozFalar') { cfg.voz = e.target.checked; salvar(); if (!cfg.voz) calar(); }
  if (e.target.id === 'vozSempre') ligarSempre(e.target.checked).then(() => { const c = $('#vozSempre'); if (c) c.checked = !!cfg.sempre; });
});

/* ---------------- Relógio da tela ---------------- */
setInterval(() => {
  const now = Date.now();
  $$('[data-desde]').forEach(el => el.textContent = crono(now - +el.dataset.desde));
  $$('[data-rel]').forEach(el => el.textContent = rel(+el.dataset.rel));
}, 1000);

/* ---------------- Ciclo de vida ---------------- */
const APP = plugin('App');
if (APP) APP.addListener('backButton', () => {
  if (!$('#voz').hidden) return vozAbrir(false);
  if (!$('#luz').hidden) return luz(false);
  if (!$('#passo').hidden) return passo(false);
  if (!$('#modal').hidden) return fecharModal();
  if (V.tab === 'guia' && V.guia) { V.guia = null; return render(); }
  if (V.tab !== 'inicio') return ir('inicio');
  APP.minimizeApp();
});
let escondidoEm = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { escondidoEm = Date.now(); pararEscuta(); return; }
  if (cfg.sempre) loopSempre();
  if ($('#luz').hidden && $('#modal').hidden) render();
  procurarAtualizacao();
  if ((!$('#luz').hidden || !$('#passo').hidden) && !wake && 'wakeLock' in navigator) navigator.wakeLock.request('screen').then(w => wake = w).catch(() => {});
});
setInterval(() => { if ($('#modal').hidden && $('#luz').hidden && $('#passo').hidden && !document.activeElement.matches('input,textarea,select')) render(); }, 60e3);

N.iniciar().then(() => { reagendarTudo(); agendarMesversarios(); });
if (cfg.sempre) setTimeout(loopSempre, 2500);
if (!NATIVO && 'serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
render();
setTimeout(() => procurarAtualizacao(), 3000);
try { const vv = +localStorage.getItem('pai:versaoVista') || 0; if (VERSAO && vv && VERSAO > vv) setTimeout(() => toast(`App atualizado para a versão ${VERSAO} ✨`, 4000), 800); if (VERSAO) localStorage.setItem('pai:versaoVista', VERSAO); } catch {}
})();
