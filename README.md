# Calendario Turni — versione iniziale

Webapp PWA in italiano per gestire i turni di lavoro su telefono e PC.

## Funzioni incluse
- Calendario mensile con colori e più turni per giorno
- Vista annuale
- Turni personalizzabili con codice, colore e orari
- Applicazione di cicli ripetitivi su un intervallo
- Importazione/esportazione CSV
- Backup e ripristino JSON
- Statistiche per intervallo e stampa/salvataggio in PDF dal browser
- Salvataggio automatico locale e supporto base offline via service worker

## Avvio rapido
Per provare la webapp basta aprire `index.html` in un browser. Per installazione PWA e funzionamento offline completo, pubblicare i file su un hosting HTTPS, ad esempio GitHub Pages.

## Sincronizzazione telefono-PC
Questa versione non carica i dati su Internet. Per evitare che i turni personali vengano inviati a un servizio senza consenso, la sincronizzazione cloud è lasciata come passaggio successivo. Al momento è possibile trasferire il calendario tra dispositivi usando **Turni e strumenti → Scarica backup JSON** e poi **Ripristina backup** sull'altro dispositivo.

## CSV supportato
Intestazioni: `data,codice,note`
Esempio:
```csv
data,codice,note
2026-11-01,7,
2026-11-02,Riposo,
2026-11-03,13,Turno modificato
```
La prima riga è considerata intestazione. La data deve essere `YYYY-MM-DD`.

## Prossimi sviluppi consigliati
1. Sincronizzazione cloud con account/autenticazione e conflitti gestiti.
2. Importazione guidata di Excel e PDF, con anteprima prima di applicare i dati.
3. Modifica di un turno esistente più completa (orari, colore e nome in un unico modulo).
4. Promemoria locali per i turni.
