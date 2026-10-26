const $=id=>document.getElementById(id),MONTHS=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],WD=['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
const today=new Date();let month=new Date(today.getFullYear(),today.getMonth(),1),activeDay='',previewRows=[],previewDays=30;
const defaults=[['7','#fde047'],['Riposo','#c7ead2'],['13','#f59aa5'],['6','#c9cdd3'],['16','#f8c4d1'],['8','#f49a7c'],['5:30','#06a9df'],['15','#8bc63f']];
let data=loadData();
function loadData(){try{let d=JSON.parse(localStorage.getItem('calTurni14'));if(d&&d.personal&&d.shifts&&d.operators)return d}catch(e){}return {personal:{},shifts:defaults.map((x,i)=>({id:'s'+i,name:x[0],color:x[1]})),operators:[],operatorMonth:'2026-11'}}
function save(){localStorage.setItem('calTurni14',JSON.stringify(data));renderAll()}
function iso(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function shift(id){return data.shifts.find(s=>s.id===id)}
function switchTab(t){document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===t));['mine','operators','pdf','settings'].forEach(x=>$('view-'+x).classList.toggle('hidden',x!==t));if(t==='operators')renderOperators()}
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
function renderMine(){ $('monthTitle').textContent=MONTHS[month.getMonth()]+' '+month.getFullYear();let root=$('myCalendar');root.innerHTML='';WD.forEach(w=>{let e=document.createElement('div');e.className='weekday';e.textContent=w;root.append(e)});let first=new Date(month.getFullYear(),month.getMonth(),1),off=(first.getDay()+6)%7,start=new Date(first);start.setDate(first.getDate()-off);for(let i=0;i<42;i++){let d=new Date(start);d.setDate(start.getDate()+i);let key=iso(d),b=document.createElement('div');b.className='day';b.innerHTML=`<span class="daynum">${d.getDate()}</span>`;if(d.getMonth()!==month.getMonth())b.style.background='#f6f7fa';(data.personal[key]||[]).forEach(id=>{let s=shift(id);if(s){let c=document.createElement('button');c.textContent=s.name;c.style.background=s.color;c.style.color='#172033';c.onclick=()=>{activeDay=key;openDay()};b.append(c)}});let add=document.createElement('button');add.className='secondary';add.textContent='+';add.onclick=()=>{activeDay=key;openDay()};b.append(add);root.append(b)}}
function openDay(){ $('dayDialogTitle').textContent='Turni · '+activeDay;$('dayShift').innerHTML=data.shifts.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('');$('dayDialog').showModal()}
$('closeDialog').onclick=()=>$('dayDialog').close();$('assignShift').onclick=()=>{if(!$('dayShift').value)return;(data.personal[activeDay]||(data.personal[activeDay]=[])).push($('dayShift').value);save();$('dayDialog').close()};$('removeShift').onclick=()=>{data.personal[activeDay]=[];save();$('dayDialog').close()};
$('prevMonth').onclick=()=>{month.setMonth(month.getMonth()-1);renderMine()};$('nextMonth').onclick=()=>{month.setMonth(month.getMonth()+1);renderMine()};
function renderShifts(){let root=$('shiftList');root.innerHTML='';data.shifts.forEach(s=>{let row=document.createElement('div');row.className='shiftitem';row.innerHTML=`<span class="swatch" style="background:${s.color}">${esc(s.name.slice(0,5))}</span><strong style="flex:1">${esc(s.name)}</strong><button class="secondary" data-edit="${s.id}">Modifica</button><button class="danger" data-del="${s.id}">×</button>`;root.append(row)});root.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{let s=shift(b.dataset.edit),n=prompt('Nome turno',s.name);if(n===null)return;let c=prompt('Colore esadecimale',s.color);if(n.trim())s.name=n.trim();if(c&&/^#[0-9a-f]{6}$/i.test(c))s.color=c;save()});root.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{if(confirm('Eliminare il turno?')){data.shifts=data.shifts.filter(s=>s.id!==b.dataset.del);Object.keys(data.personal).forEach(k=>data.personal[k]=data.personal[k].filter(id=>id!==b.dataset.del));save()}})}
$('shiftForm').onsubmit=e=>{e.preventDefault();data.shifts.push({id:'s'+Date.now(),name:$('shiftName').value.trim(),color:$('shiftColor').value});e.target.reset();$('shiftColor').value='#fde047';save()};
function renderAll(){renderMine();renderShifts();renderOperators()}
function operatorCodes(){return [...new Set(data.operators.flatMap(o=>o.codes||[]).filter(Boolean))].sort()}
function renderOperators(){let codes=operatorCodes(),filter=$('filterCode').value,search=$('searchOp').value.toLowerCase().trim(),sel=$('filterCode');let old=sel.value;sel.innerHTML='<option value="">Tutti i codici</option>'+codes.map(c=>`<option>${esc(c)}</option>`).join('');if(codes.includes(old))sel.value=old;filter=sel.value;let rows=data.operators.filter(o=>(!search||`${o.id} ${o.surname} ${o.name}`.toLowerCase().includes(search))&&(!filter||(o.codes||[]).includes(filter)));$('operatorStats').innerHTML=`<div class="metric"><span>Operatori importati</span><strong>${data.operators.length}</strong></div><div class="metric"><span>Risultati filtrati</span><strong>${rows.length}</strong></div><div class="metric"><span>Codici distinti</span><strong>${codes.length}</strong></div><div class="metric"><span>Mese del prospetto</span><strong>${esc($('operatorMonth').value||data.operatorMonth)}</strong></div>`;if(!data.operators.length){$('operatorTable').innerHTML='<p style="padding:15px">Nessun operatore caricato. Vai su “Lettore PDF / Importa” e importa il prospetto.</p>';$('operatorDetail').innerHTML='';return}let days=Number(($('operatorMonth').value||data.operatorMonth||'2026-11').split('-')[1]&&new Date(...[Number(($('operatorMonth').value||data.operatorMonth).split('-')[0]),Number(($('operatorMonth').value||data.operatorMonth).split('-')[1]),0]).getDate())||30;let head='<thead><tr><th>ID</th><th>Cognome</th><th>Nome</th>'+Array.from({length:days},(_,i)=>`<th>${i+1}</th>`).join('')+'</tr></thead>';let body=rows.map(o=>`<tr><td>${esc(o.id)}</td><td>${esc(o.surname)}</td><td><button class="secondary" data-op="${esc(o.id)}">${esc(o.name)}</button></td>${Array.from({length:days},(_,i)=>{let c=o.codes[i]||'';return `<td class="code" style="background:${colorFor(c)}">${esc(c)}</td>`}).join('')}</tr>`).join('');$('operatorTable').innerHTML=`<table>${head}<tbody>${body}</tbody></table>`;$('operatorTable').querySelectorAll('[data-op]').forEach(b=>b.onclick=()=>showOperator(b.dataset.op));$('operatorDetail').innerHTML=''}
function colorFor(c){if(!c)return'#fff';if(c==='R1')return'#f5c2c7';if(c==='R2')return'#dbeafe';if(c==='FER')return'#93c5fd';if(c==='OFF')return'#d1d5db';if(c.startsWith('H'))return'#dcfce7';return'#fef3c7'}
function showOperator(id){let o=data.operators.find(x=>String(x.id)===String(id));if(!o)return;$('operatorDetail').innerHTML=`<div class="panel"><h3>${esc(o.surname)} ${esc(o.name)} <span class="muted">ID ${esc(o.id)}</span></h3><div class="row">${o.codes.map((c,i)=>`<span class="pill" style="background:${colorFor(c)}">${i+1}: ${esc(c||'—')}</span>`).join('')}</div><p><button class="secondary" id="closeOpDetail">Chiudi dettaglio</button></p></div>`;$('closeOpDetail').onclick=()=>$('operatorDetail').innerHTML=''}
$('searchOp').oninput=renderOperators;$('filterCode').onchange=renderOperators;$('operatorMonth').onchange=()=>{data.operatorMonth=$('operatorMonth').value;renderOperators()};
function csvCell(v){return '"'+String(v??'').replace(/"/g,'""')+'"'}function download(name,content,type){let a=document.createElement('a'),u=URL.createObjectURL(new Blob([content],{type}));a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
$('exportOperators').onclick=()=>{let n=Number(new Date(($('operatorMonth').value||'2026-11')+'-01').getFullYear()),m=Number(new Date(($('operatorMonth').value||'2026-11')+'-01').getMonth()+1),days=new Date(n,m,0).getDate();let lines=[['ID','Cognome','Nome',...Array.from({length:days},(_,i)=>i+1)].map(csvCell).join(',')];data.operators.forEach(o=>lines.push([o.id,o.surname,o.name,...Array.from({length:days},(_,i)=>o.codes[i]||'')].map(csvCell).join(',')));download('operatori-turni.csv','\ufeff'+lines.join('\r\n'),'text/csv;charset=utf-8')};
function normalizePdfText(text){
  return String(text||'').replace(/\u00a0/g,' ').replace(/[‐‑–—]/g,'-').replace(/\r/g,'').split('\n').map(line=>line.replace(/[ \t]+/g,' ').trim()).filter(Boolean).join('\n');
}
const SHIFT_TOKEN=/^(?:H\d{1,3}|R\d{1,2}|FER|OFF|RIP|RIPOSO|MAL|104|FEST|FESTIVO|SM|ASP|ASS|[A-Z]{2,5})$/i;
function parsePdfLines(text,days){
  const lines=normalizePdfText(text).split('\n'),out=[],seen=new Set();
  for(const raw of lines){
    const line=raw.trim();
    const m=line.match(/^(\d{4,7})\s+(.+)$/);
    if(!m) continue;
    const id=m[1]; if(seen.has(id)) continue;
    const tokens=m[2].trim().split(/\s+/); let first=-1;
    for(let i=1;i<tokens.length;i++){
      if(/^(?:H\d{1,3}|R\d{1,2}|FER|OFF|RIP|RIPOSO|MAL|104|FEST|FESTIVO|SM|ASP|ASS)$/i.test(tokens[i])){first=i;break}
    }
    if(first<1) continue;
    const nameTokens=tokens.slice(0,first);
    const rawCodes=tokens.slice(first).filter(t=>SHIFT_TOKEN.test(t)).slice(0,days);
    if(rawCodes.length < Math.min(days,Math.max(10,Math.floor(days*.65)))) continue;
    const surname=nameTokens[0]||'', name=nameTokens.slice(1).join(' ');
    const codes=Array.from({length:days},(_,i)=>(rawCodes[i]||'').toUpperCase());
    out.push({id,surname,name,codes,confidence:Math.round(rawCodes.length/days*100),sourceLine:line}); seen.add(id);
  }
  return out;
}
function groupPdfItemsIntoLines(items){
  const sorted=items.filter(it=>String(it.str||'').trim()).sort((a,b)=>b.y-a.y||a.x-b.x),bands=[];
  for(const item of sorted){let band=bands.find(b=>Math.abs(b.y-item.y)<=2.2);if(!band){band={y:item.y,items:[]};bands.push(band)}band.items.push(item)}
  bands.sort((a,b)=>b.y-a.y);
  return bands.map(b=>b.items.sort((a,b)=>a.x-b.x).map(it=>it.str.trim()).filter(Boolean).join(' ').replace(/\s+/g,' ').trim()).filter(Boolean);
}
$('readPdf').onclick=async()=>{
  const file=$('pdfFile').files[0];
  if(!file){$('pdfStatus').textContent='Seleziona prima un PDF.';return}
  if(!window.pdfjsLib){$('pdfStatus').textContent='Lettore PDF non caricato. Ricarica la pagina con Internet attivo; se persiste, prova ad aprire la webapp in una scheda anonima.';return}
  try{
    $('readPdf').disabled=true;$('pdfStatus').textContent='Lettura PDF in corso…';
    pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const pdf=await pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;let pagesText=[];
    for(let p=1;p<=pdf.numPages;p++){const page=await pdf.getPage(p),content=await page.getTextContent();const items=content.items.map(it=>({str:it.str||'',x:it.transform?.[4]||0,y:it.transform?.[5]||0}));pagesText.push(groupPdfItemsIntoLines(items).join('\n'))}
    const text=pagesText.join('\n');$('pdfRawText').value=text;$('pdfTextPanel').classList.remove('hidden');
    const monthMatch=text.match(/\b(jan|feb|mar|apr|may|mag|jun|giu|jul|lug|aug|ago|sep|set|oct|ott|nov|dec|dic)[a-z]*[-\s/]+(20\d{2}|\d{2})\b/i);
    if(monthMatch){const mm={jan:'01',feb:'02',mar:'03',apr:'04',may:'05',mag:'05',jun:'06',giu:'06',jul:'07',lug:'07',aug:'08',ago:'08',sep:'09',set:'09',oct:'10',ott:'10',nov:'11',dec:'12',dic:'12'}[monthMatch[1].slice(0,3).toLowerCase()];if(mm){let yy=monthMatch[2];if(yy.length===2)yy='20'+yy;$('pdfMonth').value=`${yy}-${mm}`}}
    const [year,monthNum]=$('pdfMonth').value.split('-').map(Number),days=new Date(year,monthNum,0).getDate();
    previewRows=parsePdfLines(text,days);previewDays=days;renderPreview();
    const valid=previewRows.filter(o=>o.codes.filter(Boolean).length===days).length;
    $('pdfStatus').textContent=previewRows.length?`PDF letto: ${pdf.numPages} pagina/e. Riconosciuti ${previewRows.length} operatori; ${valid} righe con tutti i ${days} giorni. Controlla le prime e ultime righe prima di importare.`:`Il PDF è stato aperto (${pdf.numPages} pagina/e), ma non sono state riconosciute righe complete. Apri “Mostra testo estratto dal PDF”: se è vuoto o disordinato, il PDF può richiedere OCR o un adattamento specifico.`;
  }catch(e){console.error(e);$('pdfStatus').textContent='Impossibile leggere il PDF. Prova a scaricarlo di nuovo e assicurati che non sia protetto da password. Se il testo è una scansione, serve OCR.'}
  finally{$('readPdf').disabled=false}
};
function renderPreview(){let root=$('previewTable');$('previewStats').textContent=`Operatori riconosciuti: ${previewRows.length} · Giorni previsti: ${previewDays}`;if(!previewRows.length){root.innerHTML='<p style="padding:12px">Nessun operatore riconosciuto automaticamente. Controlla il testo estratto oppure inviami il PDF per adattare il parser.</p>';return}root.innerHTML=`<table><thead><tr><th>ID</th><th>Cognome</th><th>Nome</th>${Array.from({length:previewDays},(_,i)=>`<th>${i+1}</th>`).join('')}<th>Copertura</th></tr></thead><tbody>${previewRows.map((o,i)=>`<tr><td><input data-i="${i}" data-k="id" value="${esc(o.id)}" style="width:70px"></td><td><input data-i="${i}" data-k="surname" value="${esc(o.surname)}" style="width:125px"></td><td><input data-i="${i}" data-k="name" value="${esc(o.name)}" style="width:125px"></td>${Array.from({length:previewDays},(_,j)=>`<td><input data-i="${i}" data-day="${j}" value="${esc(o.codes[j]||'')}" style="width:46px"></td>`).join('')}<td>${o.codes.filter(Boolean).length}/${previewDays}</td></tr>`).join('')}</tbody></table>`;root.querySelectorAll('input[data-i]').forEach(inp=>inp.onchange=()=>{let o=previewRows[Number(inp.dataset.i)];if(inp.dataset.k)o[inp.dataset.k]=inp.value;else if(inp.dataset.day!==undefined)o.codes[Number(inp.dataset.day)]=inp.value.trim().toUpperCase()})}
$('pdfMonth').onchange=()=>{let [y,m]=$('pdfMonth').value.split('-').map(Number);previewDays=new Date(y,m,0).getDate();previewRows=previewRows.map(o=>({...o,codes:Array.from({length:previewDays},(_,i)=>o.codes[i]||'')}));renderPreview()};
$('clearPreview').onclick=()=>{previewRows=[];$('pdfStatus').textContent='Anteprima svuotata.';$('pdfRawText').value='';renderPreview()};
$('importOperators').onclick=()=>{if(!previewRows.length){alert('Prima leggi un PDF e controlla l’anteprima.');return}if(!confirm(`Importare ${previewRows.length} operatori? Gli operatori con lo stesso ID saranno aggiornati.`))return;let map=new Map(data.operators.map(o=>[String(o.id),o]));previewRows.forEach(o=>{let clean={id:String(o.id).trim(),surname:o.surname.trim(),name:o.name.trim(),codes:Array.from({length:previewDays},(_,i)=>(o.codes[i]||'').trim().toUpperCase())};if(clean.id)map.set(clean.id,clean)});data.operators=[...map.values()].sort((a,b)=>a.surname.localeCompare(b.surname,'it'));data.operatorMonth=$('pdfMonth').value;$('operatorMonth').value=data.operatorMonth;save();switchTab('operators');alert('Importazione completata. Controlla il quadro generale.')};
$('exportPreview').onclick=()=>{let lines=[['ID','Cognome','Nome',...Array.from({length:previewDays},(_,i)=>i+1)].map(csvCell).join(',')];previewRows.forEach(o=>lines.push([o.id,o.surname,o.name,...o.codes].map(csvCell).join(',')));download('anteprima-operatori.csv','\ufeff'+lines.join('\r\n'),'text/csv;charset=utf-8')};
function backup(){download('calendario-turni-backup.json',JSON.stringify(data,null,2),'application/json')}$('backup').onclick=backup;$('backup2').onclick=backup;$('restoreBtn').onclick=()=>$('restoreFile').click();$('restoreFile').onchange=async e=>{try{let d=JSON.parse(await e.target.files[0].text());if(!d.personal||!d.shifts||!d.operators)throw Error();if(confirm('Sostituire i dati attuali con il backup?')){data=d;save();alert('Backup ripristinato')}}catch{alert('Backup non valido')}e.target.value=''};
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
renderAll();
