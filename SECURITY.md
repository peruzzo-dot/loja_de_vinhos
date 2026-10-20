# Política de segurança

Este é um projeto de demonstração, sem back-end, sem pagamentos e sem coleta de dados pessoais.

## Como reportar uma vulnerabilidade

Encontrou algo? Use a aba **Security** do repositório, em **Report a vulnerability**, para enviar um relato privado. Por favor, não abra uma issue pública com detalhes de falhas.

## O que está no escopo

- Falhas de XSS ou de injeção no código do site
- Problemas na política de segurança de conteúdo (CSP)
- Exposição de dados sensíveis no repositório

## Limitações conhecidas

- A verificação de maioridade acontece no navegador e pode ser contornada por quem altera o armazenamento local. É uma barreira de aviso, não uma verificação real.
- Cabeçalhos de segurança (como `frame-ancestors`) não podem ser definidos no GitHub Pages.