document.addEventListener('DOMContentLoaded', () => {
  const area = document.getElementById('vitrine-lista');
  const barra = document.getElementById('filtros');
  if (!area || !barra) return;

  const chaves = Object.keys(CATEGORIAS);

  const botoes = [['todos', 'Todos'], ...chaves.map((k) => [k, CATEGORIAS[k].nome])].map(([chave, nome]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'filtro';
    b.dataset.filtro = chave;
    b.textContent = nome;
    b.addEventListener('click', () => mostrar(chave));
    return b;
  });
  barra.append(...botoes);

  function criarCard(p) {
    const card = document.createElement('article');
    card.className = 'vinho-card';
    const destino = `produto.html?id=${encodeURIComponent(p.id)}`;

    const foto = document.createElement('a');
    foto.className = 'card-foto';
    foto.href = destino;
    foto.appendChild(criarImagem(p));

    const selos = document.createElement('div');
    selos.className = 'selos';
    selos.append(...criarSelos(p));

    const titulo = document.createElement('h3');
    titulo.textContent = p.nome;

    const peso = document.createElement('p');
    peso.className = 'peso';
    peso.textContent = p.peso;

    const resumo = document.createElement('p');
    resumo.className = 'descricao';
    resumo.textContent = p.resumo;

    const preco = document.createElement('span');
    preco.className = 'preco';
    preco.textContent = formatarPreco(p.preco);

    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'btn-comprar btn-add';
    add.append(icone('add_shopping_cart'), ' Adicionar ao pedido');
    add.addEventListener('click', () => Carrinho.adicionar(p.id));

    const detalhes = document.createElement('a');
    detalhes.className = 'btn-detalhes';
    detalhes.href = destino;
    detalhes.textContent = 'Ver detalhes';

    card.append(foto, selos, titulo, peso, resumo, preco, add, detalhes);
    return card;
  }

  function mostrar(filtro) {
    const categorias = filtro === 'todos' ? chaves : [filtro];

    area.replaceChildren(...categorias.map((k) => {
      const secao = document.createElement('section');
      secao.className = 'categoria';

      const titulo = document.createElement('h2');
      titulo.textContent = CATEGORIAS[k].nome;

      const grade = document.createElement('div');
      grade.className = 'vitrine';
      grade.append(...PRODUTOS.filter((p) => p.categoria === k).map(criarCard));

      secao.append(titulo, grade);
      return secao;
    }));

    botoes.forEach((b) => {
      const ativo = b.dataset.filtro === filtro;
      b.classList.toggle('ativo', ativo);
      b.setAttribute('aria-pressed', String(ativo));
    });
  }

  // O menu pode abrir já filtrado: index.html?categoria=queijo
  const pedido = new URLSearchParams(window.location.search).get('categoria');
  mostrar(chaves.includes(pedido) ? pedido : 'todos');
});