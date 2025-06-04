(function() {
  'use strict';

  console.log('inject.js carregado em:', window.location.href);

  // Intercepta fetch()
  const origFetch = window.fetch;
  window.fetch = function(input, init) {
    let url = typeof input === 'string' ? new URL(input) : new URL(input.url || '');
    
    if (url.searchParams.has('domain')) {
      url.searchParams.set('domain', 'app.botpenguin.com');
      input = url.toString();
      console.log("fetch ajustado para:", url.toString());
    }

    return origFetch(input, init);
  };

  // Intercepta XMLHttpRequest
  const origXHR = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    const parsedURL = new URL(url, location.href);
    if (parsedURL.searchParams.has('domain')) {
      parsedURL.searchParams.set('domain', 'app.botpenguin.com');
      url = parsedURL.toString();
    }
    return origXHR.call(this, method, url, ...rest);
  };

  // Injeta CSS opcional
  const style = document.createElement('style');
  style.textContent = `
    body { font-family: Arial, sans-serif; }
    .wowup-banner {
      background-color: #007bff;
      color: white;
      padding: 10px;
      text-align: center;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);

  // Mensagem de teste no corpo da página
  const banner = document.createElement('div');
  banner.className = 'wowup-banner';
  banner.innerText = 'custom.js injetado com sucesso!';
  document.body.insertAdjacentElement('afterbegin', banner);
})();
