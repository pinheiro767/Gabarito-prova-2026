const cards = document.getElementById('cards');

for (let i = 1; i <= 24; i++) {
  const card = document.createElement('section');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-cabecalho">
      <span class="numero">Questão ${i}</span>
      <span class="nome-arquivo">${i}.png</span>
    </div>
    <div class="imagem-area">
      <img src="imagens/${i}.png" alt="Imagem da questão ${i}" onerror="this.alt='Imagem ${i}.png não encontrada'; this.style.minHeight='220px';">
    </div>
    <div class="campo">
      <label for="estrutura-${i}">Nome da estrutura:</label>
      <input id="estrutura-${i}" type="text" placeholder="Digite o nome da estrutura" autocomplete="off" />
    </div>
  `;
  cards.appendChild(card);
}

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  const saved = localStorage.getItem(input.id);
  if (saved) input.value = saved;

  input.addEventListener('input', () => {
    localStorage.setItem(input.id, input.value);
  });
});

document.getElementById('limpar').addEventListener('click', () => {
  if (confirm('Deseja limpar todos os campos preenchidos?')) {
    inputs.forEach(input => {
      input.value = '';
      localStorage.removeItem(input.id);
    });
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
