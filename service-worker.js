// Nombre de la caché
const CACHE_NAME = 'semana-fct-v4';

// Archivos necesarios para el funcionamiento offline
const CACHE_ASSETS = [
  '/',
  '/favicon.png',
  '/index.html',
  '/index.css',
  '/index.js',
  '/assets/logo.png',
  '/assets/Ficha.pdf',
  '/assets/Neucha-Regular.ttf',
  '/assets/alumnado.csv',
  '/assets/actividades.csv',
  '/js/download.js',
  '/js/papaparse.min.js',
  '/js/pdf-lib.min.js',
  '/js/fontkit.umd.min.js',
];

// INSTALL
// Realizamos el cacheo de la APP SHELL
self.addEventListener('install', function (e) {
  console.log("[Service Worker] * Instalado.");

  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        console.log('[Service Worker] Cacheando app shell');
        return cache.addAll(CACHE_ASSETS);
      })
      .then(function () {
        console.log('[Service Worker] Todos los recursos han sido cacheados');
        return self.skipWaiting();
      })
  );

});


// ACTIVATE
// Eliminamos cachés antiguas.
self.addEventListener('activate', function (e) {
  console.log("[Service Worker] * Activado.");

  e.waitUntil(
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheName !== CACHE_NAME) {
              console.log("[Service Worker] Borrando caché antigua: ", cacheName);
              return caches.delete(cacheName);
            }
          })
        )
      })
  );
});


// FETCH
// Hacemos peticiones a recursos.
self.addEventListener('fetch', function (e) {
  console.log("[Service Worker] * Fetch.");

  e.respondWith(
    fetch(e.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(e.request);
          });
      })
  );

});



