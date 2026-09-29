"use strict";
// Checks the typed-out tables in eep.js against the formulas of ETSI EN 300 401 V2.1.1 (2017-01),
// clause 6.2.1: table 9 (EEP-A, 8n kbit/s, 12n / 8n / 6n / 4n CU) and table 10 (EEP-B, 32n kbit/s, 27n / 21n / 18n / 15n CU).
const test = require("node:test");
const assert = require("node:assert/strict");
const { EEPA, EEPB, CU_PER_FRAME } = require("../eep.js");

const TABLE9 = { "1-A": 12, "2-A": 8, "3-A": 6, "4-A": 4 };      // CU per n, bit rate 8n kbit/s
const TABLE10 = { "1-B": 27, "2-B": 21, "3-B": 18, "4-B": 15 };   // CU per n, bit rate 32n kbit/s

test("EEP-A: every entry follows table 9 and the range is 8-192 kbit/s in steps of 8", () => {
  for (const [level, perN] of Object.entries(TABLE9)) {
    const rates = Object.keys(EEPA[level]).map(Number).sort((a, b) => a - b);
    assert.deepEqual(rates, Array.from({ length: 24 }, (_, i) => 8 * (i + 1)), level + " rates");
    for (const br of rates) assert.equal(EEPA[level][br], perN * (br / 8), `${level} @ ${br} kbit/s`);
  }
});

test("EEP-B: every entry follows table 10 and the range is 32-192 kbit/s in steps of 32", () => {
  for (const [level, perN] of Object.entries(TABLE10)) {
    const rates = Object.keys(EEPB[level]).map(Number).sort((a, b) => a - b);
    assert.deepEqual(rates, [32, 64, 96, 128, 160, 192], level + " rates");
    for (const br of rates) assert.equal(EEPB[level][br], perN * (br / 32), `${level} @ ${br} kbit/s`);
  }
});

test("only the four protection levels of each profile exist", () => {
  assert.deepEqual(Object.keys(EEPA), ["1-A", "2-A", "3-A", "4-A"]);
  assert.deepEqual(Object.keys(EEPB), ["1-B", "2-B", "3-B", "4-B"]);
});

test("every listed sub-channel fits in one frame (864 CU of 64 bits = 55 296 bits)", () => {
  assert.equal(CU_PER_FRAME, 864); assert.equal(CU_PER_FRAME * 64, 55296);
  for (const t of [EEPA, EEPB]) for (const lvl of Object.values(t)) for (const cu of Object.values(lvl)) assert.ok(cu >= 1 && cu <= CU_PER_FRAME);
});

test("well-known DAB+ values: 96 kbit/s at 3-A = 72 CU, 128 kbit/s at 3-A = 96 CU, 64 kbit/s at 3-A = 48 CU", () => {
  assert.equal(EEPA["3-A"][96], 72); assert.equal(EEPA["3-A"][128], 96); assert.equal(EEPA["3-A"][64], 48);
  assert.equal(EEPB["3-B"][96], 54);
});

test("independent physical check: CU x 64 bits = net bits per 24 ms frame / convolutional coding rate", () => {
  // coding rates from the same tables: 1/4, 3/8, 1/2, 3/4 (EEP-A) and 4/9, 4/7, 4/6, 4/5 (EEP-B)
  const rateA = { "1-A": [1, 4], "2-A": [3, 8], "3-A": [1, 2], "4-A": [3, 4] };
  const rateB = { "1-B": [4, 9], "2-B": [4, 7], "3-B": [4, 6], "4-B": [4, 5] };
  for (const [table, rates] of [[EEPA, rateA], [EEPB, rateB]]) {
    for (const [level, [num, den]] of Object.entries(rates)) {
      for (const [br, cu] of Object.entries(table[level])) {
        const netBitsPerFrame = Number(br) * 24;                 // kbit/s x 24 ms
        const codedBits = netBitsPerFrame * den / num;            // divide by the coding rate
        assert.equal(cu * 64, codedBits, `${level} @ ${br} kbit/s`);
      }
    }
  }
});
