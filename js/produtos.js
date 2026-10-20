const CATEGORIAS = {
  vinho:     { nome: 'Vinhos',                 icone: 'wine_bar' },
  espumante: { nome: 'Espumantes e Champanhes', icone: 'celebration' },
  queijo:    { nome: 'Queijos Coloniais',      icone: 'restaurant' },
  salame:    { nome: 'Salames e Embutidos',    icone: 'kebab_dining' },
  castanha:  { nome: 'Castanhas e Frutos Secos', icone: 'nutrition' },
  pao:       { nome: 'Pães Coloniais',         icone: 'bakery_dining' }
};

const PRODUTOS = [
  // ---------- Vinhos ----------
  { id: 'malbec-classico', nome: 'Malbec Clássico', categoria: 'vinho', selo: 'Tinto', peso: '750 ml', preco: 120.00, alcool: true, imagem: 'vinho-malbec.jpg',
    resumo: 'Tinto encorpado e elegante.',
    descricao: 'Vinho tinto encorpado, com notas de frutas vermelhas maduras e final persistente. Combina com carnes e queijos curados.' },
  { id: 'reserva-da-casa', nome: 'Reserva da Casa', categoria: 'vinho', selo: 'Tinto', peso: '750 ml', preco: 98.50, alcool: true, imagem: 'vinho-tinto.jpg',
    resumo: 'Exclusivo e selecionado.',
    descricao: 'Corpo médio, taninos macios e aroma de frutas escuras. Combina com massas, risotos e jantares em família.' },
  { id: 'chardonnay-reserva', nome: 'Chardonnay Reserva', categoria: 'vinho', selo: 'Branco', peso: '750 ml', preco: 89.90, alcool: true, imagem: 'vinho-branco.jpg',
    resumo: 'Branco macio e aromático.',
    descricao: 'Aroma de frutas tropicais e acidez equilibrada. Combina com peixes, frutos do mar e queijos leves.' },
  { id: 'rose-seco', nome: 'Rosé Seco', categoria: 'vinho', selo: 'Rosé', peso: '750 ml', preco: 84.00, alcool: true, imagem: 'vinho-rose.jpg',
    resumo: 'Leve, fresco e frutado.',
    descricao: 'Delicado e frutado, com final fresco. Combina com entradas, petiscos e pratos leves.' },

  // ---------- Espumantes e Champanhes ----------
  { id: 'espumante-brut', nome: 'Espumante Brut', categoria: 'espumante', selo: 'Brut', peso: '750 ml', preco: 110.00, alcool: true, imagem: 'espumante-brut.jpg',
    resumo: 'Seco, elegante e de perlage fino.',
    descricao: 'Acidez viva e bolhas finas. Ideal para brindar e acompanhar aperitivos.' },
  { id: 'champagne-brut', nome: 'Champagne Brut (França)', categoria: 'espumante', selo: 'Champagne', peso: '750 ml', preco: 389.00, alcool: true, imagem: 'champagne.jpg',
    resumo: 'Para celebrações especiais.',
    descricao: 'Champagne brut da região de Champagne, na França, para brindes marcantes.' },

  // ---------- Queijos Coloniais ----------
  { id: 'queijo-colonial', nome: 'Queijo Colonial Curado', categoria: 'queijo', selo: 'Artesanal', peso: '500 g', preco: 54.00, imagem: 'queijo-colonial.jpg',
    resumo: 'Sabor marcante, curado com calma.',
    descricao: 'Queijo colonial de massa firme e sabor intenso. Ótimo em tábuas de frios e para ralar sobre massas.' },
  { id: 'provolone-defumado', nome: 'Provolone Defumado', categoria: 'queijo', selo: 'Artesanal', peso: '400 g', preco: 62.00, imagem: 'queijo-provolone.jpg',
    resumo: 'Defumado, firme e saboroso.',
    descricao: 'Provolone de aroma defumado. Excelente grelhado, em sanduíches ou em tábuas.' },
  { id: 'parmesao-curado', nome: 'Parmesão Curado', categoria: 'queijo', selo: 'Curado', peso: '300 g', preco: 58.00, imagem: 'queijo-parmesao.jpg',
    resumo: 'Granuloso e intenso.',
    descricao: 'Parmesão de longa cura, textura granulosa e sabor profundo. Perfeito para risotos e massas.' },
  { id: 'queijo-ervas', nome: 'Queijo Colonial com Ervas', categoria: 'queijo', selo: 'Artesanal', peso: '450 g', preco: 56.00, imagem: 'queijo-ervas.jpg',
    resumo: 'Aromático, com ervas finas.',
    descricao: 'Queijo colonial temperado com ervas. Combina com pães rústicos e vinhos brancos.' },

  // ---------- Salames e Embutidos ----------
  { id: 'salame-italiano', nome: 'Salame Italiano', categoria: 'salame', selo: 'Curado', peso: '250 g', preco: 49.00, imagem: 'salame-italiano.jpg',
    resumo: 'Clássico, de fatias macias.',
    descricao: 'Salame de receita italiana, curado lentamente. Ótimo para antepastos e tábuas.' },
  { id: 'salame-colonial', nome: 'Salame Colonial', categoria: 'salame', selo: 'Artesanal', peso: '300 g', preco: 46.00, imagem: 'salame-colonial.jpg',
    resumo: 'Rústico, com tempero de família.',
    descricao: 'Salame colonial de sabor caseiro. Combina com pão de fermentação longa e queijos.' },
  { id: 'copa-curada', nome: 'Copa Curada', categoria: 'salame', selo: 'Curado', peso: '200 g', preco: 52.00, imagem: 'copa-curada.jpg',
    resumo: 'Fatiada fina, sabor delicado.',
    descricao: 'Copa curada de textura macia. Ideal para tábuas e entradas.' },

  // ---------- Castanhas e Frutos Secos ----------
  { id: 'castanha-caju', nome: 'Castanha de Caju', categoria: 'castanha', selo: 'Natural', peso: '200 g', preco: 32.00, imagem: 'castanha-caju.jpg',
    resumo: 'Crocante e suave.',
    descricao: 'Castanhas de caju selecionadas. Ótimas para petiscar e acompanhar vinhos.' },
  { id: 'nozes', nome: 'Nozes Selecionadas', categoria: 'castanha', selo: 'Natural', peso: '200 g', preco: 38.00, imagem: 'nozes.jpg',
    resumo: 'Sabor marcante.',
    descricao: 'Nozes selecionadas. Combinam com queijos, saladas e sobremesas.' },
  { id: 'amendoas', nome: 'Amêndoas', categoria: 'castanha', selo: 'Natural', peso: '200 g', preco: 36.00, imagem: 'amendoas.jpg',
    resumo: 'Crocantes e aromáticas.',
    descricao: 'Amêndoas selecionadas, para petiscar ou usar em receitas.' },

  // ---------- Pães Coloniais ----------
  { id: 'pao-fermentacao-natural', nome: 'Pão de Fermentação Natural', categoria: 'pao', selo: 'Fermentação longa', peso: '800 g', preco: 28.00, imagem: 'pao-fermentacao-natural.jpg',
    resumo: 'Casca crocante, miolo macio.',
    descricao: 'Pão de fermentação natural e longa maturação, com casca crocante e sabor levemente ácido.' },
  { id: 'pao-italiano', nome: 'Pão Italiano Rústico', categoria: 'pao', selo: 'Fermentação longa', peso: '600 g', preco: 24.00, imagem: 'pao-italiano.jpg',
    resumo: 'Miolo aerado e casca fina.',
    descricao: 'Pão rústico de estilo italiano. Ótimo com azeite, queijos e salames.' },
  { id: 'pao-centeio', nome: 'Pão de Centeio', categoria: 'pao', selo: 'Fermentação longa', peso: '500 g', preco: 26.00, imagem: 'pao-centeio.jpg',
    resumo: 'Denso e saboroso.',
    descricao: 'Pão de centeio de miolo denso e sabor intenso. Combina com queijos fortes.' },
  { id: 'focaccia-alecrim', nome: 'Focaccia de Alecrim', categoria: 'pao', selo: 'Artesanal', peso: '400 g', preco: 22.00, imagem: 'focaccia.jpg',
    resumo: 'Macia, com azeite e alecrim.',
    descricao: 'Focaccia macia com azeite e alecrim. Perfeita para dividir à mesa.' }
];

// ---------- Funções de apoio ----------
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function icone(nome) {
  const s = document.createElement('span');
  s.className = 'material-symbols-outlined';
  s.setAttribute('aria-hidden', 'true');
  s.textContent = nome;
  return s;
}

function criarSelos(p) {
  const lista = [];
  const selo = document.createElement('span');
  selo.className = 'selo';
  selo.textContent = p.selo;
  lista.push(selo);
  if (p.alcool) {
    const m18 = document.createElement('span');
    m18.className = 'selo selo-18';
    m18.textContent = '+18';
    lista.push(m18);
  }
  return lista;
}

// Foto do produto. Se o arquivo não existir, mostra o ícone da categoria.
function criarImagem(p) {
  const img = document.createElement('img');
  img.src = `img/${p.imagem}`;
  img.alt = p.nome;
  img.loading = 'lazy';

  img.addEventListener('error', () => {
    const vazio = document.createElement('div');
    vazio.className = 'sem-foto';
    vazio.setAttribute('role', 'img');
    vazio.setAttribute('aria-label', `Foto de ${p.nome} em breve`);
    vazio.appendChild(icone(CATEGORIAS[p.categoria].icone));
    img.replaceWith(vazio);
  });

  return img;
}