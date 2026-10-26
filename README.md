# Calendario Turni v1.7 — lettore PDF riprogettato

Il lettore usa PDF.js per estrarre gli elementi testuali con coordinate, raggrupparli per riga e riconoscere le colonne giornaliere dall'intestazione numerica. I codici vengono assegnati al giorno in base alla posizione orizzontale, non soltanto all'ordine del testo.

## Funzioni
- Lettura PDF testuali multipagina.
- Riconoscimento geometrico delle colonne giorno.
- Anteprima modificabile e conferma prima dell'importazione.
- Quadro generale operatori, ricerca, filtri, esportazione CSV e backup JSON.

## Limiti
I PDF scannerizzati richiedono OCR, non incluso in questa versione. Il riconoscimento è tarato sul prospetto A3 orizzontale fornito; verificare sempre l'anteprima. Sincronizzazione cloud non attiva.

## Pubblicazione
Caricare i cinque file nella radice del repository GitHub Pages (`main` / root). Dopo il commit fare Ctrl+F5 e attendere il refresh della cache.
