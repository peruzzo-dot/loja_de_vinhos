// Cálculo de frete (SIMULAÇÃO). Usa textContent, nunca innerHTML,
// e só aceita exatamente 8 dígitos. Isso elimina a falha de XSS.
document.addEventListener('DOMContentLoaded', () => {
  const campo = document.getElementById('cep');
  const btn = document.getElementById('btn-frete');
  const saida = document.getElementById('resultado-frete');
  if (!campo || !btn || !saida) return;

  // Máscara: 12345678 -> 12345-678 enquanto digita
  campo.addEventListener('input', () => {
    const d = campo.value.replace(/\D/g, '').slice(0, 8);
    campo.value = d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
  });

  function calcular() {
    const cep = campo.value.replace(/\D/g, '');

    if (/^\d{8}$/.test(cep)) {
      saida.textContent = `🚚 Frete para o CEP ${cep.slice(0, 5)}-${cep.slice(5)}: R$ 15,00 (entrega em 3 dias, simulação)`;
      saida.style.color = 'green';
    } else {
      saida.textContent = '❌ Digite um CEP válido (8 números).';
      saida.style.color = 'red';
    }
  }

  btn.addEventListener('click', calcular);
  campo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calcular();
  });
});