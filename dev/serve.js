// Local development server (not needed in production: the app is plain static files).
// Serves the project under /apps/dab-calculator/ with a strict CSP (no inline
// scripts or styles) to mimic the production hosting on onairgarage.com.
// Usage: node dev/serve.js  ->  http://localhost:7800/apps/dab-calculator/
const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 7800;
const ROOT = path.resolve(__dirname, '..');
const BASE = '/apps/dab-calculator/';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
};

const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; " +
            "manifest-src 'self'; worker-src 'self'; connect-src 'self'; base-uri 'none'; " +
            "form-action 'none'; frame-ancestors 'none'; object-src 'none'";

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (!urlPath.startsWith(BASE)) {
    res.writeHead(302, { Location: BASE }); res.end(); return;
  }
  urlPath = urlPath.slice(BASE.length);
  if (urlPath === '' || urlPath.endsWith('/')) urlPath += 'index.html';

  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT + path.sep) || filePath.startsWith(path.join(ROOT, 'dev') + path.sep)
      || filePath.includes(path.sep + '.')) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found: ' + urlPath); return; }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Content-Security-Policy': CSP,
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
}).listen(PORT, '127.0.0.1', () => {
  console.log('DAB+ Calculator running at http://localhost:' + PORT + BASE);
});
