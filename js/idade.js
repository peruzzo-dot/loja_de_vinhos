// Verificação de maioridade (18+).
// Roda no navegador: é uma barreira de aviso, NÃO uma verificação real de idade.
// A data de nascimento não é guardada, só a confirmação de maioridade.
const Idade = (() => {
  const CHAVE_OK = 'aroma-tanino-maior18';
  const CHAVE_MENOR = 'aroma-tanino-menor18';
  const VALIDADE_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias
  const IDADE_MINIMA = 18;
  const MARCA = 'Empório Aroma & Tanino';
  let travados = [];

  // ---------- Estado salvo (sempre validado) ----------
  function confirmada() {
    try {
      const reg = JSON.parse(localStorage.getItem(CHAVE_OK));
      const agora = Date.now();
      return Boolean(reg) && reg.ok === true && Number.isFinite(reg.ts) &&
             reg.ts <= agora && agora - reg.ts < VALIDADE_MS;
    } catch (e) {
      return false;
    }
  }

  function bloqueada() {
    try { return sessionStorage.getItem(CHAVE_MENOR) === '1'; } catch (e) { return false; }
  }

  function registrarConfirmacao() {
    try { localStorage.setItem(CHAVE_OK, JSON.stringify({ ok: true, ts: Date.now() })); } catch (e) { /* ignora */ }
  }

  // ---------- Cálculo da idade ----------
  function lerData(texto) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto);
    if (!m) return null;
    const ano = Number(m[1]);
    const mes = Number(m[2]);
    const dia = Number(m[3]);
    const d = new Date(ano, mes - 1, dia);
    // Rejeita datas que não existem (ex.: 31/02)
    if (d.getFullYear() !== ano || d.getMonth() !== mes - 1 || d.getDate() !== dia) return null;
    return d;
  }

  function calcularIdade(nasc, hoje) {
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  }

  function avaliar(texto) {
    const nasc = lerData(texto);
    const hoje = new Date();
    if (!nasc || nasc.getFullYear() < 1900 || nasc > hoje) return 'invalida';
    return calcularIdade(nasc, hoje) >= IDADE_MINIMA ? 'maior' : 'menor';
  }

  function hojeISO() {
    const h = new Date();
    return `${h.getFullYear()}-${String(h.getMonth() + 1).padStart(2, '0')}-${String(h.getDate()).padStart(2, '0')}`;
  }

  // ---------- Tela de verificação (criada com textContent) ----------
  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  function travarPagina(portao) {
    travados = Array.from(document.body.children).filter((n) => n !== portao);
    travados.forEach((n) => { n.inert = true; }); // sem foco, sem clique, sem leitor de tela
    document.body.classList.add('sem-rolagem');
  }

  function liberarPagina(portao) {
    travados.forEach((n) => { n.inert = false; });
    travados = [];
    portao.remove();
    document.body.classList.remove('sem-rolagem');
    document.documentElement.classList.remove('verificar-idade');
    const logo = document.querySelector('.logo');
    if (logo) logo.focus();
  }

  function mostrarBloqueio(caixa) {
    try { sessionStorage.setItem(CHAVE_MENOR, '1'); } catch (e) { /* ignora */ }
    const titulo = el('h2', null, 'Acesso não permitido');
    titulo.tabIndex = -1;
    const msg = el('p', 'portao-texto', 'Este site é destinado a maiores de 18 anos. Volte quando tiver idade para entrar.');
    caixa.replaceChildren(el('p', 'portao-marca', MARCA), titulo, msg);
    titulo.focus();
  }

  function montarPortao() {
    const portao = el('div', 'portao-idade');
    portao.setAttribute('role', 'dialog');
    portao.setAttribute('aria-modal', 'true');
    portao.setAttribute('aria-labelledby', 'portao-titulo');

    const caixa = el('div', 'portao-caixa');
    const titulo = el('h2', null, 'Você tem 18 anos ou mais?');
    titulo.id = 'portao-titulo';
    const texto = el('p', 'portao-texto',
      'Este site apresenta bebidas alcoólicas, e a venda é proibida para menores de 18 anos. Informe sua data de nascimento para continuar.');

    const form = el('form', 'portao-form');
    form.noValidate = true;

    const rotulo = el('label', null, 'Data de nascimento');
    rotulo.htmlFor = 'portao-data';

    const campo = el('input');
    campo.type = 'date';
    campo.id = 'portao-data';
    campo.required = true;
    campo.min = '1900-01-01';
    campo.max = hojeISO();
    campo.autocomplete = 'bday';
    campo.setAttribute('aria-describedby', 'portao-erro');

    const aviso = el('p', 'portao-erro');
    aviso.id = 'portao-erro';
    aviso.setAttribute('role', 'alert');

    const botao = el('button', 'btn-comprar', 'Entrar no site');
    botao.type = 'submit';

    form.append(rotulo, campo, aviso, botao);

    const privacidade = el('p', 'portao-privacidade',
      'Não guardamos a sua data de nascimento. Salvamos só a confirmação de maioridade neste navegador, por 30 dias.');

    caixa.append(el('p', 'portao-marca', MARCA), titulo, texto, form, privacidade);
    portao.appendChild(caixa);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const resultado = avaliar(campo.value);

      if (resultado === 'invalida') {
        aviso.textContent = 'Informe uma data de nascimento válida.';
        campo.focus();
      } else if (resultado === 'menor') {
        mostrarBloqueio(caixa);
      } else {
        registrarConfirmacao();
        liberarPagina(portao);
      }
    });

    return { portao, caixa, campo };
  }

  // ---------- Início ----------
  // Roda já no <head>: esconde a página antes de ela aparecer.
  if (!confirmada()) document.documentElement.classList.add('verificar-idade');

  document.addEventListener('DOMContentLoaded', () => {
    if (confirmada()) return;
    const { portao, caixa, campo } = montarPortao();
    document.body.append(portao);
    travarPagina(portao);
    if (bloqueada()) mostrarBloqueio(caixa); else campo.focus();
  });

  return { confirmada };
})();