# DAB+ CU ↔ Bitrate Calculator manual

The DAB+ CU ↔ Bitrate Calculator converts between **Capacity Units (CU)** and **bitrate** for DAB+ sub-channels, for both Equal Error Protection profiles defined in ETSI EN 300 401. It is a small web app (PWA) that works offline after the first visit. It is free, from OnAir Garage.

## Open and install

Open the calculator at `https://onairgarage.com/apps/dab-calculator/` (the tool page is `https://onairgarage.com/tools/dab-calculator/`). Nothing is installed to use it, and it works offline after the first visit. You can also install it as an app:

- **Chrome, Edge and Android**: press the *Install app* button in the page header.
- **iPhone and iPad (Safari)**: tap the Share button, then "Add to Home Screen".
- **Safari on Mac** (macOS Sonoma or later): File menu, then "Add to Dock".

The app always opens in English. Press EN, IT or ES in the header to change the language: a manual change is remembered on the device.

## Using the calculator

1. Choose the **EEP profile**: EEP-A (protection levels 1-A to 4-A, bitrates in steps of 8 kbit/s, from 8 to 192 kbit/s) or EEP-B (protection levels 1-B to 4-B, bitrates in steps of 32 kbit/s, from 32 to 192 kbit/s).
2. Choose the **Direction**: *CU → Bitrate* (you know the capacity units assigned to the sub-channel and want the bitrate) or *Bitrate → CU* (you know the bitrate and want the capacity units it needs).
3. Choose the **Protection level**.
4. Choose the **Assigned CU** or the **Target bitrate**, depending on the direction. The result appears below: the resulting bitrate or the CU needed, with an indicative quality band and a typical use.
5. The **Full table** for the selected protection level lists every bitrate with its size in CU, its quality band and its typical use.

The quality band and the typical use are indicative editorial guidance: they are **not** part of the standard.

## Formulas and sources

Sub-channel sizes come from **ETSI EN 300 401 V2.1.1 (2017-01)**, clause 6.2.1:

| Profile | Bit rate | Coding rate | Level 1 | Level 2 | Level 3 | Level 4 |
|---|---|---|---|---|---|---|
| EEP-A (table 9) | 8n kbit/s, n integer ≥ 1 | 1/4, 3/8, 1/2, 3/4 | 12n CU | 8n CU | 6n CU | 4n CU |
| EEP-B (table 10) | 32n kbit/s, n integer ≥ 1 | 4/9, 4/7, 4/6, 4/5 | 27n CU | 21n CU | 18n CU | 15n CU |

- A DAB frame (CIF) has **864 CU of 64 bits** (55 296 bits), so a sub-channel must fit in 864 CU.
- The standard allows any n ≥ 1 that fits. The app lists 8–192 kbit/s (EEP-A) and 32–192 kbit/s (EEP-B), the range used for DAB+ services.
- The draft ETSI EN 300 401 V2.2.1 (2026-02) has identical tables 9 and 10.

For example, 96 kbit/s at protection level 3-A takes 72 CU, 128 kbit/s at 3-A takes 96 CU and 64 kbit/s at 3-A takes 48 CU.

## Language and privacy

There are no accounts, no tracking and no external requests: the calculator runs entirely in your browser. A small tip card at the bottom of the page has the jar of the site and a link to the tip page of onairgarage.com in your language, which opens in a new tab only when you click it; nothing is asked inside the calculator. On touch screens every button, selector and link is at least 44 px.

## Updates

The app updates itself: when a new version is ready a banner says "A new version is ready." with *Reload* and *Later*. Press *Reload* to use it now. The app keeps working offline from the version it has already stored.

## Limits

- This is not a certified tool, and a real multiplexer configuration was **not** validated: always check the figures on your multiplexer.
- The tables list the usual DAB+ range. The standard allows other values of n, as long as the sub-channel fits in 864 CU.
- The quality bands and the typical uses are editorial hints, not part of the ETSI standard.

## Troubleshooting

| Problem | What to do |
|---|---|
| The *Install app* button is not there | Your browser may not offer it: on iPhone, iPad and Safari for Mac use the steps in the Open and install chapter. |
| The page does not update | Press *Reload* in the banner, or reload the page; an installed copy updates the next time it starts online. |
| A bitrate is not in the list | The tables show the usual DAB+ range only (8–192 kbit/s for EEP-A, 32–192 kbit/s for EEP-B). |

## Contacts

Graziano Melzi · OnAir Garage — `https://onairgarage.com` — `hello@onairgarage.com`. Tool page: `https://onairgarage.com/tools/dab-calculator/`. Source code and releases: `https://github.com/djgragra/dab-calculator`. Licence: MIT © 2026 Graziano Melzi.
