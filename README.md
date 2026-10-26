# Calendario Turni v1.5

Webapp in italiano per calendario personale e quadro generale degli operatori.

## Funzioni
- Calendario personale mensile e turni personalizzati.
- Lettore PDF nel browser basato su PDF.js (richiede connessione Internet per caricare la libreria).
- Estrazione testo e riconoscimento preliminare delle righe operatore con ID, cognome, nome e codici giornalieri.
- Anteprima modificabile prima dell'importazione.
- Pagina “Tutti gli operatori” con ricerca, filtro codice, prospetto a griglia e dettaglio operatore.
- Esportazione CSV del quadro generale.
- Backup/ripristino JSON e salvataggio locale.

## Pubblicazione
Carica i file nella radice del repository GitHub e abilita GitHub Pages da `main` / root.

## Limiti
Il parser è stato migliorato per prospetti come “nov-26”: riconosce ID numerici, cognomi/nome e sequenze giornaliere di codici (Hxx, R1, R2, FER e codici affini), con anteprima e indicazione di copertura. Il parsing resta da verificare caso per caso. Il layout estratto dai PDF può variare: verificare sempre l'anteprima. I PDF scannerizzati richiedono OCR non incluso. La sincronizzazione cloud telefono-PC non è ancora attiva; per trasferire dati usa il backup JSON.
