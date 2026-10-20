document.addEventListener('DOMContentLoaded', () => {
  const id = new URLSearchParams(window.location.search).get('id');
  const p = PRODUTOS.find((x) => x.id === id);

  const area = document.getElementById('produto-detalhe');
  const erro = document.getElementById('produto-erro');

  if (!p) {
    area.hidden = true;
    erro.hidden = false;
    document.title = 'Produto não encontrado - Empório Aroma e Tanino';
    return;
  }

  document.title = `${p.nome} - Empório Aroma e Tanino`;
  document.getElementById('produto-imagem').appendChild(criarImagem(p));
  document.getElementById('produto-selos').append(...criarSelos(p));
  document.getElementById('produto-nome').textContent = p.nome;
  document.getElementById('produto-peso').textContent = p.peso;
  document.getElementById('produto-preco').textContent = formatarPreco(p.preco);
  document.getElementById('produto-texto').textContent = p.descricao;
  document.getElementById('produto-add').addEventListener('click', () => Carrinho.adicionar(p.id));
});

// Congela o catálogo: impede alteração acidental de preços e dados pelo código.
// (Não impede quem abre o DevTools. Preço de verdade só se garante no servidor.)
Object.freeze(CATEGORIAS);
Object.values(CATEGORIAS).forEach(Object.freeze);
PRODUTOS.forEach(Object.freeze);
Object.freeze(PRODUTOS);