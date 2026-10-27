/* AI Som · demo del sommelier su carta campione (30 vini). Widget autonomo:
   <div data-aisom-demo></div> + <script src=".../demo-sommelier.js" defer></script>
   Lingue allineate all'app: it, en, es, fr, de, ru, zh, ar. Se è presente gtag invia gli eventi
   demo_avviata / demo_consiglio / demo_lingua. */
(function(){
'use strict';
var CSS=".aisom-demo{--d1:#0F0F0F;--d2:#1A1A1A;--d3:#242424;--wine:#C43C4D;--wine3:#E39AA4;--tx:#C0B0A0;--tx2:#A89886;--bd:rgba(255,255,255,.1);font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;color:#EDE6DD;max-width:860px;margin:0 auto;background:var(--d2);border:1px solid var(--bd);border-radius:22px;padding:26px;position:relative;text-align:left;line-height:1.55;box-sizing:border-box}\n.aisom-demo *{box-sizing:border-box}\n.aisom-demo .ad-lang{position:absolute;top:18px;right:18px}\n.aisom-demo .ad-langtrig{background:var(--d3);border:1px solid var(--bd);color:#EDE6DD;border-radius:999px;padding:10px 14px;font:inherit;font-size:13px;cursor:pointer;display:flex;gap:8px;align-items:center;min-height:44px}\n.aisom-demo .ad-langmenu{display:none;position:absolute;top:50px;right:0;background:var(--d3);border:1px solid var(--bd);border-radius:14px;padding:6px;z-index:5;min-width:170px}\n.aisom-demo .ad-langmenu.open{display:block}\n.aisom-demo .ad-langmenu button{display:flex;gap:10px;align-items:center;width:100%;background:none;border:none;color:#EDE6DD;padding:10px 12px;border-radius:9px;cursor:pointer;font:inherit;font-size:14px;text-align:left}\n.aisom-demo .ad-langmenu button:hover,.aisom-demo .ad-langmenu button:focus-visible{background:rgba(255,255,255,.08)}\n.aisom-demo .ad-tag{display:inline-block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--wine3);border:1px solid rgba(196,60,77,.35);border-radius:999px;padding:4px 10px}\n.aisom-demo .ad-prompt{display:block;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:var(--tx2);margin:18px 0 10px}\n.aisom-demo .ad-input{width:100%;background:var(--d1);border:1px solid var(--bd);border-radius:12px;padding:15px 16px;color:#fff;font:inherit;font-size:16px;outline:none}\n.aisom-demo .ad-input:focus{border-color:var(--wine)}\n.aisom-demo .ad-chips{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}\n.aisom-demo .ad-chip{background:var(--d3);border:1px solid var(--bd);color:var(--tx);font:inherit;font-size:13px;padding:8px 13px;border-radius:999px;cursor:pointer;min-height:36px}\n.aisom-demo .ad-chip:hover,.aisom-demo .ad-chip:focus-visible{border-color:var(--wine);color:#fff}\n.aisom-demo .ad-btn{width:100%;margin-top:6px;background:var(--wine);color:#fff;border:0;border-radius:999px;padding:15px 20px;font:inherit;font-weight:700;font-size:15px;cursor:pointer;min-height:48px}\n.aisom-demo .ad-btn:hover{background:#A6303D}\n.aisom-demo :focus-visible{outline:2px solid var(--wine3);outline-offset:2px}\n.aisom-demo .ad-loader{text-align:center;padding:36px 0;color:var(--tx2)}\n.aisom-demo .ad-dots{display:inline-flex;gap:6px;margin-bottom:12px}\n.aisom-demo .ad-dots span{width:10px;height:10px;border-radius:50%;background:var(--wine);animation:adDot 1.2s infinite ease-in-out}\n.aisom-demo .ad-dots span:nth-child(2){animation-delay:.2s}.aisom-demo .ad-dots span:nth-child(3){animation-delay:.4s}\n@keyframes adDot{0%,80%,100%{transform:scale(.5);opacity:.4}40%{transform:scale(1);opacity:1}}\n.aisom-demo .ad-results{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px}\n@media(max-width:700px){.aisom-demo{padding:20px 16px}.aisom-demo .ad-results{grid-template-columns:1fr}.aisom-demo .ad-lang{position:static;margin-bottom:6px}}\n.aisom-demo .ad-card{background:var(--d1);border:1px solid var(--bd);border-radius:16px;padding:20px;animation:adIn .4s both}\n@keyframes adIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}\n.aisom-demo .ad-card h3{font-size:19px;margin:0;color:#fff;font-weight:700;line-height:1.2}\n.aisom-demo .ad-sub{font-size:12px;letter-spacing:.5px;color:var(--tx2);margin:4px 0 10px}\n.aisom-demo .ad-price{font-size:18px;font-weight:700;color:#fff;font-variant-numeric:tabular-nums}\n.aisom-demo .ad-price small{font-size:12px;font-weight:500;color:var(--tx2)}\n.aisom-demo .ad-why{font-size:15px;color:var(--tx);margin:10px 0 0}\n.aisom-demo details{margin-top:12px;border-top:1px solid var(--bd);padding-top:10px}\n.aisom-demo summary{cursor:pointer;font-size:13px;font-weight:600;color:var(--wine3);min-height:32px;display:flex;align-items:center}\n.aisom-demo .ad-lbl{font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--wine3);display:block;margin:10px 0 3px}\n.aisom-demo .ad-txt{font-size:14px;color:var(--tx)}\n.aisom-demo .ad-prof{background:var(--d2);border-radius:10px;padding:12px;margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:6px 14px}\n.aisom-demo .ad-prow{display:flex;align-items:center;justify-content:space-between;gap:6px;font-size:12px;color:var(--tx2)}\n.aisom-demo .ad-balls{display:flex;gap:3px}\n.aisom-demo .ad-ball{width:9px;height:9px;border-radius:50%;border:1px solid #4A4A4A}\n.aisom-demo .ad-ball.on{background:#C09040;border-color:#C09040}\n.aisom-demo .ad-disc{text-align:center;color:var(--tx2);font-size:13px;margin:20px auto 0;max-width:620px}";
var LABS=['Struttura','Freschezza','Acidità','Sapidità','Tannino','Grassezza','Succulenza','Persistenza','Aromaticità','Equilibrio'];
var LABS_I18N={
it:LABS,
en:['Body','Freshness','Acidity','Savoriness','Tannin','Fatness','Juiciness','Persistence','Aromatics','Balance'],
fr:['Corps','Fraîcheur','Acidité','Salinité','Tanin','Gras','Sapidité','Persistance','Aromatique','Équilibre'],
de:['Körper','Frische','Säure','Würze','Tannin','Fülle','Saftigkeit','Abgang','Aromatik','Balance'],
ru:['Тело','Свежесть','Кислотность','Пикантность','Танин','Жирность','Сочность','Послевкусие','Ароматика','Баланс'],
zh:['酒体','清新度','酸度','咸鲜感','单宁','肥厚度','多汁感','余味','香气','平衡感'],
es:['Cuerpo','Frescura','Acidez','Salinidad','Tanino','Untuosidad','Jugosidad','Persistencia','Aromaticidad','Equilibrio'],
ar:['القوام','النضارة','الحموضة','النكهة المالحة','العفوصة','الدسامة','العصارة','الثبات','العطرية','التوازن']
};
var WINES=[
{n:"Barolo Riserva DOCG 2018",s:"Piemonte · Nebbiolo · Marchesi di Barolo",pr:"€45-65",p:[5,3,4,3,5,2,2,5,4,4],w:"Tannini potenti che abbracciano le proteine della carne rossa. Acidità vibrante che pulisce il grasso ad ogni sorso.",se:"Ciliegia matura, rosa appassita, catrame e spezie. Finale lunghissimo e austero.",t:"Stappa 2 ore prima. 17-18°C in calice ampio.",kw:["bistecca","fiorentina","manzo","tagliata","agnello","selvaggina","cinghiale","brasato","carne"]},
{n:"Brunello di Montalcino DOCG 2017",s:"Toscana · Sangiovese · Col d'Orcia",pr:"€55-80",p:[5,3,4,3,5,2,3,5,4,4],w:"Sangiovese in purezza con tannini fitti ed eleganti. Abbinamento per eccellenza con le grandi carni toscane.",se:"Frutti di bosco, viola, cuoio e spezie. Bocca piena e avvolgente.",t:"Perfetto con bistecca o tagliata. 17-18°C.",kw:["bistecca","tagliata","manzo","agnello","cinghiale","selvaggina","carne"]},
{n:"Amarone della Valpolicella DOCG 2017",s:"Veneto · Corvina · Bertani",pr:"€40-60",p:[5,2,3,4,4,4,3,5,5,4],w:"Concentrazione da uve appassite perfetta per formaggi stagionati e carni importanti. Potente e voluttuoso.",se:"Ciliegia sotto spirito, cioccolato, tabacco, prugna secca. Caldo.",t:"Con Parmigiano 36 mesi o brasati. 18°C.",kw:["formaggio","stagionato","brasato","cinghiale","selvaggina","tartufo","pappardelle"]},
{n:"Chianti Classico DOCG 2021",s:"Toscana · Sangiovese · Rocca delle Macìe",pr:"€15-22",p:[3,4,4,3,3,2,3,3,3,4],w:"Acidità del Sangiovese in armonia con il pomodoro. Il rosso toscano per pasta e pizza.",se:"Ciliegia fresca, violetta, erbe mediterranee.",t:"16°C. Versatile con quasi tutto il menù.",kw:["pasta","pomodoro","ragù","pizza","tagliatelle","bruschetta","carbonara"]},
{n:"Barbaresco DOCG 2019",s:"Piemonte · Nebbiolo · Produttori del Barbaresco",pr:"€30-45",p:[4,3,4,3,4,2,2,5,5,4],w:"Profilo terroso e floreale che rispecchia le note umami del tartufo.",se:"Rosa appassita, catrame, sottobosco e mora.",t:"Con risotto al tartufo o pappardelle. 17°C.",kw:["tartufo","funghi","porcini","risotto","pappardelle","selvaggina"]},
{n:"Sagrantino di Montefalco DOCG 2017",s:"Umbria · Sagrantino · Arnaldo Caprai",pr:"€35-50",p:[5,2,4,4,5,2,2,5,4,3],w:"L'unico che regge cinghiale e selvaggina dal sapore intenso. Massimo contenuto di polifenoli.",se:"More selvatiche, resina, tabacco e note ferrose.",t:"Apri 4 ore prima. Con cinghiale in umido.",kw:["cinghiale","selvaggina","pappardelle","ragù","cacciagione"]},
{n:"Aglianico del Vulture DOC 2019",s:"Basilicata · Aglianico · Cantine del Notaio",pr:"€18-28",p:[5,3,4,4,5,2,2,4,4,3],w:"Tannini robusti e acidità tagliente bilanciano la grassezza dell'agnello.",se:"More, prugna secca, pepe nero e mineralità vulcanica.",t:"17°C con agnello al forno o brace.",kw:["agnello","maiale","salsiccia","brace","carne"]},
{n:"Etna Rosso DOC 2021",s:"Sicilia · Nerello Mascalese · Benanti",pr:"€22-35",p:[3,4,4,4,3,1,2,4,4,5],w:"Leggerezza tannica e mineralità vulcanica per piatti vegetariani e paste al pomodoro.",se:"Ciliegia, melograno, spezie e cenere.",t:"Con pasta alla norma o verdure. 16°C.",kw:["vegetariano","verdure","melanzane","pasta","pomodoro","triste"]},
{n:"Morellino di Scansano DOCG 2021",s:"Toscana · Sangiovese · Erik Banti",pr:"€12-18",p:[3,3,3,3,3,2,3,3,3,4],w:"Tannini morbidi che si abbinano alle carni di maiale tagliando il grasso.",se:"Ciliegia, prugna, macchia mediterranea e cuoio.",t:"Con porchetta, salsicce o salumi. 16°C.",kw:["maiale","salsiccia","salumi","tagliere","antipasto"]},
{n:"Primitivo di Manduria DOC 2020",s:"Puglia · Primitivo · Produttori di Manduria",pr:"€14-22",p:[4,2,3,3,3,3,4,4,4,3],w:"Generosità di frutto e calore solare. Avvolgente e appagante.",se:"More, confettura di prugne, cioccolato e spezie dolci.",t:"Con carni alla brace o formaggi stagionati. 17°C.",kw:["carne","grigliata","formaggio","stagionato","brace"]},
{n:"Nebbiolo Langhe DOC 2021",s:"Piemonte · Nebbiolo · Gaja",pr:"€25-35",p:[3,3,4,3,4,2,2,3,4,4],w:"Tutta la personalità del Barolo senza l'impegno. Per chi vuole qualcosa di vero.",se:"Ciliegia, violetta, spezie e rosa.",t:"Con risotto ai funghi o ragù. 16-17°C.",kw:["triste","solitudine","funghi","risotto","tartufo"]},
{n:"Cerasuolo d'Abruzzo DOC 2022",s:"Abruzzo · Montepulciano · Valentini",pr:"€12-18",p:[2,4,4,3,2,2,3,3,4,4],w:"Rosato strutturato e sapido: corpo per i salumi, freschezza che non appesantisce.",se:"Ciliegia, melograno, fiori rossi e spezie.",t:"Con taglieri di salumi. 12-14°C.",kw:["aperitivo","salumi","tagliere","antipasto","bruschetta","caprese"]},
{n:"Montepulciano d'Abruzzo DOC 2022",s:"Abruzzo · Montepulciano · Masciarelli",pr:"€10-15",p:[3,3,3,3,3,2,3,3,3,4],w:"Corpo e morbidezza ideali per sughi di pomodoro. Tannini vellutati.",se:"Prugna fresca, mora, cioccolato fondente.",t:"Con pasta al ragù o pizza. 15-16°C.",kw:["pasta","pomodoro","pizza","ragù","tagliatelle"]},
{n:"Nero d'Avola Sicilia DOC 2021",s:"Sicilia · Nero d'Avola · Planeta",pr:"€12-18",p:[4,3,3,3,4,3,3,4,4,4],w:"Carattere mediterraneo con frutta nera e cacao. Un rosso di carattere senza impegni.",se:"Ciliegia nera, cacao, spezie e tabacco.",t:"Con carni rosse e formaggi stagionati. 17°C.",kw:["carne","formaggio","stagionato","baccalà","secondi"]},
{n:"Recioto della Valpolicella DOC",s:"Veneto · Corvina · Allegrini",pr:"€25-35",p:[4,2,3,3,3,4,4,5,5,3],w:"Dolcezza intensa capace di reggere il cioccolato fondente. Potenza assoluta.",se:"Confettura di amarene, cioccolato, cannella e viola.",t:"Con torta al cioccolato fondente. 14°C.",kw:["dolce","cioccolato","dessert","tiramisù","torta"]},
{n:"Vermentino di Sardegna DOC 2023",s:"Sardegna · Vermentino · Argiolas",pr:"€12-18",p:[2,5,4,4,1,1,3,3,4,4],w:"Freschezza agrumata e sapidità marina esaltano la delicatezza del pesce.",se:"Lime, pesca bianca, mandorla e nota salina.",t:"Freddissimo 8-10°C. Con pesce al forno.",kw:["pesce","branzino","orata","polpo","frutti di mare","baccal"]},
{n:"Fiano di Avellino DOCG 2022",s:"Campania · Fiano · Feudi di San Gregorio",pr:"€15-22",p:[3,4,4,5,1,2,3,4,4,5],w:"Mineralità e sapidità rispecchiano il carattere iodato dei frutti di mare.",se:"Nocciola, miele d'acacia, pesca e mineralità.",t:"Con spaghetti alle vongole o polpo. 10-12°C.",kw:["vongole","polpo","frutti di mare","pesce","spaghetti"]},
{n:"Soave Classico DOC 2022",s:"Veneto · Garganega · Pieropan",pr:"€12-18",p:[2,4,4,4,1,2,3,3,4,5],w:"Delicatezza che accompagna i risotti senza sovrastarli.",se:"Mandorla, pesca bianca, fiori di campo.",t:"Con risotto agli asparagi o erbe. 10-12°C.",kw:["risotto","pasta leggera","zuppa","antipasto"]},
{n:"Greco di Tufo DOCG 2022",s:"Campania · Greco · Mastroberardino",pr:"€14-20",p:[3,4,4,4,1,2,3,4,4,4],w:"Mineralità e struttura per pesce di carattere più deciso.",se:"Pesca gialla, albicocca, fiori bianchi.",t:"Con branzino al forno o spigola. 10-12°C.",kw:["pesce","branzino","secondi","carpaccio"]},
{n:"Verdicchio dei Castelli di Jesi DOC 2022",s:"Marche · Verdicchio · Umani Ronchi",pr:"€10-15",p:[2,5,5,4,1,1,2,3,4,4],w:"Acidità tagliente e sapidità bilanciano la ricchezza del risotto.",se:"Limone, erbe aromatiche, mandorla verde.",t:"Con risotto alle erbe o limone. 10°C.",kw:["risotto","pasta","erbe","pesce","verdure"]},
{n:"Lugana DOC 2022",s:"Lombardia · Trebbiano · Zenato",pr:"€14-20",p:[3,4,4,4,1,2,3,4,4,5],w:"Il grande bianco italiano sottovalutato: struttura, freschezza e longevità.",se:"Pesca bianca, mandorla, fiori di campo.",t:"Con risotti delicati o aperitivo. 10-12°C.",kw:["aperitivo","antipasto","pesce","risotto","caprese"]},
{n:"Gewürztraminer Alto Adige DOC 2022",s:"Alto Adige · Gewürztraminer · Tramin",pr:"€16-24",p:[2,3,3,2,1,2,3,4,5,3],w:"Profumi intensi e morbidezza rispecchiano la complessità del sushi.",se:"Rosa, litchi, zenzero e spezie esotiche.",t:"Con sushi o cucina speziata. 10°C.",kw:["sushi","etnica","speziato","asiatico","thai"]},
{n:"Vermentino di Gallura DOCG 2022",s:"Sardegna · Vermentino · Sella&Mosca",pr:"€14-20",p:[2,5,4,5,1,1,2,3,5,4],w:"Sapidità e aromaticità esaltano le verdure di stagione.",se:"Agrumi, erbe aromatiche, fiori bianchi.",t:"Con verdure grigliate o caprese. 10°C.",kw:["vegetariano","verdure","caprese","antipasto","insalata"]},
{n:"Etna Bianco DOC 2022",s:"Sicilia · Carricante · Cornelissen",pr:"€18-28",p:[2,5,4,5,1,1,3,4,4,5],w:"Mineralità vulcanica e freschezza rendono salumi e formaggi più vivi.",se:"Pesca, agrumi, fiori gialli e mineralità lavica.",t:"Con taglieri siciliani o pesce. 10-12°C.",kw:["aperitivo","tagliere","salumi","pesce","antipasto"]},
{n:"Ribolla Gialla Friuli DOC 2022",s:"Friuli · Ribolla Gialla · Gravner",pr:"€20-30",p:[3,4,4,4,2,2,3,4,4,4],w:"Vino arancio con struttura tannica leggera che regge carpacci e antipasti importanti.",se:"Pesca matura, miele, spezie e tannini morbidi.",t:"Con carpaccio di manzo o formaggi. 12-14°C.",kw:["carpaccio","formaggio","antipasto","tagliere"]},
{n:"Franciacorta Brut DOCG",s:"Lombardia · Chardonnay · Ca' del Bosco",pr:"€22-32",p:[2,5,4,3,1,2,3,4,4,5],w:"Effervescenza cremosa e freschezza agrumata: il compagno di ogni aperitivo o festeggiamento.",se:"Pane tostato, agrumi, mela golden e fiori.",t:"6-8°C in calice tulipano. Con salumi.",kw:["aperitivo","festeggiare","compleanno","brindisi","antipasto","salumi","caprese"]},
{n:"Franciacorta Rosé Satèn DOCG",s:"Lombardia · Pinot Nero · Bellavista",pr:"€28-40",p:[2,5,4,3,1,2,4,4,5,5],w:"Bollicine cremose e colore rame dorato: il vino dei festeggiamenti eleganti.",se:"Fragola, lampone, pane tostato e rosa.",t:"In calice tulipano a 8°C. Per celebrare.",kw:["romantica","festeggiare","compleanno","anniversario","speciale","brindisi"]},
{n:"Prosecco Valdobbiadene Superiore DOCG Brut",s:"Veneto · Glera · Nino Franco",pr:"€12-18",p:[1,5,4,2,1,1,3,2,4,4],w:"Leggero, festoso e generoso. Il vino dei brindisi spontanei.",se:"Mela verde, pera, fiori d'acacia e mandorla.",t:"Non aspettare il momento giusto: è adesso.",kw:["aperitivo","festeggiare","antipasto","sushi","leggero","fresco"]},
{n:"Moscato d'Asti DOCG 2023",s:"Piemonte · Moscato · Paolo Saracco",pr:"€12-16",p:[1,4,3,2,1,3,4,3,5,4],w:"Dolcezza delicata e bollicine fini per i dolci da forno. Bassa gradazione.",se:"Pesca bianca, albicocca, fiori d'arancio e miele.",t:"Con crostate, panna cotta, dessert. 6-8°C.",kw:["dolce","dessert","panna cotta","cannoli","gelato","tiramisù"]},
{n:"Passito di Pantelleria DOC",s:"Sicilia · Zibibbo · Donnafugata",pr:"€22-32",p:[3,3,3,3,1,4,4,5,5,4],w:"Dolcezza equilibrata da fresca acidità: il contrasto con formaggi erborinati o dessert intensi.",se:"Albicocca secca, miele, fichi e agrumi canditi.",t:"Con Gorgonzola, torta al cioccolato o cannoli. 12°C.",kw:["dolce","cioccolato","torta","formaggio","cannoli","dessert"]}
];

var REGIONS={
"Piemonte":{en:"Piedmont",fr:"Piémont",de:"Piemont",ru:"Пьемонт",zh:"皮埃蒙特",es:"Piamonte",ar:"بيامونتي"},
"Toscana":{en:"Tuscany",fr:"Toscane",de:"Toskana",ru:"Тоскана",zh:"托斯卡纳",es:"Toscana",ar:"توسكانا"},
"Veneto":{en:"Veneto",fr:"Vénétie",de:"Venetien",ru:"Венето",zh:"威尼托",es:"Véneto",ar:"فينيتو"},
"Umbria":{en:"Umbria",fr:"Ombrie",de:"Umbrien",ru:"Умбрия",zh:"翁布里亚",es:"Umbría",ar:"أومبريا"},
"Basilicata":{en:"Basilicata",fr:"Basilicate",de:"Basilikata",ru:"Базиликата",zh:"巴斯利卡塔",es:"Basilicata",ar:"بازيليكاتا"},
"Sicilia":{en:"Sicily",fr:"Sicile",de:"Sizilien",ru:"Сицилия",zh:"西西里",es:"Sicilia",ar:"صقلية"},
"Puglia":{en:"Puglia",fr:"Pouilles",de:"Apulien",ru:"Апулия",zh:"普利亚",es:"Apulia",ar:"بوليا"},
"Abruzzo":{en:"Abruzzo",fr:"Abruzzes",de:"Abruzzen",ru:"Абруццо",zh:"阿布鲁佐",es:"Abruzos",ar:"أبروتزو"},
"Campania":{en:"Campania",fr:"Campanie",de:"Kampanien",ru:"Кампания",zh:"坎帕尼亚",es:"Campania",ar:"كامبانيا"},
"Marche":{en:"Marche",fr:"Marches",de:"Marken",ru:"Марке",zh:"马尔凯",es:"Marcas",ar:"ماركيه"},
"Lombardia":{en:"Lombardy",fr:"Lombardie",de:"Lombardei",ru:"Ломбардия",zh:"伦巴第",es:"Lombardía",ar:"لومبارديا"},
"Alto Adige":{en:"South Tyrol",fr:"Haut-Adige",de:"Südtirol",ru:"Южный Тироль",zh:"上阿迪杰",es:"Alto Adigio",ar:"ألتو أديجي"},
"Sardegna":{en:"Sardinia",fr:"Sardaigne",de:"Sardinien",ru:"Сардиния",zh:"撒丁岛",es:"Cerdeña",ar:"سردينيا"},
"Friuli":{en:"Friuli",fr:"Frioul",de:"Friaul",ru:"Фриули",zh:"弗留利",es:"Friul",ar:"فريولي"}
};
var CHIPS_I18N={
it:["Bistecca fiorentina","Sushi","Frutti di mare","Serata romantica","Formaggi stagionati","Sono triste","Tartufo nero","Aperitivo","Pizza margherita","Agnello al forno","Dessert al cioccolato","Festeggiare una promozione"],
en:["Florentine steak","Sushi","Seafood","Romantic dinner","Aged cheeses","I'm feeling down","Black truffle","Aperitivo","Margherita pizza","Roast lamb","Chocolate dessert","Celebrating a promotion"],
fr:["Bistecca fiorentina","Sushi","Fruits de mer","Dîner romantique","Fromages affinés","Je suis triste","Truffe noire","Apéritif","Pizza margherita","Agneau rôti","Dessert au chocolat","Fêter une promotion"],
de:["Bistecca Fiorentina","Sushi","Meeresfrüchte","Romantisches Dinner","Gereifter Käse","Ich bin traurig","Schwarzer Trüffel","Aperitif","Pizza Margherita","Lammbraten","Schokoladendessert","Eine Beförderung feiern"],
ru:["Флорентийский стейк","Суши","Морепродукты","Романтический ужин","Выдержанные сыры","Мне грустно","Чёрный трюфель","Аперитив","Пицца Маргарита","Жареная баранина","Шоколадный десерт","Отмечаем повышение"],
zh:["佛罗伦萨牛排","寿司","海鲜","浪漫晚餐","陈年奶酪","我有点难过","黑松露","开胃酒","玛格丽特披萨","烤羊肉","巧克力甜点","庆祝升职"],
es:["Chuletón a la florentina","Sushi","Marisco","Velada romántica","Quesos curados","Estoy triste","Trufa negra","Aperitivo","Pizza margarita","Cordero al horno","Postre de chocolate","Celebrar un ascenso"],
ar:["ستيك فلورنسا","سوشي","مأكولات بحرية","عشاء رومانسي","أجبان معتقة","أشعر بالحزن","كمأة سوداء","أبيريتيف","بيتزا مارغريتا","لحم ضأن مشوي","حلوى الشوكولاتة","الاحتفال بترقية"]
};
var WT={
en:[
{w:"Powerful tannins that embrace red meat's proteins. Vibrant acidity that cuts through the fat with every sip.",se:"Ripe cherry, dried rose, tar and spice. A very long, austere finish.",t:"Open 2 hours before serving. 17-18°C in a large glass."},
{w:"Pure Sangiovese with tight, elegant tannins. The classic match for great Tuscan meats.",se:"Wild berries, violet, leather and spice. Full, enveloping palate.",t:"Perfect with steak or tagliata. 17-18°C."},
{w:"Concentration from dried grapes, perfect with aged cheeses and rich meats. Powerful and voluptuous.",se:"Cherry in spirit, chocolate, tobacco, dried plum. Warm.",t:"With 36-month Parmigiano or braised meats. 18°C."},
{w:"Sangiovese's acidity in harmony with tomato. The Tuscan red for pasta and pizza.",se:"Fresh cherry, violet, Mediterranean herbs.",t:"16°C. Versatile with almost the whole menu."},
{w:"An earthy, floral profile that mirrors truffle's umami notes.",se:"Dried rose, tar, undergrowth and blackberry.",t:"With truffle risotto or pappardelle. 17°C."},
{w:"The only wine that stands up to wild boar and intensely flavoured game. Highest polyphenol content.",se:"Wild blackberry, resin, tobacco and ferrous notes.",t:"Open 4 hours ahead. With braised wild boar."},
{w:"Robust tannins and cutting acidity balance the richness of lamb.",se:"Blackberry, dried plum, black pepper and volcanic minerality.",t:"17°C with roast or grilled lamb."},
{w:"Light tannins and volcanic minerality for vegetarian dishes and tomato pasta.",se:"Cherry, pomegranate, spice and ash.",t:"With pasta alla norma or vegetables. 16°C."},
{w:"Soft tannins that pair with pork, cutting through the fat.",se:"Cherry, plum, Mediterranean scrub and leather.",t:"With porchetta, sausages or cured meats. 16°C."},
{w:"Generous fruit and sun-drenched warmth. Enveloping and satisfying.",se:"Blackberry, plum jam, chocolate and sweet spice.",t:"With grilled meats or aged cheeses. 17°C."},
{w:"All of Barolo's personality without the commitment. For those who want something real.",se:"Cherry, violet, spice and rose.",t:"With mushroom risotto or ragù. 16-17°C."},
{w:"A structured, savory rosé: enough body for cured meats, freshness that never weighs it down.",se:"Cherry, pomegranate, red flowers and spice.",t:"With cured-meat boards. 12-14°C."},
{w:"Body and softness ideal for tomato sauces. Velvety tannins.",se:"Fresh plum, blackberry, dark chocolate.",t:"With pasta al ragù or pizza. 15-16°C."},
{w:"Mediterranean character with black fruit and cocoa. A characterful red with no strings attached.",se:"Black cherry, cocoa, spice and tobacco.",t:"With red meats and aged cheeses. 17°C."},
{w:"Intense sweetness able to stand up to dark chocolate. Absolute power.",se:"Black cherry jam, chocolate, cinnamon and violet.",t:"With dark chocolate cake. 14°C."},
{w:"Citrus freshness and sea-salt savor bring out the fish's delicacy.",se:"Lime, white peach, almond and a saline note.",t:"Ice cold, 8-10°C. With baked fish."},
{w:"Minerality and savor mirror the iodine character of seafood.",se:"Hazelnut, acacia honey, peach and minerality.",t:"With clam spaghetti or octopus. 10-12°C."},
{w:"A delicacy that accompanies risottos without overpowering them.",se:"Almond, white peach, wildflowers.",t:"With asparagus or herb risotto. 10-12°C."},
{w:"Minerality and structure for more assertive fish dishes.",se:"Yellow peach, apricot, white flowers.",t:"With baked sea bass. 10-12°C."},
{w:"Cutting acidity and savor balance the richness of risotto.",se:"Lemon, aromatic herbs, green almond.",t:"With herb or lemon risotto. 10°C."},
{w:"Italy's great underrated white: structure, freshness and longevity.",se:"White peach, almond, wildflowers.",t:"With delicate risottos or as an aperitif. 10-12°C."},
{w:"Intense aromatics and softness mirror sushi's complexity.",se:"Rose, lychee, ginger and exotic spice.",t:"With sushi or spiced cuisine. 10°C."},
{w:"Savor and aromatics bring out seasonal vegetables.",se:"Citrus, aromatic herbs, white flowers.",t:"With grilled vegetables or caprese. 10°C."},
{w:"Volcanic minerality and freshness bring cured meats and cheeses to life.",se:"Peach, citrus, yellow flowers and lava minerality.",t:"With Sicilian boards or fish. 10-12°C."},
{w:"An orange wine with light tannic structure that stands up to carpaccio and hearty starters.",se:"Ripe peach, honey, spice and soft tannins.",t:"With beef carpaccio or cheeses. 12-14°C."},
{w:"Creamy effervescence and citrus freshness: the companion for any aperitivo or celebration.",se:"Toasted bread, citrus, golden apple and flowers.",t:"6-8°C in a tulip glass. With cured meats."},
{w:"Creamy bubbles and a golden-copper hue: the wine for elegant celebrations.",se:"Strawberry, raspberry, toasted bread and rose.",t:"In a tulip glass at 8°C. For celebrating."},
{w:"Light, festive and generous. The wine for spontaneous toasts.",se:"Green apple, pear, acacia flowers and almond.",t:"Don't wait for the right moment: it's now."},
{w:"Delicate sweetness and fine bubbles for baked desserts. Low alcohol.",se:"White peach, apricot, orange blossom and honey.",t:"With tarts, panna cotta, desserts. 6-8°C."},
{w:"Balanced sweetness with fresh acidity: the contrast for blue cheeses or intense desserts.",se:"Dried apricot, honey, figs and candied citrus.",t:"With Gorgonzola, chocolate cake or cannoli. 12°C."}
],
fr:[
{w:"Tanins puissants qui enveloppent les protéines de la viande rouge. Acidité vive qui nettoie le gras à chaque gorgée.",se:"Cerise mûre, rose fanée, goudron et épices. Finale très longue et austère.",t:"Ouvrir 2 heures avant. 17-18°C dans un grand verre."},
{w:"Sangiovese pur aux tanins serrés et élégants. L'accord par excellence avec les grandes viandes toscanes.",se:"Fruits des bois, violette, cuir et épices. Bouche pleine et enveloppante.",t:"Parfait avec une bistecca ou une tagliata. 17-18°C."},
{w:"Concentration issue de raisins passerillés, parfaite avec les fromages affinés et les viandes corsées. Puissant et voluptueux.",se:"Cerise à l'eau-de-vie, chocolat, tabac, pruneau. Chaleureux.",t:"Avec un Parmigiano de 36 mois ou des braisés. 18°C."},
{w:"L'acidité du Sangiovese en harmonie avec la tomate. Le rouge toscan pour les pâtes et la pizza.",se:"Cerise fraîche, violette, herbes méditerranéennes.",t:"16°C. Polyvalent avec presque tout le menu."},
{w:"Un profil terreux et floral qui reflète les notes umami de la truffe.",se:"Rose fanée, goudron, sous-bois et mûre.",t:"Avec un risotto à la truffe ou des pappardelle. 17°C."},
{w:"Le seul qui tienne face au sanglier et au gibier au goût intense. Le plus haut taux de polyphénols.",se:"Mûres sauvages, résine, tabac et notes ferreuses.",t:"Ouvrir 4 heures avant. Avec un sanglier en sauce."},
{w:"Des tanins robustes et une acidité tranchante équilibrent le gras de l'agneau.",se:"Mûre, pruneau, poivre noir et minéralité volcanique.",t:"17°C avec de l'agneau rôti ou grillé."},
{w:"Légèreté tannique et minéralité volcanique pour les plats végétariens et les pâtes à la tomate.",se:"Cerise, grenade, épices et cendre.",t:"Avec des pâtes alla norma ou des légumes. 16°C."},
{w:"Des tanins souples qui s'accordent avec les viandes de porc en coupant le gras.",se:"Cerise, prune, maquis méditerranéen et cuir.",t:"Avec porchetta, saucisses ou charcuterie. 16°C."},
{w:"Générosité du fruit et chaleur solaire. Enveloppant et satisfaisant.",se:"Mûre, confiture de prunes, chocolat et épices douces.",t:"Avec des viandes grillées ou des fromages affinés. 17°C."},
{w:"Toute la personnalité du Barolo sans l'engagement. Pour ceux qui veulent de l'authentique.",se:"Cerise, violette, épices et rose.",t:"Avec un risotto aux champignons ou un ragù. 16-17°C."},
{w:"Un rosé structuré et salin : assez de corps pour la charcuterie, une fraîcheur qui n'alourdit pas.",se:"Cerise, grenade, fleurs rouges et épices.",t:"Avec des planches de charcuterie. 12-14°C."},
{w:"Corps et souplesse idéaux pour les sauces tomate. Tanins veloutés.",se:"Prune fraîche, mûre, chocolat noir.",t:"Avec des pâtes au ragù ou une pizza. 15-16°C."},
{w:"Caractère méditerranéen aux fruits noirs et au cacao. Un rouge de caractère sans complications.",se:"Cerise noire, cacao, épices et tabac.",t:"Avec des viandes rouges et des fromages affinés. 17°C."},
{w:"Une douceur intense capable de tenir tête au chocolat noir. Puissance absolue.",se:"Confiture de cerises noires, chocolat, cannelle et violette.",t:"Avec un gâteau au chocolat noir. 14°C."},
{w:"Fraîcheur d'agrumes et salinité marine qui subliment la délicatesse du poisson.",se:"Citron vert, pêche blanche, amande et une note saline.",t:"Très frais, 8-10°C. Avec du poisson au four."},
{w:"Minéralité et salinité reflètent le caractère iodé des fruits de mer.",se:"Noisette, miel d'acacia, pêche et minéralité.",t:"Avec des spaghetti aux palourdes ou du poulpe. 10-12°C."},
{w:"Une délicatesse qui accompagne les risottos sans les dominer.",se:"Amande, pêche blanche, fleurs des champs.",t:"Avec un risotto aux asperges ou aux herbes. 10-12°C."},
{w:"Minéralité et structure pour des poissons plus affirmés.",se:"Pêche jaune, abricot, fleurs blanches.",t:"Avec un bar au four. 10-12°C."},
{w:"Une acidité tranchante et une salinité équilibrent la richesse du risotto.",se:"Citron, herbes aromatiques, amande verte.",t:"Avec un risotto aux herbes ou au citron. 10°C."},
{w:"Le grand blanc italien sous-estimé : structure, fraîcheur et longévité.",se:"Pêche blanche, amande, fleurs des champs.",t:"Avec des risottos délicats ou à l'apéritif. 10-12°C."},
{w:"Des arômes intenses et une souplesse qui reflètent la complexité des sushis.",se:"Rose, litchi, gingembre et épices exotiques.",t:"Avec des sushis ou une cuisine épicée. 10°C."},
{w:"Salinité et arômes subliment les légumes de saison.",se:"Agrumes, herbes aromatiques, fleurs blanches.",t:"Avec des légumes grillés ou une caprese. 10°C."},
{w:"Minéralité volcanique et fraîcheur qui réveillent charcuterie et fromages.",se:"Pêche, agrumes, fleurs jaunes et minéralité de lave.",t:"Avec des planches siciliennes ou du poisson. 10-12°C."},
{w:"Un vin orange à la structure tannique légère qui tient face aux carpaccios et aux entrées corsées.",se:"Pêche mûre, miel, épices et tanins souples.",t:"Avec un carpaccio de bœuf ou des fromages. 12-14°C."},
{w:"Effervescence crémeuse et fraîcheur d'agrumes : le compagnon de tout apéritif ou toute fête.",se:"Pain grillé, agrumes, pomme golden et fleurs.",t:"6-8°C dans un verre tulipe. Avec de la charcuterie."},
{w:"Des bulles crémeuses et une couleur cuivrée dorée : le vin des célébrations élégantes.",se:"Fraise, framboise, pain grillé et rose.",t:"Dans un verre tulipe à 8°C. Pour célébrer."},
{w:"Léger, festif et généreux. Le vin des toasts spontanés.",se:"Pomme verte, poire, fleurs d'acacia et amande.",t:"N'attendez pas le bon moment : c'est maintenant."},
{w:"Douceur délicate et bulles fines pour les desserts au four. Faible en alcool.",se:"Pêche blanche, abricot, fleur d'oranger et miel.",t:"Avec tartes, panna cotta, desserts. 6-8°C."},
{w:"Une douceur équilibrée par une acidité fraîche : le contraste parfait avec les fromages persillés ou les desserts intenses.",se:"Abricot sec, miel, figues et agrumes confits.",t:"Avec du Gorgonzola, un gâteau au chocolat ou des cannoli. 12°C."}
],
de:[
{w:"Kräftige Tannine, die die Proteine des roten Fleisches umarmen. Lebendige Säure, die das Fett bei jedem Schluck durchschneidet.",se:"Reife Kirsche, welke Rose, Teer und Gewürze. Sehr langes, herbes Finale.",t:"2 Stunden vorher öffnen. 17-18°C im großen Glas."},
{w:"Reinsortiger Sangiovese mit dichten, eleganten Tanninen. Die klassische Begleitung zu großen toskanischen Fleischgerichten.",se:"Waldbeeren, Veilchen, Leder und Gewürze. Voller, umhüllender Gaumen.",t:"Perfekt zu Steak oder Tagliata. 17-18°C."},
{w:"Konzentration aus getrockneten Trauben, perfekt zu gereiftem Käse und kräftigem Fleisch. Kraftvoll und üppig.",se:"Kirsche in Weingeist, Schokolade, Tabak, Trockenpflaume. Warm.",t:"Zu 36 Monate gereiftem Parmigiano oder Schmorgerichten. 18°C."},
{w:"Die Säure des Sangiovese in Harmonie mit Tomate. Der toskanische Rotwein zu Pasta und Pizza.",se:"Frische Kirsche, Veilchen, mediterrane Kräuter.",t:"16°C. Vielseitig zu fast dem ganzen Menü."},
{w:"Ein erdiges, blumiges Profil, das die umami Noten des Trüffels widerspiegelt.",se:"Welke Rose, Teer, Unterholz und Brombeere.",t:"Zu Trüffelrisotto oder Pappardelle. 17°C."},
{w:"Der einzige, der Wildschwein und intensives Wild aushält. Höchster Polyphenolgehalt.",se:"Waldbrombeere, Harz, Tabak und eisenhaltige Noten.",t:"4 Stunden vorher öffnen. Zu geschmortem Wildschwein."},
{w:"Kräftige Tannine und schneidende Säure balancieren die Fettigkeit des Lamms.",se:"Brombeere, Trockenpflaume, schwarzer Pfeffer und vulkanische Mineralität.",t:"17°C zu Lamm aus dem Ofen oder vom Grill."},
{w:"Leichte Tannine und vulkanische Mineralität für vegetarische Gerichte und Tomatenpasta.",se:"Kirsche, Granatapfel, Gewürze und Asche.",t:"Zu Pasta alla Norma oder Gemüse. 16°C."},
{w:"Weiche Tannine, die zu Schweinefleisch passen und dessen Fett durchschneiden.",se:"Kirsche, Pflaume, mediterranes Gestrüpp und Leder.",t:"Zu Porchetta, Würstchen oder Aufschnitt. 16°C."},
{w:"Großzügige Frucht und sonnige Wärme. Umhüllend und befriedigend.",se:"Brombeere, Pflaumenkonfitüre, Schokolade und süße Gewürze.",t:"Zu gegrilltem Fleisch oder gereiftem Käse. 17°C."},
{w:"Die ganze Persönlichkeit des Barolo, ohne die Verpflichtung. Für alle, die etwas Echtes wollen.",se:"Kirsche, Veilchen, Gewürze und Rose.",t:"Zu Pilzrisotto oder Ragù. 16-17°C."},
{w:"Ein strukturierter, salziger Rosé: genug Körper für Aufschnitt, Frische, die nicht beschwert.",se:"Kirsche, Granatapfel, rote Blüten und Gewürze.",t:"Zu Aufschnittplatten. 12-14°C."},
{w:"Körper und Weichheit ideal für Tomatensaucen. Samtige Tannine.",se:"Frische Pflaume, Brombeere, dunkle Schokolade.",t:"Zu Pasta al Ragù oder Pizza. 15-16°C."},
{w:"Mediterraner Charakter mit dunklen Früchten und Kakao. Ein charaktervoller Rotwein ohne Verpflichtungen.",se:"Schwarze Kirsche, Kakao, Gewürze und Tabak.",t:"Zu rotem Fleisch und gereiftem Käse. 17°C."},
{w:"Intensive Süße, die dunkler Schokolade standhält. Absolute Kraft.",se:"Konfitüre aus schwarzen Kirschen, Schokolade, Zimt und Veilchen.",t:"Zu dunklem Schokoladenkuchen. 14°C."},
{w:"Zitrusfrische und maritime Salzigkeit heben die Zartheit des Fischs hervor.",se:"Limette, weißer Pfirsich, Mandel und eine salzige Note.",t:"Eiskalt, 8-10°C. Zu Fisch aus dem Ofen."},
{w:"Mineralität und Salzigkeit spiegeln den jodigen Charakter von Meeresfrüchten.",se:"Haselnuss, Akazienhonig, Pfirsich und Mineralität.",t:"Zu Spaghetti mit Venusmuscheln oder Oktopus. 10-12°C."},
{w:"Eine Zartheit, die Risotto begleitet, ohne ihn zu überdecken.",se:"Mandel, weißer Pfirsich, Wiesenblumen.",t:"Zu Spargel- oder Kräuterrisotto. 10-12°C."},
{w:"Mineralität und Struktur für kräftigeren Fisch.",se:"Gelber Pfirsich, Aprikose, weiße Blüten.",t:"Zu Wolfsbarsch aus dem Ofen. 10-12°C."},
{w:"Schneidende Säure und Salzigkeit balancieren die Fülle des Risottos.",se:"Zitrone, aromatische Kräuter, grüne Mandel.",t:"Zu Kräuter- oder Zitronenrisotto. 10°C."},
{w:"Der große, unterschätzte italienische Weißwein: Struktur, Frische und Langlebigkeit.",se:"Weißer Pfirsich, Mandel, Wiesenblumen.",t:"Zu zartem Risotto oder als Aperitif. 10-12°C."},
{w:"Intensive Aromen und Weichheit spiegeln die Komplexität von Sushi.",se:"Rose, Litschi, Ingwer und exotische Gewürze.",t:"Zu Sushi oder würziger Küche. 10°C."},
{w:"Salzigkeit und Aromatik heben saisonales Gemüse hervor.",se:"Zitrusfrüchte, aromatische Kräuter, weiße Blüten.",t:"Zu gegrilltem Gemüse oder Caprese. 10°C."},
{w:"Vulkanische Mineralität und Frische beleben Aufschnitt und Käse.",se:"Pfirsich, Zitrusfrüchte, gelbe Blüten und Lava-Mineralität.",t:"Zu sizilianischen Platten oder Fisch. 10-12°C."},
{w:"Ein Orange Wine mit leichter Tanninstruktur, der Carpaccio und kräftigen Vorspeisen standhält.",se:"Reifer Pfirsich, Honig, Gewürze und weiche Tannine.",t:"Zu Rindercarpaccio oder Käse. 12-14°C."},
{w:"Cremige Perlage und Zitrusfrische: der Begleiter für jeden Aperitif oder jede Feier.",se:"Geröstetes Brot, Zitrusfrüchte, goldener Apfel und Blüten.",t:"6-8°C im Tulpenglas. Zu Aufschnitt."},
{w:"Cremige Perlage und goldkupferne Farbe: der Wein für elegante Feiern.",se:"Erdbeere, Himbeere, geröstetes Brot und Rose.",t:"Im Tulpenglas bei 8°C. Zum Feiern."},
{w:"Leicht, festlich und großzügig. Der Wein für spontane Trinksprüche.",se:"Grüner Apfel, Birne, Akazienblüten und Mandel.",t:"Nicht auf den richtigen Moment warten: er ist jetzt."},
{w:"Zarte Süße und feine Perlage für Gebäck. Niedriger Alkoholgehalt.",se:"Weißer Pfirsich, Aprikose, Orangenblüte und Honig.",t:"Zu Tartes, Panna Cotta, Desserts. 6-8°C."},
{w:"Ausgewogene Süße mit frischer Säure: der Kontrast zu edelschimmeligem Käse oder intensiven Desserts.",se:"Getrocknete Aprikose, Honig, Feigen und kandierte Zitrusfrüchte.",t:"Zu Gorgonzola, Schokoladenkuchen oder Cannoli. 12°C."}
],
ru:[
{w:"Мощные танины, которые обволакивают белки красного мяса. Яркая кислотность, очищающая жир с каждым глотком.",se:"Спелая вишня, увядшая роза, смола и специи. Очень долгое, суровое послевкусие.",t:"Откройте за 2 часа до подачи. 17-18°C в большом бокале."},
{w:"Санджовезе в чистом виде с плотными, элегантными танинами. Классическое сочетание с тосканским мясом.",se:"Лесные ягоды, фиалка, кожа и специи. Полный, обволакивающий вкус.",t:"Идеально со стейком или тальятой. 17-18°C."},
{w:"Концентрация из подвяленного винограда, идеально с выдержанными сырами и насыщенным мясом. Мощное и роскошное.",se:"Вишня в спирте, шоколад, табак, чернослив. Тёплое.",t:"С пармиджано 36 месяцев или тушёным мясом. 18°C."},
{w:"Кислотность Санджовезе в гармонии с томатом. Тосканское красное для пасты и пиццы.",se:"Свежая вишня, фиалка, средиземноморские травы.",t:"16°C. Универсально почти со всем меню."},
{w:"Земляной, цветочный профиль, отражающий умами трюфеля.",se:"Увядшая роза, смола, подлесок и ежевика.",t:"С ризотто с трюфелем или паппарделле. 17°C."},
{w:"Единственное вино, способное выдержать кабана и дичь с насыщенным вкусом. Максимальное содержание полифенолов.",se:"Лесная ежевика, смола, табак и железистые ноты.",t:"Откройте за 4 часа. С тушёным кабаном."},
{w:"Мощные танины и резкая кислотность уравновешивают жирность ягнёнка.",se:"Ежевика, чернослив, чёрный перец и вулканическая минеральность.",t:"17°C с ягнёнком в духовке или на гриле."},
{w:"Лёгкие танины и вулканическая минеральность для вегетарианских блюд и пасты с томатом.",se:"Вишня, гранат, специи и пепел.",t:"С пастой алла норма или овощами. 16°C."},
{w:"Мягкие танины, сочетающиеся со свининой и разрезающие её жир.",se:"Вишня, слива, средиземноморский кустарник и кожа.",t:"С порчеттой, колбасками или мясной нарезкой. 16°C."},
{w:"Щедрость фрукта и солнечное тепло. Обволакивающее и насыщающее.",se:"Ежевика, сливовый джем, шоколад и сладкие специи.",t:"С мясом на гриле или выдержанным сыром. 17°C."},
{w:"Весь характер Бароло без обязательств. Для тех, кто хочет чего-то настоящего.",se:"Вишня, фиалка, специи и роза.",t:"С грибным ризотто или рагу. 16-17°C."},
{w:"Структурированное, солёное розе: достаточно тела для мясной нарезки, свежесть, которая не утяжеляет.",se:"Вишня, гранат, красные цветы и специи.",t:"С досками мясной нарезки. 12-14°C."},
{w:"Тело и мягкость, идеальные для томатных соусов. Бархатистые танины.",se:"Свежая слива, ежевика, тёмный шоколад.",t:"С пастой рагу или пиццей. 15-16°C."},
{w:"Средиземноморский характер с чёрными фруктами и какао. Красное вино с характером, без обязательств.",se:"Чёрная вишня, какао, специи и табак.",t:"С красным мясом и выдержанным сыром. 17°C."},
{w:"Интенсивная сладость, способная выдержать тёмный шоколад. Абсолютная мощь.",se:"Варенье из чёрной вишни, шоколад, корица и фиалка.",t:"С тортом из тёмного шоколада. 14°C."},
{w:"Цитрусовая свежесть и морская солёность подчёркивают деликатность рыбы.",se:"Лайм, белый персик, миндаль и солёная нота.",t:"Очень холодным, 8-10°C. С запечённой рыбой."},
{w:"Минеральность и солёность отражают йодистый характер морепродуктов.",se:"Лесной орех, акациевый мёд, персик и минеральность.",t:"Со спагетти с вонголе или осьминогом. 10-12°C."},
{w:"Деликатность, сопровождающая ризотто, не подавляя его.",se:"Миндаль, белый персик, полевые цветы.",t:"С ризотто со спаржей или травами. 10-12°C."},
{w:"Минеральность и структура для более выразительной рыбы.",se:"Жёлтый персик, абрикос, белые цветы.",t:"С запечённым сибасом. 10-12°C."},
{w:"Резкая кислотность и солёность уравновешивают насыщенность ризотто.",se:"Лимон, ароматные травы, зелёный миндаль.",t:"С ризотто с травами или лимоном. 10°C."},
{w:"Великое недооценённое итальянское белое вино: структура, свежесть и долголетие.",se:"Белый персик, миндаль, полевые цветы.",t:"С деликатными ризотто или как аперитив. 10-12°C."},
{w:"Интенсивные ароматы и мягкость отражают сложность суши.",se:"Роза, личи, имбирь и экзотические специи.",t:"С суши или острой кухней. 10°C."},
{w:"Солёность и ароматика подчёркивают сезонные овощи.",se:"Цитрус, ароматные травы, белые цветы.",t:"С овощами на гриле или капрезе. 10°C."},
{w:"Вулканическая минеральность и свежесть оживляют мясную нарезку и сыры.",se:"Персик, цитрус, жёлтые цветы и лавовая минеральность.",t:"С сицилийскими досками или рыбой. 10-12°C."},
{w:"Оранжевое вино с лёгкой танинной структурой, выдерживающее карпаччо и насыщенные закуски.",se:"Спелый персик, мёд, специи и мягкие танины.",t:"С карпаччо из говядины или сырами. 12-14°C."},
{w:"Кремовая игристость и цитрусовая свежесть: спутник любого аперитива или праздника.",se:"Поджаренный хлеб, цитрус, золотистое яблоко и цветы.",t:"6-8°C в бокале-тюльпане. С мясной нарезкой."},
{w:"Кремовые пузырьки и золотисто-медный цвет: вино для элегантных торжеств.",se:"Клубника, малина, поджаренный хлеб и роза.",t:"В бокале-тюльпане при 8°C. Для торжества."},
{w:"Лёгкое, праздничное и щедрое. Вино для спонтанных тостов.",se:"Зелёное яблоко, груша, цветы акации и миндаль.",t:"Не ждите подходящего момента: он уже настал."},
{w:"Деликатная сладость и тонкие пузырьки для выпечки. Низкий градус.",se:"Белый персик, абрикос, цветы апельсина и мёд.",t:"С тартами, панна-коттой, десертами. 6-8°C."},
{w:"Сбалансированная сладость со свежей кислотностью: контраст для сыров с плесенью или насыщенных десертов.",se:"Сушёный абрикос, мёд, инжир и цукаты из цитрусовых.",t:"С горгонзолой, шоколадным тортом или канноли. 12°C."}
],
zh:[
{w:"强劲的单宁包裹着红肉的蛋白质。鲜活的酸度在每一口都能化解油腻。",se:"成熟樱桃、干玫瑰、焦油和香料。余味悠长而质朴。",t:"提前2小时醒酒。17-18°C，使用大号酒杯。"},
{w:"纯正桑娇维塞，单宁紧致优雅。是搭配托斯卡纳大块肉类的经典之选。",se:"野莓、紫罗兰、皮革和香料。口感饱满而包裹。",t:"搭配牛排或塔利亚塔牛肉最佳。17-18°C。"},
{w:"风干葡萄带来的浓缩感，与陈年奶酪及浓郁肉类完美相配。强劲而丰腴。",se:"浸酒樱桃、巧克力、烟草、话梅。温暖。",t:"搭配36个月帕玛森奶酪或炖肉。18°C。"},
{w:"桑娇维塞的酸度与番茄和谐相融。适合搭配意面和披萨的托斯卡纳红酒。",se:"新鲜樱桃、紫罗兰、地中海香草。",t:"16°C。几乎能搭配整份菜单。"},
{w:"泥土与花香的风味，呼应松露的鲜味。",se:"干玫瑰、焦油、林下灌木和黑莓。",t:"搭配松露烩饭或宽面。17°C。"},
{w:"唯一能驾驭野猪及浓烈野味的酒款。多酚含量最高。",se:"野生黑莓、树脂、烟草和铁质气息。",t:"提前4小时开瓶。搭配炖野猪肉。"},
{w:"强劲单宁与锐利酸度平衡了羊肉的油脂感。",se:"黑莓、话梅、黑胡椒和火山矿物感。",t:"17°C，搭配烤羊肉或炭烤羊肉。"},
{w:"轻盈单宁与火山矿物感，适合素食料理及番茄意面。",se:"樱桃、石榴、香料和灰烬感。",t:"搭配诺尔玛酱意面或蔬菜。16°C。"},
{w:"柔和单宁与猪肉相配，化解油腻。",se:"樱桃、李子、地中海灌木和皮革。",t:"搭配烤猪肉、香肠或冷切肉。16°C。"},
{w:"丰盈的果香与阳光般的暖意。包裹感十足，令人满足。",se:"黑莓、李子酱、巧克力和甜香料。",t:"搭配炭烤肉类或陈年奶酪。17°C。"},
{w:"拥有巴罗洛的全部个性，却更轻松易饮。适合追求本真口感的人。",se:"樱桃、紫罗兰、香料和玫瑰。",t:"搭配蘑菇烩饭或肉酱。16-17°C。"},
{w:"结构感与咸鲜兼具的桃红酒：足够的酒体搭配冷切肉，清爽而不厚重。",se:"樱桃、石榴、红色花朵和香料。",t:"搭配冷切肉拼盘。12-14°C。"},
{w:"酒体与柔和度非常适合番茄酱汁。单宁如天鹅绒般顺滑。",se:"新鲜李子、黑莓、黑巧克力。",t:"搭配肉酱意面或披萨。15-16°C。"},
{w:"地中海风味，带有黑色水果与可可气息。有个性又不失亲和力的红酒。",se:"黑樱桃、可可、香料和烟草。",t:"搭配红肉和陈年奶酪。17°C。"},
{w:"浓郁的甜度足以驾驭黑巧克力。极致的力量感。",se:"黑樱桃酱、巧克力、肉桂和紫罗兰。",t:"搭配黑巧克力蛋糕。14°C。"},
{w:"柑橘般的清爽与海洋般的咸鲜，衬托出鱼肉的细腻。",se:"青柠、白桃、杏仁和一丝咸鲜。",t:"冰镇至8-10°C。搭配烤鱼。"},
{w:"矿物感与咸鲜呼应海鲜的碘味特征。",se:"榛子、洋槐蜂蜜、桃子和矿物感。",t:"搭配蛤蜊意面或章鱼。10-12°C。"},
{w:"细腻的口感衬托烩饭，而不喧宾夺主。",se:"杏仁、白桃、野花。",t:"搭配芦笋或香草烩饭。10-12°C。"},
{w:"矿物感与结构感适合味道更浓郁的鱼类料理。",se:"黄桃、杏子、白花。",t:"搭配烤海鲈鱼。10-12°C。"},
{w:"锐利的酸度与咸鲜平衡了烩饭的丰腴感。",se:"柠檬、芳香草本、青杏仁。",t:"搭配香草烩饭或柠檬烩饭。10°C。"},
{w:"意大利被低估的伟大白葡萄酒：结构、清新与陈年潜力兼备。",se:"白桃、杏仁、野花。",t:"搭配清淡烩饭或作为开胃酒。10-12°C。"},
{w:"浓郁的香气与柔和口感呼应寿司的复杂层次。",se:"玫瑰、荔枝、姜和异域香料。",t:"搭配寿司或香辛料理。10°C。"},
{w:"咸鲜与香气衬托时令蔬菜。",se:"柑橘、芳香草本、白花。",t:"搭配烤蔬菜或卡普雷塞沙拉。10°C。"},
{w:"火山矿物感与清爽感让冷切肉和奶酪更加鲜活。",se:"桃子、柑橘、黄色花朵和熔岩矿物感。",t:"搭配西西里拼盘或鱼类。10-12°C。"},
{w:"这款橙酒单宁结构轻盈，足以搭配生牛肉薄片及浓郁的开胃菜。",se:"熟桃、蜂蜜、香料和柔和单宁。",t:"搭配牛肉薄片或奶酪。12-14°C。"},
{w:"绵密的气泡与柑橘般的清爽：任何开胃酒或庆祝场合的最佳伴侣。",se:"烤面包、柑橘、金冠苹果和花香。",t:"6-8°C，使用郁金香杯。搭配冷切肉。"},
{w:"绵密的气泡与金铜般的色泽：优雅庆典的专属美酒。",se:"草莓、覆盆子、烤面包和玫瑰。",t:"郁金香杯，8°C。用于庆祝时刻。"},
{w:"轻盈、欢快而慷慨。即兴举杯庆祝的最佳选择。",se:"青苹果、梨、洋槐花和杏仁。",t:"不必等待完美时机：此刻就是。"},
{w:"细腻的甜度与精致气泡，适合烘焙甜点。酒精度低。",se:"白桃、杏子、橙花和蜂蜜。",t:"搭配挞类、奶冻或甜点。6-8°C。"},
{w:"平衡的甜度与清新酸度：与蓝纹奶酪或浓郁甜点形成绝妙对比。",se:"杏干、蜂蜜、无花果和糖渍柑橘。",t:"搭配戈贡佐拉奶酪、巧克力蛋糕或西西里卷。12°C。"}
],
es:[
{w:"Taninos potentes que abrazan las proteínas de la carne roja. Una acidez vibrante que limpia la grasa en cada sorbo.",se:"Cereza madura, rosa seca, alquitrán y especias. Final muy largo y austero.",t:"Abrir 2 horas antes de servir. 17-18°C en copa grande."},
{w:"Sangiovese puro con taninos densos y elegantes. El maridaje clásico para las grandes carnes toscanas.",se:"Frutos del bosque, violeta, cuero y especias. Boca llena y envolvente.",t:"Perfecto con chuletón o tagliata. 17-18°C."},
{w:"Concentración de uvas pasificadas, ideal para quesos curados y carnes potentes. Potente y voluptuoso.",se:"Cereza en licor, chocolate, tabaco, ciruela pasa. Cálido.",t:"Con Parmigiano de 36 meses o estofados. 18°C."},
{w:"La acidez del Sangiovese en armonía con el tomate. El tinto toscano para pasta y pizza.",se:"Cereza fresca, violeta, hierbas mediterráneas.",t:"16°C. Versátil con casi toda la carta."},
{w:"Un perfil terroso y floral que refleja las notas umami de la trufa.",se:"Rosa seca, alquitrán, sotobosque y mora.",t:"Con risotto de trufa o pappardelle. 17°C."},
{w:"El único que aguanta el jabalí y la caza de sabor intenso. Máximo contenido de polifenoles.",se:"Mora silvestre, resina, tabaco y notas ferrosas.",t:"Abrir 4 horas antes. Con jabalí estofado."},
{w:"Taninos robustos y acidez cortante equilibran la grasa del cordero.",se:"Mora, ciruela pasa, pimienta negra y mineralidad volcánica.",t:"17°C con cordero asado o a la parrilla."},
{w:"Taninos ligeros y mineralidad volcánica para platos vegetarianos y pasta con tomate.",se:"Cereza, granada, especias y ceniza.",t:"Con pasta alla norma o verduras. 16°C."},
{w:"Taninos suaves que acompañan el cerdo cortando la grasa.",se:"Cereza, ciruela, monte mediterráneo y cuero.",t:"Con porchetta, salchichas o embutidos. 16°C."},
{w:"Fruta generosa y calidez solar. Envolvente y satisfactorio.",se:"Mora, mermelada de ciruela, chocolate y especias dulces.",t:"Con carnes a la parrilla o quesos curados. 17°C."},
{w:"Toda la personalidad del Barolo sin el compromiso. Para quien quiere algo auténtico.",se:"Cereza, violeta, especias y rosa.",t:"Con risotto de setas o ragù. 16-17°C."},
{w:"Un rosado estructurado y sabroso: cuerpo para los embutidos, frescura que no cansa.",se:"Cereza, granada, flores rojas y especias.",t:"Con tablas de embutidos. 12-14°C."},
{w:"Cuerpo y suavidad ideales para las salsas de tomate. Taninos aterciopelados.",se:"Ciruela fresca, mora, chocolate negro.",t:"Con pasta al ragù o pizza. 15-16°C."},
{w:"Carácter mediterráneo con fruta negra y cacao. Un tinto con carácter y sin complicaciones.",se:"Cereza negra, cacao, especias y tabaco.",t:"Con carnes rojas y quesos curados. 17°C."},
{w:"Dulzor intenso capaz de aguantar el chocolate negro. Potencia absoluta.",se:"Mermelada de guinda, chocolate, canela y violeta.",t:"Con tarta de chocolate negro. 14°C."},
{w:"Frescura cítrica y salinidad marina realzan la delicadeza del pescado.",se:"Lima, melocotón blanco, almendra y un toque salino.",t:"Bien frío, 8-10°C. Con pescado al horno."},
{w:"Mineralidad y salinidad reflejan el carácter yodado del marisco.",se:"Avellana, miel de acacia, melocotón y mineralidad.",t:"Con espaguetis con almejas o pulpo. 10-12°C."},
{w:"Una delicadeza que acompaña los risottos sin taparlos.",se:"Almendra, melocotón blanco, flores silvestres.",t:"Con risotto de espárragos o de hierbas. 10-12°C."},
{w:"Mineralidad y estructura para pescados de carácter más decidido.",se:"Melocotón amarillo, albaricoque, flores blancas.",t:"Con lubina al horno. 10-12°C."},
{w:"Acidez cortante y salinidad equilibran la riqueza del risotto.",se:"Limón, hierbas aromáticas, almendra verde.",t:"Con risotto de hierbas o de limón. 10°C."},
{w:"El gran blanco italiano infravalorado: estructura, frescura y longevidad.",se:"Melocotón blanco, almendra, flores silvestres.",t:"Con risottos delicados o como aperitivo. 10-12°C."},
{w:"Aromas intensos y suavidad que reflejan la complejidad del sushi.",se:"Rosa, lichi, jengibre y especias exóticas.",t:"Con sushi o cocina especiada. 10°C."},
{w:"Salinidad y aromas que realzan las verduras de temporada.",se:"Cítricos, hierbas aromáticas, flores blancas.",t:"Con verduras a la parrilla o caprese. 10°C."},
{w:"Mineralidad volcánica y frescura que dan vida a embutidos y quesos.",se:"Melocotón, cítricos, flores amarillas y mineralidad de lava.",t:"Con tablas sicilianas o pescado. 10-12°C."},
{w:"Un vino naranja con ligera estructura tánica que aguanta carpaccios y entrantes potentes.",se:"Melocotón maduro, miel, especias y taninos suaves.",t:"Con carpaccio de ternera o quesos. 12-14°C."},
{w:"Burbuja cremosa y frescura cítrica: el compañero de cualquier aperitivo o celebración.",se:"Pan tostado, cítricos, manzana dorada y flores.",t:"6-8°C en copa tulipa. Con embutidos."},
{w:"Burbujas cremosas y color cobre dorado: el vino de las celebraciones elegantes.",se:"Fresa, frambuesa, pan tostado y rosa.",t:"En copa tulipa a 8°C. Para celebrar."},
{w:"Ligero, festivo y generoso. El vino de los brindis espontáneos.",se:"Manzana verde, pera, flores de acacia y almendra.",t:"No esperes el momento justo: es ahora."},
{w:"Dulzor delicado y burbuja fina para los postres horneados. Baja graduación.",se:"Melocotón blanco, albaricoque, azahar y miel.",t:"Con tartas, panna cotta, postres. 6-8°C."},
{w:"Dulzor equilibrado por una acidez fresca: el contraste para quesos azules o postres intensos.",se:"Orejón, miel, higos y cítricos confitados.",t:"Con Gorgonzola, tarta de chocolate o cannoli. 12°C."}
],
ar:[
{w:"عفوصة قوية تحتضن بروتينات اللحم الأحمر. حموضة نابضة تنظف الدهون مع كل رشفة.",se:"كرز ناضج، وردة ذابلة، قطران وتوابل. خاتمة طويلة جدًا وجافة.",t:"افتح الزجاجة قبل ساعتين. 17-18°م في كأس واسع."},
{w:"سانجيوفيزي نقي بعفوصة كثيفة وأنيقة. المرافقة المثالية للحوم التوسكانية الفاخرة.",se:"توت بري، بنفسج، جلد وتوابل. طعم ممتلئ وملتف.",t:"مثالي مع الستيك أو التالياتا. 17-18°م."},
{w:"تركيز من عنب مُجفف، مثالي مع الأجبان المعتقة واللحوم الغنية. قوي وحسي.",se:"كرز بالكحول، شوكولاتة، تبغ، برقوق مجفف. دافئ.",t:"مع بارميجيانو معتق 36 شهرًا أو أطباق مطهوة ببطء. 18°م."},
{w:"حموضة السانجيوفيزي في تناغم مع الطماطم. الأحمر التوسكاني للمعكرونة والبيتزا.",se:"كرز طازج، بنفسج، أعشاب متوسطية.",t:"16°م. متعدد الاستخدامات مع معظم القائمة."},
{w:"طابع ترابي وزهري يعكس نكهة الأومامي في الكمأة.",se:"وردة ذابلة، قطران، أشجار تحت الغابة وتوت العليق.",t:"مع ريزوتو الكمأة أو الباپارديلي. 17°م."},
{w:"الوحيد القادر على مجابهة الخنزير البري والطرائد ذات النكهة القوية. أعلى محتوى من البوليفينول.",se:"توت بري، راتنج، تبغ ولمسات معدنية حديدية.",t:"افتح قبل 4 ساعات. مع خنزير بري مطهو ببطء."},
{w:"عفوصة قوية وحموضة حادة توازن دهون لحم الضأن.",se:"توت العليق، برقوق مجفف، فلفل أسود ومعدنية بركانية.",t:"17°م مع لحم ضأن في الفرن أو مشوي."},
{w:"عفوصة خفيفة ومعدنية بركانية للأطباق النباتية ومعكرونة الطماطم.",se:"كرز، رمان، توابل ولمسة رماد.",t:"مع باستا ألا نورما أو الخضروات. 16°م."},
{w:"عفوصة ناعمة تتناغم مع لحم الخنزير وتقطع دهنه.",se:"كرز، برقوق، أعشاب البحر المتوسط وجلد.",t:"مع البوركيتا أو السجق أو المقبلات الباردة. 16°م."},
{w:"سخاء الفاكهة ودفء الشمس. طعم ملتف ومُشبع.",se:"توت العليق، مربى البرقوق، شوكولاتة وتوابل حلوة.",t:"مع اللحوم المشوية أو الأجبان المعتقة. 17°م."},
{w:"كل شخصية البارولو دون الالتزام نفسه. لمن يريد شيئًا أصيلًا.",se:"كرز، بنفسج، توابل ووردة.",t:"مع ريزوتو الفطر أو الراجو. 16-17°م."},
{w:"وردي متماسك ومالح: جسم كافٍ للمقبلات الباردة، وانتعاش لا يُثقل.",se:"كرز، رمان، أزهار حمراء وتوابل.",t:"مع أطباق المقبلات الباردة. 12-14°م."},
{w:"جسم ونعومة مثاليان لصلصات الطماطم. عفوصة مخملية.",se:"برقوق طازج، توت العليق، شوكولاتة داكنة.",t:"مع باستا بالراجو أو البيتزا. 15-16°م."},
{w:"طابع متوسطي بفاكهة داكنة وكاكاو. أحمر ذو شخصية دون تعقيد.",se:"كرز أسود، كاكاو، توابل وتبغ.",t:"مع اللحوم الحمراء والأجبان المعتقة. 17°م."},
{w:"حلاوة مكثفة قادرة على مجابهة الشوكولاتة الداكنة. قوة مطلقة.",se:"مربى الكرز الأسود، شوكولاتة، قرفة وبنفسج.",t:"مع كعكة الشوكولاتة الداكنة. 14°م."},
{w:"انتعاش الحمضيات ومذاق بحري مالح يبرزان رقة السمك.",se:"ليمون أخضر، خوخ أبيض، لوز ولمسة مالحة.",t:"مثلج جدًا 8-10°م. مع سمك مشوي بالفرن."},
{w:"معدنية ومذاق مالح يعكسان طابع اليود في المأكولات البحرية.",se:"بندق، عسل السنط، خوخ ومعدنية.",t:"مع سباغيتي بالمحار أو الأخطبوط. 10-12°م."},
{w:"رقة ترافق الريزوتو دون أن تطغى عليه.",se:"لوز، خوخ أبيض، أزهار برية.",t:"مع ريزوتو الهليون أو الأعشاب. 10-12°م."},
{w:"معدنية وبنية لأسماك ذات طابع أقوى.",se:"خوخ أصفر، مشمش، أزهار بيضاء.",t:"مع سمك القاروص المشوي بالفرن. 10-12°م."},
{w:"حموضة حادة ومذاق مالح يوازنان غنى الريزوتو.",se:"ليمون، أعشاب عطرية، لوز أخضر.",t:"مع ريزوتو الأعشاب أو الليمون. 10°م."},
{w:"الأبيض الإيطالي العظيم المُقلَّل من قيمته: بنية وانتعاش وقدرة على التعتيق.",se:"خوخ أبيض، لوز، أزهار برية.",t:"مع ريزوتو خفيف أو كمقبل. 10-12°م."},
{w:"عطور مكثفة ونعومة تعكسان تعقيد السوشي.",se:"وردة، ليتشي، زنجبيل وتوابل غريبة.",t:"مع السوشي أو المطبخ الحار. 10°م."},
{w:"مذاق مالح وعطري يبرز الخضروات الموسمية.",se:"حمضيات، أعشاب عطرية، أزهار بيضاء.",t:"مع الخضروات المشوية أو الكابريزي. 10°م."},
{w:"معدنية بركانية وانتعاش يُحييان المقبلات الباردة والأجبان.",se:"خوخ، حمضيات، أزهار صفراء ومعدنية الحمم.",t:"مع أطباق صقلية أو السمك. 10-12°م."},
{w:"نبيذ برتقالي ببنية عفوصة خفيفة يجابه الكارباتشو والمقبلات الغنية.",se:"خوخ ناضج، عسل، توابل وعفوصة ناعمة.",t:"مع كارباتشو اللحم البقري أو الأجبان. 12-14°م."},
{w:"فوران كريمي وانتعاش حمضي: الرفيق المثالي لأي كوكتيل أو احتفال.",se:"خبز محمص، حمضيات، تفاح ذهبي وأزهار.",t:"6-8°م في كأس على شكل توليب. مع المقبلات الباردة."},
{w:"فقاعات كريمية ولون نحاسي ذهبي: نبيذ للاحتفالات الأنيقة.",se:"فراولة، توت العليق، خبز محمص ووردة.",t:"في كأس توليب عند 8°م. للاحتفال."},
{w:"خفيف واحتفالي وسخي. نبيذ النخب العفوية.",se:"تفاح أخضر، كمثرى، أزهار السنط ولوز.",t:"لا تنتظر اللحظة المثالية: إنها الآن."},
{w:"حلاوة رقيقة وفقاعات ناعمة للحلويات المخبوزة. نسبة كحول منخفضة.",se:"خوخ أبيض، مشمش، زهر البرتقال وعسل.",t:"مع الفطائر، البانا كوتا، الحلويات. 6-8°م."},
{w:"حلاوة متوازنة بحموضة منعشة: التباين المثالي مع الأجبان الزرقاء أو الحلويات المكثفة.",se:"مشمش مجفف، عسل، تين وحمضيات مسكرة.",t:"مع الجورجونزولا أو كعكة الشوكولاتة أو الكانولي. 12°م."}
]
};
var LANGUI={
it:{f:"🇮🇹",ph:"Es. bistecca fiorentina, sushi, serata romantica…",btn:"Consigliami →",pr:"Cosa mangi o che occasione hai?",why:"Perché funziona",glass:"Nel bicchiere",tip:"Consiglio del sommelier",match:"match",bottle:"a bottiglia",load:["Analizzo la tua richiesta…","Cerco nel catalogo…","Preparo i consigli…"],demoNote:"Demo interattiva con una carta campione di 30 vini italiani. Sul tuo locale AI Som consiglia solo i vini della tua carta, con i tuoi prezzi."},
en:{f:"🇬🇧",ph:"E.g. steak, sushi, romantic dinner…",btn:"Recommend →",pr:"What are you eating or celebrating?",why:"Why it works",glass:"In the glass",tip:"Sommelier tip",match:"match",bottle:"per bottle",load:["Analyzing your request…","Searching the catalog…","Preparing recommendations…"],demoNote:"Interactive demo with a sample list of 30 Italian wines. In your venue AI Som recommends only the wines on your list, at your prices."},
fr:{f:"🇫🇷",ph:"Ex. steak, sushi, dîner romantique…",btn:"Conseille-moi →",pr:"Que mangez-vous ou que fêtez-vous ?",why:"Pourquoi ça marche",glass:"Dans le verre",tip:"Conseil du sommelier",match:"match",bottle:"la bouteille",load:["J'analyse votre demande…","Je cherche dans le catalogue…","Je prépare les conseils…"],demoNote:"Démo avec une sélection représentative de 30 vins italiens. La version live d'AI Som fonctionne sur votre catalogue réel, mis à jour en temps réel depuis votre panneau d'administration."},
de:{f:"🇩🇪",ph:"z.B. Steak, Sushi, romantisches Dinner…",btn:"Empfehlen →",pr:"Was essen Sie oder was feiern Sie?",why:"Warum es passt",glass:"Im Glas",tip:"Sommelier-Tipp",match:"match",bottle:"pro Flasche",load:["Analysiere deine Anfrage…","Suche im Katalog…","Bereite Empfehlungen vor…"],demoNote:"Demo mit einer repräsentativen Auswahl von 30 italienischen Weinen. Die Live-Version von AI Som arbeitet mit Ihrem echten Katalog, in Echtzeit über Ihr Admin-Panel aktualisiert."},
ru:{f:"🇷🇺",ph:"Напр. стейк, суши, романтический ужин…",btn:"Посоветовать →",pr:"Что вы едите или празднуете?",why:"Почему подходит",glass:"В бокале",tip:"Совет сомелье",match:"match",bottle:"за бутылку",load:["Анализирую запрос…","Ищу в каталоге…","Готовлю рекомендации…"],demoNote:"Демо с репрезентативной подборкой из 30 итальянских вин. Живая версия AI Som работает с вашим реальным каталогом, обновляемым в реальном времени из панели администратора."},
zh:{f:"🇨🇳",ph:"例如：牛排、寿司、浪漫晚餐…",btn:"推荐 →",pr:"您在吃什么或庆祝什么？",why:"为何合适",glass:"杯中",tip:"侍酒师建议",match:"匹配",bottle:"每瓶",load:["正在分析您的需求…","正在检索酒单…","正在准备推荐…"],demoNote:"演示版精选了30款具有代表性的意大利葡萄酒。AI Som 的正式版本基于您的真实酒单运行，并通过管理后台实时更新。"},
es:{f:"🇪🇸",ph:"Ej. chuletón, sushi, cena romántica…",btn:"Recomiéndame →",pr:"¿Qué vas a comer o qué celebras?",why:"Por qué funciona",glass:"En la copa",tip:"Consejo del sumiller",match:"match",bottle:"la botella",load:["Analizo tu petición…","Busco en la carta…","Preparo las recomendaciones…"],demoNote:"Demo con una carta de muestra de 30 vinos italianos. Con tu carta, AI Som recomienda solo los vinos que tienes."},
ar:{f:"🇦🇪",ph:"مثال: ستيك، سوشي، عشاء رومانسي…",btn:"أوصِ لي →",pr:"ماذا تأكل أو بماذا تحتفل؟",why:"لماذا يناسب",glass:"في الكأس",tip:"نصيحة الساقي",match:"تطابق",bottle:"للزجاجة",load:["أحلّل طلبك…","أبحث في القائمة…","أُحضّر التوصيات…"],demoNote:"عرض توضيحي يضم مجموعة تمثيلية من 30 نبيذًا إيطاليًا. النسخة الفعلية من AI Som تعمل على كتالوجك الحقيقي، ويتم تحديثها فورًا من لوحة التحكم الخاصة بك."}
};

var ORDER=['it','en','es','fr','de','ru','zh','ar'];
var NAMES={it:"Italiano",en:"English",es:"Español",fr:"Français",de:"Deutsch",ru:"Русский",zh:"中文",ar:"العربية"};
var MORE={it:"Dettagli e profilo",en:"Details and profile",es:"Detalles y perfil",fr:"Détails et profil",de:"Details und Profil",ru:"Подробнее",zh:"详情与风味",ar:"التفاصيل"};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function track(name,params){try{if(window.gtag)window.gtag('event',name,params||{})}catch(e){}}

function findBestWines(input){
  var q=(input||"").toLowerCase().trim();
  function route(keys){var r=keys.map(function(k){return WINES.find(function(w){return w.n.indexOf(k)>-1})}).filter(Boolean);return r.length>=2?r.slice(0,2):null}
  var r;
  if(/romantic|anniversari|special/.test(q)){r=route(["Franciacorta Rosé","Barolo"]);if(r)return r}
  if(/trist|malincon|\bsolo\b|solitud/.test(q)){r=route(["Nebbiolo Langhe","Etna Rosso"]);if(r)return r}
  if(/festeggi|complean|brindis|vittoria|promozion/.test(q)){r=route(["Franciacorta Brut","Prosecco"]);if(r)return r}
  if(/aperitiv/.test(q)){r=route(["Franciacorta Brut","Etna Bianco"]);if(r)return r}
  if(/non so|non ho idea|sorprend|nessuna idea/.test(q)){r=route(["Chianti","Vermentino di Sardegna"]);if(r)return r}
  var scored=WINES.map(function(w){var s=0;w.kw.forEach(function(k){if(q.indexOf(k)>-1)s+=2;else if(k.split(" ").some(function(p){return p.length>3&&q.indexOf(p)>-1}))s+=1});return{w:w,s:s}}).sort(function(a,b){return b.s-a.s});
  if(scored[0].s===0){
    if(/carne|bistecc|manzo|agnell|cinghial|tagliata|brasato|grigli/.test(q)){r=route(["Barolo","Brunello"]);if(r)return r}
    r=route(["Chianti","Franciacorta Brut"]);if(r)return r;
  }
  return [scored[0].w,scored[1].w];
}

function mount(root){
  if(root.getAttribute('data-aisom-mounted'))return;
  root.setAttribute('data-aisom-mounted','1');
  root.classList.add('aisom-demo');
  var cur='it',last=null,started=false;
  root.innerHTML='<div class="ad-lang"><button type="button" class="ad-langtrig" aria-haspopup="true" aria-expanded="false"><span class="ad-flag">🇮🇹</span> <span>Lingua · Language</span> ▾</button><div class="ad-langmenu" role="menu"></div></div>'+
    '<span class="ad-tag">Demo · carta campione</span>'+
    '<label class="ad-prompt"></label><input class="ad-input" type="text" autocomplete="off">'+
    '<div class="ad-chips"></div><button type="button" class="ad-btn"></button><div class="ad-out" aria-live="polite"></div>';
  var q=function(s){return root.querySelector(s)};
  var uid='ad'+Math.random().toString(36).slice(2,8);
  q('.ad-input').id=uid; q('.ad-prompt').setAttribute('for',uid);
  var trig=q('.ad-langtrig'),menu=q('.ad-langmenu');
  ORDER.forEach(function(k){
    var b=document.createElement('button');b.type='button';b.setAttribute('role','menuitem');b.innerHTML='<span>'+LANGUI[k].f+'</span> '+NAMES[k];
    b.onclick=function(){cur=k;q('.ad-flag').textContent=LANGUI[k].f;menu.classList.remove('open');trig.setAttribute('aria-expanded','false');root.setAttribute('dir',k==='ar'?'rtl':'ltr');apply();chipsUi();if(last)render(last);track('demo_lingua',{demo:'sommelier',lingua:k})};
    menu.appendChild(b);
  });
  trig.onclick=function(){var o=menu.classList.toggle('open');trig.setAttribute('aria-expanded',o?'true':'false')};
  function apply(){var L=LANGUI[cur];q('.ad-prompt').textContent=L.pr;q('.ad-input').placeholder=L.ph;q('.ad-btn').textContent=L.btn}
  function chipsUi(){
    var c=q('.ad-chips');c.innerHTML='';
    (CHIPS_I18N[cur]||CHIPS_I18N.it).forEach(function(t,i){var s=document.createElement('button');s.type='button';s.className='ad-chip';s.textContent=t;s.onclick=function(){q('.ad-input').value=t;run(CHIPS_I18N.it[i])};c.appendChild(s)});
  }
  function region(s){if(cur==='it')return s;var p=s.split(" · "),r=REGIONS[p[0]];if(r&&r[cur])p[0]=r[cur];return p.join(" · ")}
  function render(wines){
    last=wines;var L=LANGUI[cur],labs=LABS_I18N[cur]||LABS,out=q('.ad-out');
    var h='<div class="ad-results">';
    wines.forEach(function(w,wi){
      var idx=WINES.indexOf(w),tr=(cur!=='it'&&WT[cur])?WT[cur][idx]:null;
      var prof='';labs.forEach(function(lab,i){var b='';for(var k=1;k<=5;k++)b+='<i class="ad-ball'+(k<=w.p[i]?' on':'')+'"></i>';prof+='<div class="ad-prow"><span>'+esc(lab)+'</span><span class="ad-balls" aria-label="'+w.p[i]+'/5">'+b+'</span></div>'});
      h+='<article class="ad-card" style="animation-delay:'+(wi*.1)+'s"><h3>'+esc(w.n.split(" DOC")[0])+'</h3><div class="ad-sub">'+esc(region(w.s))+'</div>'+
        '<div class="ad-price">'+esc(w.pr)+' <small>'+esc(L.bottle)+'</small></div>'+
        '<p class="ad-why">'+esc(tr?tr.w:w.w)+'</p>'+
        '<details><summary>'+esc(MORE[cur]||MORE.it)+'</summary><span class="ad-lbl">'+esc(L.glass)+'</span><div class="ad-txt">'+esc(tr?tr.se:w.se)+'</div>'+
        '<div class="ad-prof">'+prof+'</div><span class="ad-lbl">'+esc(L.tip)+'</span><div class="ad-txt">'+esc(tr?tr.t:w.t)+'</div></details></article>';
    });
    out.innerHTML=h+'</div><p class="ad-disc">'+esc(L.demoNote)+'</p>';
  }
  function run(matchQuery){
    var L=LANGUI[cur],query=matchQuery!==undefined?matchQuery:q('.ad-input').value,out=q('.ad-out');
    if(!started){started=true;track('demo_avviata',{demo:'sommelier'})}
    track('demo_consiglio',{demo:'sommelier',lingua:cur});
    out.innerHTML='<div class="ad-loader"><div class="ad-dots"><span></span><span></span><span></span></div><div class="ad-lt">'+esc(L.load[0])+'</div></div>';
    var i=0,lt=q('.ad-lt'),iv=setInterval(function(){i=(i+1)%3;lt.textContent=L.load[i]},500);
    setTimeout(function(){clearInterval(iv);render(findBestWines(query))},1400);
  }
  q('.ad-btn').onclick=function(){run()};
  q('.ad-input').addEventListener('keydown',function(e){if(e.key==='Enter')run()});
  document.addEventListener('click',function(e){if(!root.contains(e.target)){menu.classList.remove('open');trig.setAttribute('aria-expanded','false')}});
  apply();chipsUi();
}
function init(){
  if(!document.getElementById('aisom-demo-css')){var st=document.createElement('style');st.id='aisom-demo-css';st.textContent=CSS;document.head.appendChild(st)}
  document.querySelectorAll('[data-aisom-demo]').forEach(mount);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
