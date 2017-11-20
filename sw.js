let version = '0.0.1';

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('lampeapp').then(cache => {
      return cache.addAll([
        `/`,
        `/index.html?timestamp=${timeStamp}`,
        `/styles/main.css?timestamp=${timeStamp}`,
        `/images/Icon-36.png?timestamp=${timeStamp}`,
        `/images/Icon-48.png?timestamp=${timeStamp}`,
        `/images/Icon-72.png?timestamp=${timeStamp}`,
        `/images/Icon-96.png?timestamp=${timeStamp}`,
        `/images/Icon-144.png?timestamp=${timeStamp}`,
        `/images/Icon-192.png?timestamp=${timeStamp}`,
        `/images/Icon-512.png?timestamp=${timeStamp}`
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});

