GESTIONALE TURNI PRO — VERSIONE 4

Nuove funzioni grafiche:
- Home ridisegnata con pannello “Il prossimo turno”.
- Accessi rapidi a calendario, tabellone, importazione PDF ed esportazione.
- Barra di navigazione inferiore su smartphone.
- Tema scuro/chiaro con preferenza salvata sul dispositivo.
- Layout adattato a schermi piccoli.

Funzioni mantenute dalla versione precedente:
- Importazione PDF testuale tramite PDF.js.
- Tabellone con ricerca e selezione dipendenti.
- Calendario personale.
- Scelta codice originale oppure fascia oraria.
- Conversione Hnn: ora di inizio = numero / 2; durata turno = 8 ore.
- Esportazione CSV e calendario .ics.

Installazione:
1. Estrai lo ZIP.
2. Carica tutti i file su GitHub Pages/hosting HTTPS, mantenendo la cartella icons.
3. Ricarica la pagina. Se vedi ancora la vecchia versione, chiudi e riapri il sito o svuota la cache del browser.

Note:
- Il riepilogo prossimo turno usa il dipendente selezionato nel calendario.
- La libreria PDF.js viene caricata da CDN, quindi il primo caricamento richiede Internet.
- Verificare sempre i turni estratti rispetto al PDF originale.


VERSIONE 5 - PROFILO PERSONALE
- Scelta del nominativo personale salvata sul dispositivo.
- Riepilogo mensile: turni H riconosciuti, ore stimate (8 per turno), riposi R1/R2/RZ e giorni FER/OFF.
- Le statistiche sono indicative e vanno confrontate con il PDF originale.


VERSIONE 6 - STAMPA E ARCHIVIO MENSILE
- Pulsante Stampa calendario con impaginazione A4.
- Archivio locale per mese: ogni PDF importato correttamente viene archiviato automaticamente quando mese e anno sono riconosciuti.
- Possibilità di aprire un mese archiviato, salvarlo manualmente o eliminarlo.
- Esportazione e ripristino backup JSON; il ripristino unisce i mesi del backup a quelli già presenti.
- Il nominativo preferito resta salvato nel browser. Per trasferire lo storico su un altro dispositivo, esporta il backup e ripristinalo lì.
- L'archivio usa la memoria locale del browser: esporta backup periodici, perché cancellare i dati del sito può cancellare l'archivio.


VERSIONE 7 - MODIFICHE PERSONALIZZATE DEL CALENDARIO
- Clic/tocco su una casella del calendario per modificare il codice turno.
- Il codice originale del PDF resta intatto; le modifiche vengono conservate separatamente per dipendente e giorno.
- Stato modifica: da verificare o approvato manualmente dopo aver ricevuto conferma.
- Ripristino del turno originale disponibile dal pannello di modifica.
- Le modifiche sono salvate nell'archivio mensile locale e incluse nel backup JSON.
- Calendario personale, riepilogo e esportazione ICS utilizzano il turno modificato. Il tabellone generale e il CSV continuano a rappresentare i codici originali del PDF.
- Lo stato 'approvato' è una registrazione manuale e non una verifica ufficiale.


VERSIONE 8 - COMPATIBILITA' PROSPETTI SENZA MATRICOLA
- Corretto il riconoscimento delle righe che iniziano direttamente con cognome e nome, senza codice numerico dipendente.
- Aggiunto il codice *** tra i valori turno ammessi.
- La chiave interna del dipendente viene generata dal nominativo quando la matricola non e' presente.
- Aggiornata la cache PWA per forzare il caricamento della versione corretta.

\nVERSIONE 9 - CONTROLLO AUTOMATICO PDF
- Aggiunto pannello di verifica per ogni dipendente.
- Controlla il numero di codici rispetto ai giorni del mese.
- Evidenzia nominativi duplicati e codici turno non riconosciuti.
- Confronta la sequenza importata con la coda della riga originale estratta da PDF.js.
- Il controllo non sostituisce la verifica visiva del PDF: una lettura errata ma formalmente valida può comunque richiedere correzione manuale.

VERSIONE 10 - CONFRONTO AVANZATO E VISUALIZZAZIONE DOPPIA
- Confronto simultaneo del proprio turno con piu colleghi, giorno per giorno.
- Evidenzia turni uguali, diversi e differenze lavoro/riposo.
- Riepilogo dei giorni con differenze e filtro per mostrare solo i giorni diversi.
- Vista PDF + tabella affiancati con PDF originale caricato nel browser.
- Tabellone con intestazione e colonne identificative bloccate durante lo scorrimento.
- Il confronto usa i codici originali del PDF e non modifica i dati.
