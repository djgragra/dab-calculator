// Tip card: texts in the three languages and the support page of the site for each language.
// Fixed rule of OnAir Garage (apps/COMMON-FEATURES.md, section 6). Plain script, also loadable by Node for the tests.
(function (root) {
  'use strict';
  var TIP = {
    text: {
      en: { line: 'Useful to you? A coffee for the mechanics is always welcome.', btn: 'Tip jar' },
      it: { line: 'Ti è utile? Un caffè per i meccanici è sempre ben accetto.', btn: 'Salvadanaio' },
      es: { line: '¿Te resulta útil? Un café para los mecánicos siempre es bienvenido.', btn: 'Hucha' }
    },
    url: {
      en: 'https://onairgarage.com/support/',
      it: 'https://onairgarage.com/it/support/',
      es: 'https://onairgarage.com/es/support/'
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = TIP;
  else root.TIP = TIP;
})(typeof self !== 'undefined' ? self : this);
