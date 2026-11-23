/* Pai da Maya — app do Bruno 💙
   Tudo fica salvo só neste celular (localStorage + IndexedDB para as fotos). */
(() => {
'use strict';
const LS = 'pai:v1';
const MIN = 60e3, H = 60 * MIN, DIA = 24 * H;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const G = window.GUIAS || [], CATS = window.CATS || [];
const ic = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${(window.ICONES || {})[n] || ''}</svg>`;

/* ---------------- Dados ---------------- */
let LEU_OK = true;
function carregar() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch { LEU_OK = false; return {}; } }
const S = carregar();
S.cfg = Object.assign({ pai: 'Bruno', mae: 'Maíra', bebe: 'Maya', nasc: '', tema: 'auto', luz: 45 }, S.cfg || {});
for (const k of ['ped', 'est', 'compras', 'diario']) S[k] = Array.isArray(S[k]) ? S[k] : [];
S.nid = S.nid || 100;
S.lidos = S.lidos && typeof S.lidos === 'object' ? S.lidos : {};
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
const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const plural = (n, s, p) => n + ' ' + (n === 1 ? s : p);

function toast(msg, ms = 2600) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, ms); }
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
const V = { tab: 'inicio', est: 'itens', guia: null, cat: 'todos', q: '' };
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
  const prox = proximoGuia(), lidosN = G.filter(g => S.lidos[g.id]).length;
  h += `<div class="sec-titulo"><h3>Guia do Pai</h3><button class="btn sec mini" data-a="ir" data-t="guia">Ver tudo (${lidosN}/${G.length})</button></div>`;
  if (prox) h += itemGuia(prox);
  h += `<div class="grade"><button class="acao" data-a="guiaAbrir" data-id="sos-bebe" style="margin:0"><i class="bolha b-alerta" style="font-size:1.3rem">🚨</i><span>Alerta da Maya</span></button><a class="acao" href="tel:192" style="margin:0"><i class="bolha b-alerta" style="font-size:1.3rem">🚑</i><span>SAMU 192</span></a></div>`;
  h += `<button class="acao" data-a="luzAbrir"><i class="bolha b-alerta">${ic('moon')}</i><span>Modo noturno<small>Tela vermelha e escura para a madrugada</small></span></button>`;

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
  <div class="card">${l.length ? l.map(e => entradaDiario(e)).join('') : `<div class="vazio">Aqui ficam os momentos, os marcos e as frases que você não quer esquecer.</div>`}</div>`;
}


/* ---------------- Guia do Pai ---------------- */
const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const guiaPorId = id => G.find(g => g.id === id);
const proximoGuia = () => G.find(g => !S.lidos[g.id]);
function itemGuia(g) {
  return `<button class="acao" data-a="guiaAbrir" data-id="${g.id}"><i class="bolha ${g.cat === 'sos' ? 'b-alerta' : 'b-pri'}" style="font-size:1.4rem">${g.e}</i><span style="flex:1;min-width:0">${esc(g.t)}<small>${esc(g.r)}</small></span>${S.lidos[g.id] ? '<span class="tag verde">lido</span>' : ''}</button>`;
}
function listaGuias() {
  const q = norm(V.q);
  const l = G.filter(g => (V.cat === 'todos' || g.cat === V.cat) && (!q || norm([g.t, g.r, ...g.p].join(' ')).includes(q)));
  return l.length ? l.map(itemGuia).join('') : '<div class="card vazio">Nada encontrado. Tente outra palavra.</div>';
}
function detalheGuia(g) {
  if (!g) { V.guia = null; return telaGuia(); }
  const cat = (CATS.find(c => c[0] === g.cat) || [0, ''])[1];
  return `<button class="btn sec mini" data-a="guiaVoltar">← Guia</button>
  <div class="card" style="margin-top:12px"><div class="rotulo">${esc(cat)}</div>
    <h2 style="margin-top:6px">${g.e} ${esc(g.t)}</h2><p class="mute">${esc(g.r)}</p>
    <ol class="passos ${g.lista ? 'lista' : ''}">${g.p.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
    <div class="linha" style="margin-top:14px;flex-wrap:wrap"><button class="btn" data-a="passoAbrir" data-id="${g.id}">Um passo por vez</button><button class="btn sec" data-a="guiaLido" data-id="${g.id}">${S.lidos[g.id] ? '✅ Lido' : 'Marcar como lido'}</button></div></div>
  ${g.a && g.a.length ? `<div class="card alerta"><h3>⚠️ Atenção</h3>${g.a.map(x => `<p>${esc(x)}</p>`).join('')}</div>` : ''}
  ${g.d ? `<div class="card" style="border-color:var(--ouro);background:var(--ouro-s)"><h3>💡 Dica de pai</h3><p style="margin:0">${esc(g.d)}</p></div>` : ''}
  <p class="mute" style="font-size:.8rem;text-align:center">Fonte: ${esc(g.f || 'Boas práticas')}. Não substitui o pediatra.</p>`;
}
function telaGuia() {
  if (V.guia) return detalheGuia(guiaPorId(V.guia));
  const lidos = G.filter(g => S.lidos[g.id]).length;
  return `<h2>Guia do Pai</h2><p class="mute">Passo a passo para quem está começando. Você leu ${lidos} de ${G.length}. Guia de apoio: não substitui o pediatra.</p>
  <input id="gq" type="search" placeholder="Buscar: banho, febre, cólica..." value="${esc(V.q)}" autocomplete="off">
  <div class="abas" style="margin-top:10px">${[['todos', 'Todos'], ...CATS].map(([k, n]) => `<button class="${V.cat === k ? 'on' : ''}" data-a="guiaCat" data-t="${k}">${n}</button>`).join('')}</div>
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
  S.lidos[PS.g.id] = S.lidos[PS.g.id] || Date.now(); salvar(); passo(false); render(); toast('Guia concluído ✅');
});

function telaMais() {
  return `<h2>Mais</h2>
  <div class="card"><h3>Aparência</h3><div class="chips">${[['auto', 'Automático'], ['claro', 'Claro'], ['noite', 'Escuro']].map(([k, n]) => `<button class="chip ${cfg.tema === k ? 'on' : ''}" data-a="tema" data-t="${k}">${n}</button>`).join('')}</div><p class="mute">No automático, fica escuro das 19h às 6h.</p></div>
  <div class="card"><h3>Nascimento da ${esc(cfg.bebe)}</h3><div class="linha entre"><span>${cfg.nasc ? dataHora(+new Date(cfg.nasc)) : 'Ainda não nasceu'}</span><button class="btn sec mini" data-a="nasceu">${cfg.nasc ? 'Alterar' : 'Definir'}</button></div><p class="mute">Usado para contar a idade e os dias de vida no app.</p></div>
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
  $('#view').innerHTML = { inicio: telaInicio, guia: telaGuia, pedidos: telaPedidos, estoque: telaEstoque, diario: telaDiario, mais: telaMais }[V.tab]();
  window.scrollTo(0, sy);
  carregarFotos();
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
  ir: el => ir(el.dataset.t),
  guiaAbrir: el => { V.tab = 'guia'; V.guia = el.dataset.id; window.scrollTo(0, 0); render(); },
  guiaVoltar: () => { V.guia = null; render(); },
  guiaCat: el => { V.cat = el.dataset.t; render(); },
  guiaLido: el => { const id = el.dataset.id; if (S.lidos[id]) delete S.lidos[id]; else S.lidos[id] = Date.now(); salvar(); render(); },
  passoAbrir: el => passo(true, guiaPorId(el.dataset.id)),
  nasceu: () => modal(`<h2>A ${esc(cfg.bebe)} nasceu! 💙</h2><label>Data e hora do nascimento</label><input id="nNasc" type="datetime-local" value="${paraInput(cfg.nasc ? +new Date(cfg.nasc) : Date.now())}"><button class="btn bloco" style="margin-top:18px" data-a="nasceuOk">Salvar</button>${cfg.nasc ? '<button class="btn sec bloco" style="margin-top:10px" data-a="nasceuLimpar">Remover data</button>' : ''}`, true),
  nasceuLimpar: () => { cfg.nasc = ''; salvar(); fecharModal(); render(); },
  nasceuOk: () => { cfg.nasc = new Date(deInput($('#nNasc').value)).toISOString(); salvar(); fecharModal(); render(); toast('Parabéns, pai! 💙', 4000); },

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
  backup: () => compartilhar('Backup Maya', JSON.stringify({ app: 'pai-da-maya', quando: Date.now(), cfg: S.cfg, ped: S.ped, est: S.est, compras: S.compras, diario: S.diario.map(e => ({ ...e, foto: false })) })),
  restaurar: () => modal(`<h2>Restaurar backup</h2><p class="mute">Cole o texto do backup. Isso substitui o que está no app agora.</p><textarea id="rTxt" placeholder="Cole aqui"></textarea><button class="btn perigo bloco" style="margin-top:14px" data-a="restaurarOk">Restaurar</button>`),
  restaurarOk: () => {
    try {
      const b = JSON.parse($('#rTxt').value.trim());
      if (b.app !== 'pai-da-maya') throw new Error('não é um backup deste app');
      Object.assign(S.cfg, b.cfg || {}); S.ped = b.ped || []; S.est = b.est || []; S.compras = b.compras || []; S.diario = b.diario || [];
      salvar(); fecharModal(); reagendarTudo(); render(); toast('Backup restaurado ✅');
    } catch (e) { toast('Backup inválido: ' + (e.message || '').slice(0, 80), 4000); }
  },
  exportarDiario: () => {
    const l = diarioOrd().slice().reverse(); if (!l.length) return toast('O diário está vazio');
    compartilhar('Diário da ' + cfg.bebe, `Diário da ${cfg.bebe}\n\n` + l.map(e => `${dataHora(e.ts)}${diaDeVida(e.ts) ? ' · ' + diaDeVida(e.ts) : ''}\n${e.t || '(só foto)'}`).join('\n\n'));
  },
  buscarAtualiz: () => procurarAtualizacao(true),
  aplicarAtualiz: () => { if (PRONTA && UPD) { toast('Atualizando...'); salvar(); UPD.set({ id: PRONTA.id }); } },
  luzAbrir: () => luz(true),
};
function vibrar(ms = 30) { try { navigator.vibrate && navigator.vibrate(ms); } catch {} }

document.addEventListener('click', e => { const el = e.target.closest('[data-a]'); if (el && ACOES[el.dataset.a]) { e.preventDefault(); ACOES[el.dataset.a](el); } });
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter' || !e.target.matches('#pedTxt,#compraTxt')) return;
  e.preventDefault(); const b = e.target.parentElement.querySelector('button[data-a]'); if (b) b.click();
});
document.addEventListener('input', e => { if (e.target.id === 'gq') { V.q = e.target.value; const l = $('#guiaLista'); if (l) l.innerHTML = listaGuias(); } });
document.addEventListener('change', async e => {
  const el = e.target;
  if (el.id === 'cfgNasc') { cfg.nasc = el.value ? new Date(deInput(el.value)).toISOString() : ''; salvar(); toast('Salvo ✅'); }
  if ((el.id === 'fCam' || el.id === 'fGal') && el.files[0]) {
    try { edFoto = await reduzir(el.files[0]); edFotoApagar = false; const p = $('#dPrev'); if (p) { p.style.backgroundImage = `url(${URL.createObjectURL(edFoto)})`; p.textContent = ''; } } catch { toast('Não consegui abrir essa imagem'); }
    el.value = '';
  }
});
$$('#nav button').forEach(b => { b.insertAdjacentHTML('afterbegin', `<i>${ic(b.dataset.ic)}</i>`); b.addEventListener('click', () => ir(b.dataset.tab)); });
$('#btnMais').innerHTML = ic('settings');
$('#btnMais').addEventListener('click', () => ir('mais'));
$('#btnTema').addEventListener('click', () => { cfg.tema = document.documentElement.classList.contains('noite') ? 'claro' : 'noite'; salvar(); render(); });

/* ---------------- Modo noturno (luz vermelha) ---------------- */
let wake = null, luzTimer = 0;
async function telaAcesa(on) {
  try {
    if (on) { if ('wakeLock' in navigator && !wake) wake = await navigator.wakeLock.request('screen'); }
    else if (wake && $('#luz').hidden && $('#passo').hidden) { await wake.release(); wake = null; }
  } catch {}
}
function luzBrilho() { $('#luz').style.setProperty('--v', (cfg.luz || 45) / 100); $('#luzBrilho').value = cfg.luz || 45; }
async function luz(abrir) {
  const el = $('#luz');
  el.hidden = !abrir;
  clearInterval(luzTimer);
  if (abrir) {
    luzBrilho();
    const t = () => { $('#luzHora').textContent = hora(Date.now()); }; t(); luzTimer = setInterval(t, 1000);
    telaAcesa(true);
    if (SB) { SB.setBackgroundColor({ color: '#000000' }).catch(() => {}); SB.setStyle({ style: 'DARK' }).catch(() => {}); }
  } else {
    telaAcesa(false);
    tema();
  }
}
$('#luzSair').addEventListener('click', () => luz(false));
$('#luzBrilho').addEventListener('input', e => { cfg.luz = +e.target.value; luzBrilho(); });
$('#luzBrilho').addEventListener('change', salvar);

/* ---------------- Ciclo de vida ---------------- */
const APP = plugin('App');
if (APP) APP.addListener('backButton', () => {
  if (!$('#luz').hidden) return luz(false);
  if (!$('#passo').hidden) return passo(false);
  if (!$('#modal').hidden) return fecharModal();
  if (V.tab === 'guia' && V.guia) { V.guia = null; return render(); }
  if (V.tab !== 'inicio') return ir('inicio');
  APP.minimizeApp();
});
let escondidoEm = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { escondidoEm = Date.now(); return; }
  if ($('#luz').hidden && $('#modal').hidden) render();
  procurarAtualizacao();
  if ((!$('#luz').hidden || !$('#passo').hidden) && !wake && 'wakeLock' in navigator) navigator.wakeLock.request('screen').then(w => wake = w).catch(() => {});
});
setInterval(() => { if ($('#modal').hidden && $('#luz').hidden && $('#passo').hidden && !document.activeElement.matches('input,textarea,select')) render(); }, 60e3);

N.iniciar().then(reagendarTudo);
if (!NATIVO && 'serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
render();
setTimeout(() => procurarAtualizacao(), 3000);
try { const vv = +localStorage.getItem('pai:versaoVista') || 0; if (VERSAO && vv && VERSAO > vv) setTimeout(() => toast(`App atualizado para a versão ${VERSAO} ✨`, 4000), 800); if (VERSAO) localStorage.setItem('pai:versaoVista', VERSAO); } catch {}
})();
