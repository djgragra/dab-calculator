# Manuale del Calcolatore DAB+ CU ↔ Bitrate

Il Calcolatore DAB+ CU ↔ Bitrate converte tra **Capacity Unit (CU)** e **bitrate** per i sottocanali DAB+, per entrambi i profili di protezione uniforme (Equal Error Protection) definiti nell'ETSI EN 300 401. È una piccola web app (PWA) che funziona offline dopo la prima visita. È gratuita, di OnAir Garage.

## Aprire e installare

Apri il calcolatore su `https://onairgarage.com/apps/dab-calculator/` (la pagina dello strumento è `https://onairgarage.com/tools/dab-calculator/`). Per usarlo non si installa nulla, e dopo la prima visita funziona offline. Puoi anche installarlo come app:

- **Chrome, Edge e Android**: premi il pulsante *Installa app* nell'intestazione della pagina.
- **iPhone e iPad (Safari)**: tocca il pulsante Condividi, poi «Aggiungi alla schermata Home».
- **Safari su Mac** (macOS Sonoma o successivo): menu File, poi «Aggiungi al Dock».

L'app si apre sempre in inglese. Premi EN, IT o ES nell'intestazione per cambiare lingua: un cambio manuale viene ricordato sul dispositivo.

## Usare il calcolatore

1. Scegli il **Profilo EEP**: EEP-A (livelli di protezione da 1-A a 4-A, bitrate a passi di 8 kbit/s, da 8 a 192 kbit/s) oppure EEP-B (livelli di protezione da 1-B a 4-B, bitrate a passi di 32 kbit/s, da 32 a 192 kbit/s).
2. Scegli la **Direzione**: *CU → Bitrate* (conosci le capacity unit assegnate al sottocanale e vuoi il bitrate) oppure *Bitrate → CU* (conosci il bitrate e vuoi le capacity unit che servono).
3. Scegli il **Livello di protezione**.
4. Scegli le **CU assegnate** o il **Bitrate target**, secondo la direzione. Il risultato compare sotto: il bitrate risultante o le CU necessarie, con una fascia di qualità indicativa e un uso tipico.
5. La **Tabella completa** per il livello di protezione selezionato elenca ogni bitrate con la sua dimensione in CU, la fascia di qualità e l'uso tipico.

La fascia di qualità e l'uso tipico sono indicazioni editoriali: **non** fanno parte dello standard.

## Formule e fonti

Le dimensioni dei sottocanali vengono dall'**ETSI EN 300 401 V2.1.1 (2017-01)**, clausola 6.2.1:

| Profilo | Bit rate | Coding rate | Livello 1 | Livello 2 | Livello 3 | Livello 4 |
|---|---|---|---|---|---|---|
| EEP-A (tabella 9) | 8n kbit/s, n intero ≥ 1 | 1/4, 3/8, 1/2, 3/4 | 12n CU | 8n CU | 6n CU | 4n CU |
| EEP-B (tabella 10) | 32n kbit/s, n intero ≥ 1 | 4/9, 4/7, 4/6, 4/5 | 27n CU | 21n CU | 18n CU | 15n CU |

- Una trama DAB (CIF) ha **864 CU da 64 bit** (55 296 bit), quindi un sottocanale deve starci in 864 CU.
- Lo standard ammette qualsiasi n ≥ 1 che ci stia. L'app elenca 8–192 kbit/s (EEP-A) e 32–192 kbit/s (EEP-B), l'intervallo usato per i servizi DAB+.
- La bozza ETSI EN 300 401 V2.2.1 (2026-02) ha le stesse tabelle 9 e 10.

Per esempio, 96 kbit/s al livello di protezione 3-A richiedono 72 CU, 128 kbit/s a 3-A richiedono 96 CU e 64 kbit/s a 3-A richiedono 48 CU.

## Lingua e privacy

Non ci sono account, tracciamento né richieste esterne: il calcolatore gira interamente nel tuo browser. Un piccolo riquadro mancia in fondo alla pagina ha il salvadanaio del sito e un link alla pagina di sostegno di onairgarage.com nella tua lingua, che si apre in una nuova scheda solo quando clicchi; dentro il calcolatore non viene mai chiesto nulla. Sugli schermi touch ogni pulsante, selettore e link è di almeno 44 px.

## Aggiornamenti

L'app si aggiorna da sola: quando una nuova versione è pronta, un avviso dice «È pronta una nuova versione.» con *Ricarica* e *Più tardi*. Premi *Ricarica* per usarla subito. L'app continua a funzionare offline con la versione che ha già memorizzato.

## Limiti

- Non è uno strumento certificato, e una configurazione reale di multiplexer **non** è stata validata: controlla sempre le cifre sul tuo multiplexer.
- Le tabelle elencano l'intervallo DAB+ abituale. Lo standard ammette altri valori di n, purché il sottocanale stia in 864 CU.
- Le fasce di qualità e gli usi tipici sono suggerimenti editoriali, non parte dello standard ETSI.

## Risoluzione dei problemi

| Problema | Cosa fare |
|---|---|
| Il pulsante *Installa app* non c'è | Il tuo browser potrebbe non offrirlo: su iPhone, iPad e Safari per Mac usa i passi del capitolo Aprire e installare. |
| La pagina non si aggiorna | Premi *Ricarica* nell'avviso, o ricarica la pagina; una copia installata si aggiorna al prossimo avvio online. |
| Un bitrate non è nell'elenco | Le tabelle mostrano solo l'intervallo DAB+ abituale (8–192 kbit/s per EEP-A, 32–192 kbit/s per EEP-B). |

## Contatti

Graziano Melzi · OnAir Garage — `https://onairgarage.com` — `hello@onairgarage.com`. Pagina dello strumento: `https://onairgarage.com/tools/dab-calculator/`. Codice sorgente e release: `https://github.com/djgragra/dab-calculator`. Licenza: MIT © 2026 Graziano Melzi.
