// Service worker for DAB+ Calculator.
// Paths are relative to this file, so the app works from any subfolder
// (e.g. https://onairgarage.com/apps/dab-calculator/).
const PREFIX = 'com.onairgarage.dabcalculator-';
const CACHE = PREFIX + 'v1.1.0';
const ASSETS = [
  './',
  'index.html',
  'app.css',
  'app.js',
  'manifest.json',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/chevron.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Only delete old caches of this app: other apps on the same origin keep theirs.
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith(self.registration.scope)) return;
  e.respondWith(
    caches.open(CACHE)
      .then(c => c.match(e.request, { ignoreSearch: true }))
      .then(cached => cached || fetch(e.request))
  );
});
