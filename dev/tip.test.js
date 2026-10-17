"use strict";
// The tip card (apps/COMMON-FEATURES.md, section 6 of the OnAir Garage standard), touch targets and version alignment.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const TIP = require("../tip.js");

const root = path.resolve(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

test("tip card: the texts exist in the three languages", () => {
  assert.deepEqual(Object.keys(TIP.text).sort(), ["en", "es", "it"]);
  assert.deepEqual(TIP.text.en, { line: "Useful to you? A coffee for the mechanics is always welcome.", btn: "Tip jar" });
  assert.deepEqual(TIP.text.it, { line: "Ti è utile? Un caffè per i meccanici è sempre ben accetto.", btn: "Salvadanaio" });
  assert.deepEqual(TIP.text.es, { line: "¿Te resulta útil? Un café para los mecánicos siempre es bienvenido.", btn: "Hucha" });
});

test("tip card: each language links to its own support page of the site, and to nothing else", () => {
  assert.deepEqual(TIP.url, {
    en: "https://onairgarage.com/support/",
    it: "https://onairgarage.com/it/support/",
    es: "https://onairgarage.com/es/support/"
  });
});

test("tip card: markup in index.html (jar is a second link, pill opens in a new tab, no pop-up)", () => {
  const html = read("index.html");
  assert.match(html, /<a class="tip-art-link"[^>]*href="https:\/\/onairgarage\.com\/support\/"[^>]*target="_blank"[^>]*rel="noopener"[^>]*tabindex="-1"[^>]*aria-hidden="true"><img class="tip-jar" src="icons\/tip-jar-sm\.webp" alt=""/);
  assert.match(html, /<a class="tip-btn" id="tip-btn" href="https:\/\/onairgarage\.com\/support\/" target="_blank" rel="noopener">Tip jar<\/a>/);
  assert.ok(html.indexOf('<script src="tip.js">') > -1 && html.indexOf('<script src="tip.js">') < html.indexOf('<script src="app.js">'), "tip.js before app.js");
  assert.ok(fs.existsSync(path.join(root, "icons/tip-jar-sm.webp")), "jar image present");
});

test("tip card: app.js sets text and both links from TIP for the current language", () => {
  const js = read("app.js");
  assert.match(js, /TIP\.text\[lang\]/);
  assert.match(js, /\$\('tip-btn'\)\.href = TIP\.url\[lang\]/);
  assert.match(js, /\$\('tip-jar-link'\)\.href = TIP\.url\[lang\]/);
});

test("offline: the service worker precaches the tip card files", () => {
  const sw = read("sw.js");
  assert.match(sw, /'tip\.js'/);
  assert.match(sw, /'icons\/tip-jar-sm\.webp'/);
});

test("touch screens: targets of 44 px on coarse pointers only", () => {
  const css = read("app.css");
  const m = css.match(/@media \(pointer: coarse\) \{([\s\S]*?)\n\}/);
  assert.ok(m, "a (pointer: coarse) block exists");
  for (const sel of [".toggle-btn", ".install-btn", ".help-btn", ".ctrl select", ".tip-btn"]) assert.ok(m[1].includes(sel), sel + " is in the touch block");
  assert.match(m[1], /min-height: 44px/);
});

test("versions: VERSION, CACHE in the service worker and the footer are the same", () => {
  const v = read("app.js").match(/const VERSION = '([^']+)'/)[1];
  assert.equal(read("sw.js").match(/const CACHE = PREFIX \+ 'v([^']+)'/)[1], v);
  assert.match(read("index.html"), new RegExp('<span id="ver">v' + v.replace(/\./g, "\\.") + "</span>"));
  assert.match(v, /^\d{4}\.\d{1,2}\.\d+$/);
});
