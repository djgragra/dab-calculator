# DAB+ CU ↔ Bitrate Calculator

A small offline-capable web app (PWA) that converts between **Capacity Units (CU)** and **bitrate** for DAB+ sub-channels, for both Equal Error Protection profiles defined in ETSI EN 300 401.

**Use it online:** https://onairgarage.com/tools/dab-calculator/

## Features

- Two-way conversion: CU → bitrate and bitrate → CU
- EEP-A (protection levels 1-A … 4-A, bitrates in steps of 8 kbit/s, 8–192 kbit/s)
- EEP-B (protection levels 1-B … 4-B, bitrates in steps of 32 kbit/s, 32–192 kbit/s)
- Full reference table for the selected protection level
- English and Italian interface (follows the browser language, switchable)
- Works offline after the first visit and can be installed as an app: an "Install app" button appears on Chrome, Edge and Android; on iPhone/iPad it shows how to use Share → Add to Home Screen
- No dependencies, no tracking, no external requests

## Data source

Sub-channel sizes come from **ETSI EN 300 401 V2.1.1 (2017-01)**, clause 6.2.1:

| Profile | Bitrate | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| EEP-A (table 9) | 8n kbit/s | 12n CU | 8n CU | 6n CU | 4n CU |
| EEP-B (table 10) | 32n kbit/s | 27n CU | 21n CU | 18n CU | 15n CU |

The "quality" and "typical use" columns are indicative editorial guidance, not part of the standard.

## Self-hosting

The app is plain static files and runs from any folder (all paths are relative):

```
index.html  app.css  app.js  sw.js  manifest.json  icons/  screenshots/
```

Copy them to any static host. No inline scripts or styles are used, so it works with a strict Content-Security-Policy (`script-src 'self'; style-src 'self'`). Do not upload the `dev/` folder.

## Local development

```bash
node dev/serve.js
```

Then open http://localhost:7800/apps/dab-calculator/. The dev server mimics production: it serves the app from a subfolder and sends a strict CSP header. Any other static server works too (for example `python3 -m http.server`).

When you change a cached file, bump `CACHE` in `sw.js` so installed copies update. Serve `sw.js` with `Cache-Control: no-cache` (or a short max-age) so browsers pick up new versions quickly.

## Author and license

© 2026 Graziano Melzi · OnAir Garage — https://onairgarage.com · hello@onairgarage.com

Released under the [MIT License](LICENSE).

---

## In italiano

Calcolatore offline (PWA) per convertire **Capacity Units (CU)** e **bitrate** dei sottocanali DAB+, per i profili EEP-A ed EEP-B di ETSI EN 300 401 (tabelle 9 e 10). Interfaccia in italiano e in inglese. Si usa online su https://onairgarage.com/tools/dab-calculator/ oppure si ospita copiando i file statici in qualsiasi cartella. Licenza MIT.
