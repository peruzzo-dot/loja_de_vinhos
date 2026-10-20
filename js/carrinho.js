const Carrinho = (() => {
  const CHAVE = 'aroma-tanino-pedido';
  let itens = {};
  let painel, fundo, contadores, ultimoFoco;

  function carregar() {
    try {
      const bruto = JSON.parse(localStorage.getItem(CHAVE) || '{}');
      Object.keys(bruto).forEach((id) => {
        const q = Number(bruto[id]);
        if (PRODUTOS.some((p) => p.id === id) && Number.isInteger(q) && q > 0 && q <= 99) {
          itens[id] = q;
        }
      });
    } catch (e) {
      itens = {};
    }
  }

  function salvar() {
    try { localStorage.setItem(CHAVE, JSON.stringify(itens)); } catch (e) { /* ignora */ }
  }

  const lista = () => Object.keys(itens).map((id) => ({ p: PRODUTOS.find((x) => x.id === id), q: itens[id] }));
  const quantidade = () => lista().reduce((s, i) => s + i.q, 0);
  const total = () => lista().reduce((s, i) => s + i.p.preco * i.q, 0);

  function mensagem() {
    const linhas = lista().map(({ p, q }) => `- ${q}x ${p.nome} (${p.peso}): ${formatarPreco(p.preco * q)}`);
    return `Olá! Gostaria de fazer este pedido:\n${linhas.join('\n')}\nTotal: ${formatarPreco(total())}`;
  }

  function botaoQtd(texto, rotulo, acao) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = texto;
    b.setAttribute('aria-label', rotulo);
    b.addEventListener('click', acao);
    return b;
  }

  function render() {
    contadores.forEach((c) => { c.textContent = quantidade(); });

    const area = painel.querySelector('.carrinho-itens');
    if (quantidade() === 0) {
      const vazio = document.createElement('p');
      vazio.className = 'vazio';
      vazio.textContent = 'Seu pedido está vazio. Escolha um produto na vitrine.';
      area.replaceChildren(vazio);
    } else {
      area.replaceChildren(...lista().map(({ p, q }) => {
        const linha = document.createElement('div');
        linha.className = 'item-carrinho';

        const info = document.createElement('div');
        const nome = document.createElement('strong');
        nome.textContent = p.nome;
        const detalhe = document.createElement('span');
        detalhe.textContent = `${p.peso} - ${formatarPreco(p.preco)}`;
        info.append(nome, detalhe);

        const ctrl = document.createElement('div');
        ctrl.className = 'qtd';
        const num = document.createElement('span');
        num.textContent = q;
        ctrl.append(
          botaoQtd('−', `Diminuir ${p.nome}`, () => alterar(p.id, -1)),
          num,
          botaoQtd('+', `Aumentar ${p.nome}`, () => alterar(p.id, 1))
        );

        linha.append(info, ctrl);
        return linha;
      }));
    }

    painel.querySelector('.carrinho-total strong').textContent = formatarPreco(total());
    const enviar = painel.querySelector('.btn-whats');
    enviar.href = quantidade() > 0 ? linkWhats(mensagem()) : '#';
  }

  function alterar(id, delta) {
    if (!PRODUTOS.some((p) => p.id === id)) return;
    const nova = Math.min(99, (itens[id] || 0) + delta);
    if (nova <= 0) delete itens[id]; else itens[id] = nova;
    salvar();
    render();
  }

  function abrir() {
    ultimoFoco = document.activeElement;
    painel.classList.add('aberto');
    fundo.classList.add('aberto');
    document.body.classList.add('sem-rolagem');
    painel.querySelector('.carrinho-fechar').focus();
  }

  function fechar() {
    painel.classList.remove('aberto');
    fundo.classList.remove('aberto');
    document.body.classList.remove('sem-rolagem');
    if (ultimoFoco) ultimoFoco.focus();
  }

  function montar() {
    fundo = document.createElement('div');
    fundo.className = 'fundo-carrinho';

    painel = document.createElement('aside');
    painel.className = 'carrinho';
    painel.setAttribute('aria-label', 'Meu pedido');
    // HTML fixo (sem dados de usuário). Os itens são criados com textContent.
    painel.innerHTML =
      '<div class="carrinho-topo"><h2>Meu pedido</h2>' +
      '<button type="button" class="carrinho-fechar" aria-label="Fechar pedido">&times;</button></div>' +
      '<div class="carrinho-itens"></div>' +
      '<div class="carrinho-rodape">' +
      '<p class="carrinho-total">Total <strong></strong></p>' +
      '<a class="btn-comprar btn-whats" href="#" target="_blank" rel="noopener noreferrer">' +
      '<span class="material-symbols-outlined" aria-hidden="true">chat</span> Enviar pedido pelo WhatsApp</a>' +
      '<p class="aviso-demo">Projeto de demonstração: abre uma conversa de exemplo.</p></div>';

    document.body.append(fundo, painel);

    painel.querySelector('.carrinho-fechar').addEventListener('click', fechar);
    fundo.addEventListener('click', fechar);
        painel.querySelector('.btn-whats').addEventListener('click', (e) => {
      const temAlcool = lista().some(({ p }) => p.alcool);
      if (quantidade() === 0 || (temAlcool && !Idade.confirmada())) e.preventDefault();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && painel.classList.contains('aberto')) fechar();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    contadores = document.querySelectorAll('.contador-carrinho');
    carregar();
    montar();
    render();
    const botao = document.getElementById('abrir-carrinho');
    if (botao) botao.addEventListener('click', abrir);
  });

  return {
    adicionar(id) { alterar(id, 1); abrir(); }
  };
})();