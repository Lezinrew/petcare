const CACHE_VERSION = 'petcare-v1';
const STATIC_ASSETS = ['/', '/index.html', '/manifest.webmanifest', '/icons/favicon.svg', '/icons/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match('/index.html'));
    }),
  );
});
