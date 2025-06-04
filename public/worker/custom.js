console.log('custom.js carregado em:', window.location.href);

if (window.location.href.includes('app.wowup.com.br/home')) {
  const message = document.createElement('p');
  message.textContent = 'Teste de JavaScript injetado!';
  message.style.color = '#1a73e8';
  document.body.appendChild(message);
}