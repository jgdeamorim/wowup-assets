(function() {
  'use strict';

  console.log("custom.js carregado em:", location.href);

  // Intercepta fetch
  const origFetch = window.fetch;
  window.fetch = function(input, init) {
    const url = typeof input === 'string' ? new URL(input) : new URL(input.url || '');
    if (url.searchParams.has('domain')) {
      url.searchParams.set('domain', 'app.botpenguin.com');
      console.log("fetch ajustado para:", url.toString());
      input = url.toString();
    }
    return origFetch(input, init);
  };

  // Intercepta XMLHttpRequest
  const origXHR = window.XMLHttpRequest;
  const origOpen = origXHR.prototype.open;
  origXHR.prototype.open = function(method, url, async, user, password) {
    const parsedURL = new URL(url, location.href);
    if (parsedURL.searchParams.has('domain')) {
      parsedURL.searchParams.set('domain', 'app.botpenguin.com');
      console.log("XHR ajustado para:", parsedURL.toString());
      url = parsedURL.toString();
    }
    return origOpen.call(this, method, url, async, user, password);
  };
})();
