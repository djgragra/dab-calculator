# DAB+ CU ↔ Bitrate Calculator

A small offline-capable web app (PWA) that converts between **Capacity Units (CU)** and **bitrate** for DAB+ sub-channels, for both Equal Error Protection profiles defined in ETSI EN 300 401. Free, from [OnAir Garage](https://onairgarage.com).

- Tool page: https://onairgarage.com/tools/dab-calculator/
- Author: Graziano Melzi · OnAir Garage — hello@onairgarage.com
- License: MIT (see `LICENSE`)

## What it does

- Two-way conversion: CU → bitrate and bitrate → CU.
- **EEP-A** (protection levels 1-A … 4-A, bitrates in steps of 8 kbit/s, 8–192 kbit/s).
- **EEP-B** (protection levels 1-B … 4-B, bitrates in steps of 32 kbit/s, 32–192 kbit/s).
- Full reference table for the selected protection level, with an indicative quality band and typical use.
- English, Italiano, Español. The app always opens in English; a manual change is remembered on the device.
- Works offline after the first visit and shows an "update available" banner when a new version is ready. Installable as an app: "Install app" button (Chrome, Edge, Android); on iPhone/iPad use Share → Add to Home Screen; on Safari for Mac use File → Add to Dock. The steps are in the in-app help.
- No dependencies, no tracking, no external requests. Dark theme.

## Formulas and sources

Sub-channel sizes come from **ETSI EN 300 401 V2.1.1 (2017-01)**, clause 6.2.1 (checked September 2026):

| Profile | Bit rate | Coding rate | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|---|
| EEP-A (table 9) | 8n kbit/s, n integer ≥ 1 | 1/4, 3/8, 1/2, 3/4 | 12n CU | 8n CU | 6n CU | 4n CU |
| EEP-B (table 10) | 32n kbit/s, n integer ≥ 1 | 4/9, 4/7, 4/6, 4/5 | 27n CU | 21n CU | 18n CU | 15n CU |

- A DAB frame (CIF) has **864 CU of 64 bits** (55 296 bits); a sub-channel size is in the range 1 to 864 CU.
- The standard allows any n ≥ 1 that fits in 864 CU. The app lists 8–192 kbit/s (EEP-A) and 32–192 kbit/s (EEP-B), the range used for DAB+ services.
- The "quality" and "typical use" columns are indicative editorial guidance, **not** part of the standard.
- The **draft ETSI EN 300 401 V2.2.1 (2026-02)** has identical tables 9 and 10.

## Validation and references

Results as of September 2026 (`node --test dev/*.test.js`, 6 tests):

| Reference | What it validates | Result |
|---|---|---|
| ETSI EN 300 401 V2.1.1, tables 9 and 10 | every one of the 112 typed-out CU values equals the formula (12n, 8n, 6n, 4n; 27n, 21n, 18n, 15n) and the rate range | reproduced exactly |
| Coding rates of the same tables | independent physical check: CU × 64 bits = net bits per 24 ms frame ÷ coding rate, for every entry | exact for all entries |
| CIF size (clause 5.3.0) | 864 CU × 64 bits = 55 296 bits; every listed size fits | pass |
| Well-known DAB+ values | 96 kbit/s at 3-A = 72 CU, 128 kbit/s at 3-A = 96 CU, 64 kbit/s at 3-A = 48 CU | pass |

**Not validated**: a real multiplexer configuration. This is not a certified tool.

## Sources to re-check

Last read on 2026-09-29:

| Document | Version read |
|---|---|
| [ETSI EN 300 401](https://www.etsi.org/deliver/etsi_en/300400_300499/300401/02.01.01_60/en_300401v020101p.pdf) | V2.1.1 (2017-01), the current published version |
| [Draft ETSI EN 300 401](https://www.etsi.org/deliver/etsi_en/300400_300499/300401/02.02.01_20/en_300401v020201a.pdf) | V2.2.1 (2026-02), draft: tables 9 and 10 unchanged |

## Self-hosting

The app is plain static files and runs from any folder (all paths are relative):

```
index.html  app.css  app.js  eep.js  sw.js  manifest.json  icons/  screenshots/
```

Copy them to any static host. No inline scripts or styles are used and the page carries a strict Content-Security-Policy (`script-src 'self'; style-src 'self'`). Do not upload the `dev/` folder.

## Local development

```bash
node dev/serve.js
```

Then open http://localhost:7800/apps/dab-calculator/. The dev server mimics production: it serves the app from a subfolder and sends a strict CSP header. Any other static server works too (for example `python3 -m http.server`).

Tests (Node 18+): `node --test dev/*.test.js`

When you change a cached file, bump `CACHE` in `sw.js` and `VERSION` in `app.js` (and the footer) so installed copies update. Versions are `year.month.number` (e.g. `2026.9.1`), tags `v2026.9.1`; the earlier tags `v1.1.0` and `v1.2.0` are kept. Serve `sw.js` with `Cache-Control: no-cache` (or a short max-age) so browsers pick up new versions quickly.

## Credits

Author and license: © 2026 Graziano Melzi · OnAir Garage — https://onairgarage.com — released under the [MIT License](LICENSE).
