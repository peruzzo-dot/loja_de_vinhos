# Empório Aroma & Tanino

Vitrine front-end de um empório com raízes italianas: vinhos, espumantes, queijos coloniais, salames, castanhas e pães de fermentação longa. O projeto simula uma loja online, com catálogo, pedido com vários itens e envio por WhatsApp.

> **Projeto de demonstração e em desenvolvimento.** Produtos, preços, telefone e redes sociais são fictícios. As fotos estão sendo adicionadas aos poucos: onde ainda não há foto, a vitrine mostra um ícone da categoria.

**Site no ar:** [peruzzo-dot.github.io/loja_de_vinhos](https://peruzzo-dot.github.io/loja_de_vinhos/)

## Visão geral

A ideia nasceu de uma vitrine simples de vinhos e cresceu para um empório completo, inspirado nas raízes italianas da família da autora. O objetivo é praticar HTML, CSS e JavaScript puro, com atenção a design, acessibilidade e segurança, e servir de base para uma marca que pode existir de verdade no futuro.

## Funcionalidades

- Vitrine em seis categorias: Vinhos, Espumantes e Champanhes, Queijos Coloniais, Salames e Embutidos, Castanhas e Frutos Secos, Pães Coloniais
- Filtros por categoria e links diretos pelo menu (`index.html?categoria=queijo`)
- Banner com foto e zoom lento
- Página única de produto (`produto.html?id=...`), alimentada pelo catálogo em JavaScript
- Pedido com vários itens: quantidades, total e painel lateral
- Pedido enviado em **uma única mensagem de WhatsApp**, com a lista dos itens
- Botão flutuante de WhatsApp
- **Verificação de maioridade (+18)** na entrada do site
- Selo **+18** nos produtos com álcool e aviso legal no rodapé
- Frete **simulado**, com valor fixo (sem integração com transportadora)
- Ícone da categoria no lugar dos produtos que ainda não têm foto
- Layout responsivo (celular, tablet e computador)

## Verificação de maioridade (+18)

A venda de bebidas alcoólicas é proibida para menores de 18 anos no Brasil. Ao entrar no site, a pessoa vê uma tela que pede a data de nascimento.

**Como funciona**
- A idade é calculada no navegador, e datas inválidas, inexistentes ou futuras são rejeitadas
- A página fica escondida e inacessível (inclusive por teclado e leitor de tela) até a confirmação
- Quem informa ser menor de 18 anos fica bloqueado naquela aba
- **A data de nascimento não é guardada.** Só fica salva a confirmação de maioridade neste navegador, por 30 dias, e ela é validada a cada carregamento
- Ao enviar um pedido com bebida alcoólica, a maioridade é conferida de novo
- Os produtos com álcool trazem o selo **+18**, e o rodapé traz o aviso legal

**Limitação importante.** Como o projeto não tem servidor, essa verificação é uma barreira de aviso, **não uma verificação real de idade**. Quem altera o armazenamento do navegador consegue contorná-la. Em uma loja de verdade, a checagem precisaria acontecer no back-end, no pagamento e na entrega, com conferência de documento.

## Segurança

O projeto não processa pagamentos nem guarda dados pessoais. Mesmo assim, aplica boas práticas:

- **Proteção contra XSS:** todo conteúdo dinâmico é criado com `textContent` e elementos do DOM, sem `innerHTML` com dados de usuário. O campo de CEP aceita só 8 dígitos
- **Política de Segurança de Conteúdo (CSP) restritiva:** tudo é bloqueado por padrão (`default-src 'none'`), e só é liberado o que o site usa: scripts do próprio site, Google Fonts e imagens locais. Também bloqueia formulários, `<base>` e objetos incorporados
- **Proteção contra clickjacking básica:** se a página for aberta dentro de um iframe, ela se esconde
- **Monitoramento da CSP:** violações da política são registradas no Console, o que ajuda a achar problemas
- **Dados salvos validados:** o pedido fica no `localStorage`, e ao carregar só entram produtos que existem no catálogo e quantidades de 1 a 99. O registro de maioridade também é validado
- **Parâmetros da URL validados:** `produto.html?id=...` só aceita ids do catálogo. Qualquer outro valor mostra "Produto não encontrado"
- **Catálogo congelado** (`Object.freeze`), para evitar alteração acidental de preços pelo código
- **Links externos** abertos com `rel="noopener noreferrer"`
- **Mensagens de WhatsApp** montadas com `encodeURIComponent`
- **Sem segredos no repositório:** o telefone é fictício, e o `.gitignore` bloqueia arquivos como `.env`
- **Nenhum dado de pagamento** é coletado ou processado

Para relatar uma falha, veja [SECURITY.md](SECURITY.md).

**Limitações conhecidas.** Segurança feita só no front-end é limitada: o código roda no navegador e pode ser alterado por quem o usa. Isso vale para preços, quantidades e para a verificação de idade. A CSP em tag `<meta>` não cobre algumas proteções, como `frame-ancestors`, que dependem de cabeçalhos do servidor, e o GitHub Pages não permite configurá-los. Em uma versão real, validações, preços e pedidos devem ser conferidos em um back-end.

## Pendências para uma loja real

Este projeto não cobre o que uma operação real exigiria:

- Regularização de venda de alimentos e bebidas (vigilância sanitária, registro de inspeção de queijos e salames, licenças para bebidas)
- Política de privacidade e adequação à LGPD
- Cálculo de frete real e regras de entrega para perecíveis
- Pagamento por serviço hospedado (Pix, Mercado Pago ou Stripe)

## Tecnologias

- HTML5 semântico
- CSS3 (Grid/Flexbox, animações, `prefers-reduced-motion`)
- JavaScript puro, sem frameworks
- Google Fonts (Montserrat e Playfair Display) e Material Symbols

## Acessibilidade

- Foco visível em links e botões, com navegação por teclado
- Painel do pedido fecha com a tecla Esc e devolve o foco ao botão que o abriu
- Tela de verificação de idade com `role="dialog"`, rótulos nos campos e mensagens de erro anunciadas
- Texto alternativo nas imagens e rótulos nos botões de ícone
- Animações desativadas para quem prefere menos movimento

## Estrutura do projeto

```
.
├── index.html          # Vitrine
├── produto.html        # Página única de produto
├── style.css           # Estilos
├── img/                # Fotos dos produtos e do banner
├── js/
│   ├── seguranca.js    # Anti-clickjacking e aviso de violações da CSP
│   ├── idade.js        # Verificação de maioridade (+18)
│   ├── produtos.js     # Catálogo e funções de apoio
│   ├── vitrine.js      # Cards e filtros
│   ├── produto.js      # Página de produto
│   ├── carrinho.js     # Pedido (painel lateral)
│   ├── frete.js        # Frete simulado
│   └── whatsapp.js     # Links de WhatsApp
├── CREDITOS.md         # Créditos das imagens
├── SECURITY.md         # Política de segurança
└── README.md
```

## Como rodar

1. Baixe ou clone o repositório
2. Abra a pasta no VS Code
3. Instale a extensão **Live Server** e clique em **Go Live**
4. O site abre em `http://127.0.0.1:5500`

A CSP bloqueia o script de recarga automática do Live Server. O site funciona normalmente, mas não atualiza sozinho: recarregue a página com Ctrl+F5.

Para ver a verificação de idade de novo, apague a chave `aroma-tanino-maior18` em *Application > Local Storage*, nas ferramentas do navegador (F12), e recarregue.

## Como adicionar um produto

1. Abra `js/produtos.js`
2. Copie um bloco `{ ... }` da lista `PRODUTOS` e coloque uma vírgula entre os blocos
3. Preencha `id`, `nome`, `categoria`, `preco`, `peso`, `imagem` e os textos
4. Salve a foto na pasta `img/` com o mesmo nome do campo `imagem`
5. Use `alcool: true` nos produtos com álcool, para exibir o selo +18 e ativar a checagem no pedido

## Status do desenvolvimento

**Concluído**
- [x] Catálogo, filtros e vitrine por categorias
- [x] Página única de produto
- [x] Pedido com vários itens e envio por WhatsApp
- [x] Banner com foto e zoom lento
- [x] Verificação de maioridade (+18)
- [x] CSP restritiva e boas práticas de segurança no front-end
- [x] Layout responsivo e acessibilidade básica
- [x] Créditos das imagens (`CREDITOS.md`)

**Em andamento**
- [ ] Fotos de todos os produtos (parte da vitrine ainda usa ícones)

**Próximos passos**
- [ ] Animações de entrada e acabamento visual
- [ ] Seção "Nossa história"
- [ ] SEO e imagem de compartilhamento
- [ ] Política de privacidade
- [ ] Back-end e banco de dados para o catálogo
- [ ] Pagamento por serviço hospedado

## Créditos

As fotos são de bancos de imagens gratuitos, usadas conforme a licença de cada site. Os autores e links estão em [CREDITOS.md](CREDITOS.md).

## Autora

Vitória Souza - [GitHub](https://github.com/peruzzo-dot)

---

*Projeto de portfólio de desenvolvimento web. Não é uma loja real.*