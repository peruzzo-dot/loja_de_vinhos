// 1) Anti-clickjacking básico: se a página for aberta dentro de um iframe, ela se esconde.
//    (A proteção completa exige um cabeçalho do servidor, que o GitHub Pages não permite.)
if (window.top !== window.self) {
  document.documentElement.style.display = 'none';
}

// 2) Avisa no Console quando a política de segurança (CSP) bloquear algo.
document.addEventListener('securitypolicyviolation', (e) => {
  console.warn(`[CSP] Bloqueado: ${e.violatedDirective} -> ${e.blockedURI || 'inline'}`);
});