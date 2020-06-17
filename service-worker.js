// Update cache names any time any of the cached files change.
const CACHE_NAME = 'pwa-cache';

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/images/code.gif',
  '/images/extract.gif',
  '/images/manifest.gif',
  '/images/manifest.png',
  '/scripts/service.js',
  '/scripts/install.js',
];

self.addEventListener('install', (evt) => {
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request).then((response) => {
        return response || fetch(evt.request);
      });
    })
  );
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
});
