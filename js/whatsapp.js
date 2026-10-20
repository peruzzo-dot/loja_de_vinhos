// >>> NÚMERO FICTÍCIO (repositório público). Troque só se for usar de verdade.
// Formato: 55 + DDD + número, só dígitos.
const WHATSAPP_NUMERO = '5551999999999';

function linkWhats(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const flutuante = document.querySelector('.whats-flutuante');
  if (flutuante) {
    flutuante.href = linkWhats('Olá! Gostaria de ajuda para escolher meus produtos.');
  }
});