const WILDU_SHELL_CACHE = 'wildu-hub-shell-v2';

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './version.json',
  './icon-192-maskable.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', function(event) {
  self.skipWaiting();

  event.waitUntil(
    caches.open(WILDU_SHELL_CACHE).then(function(cache) {
      return cache.addAll(SHELL_ASSETS);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== WILDU_SHELL_CACHE) {
            return caches.delete(key);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Non tocchiamo mai Apps Script, Google login o risorse esterne.
  if (url.origin !== self.location.origin) {
    return;
  }

  // Navigazione: prova rete, poi cache.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(function(response) {
        const copy = response.clone();
        caches.open(WILDU_SHELL_CACHE).then(function(cache) {
          cache.put('./index.html', copy);
        });
        return response;
      }).catch(function() {
        return caches.match('./index.html');
      })
    );
    return;
  }

  // Asset shell: cache-first con aggiornamento prudente.
  event.respondWith(
    caches.match(request).then(function(cached) {
      return cached || fetch(request).then(function(response) {
        const copy = response.clone();
        caches.open(WILDU_SHELL_CACHE).then(function(cache) {
          cache.put(request, copy);
        });
        return response;
      });
    })
  );
});
