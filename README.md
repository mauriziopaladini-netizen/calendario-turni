# Calendario Turni v1.3

Webapp per calendario personale e quadro generale operatori da PDF.

## Funzioni
- Calendario mensile e vista annuale
- Turni personali, colori, ciclo ripetitivo
- Statistiche e stampa PDF
- Lettura PDF nel browser con PDF.js
- Quadro generale operatori con ricerca, filtro per codice, dettaglio mensile ed esportazione CSV
- Backup e ripristino JSON

## Import PDF
La funzione usa PDF.js via CDN, quindi per leggere PDF serve una connessione Internet. L'estrazione avviene nel browser e non carica il PDF su un server. Il parser è sperimentale e va verificato sull'anteprima. È predisposto per righe con ID, cognome, nome e codici giornalieri Hxx/R1/R2/FER/OFF. PDF scansionati richiedono OCR e non sono ancora supportati.

## Pubblicazione
Carica i file nella radice del repository GitHub e abilita GitHub Pages dal branch `main`, cartella `/ (root)`.
