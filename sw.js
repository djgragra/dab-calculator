// Service worker for DAB+ Calculator.
// Paths are relative to this file, so the app works from any subfolder
// (e.g. https://onairgarage.com/apps/dab-calculator/).
// Bump CACHE whenever a file in ASSETS changes, so installed copies update.
const PREFIX = 'com.onairgarage.dabcalculator-';
const CACHE = PREFIX + 'v2026.9.1';
const ASSETS = [
  './',
  'index.html',
  'app.css',
  'eep.js',
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
  // cache: 'reload' bypasses the HTTP cache, so an update never stores stale files.
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' }))))
  );
  // No skipWaiting(): on an update the new worker waits until the page asks for it
  // (the "new version ready" banner). On a first install this has no effect.
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Only delete old caches of this app: other apps on the same origin keep theirs.
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (!req.url.startsWith(self.registration.scope)) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      if (cached) return cached;
      try {
        return await fetch(req);
      } catch (err) {
        // Offline navigation to a URL not in the cache: serve the app shell.
        if (req.mode === 'navigate') {
          const shell = await cache.match('./');
          if (shell) return shell;
        }
        throw err;
      }
    })
  );
});
