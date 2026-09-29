/* DAB+ CU <-> bitrate calculator: sub-channel sizes for Equal Error Protection.
   © 2026 Graziano Melzi · OnAir Garage — MIT License

   Source: ETSI EN 300 401 V2.1.1 (2017-01), clause 6.2.1, tables 9 and 10 (checked September 2026;
   the draft V2.2.1 (2026-02) has identical tables).
     EEP-A (table 9):  bit rate 8n kbit/s,  n integer >= 1:  1-A 12n CU, 2-A 8n CU, 3-A 6n CU, 4-A 4n CU
     EEP-B (table 10): bit rate 32n kbit/s, n integer >= 1:  1-B 27n CU, 2-B 21n CU, 3-B 18n CU, 4-B 15n CU
   The tables below are typed out (not generated from the formulas) and checked against them by
   dev/eep.test.js. The standard allows any n >= 1 that fits in the 864 CU of a frame; the app lists
   the 8-192 kbit/s (EEP-A) and 32-192 kbit/s (EEP-B) range used for DAB+ services. */
(function (root) {
  "use strict";
  // Sub-channel size in CU as a function of bit rate (kbit/s).
  // Source: ETSI EN 300 401 V2.1.1 (2017-01), clause 6.2.1, tables 9 and 10.
  // EEP-A: bit rate = 8n kbit/s  -> 1-A 12n, 2-A 8n, 3-A 6n, 4-A 4n CU
  // EEP-B: bit rate = 32n kbit/s -> 1-B 27n, 2-B 21n, 3-B 18n, 4-B 15n CU
  var EEPA = {
    '1-A':{8:12,16:24,24:36,32:48,40:60,48:72,56:84,64:96,72:108,80:120,88:132,96:144,104:156,112:168,120:180,128:192,136:204,144:216,152:228,160:240,168:252,176:264,184:276,192:288},
    '2-A':{8:8,16:16,24:24,32:32,40:40,48:48,56:56,64:64,72:72,80:80,88:88,96:96,104:104,112:112,120:120,128:128,136:136,144:144,152:152,160:160,168:168,176:176,184:184,192:192},
    '3-A':{8:6,16:12,24:18,32:24,40:30,48:36,56:42,64:48,72:54,80:60,88:66,96:72,104:78,112:84,120:90,128:96,136:102,144:108,152:114,160:120,168:126,176:132,184:138,192:144},
    '4-A':{8:4,16:8,24:12,32:16,40:20,48:24,56:28,64:32,72:36,80:40,88:44,96:48,104:52,112:56,120:60,128:64,136:68,144:72,152:76,160:80,168:84,176:88,184:92,192:96}
  };
  var EEPB = {
    '1-B':{32:27,64:54,96:81,128:108,160:135,192:162},
    '2-B':{32:21,64:42,96:63,128:84,160:105,192:126},
    '3-B':{32:18,64:36,96:54,128:72,160:90,192:108},
    '4-B':{32:15,64:30,96:45,128:60,160:75,192:90}
  };

  var api = { EEPA: EEPA, EEPB: EEPB, CU_PER_FRAME: 864 };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else { root.EEPA = EEPA; root.EEPB = EEPB; root.CU_PER_FRAME = 864; }
})(typeof self !== "undefined" ? self : this);
