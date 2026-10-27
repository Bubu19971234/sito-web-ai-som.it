/* AI Som Margini · calcolatore di prova con tre locali di esempio. Widget autonomo:
   <div data-aisom-margini data-cta-href="URL richiesta prova" [data-tema="cdb"]></div>
   <script src=".../calcolatore-margini.js" defer></script>
   Formule identiche all'app (lib/margini/calcolo.ts), con costi variabili a zero:
   - quota fissi       = costi fissi del mese / incasso netto del mese
   - food cost massimo = 1 − quota fissi − margine obiettivo
   - prezzo minimo     = costo / (1 − quota fissi) × (1 + IVA)        → sotto, il piatto fa perdere
   - prezzo consigliato= costo / food cost massimo × (1 + IVA), arrotondato per eccesso
   Se è presente gtag invia demo_avviata / demo_modifica / demo_cta. */
(function () {
  'use strict'

  var ESEMPI = {
    ristorante: {
      nome: 'Ristorante · pizzeria', giorni: 26, clienti: 60, scontrino: 25, iva: 10, margine: 15, passo: 0.5,
      costi: { 'Affitto': 3000, 'Personale': 12000, 'Bollette': 2000, 'Altri costi': 1500 },
      voci: [
        { nome: 'Pizza margherita', costo: 1.6, prezzo: 8 },
        { nome: 'Pizza capricciosa', costo: 2.7, prezzo: 9.5 },
        { nome: 'Tagliata di manzo', costo: 7.8, prezzo: 18 },
        { nome: 'Tiramisù', costo: 1.3, prezzo: 6 },
      ],
    },
    bar: {
      nome: 'Bar', giorni: 30, clienti: 150, scontrino: 6, iva: 10, margine: 15, passo: 0.1,
      costi: { 'Affitto': 2200, 'Personale': 9000, 'Bollette': 1500, 'Altri costi': 1200 },
      voci: [
        { nome: 'Caffè espresso', costo: 0.18, prezzo: 1.2 },
        { nome: 'Cappuccino', costo: 0.35, prezzo: 1.6 },
        { nome: 'Spritz', costo: 1.4, prezzo: 6, iva: 22 },
        { nome: 'Panino farcito', costo: 2.2, prezzo: 5 },
      ],
    },
    gelateria: {
      nome: 'Gelateria', giorni: 28, clienti: 200, scontrino: 4.5, iva: 10, margine: 15, passo: 0.1,
      costi: { 'Affitto': 2000, 'Personale': 7000, 'Bollette': 1800, 'Altri costi': 700 },
      voci: [
        { nome: 'Cono 2 gusti', costo: 0.95, prezzo: 2.8 },
        { nome: 'Coppetta 3 gusti', costo: 1.15, prezzo: 3.8 },
        { nome: 'Vaschetta 1 kg', costo: 6.5, prezzo: 24 },
        { nome: 'Frappè', costo: 1.4, prezzo: 4.5 },
      ],
    },
  }

  var CSS = [
    ".aisom-margini{--d1:#0F0F0F;--d2:#1A1A1A;--d3:#242424;--wine:#C43C4D;--wine3:#E39AA4;--oro:#D4A85A;--tx:#C0B0A0;--tx2:#A89886;--bd:rgba(255,255,255,.1);--ok:#7FC79A;--warn:#E8C27A;--ko:#F08A8A;font-family:'Plus Jakarta Sans',system-ui,Arial,sans-serif;color:#EDE6DD;max-width:920px;margin:0 auto;background:var(--d2);border:1px solid var(--bd);border-radius:22px;padding:26px;text-align:left;line-height:1.5;box-sizing:border-box}",
    ".aisom-margini *{box-sizing:border-box}",
    ".aisom-margini :focus-visible{outline:2px solid var(--wine3);outline-offset:2px}",
    ".aisom-margini .am-tag{display:inline-block;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--oro);border:1px solid rgba(212,168,90,.4);border-radius:999px;padding:4px 10px}",
    ".aisom-margini .am-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:16px 0 18px}",
    ".aisom-margini .am-tab{background:var(--d3);border:1px solid var(--bd);color:var(--tx);font:inherit;font-size:14px;font-weight:600;padding:10px 16px;border-radius:999px;cursor:pointer;min-height:44px}",
    ".aisom-margini .am-tab[aria-selected=true]{background:var(--wine);border-color:var(--wine);color:#fff}",
    ".aisom-margini .am-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}",
    ".aisom-margini label{display:block;font-size:12px;color:var(--tx2)}",
    ".aisom-margini input{display:block;width:100%;margin-top:4px;background:var(--d1);border:1px solid var(--bd);border-radius:10px;padding:10px 12px;color:#fff;font:inherit;font-size:16px;font-variant-numeric:tabular-nums}",
    ".aisom-margini input:focus{border-color:var(--wine);outline:none}",
    ".aisom-margini .am-kpi{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}",
    ".aisom-margini .am-k{background:var(--d1);border:1px solid var(--bd);border-radius:14px;padding:14px}",
    ".aisom-margini .am-k .l{font-size:12px;color:var(--tx2)}",
    ".aisom-margini .am-k .v{font-size:22px;font-weight:800;color:#fff;font-variant-numeric:tabular-nums;white-space:nowrap}",
    ".aisom-margini .am-k.oro .v{color:var(--oro)}",
    ".aisom-margini .am-k .n{font-size:12px;color:var(--tx2)}",
    ".aisom-margini table{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}",
    ".aisom-margini th{font-size:12px;font-weight:600;color:var(--tx2);text-align:right;padding:8px 6px;border-bottom:1px solid var(--bd)}",
    ".aisom-margini th:first-child,.aisom-margini td:first-child{text-align:left}",
    ".aisom-margini td{padding:8px 6px;border-bottom:1px solid var(--bd);text-align:right;font-size:15px;color:#EDE6DD;vertical-align:middle}",
    ".aisom-margini td input{width:88px;margin:0 0 0 auto;padding:8px 10px;text-align:right}",
    ".aisom-margini .am-st{display:inline-block;font-size:12px;font-weight:700;padding:3px 9px;border-radius:999px;white-space:nowrap}",
    ".aisom-margini .am-st.ok{color:var(--ok);background:rgba(127,199,154,.12)}",
    ".aisom-margini .am-st.basso{color:var(--warn);background:rgba(232,194,122,.12)}",
    ".aisom-margini .am-st.perdita{color:var(--ko);background:rgba(240,138,138,.12)}",
    ".aisom-margini .am-msg{margin-top:14px;padding:12px 14px;border-radius:12px;background:rgba(196,60,77,.12);border:1px solid rgba(196,60,77,.35);font-size:14px}",
    ".aisom-margini .am-note{font-size:13px;color:var(--tx2);margin-top:14px}",
    ".aisom-margini .am-cta{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}",
    ".aisom-margini .am-cta a{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:12px 20px;border-radius:999px;font-weight:700;font-size:15px;text-decoration:none}",
    ".aisom-margini .am-cta .p{background:var(--wine);color:#fff}",
    ".aisom-margini .am-cta .s{border:1px solid var(--bd);color:#EDE6DD}",
    "@media(max-width:760px){.aisom-margini{padding:20px 14px}.aisom-margini .am-grid,.aisom-margini .am-kpi{grid-template-columns:1fr 1fr}.aisom-margini .am-tab{flex:1 1 auto}.aisom-margini thead{display:none}.aisom-margini table,.aisom-margini tbody{display:block}.aisom-margini tr{display:grid;grid-template-columns:1fr 1fr;gap:6px 12px;padding:12px 0;border-bottom:1px solid var(--bd)}.aisom-margini td{display:flex;flex-direction:column;align-items:flex-start;border:0;padding:0;text-align:left;font-size:15px}.aisom-margini td::before{content:attr(data-l);font-size:12px;color:var(--tx2)}.aisom-margini td.am-nome{grid-column:1/-1;font-weight:700;color:#fff}.aisom-margini td.am-nome::before{content:none}.aisom-margini td input{width:100%;margin:2px 0 0;text-align:left}}",
    ".aisom-margini.tema-cdb{--d1:#ffffff;--d2:#ffffff;--d3:#f6f5f0;--wine:#181918;--wine3:#8a702d;--oro:#8a702d;--tx:#4d4e47;--tx2:#666761;--bd:#deded7;--ok:#2f6f45;--warn:#7a5200;--ko:#a32a2a;font-family:inherit;color:#181918;border-radius:4px;box-shadow:0 1px 0 #deded7}",
    ".aisom-margini.tema-cdb .am-tag{color:#8a702d;border-color:#c6ac61;border-radius:2px}",
    ".aisom-margini.tema-cdb .am-tab{background:#fff;color:#181918;border-color:#deded7;border-radius:2px;font-weight:500}",
    ".aisom-margini.tema-cdb .am-tab[aria-selected=true]{background:#181918;border-color:#181918;color:#fff}",
    ".aisom-margini.tema-cdb input{background:#fff;color:#181918;border-color:#c4c4b9;border-radius:2px}",
    ".aisom-margini.tema-cdb input:focus{border-color:#181918}",
    ".aisom-margini.tema-cdb :focus-visible{outline:3px solid #a48838;outline-offset:3px}",
    ".aisom-margini.tema-cdb .am-k{background:#f6f5f0;border-color:#e2ddcc;border-radius:2px}",
    ".aisom-margini.tema-cdb .am-k .v{color:#181918;font-weight:600}",
    ".aisom-margini.tema-cdb .am-k.oro{background:#f3ecd8;border-color:#c6ac61}",
    ".aisom-margini.tema-cdb .am-k.oro .v{color:#6e5a20}",
    ".aisom-margini.tema-cdb td{color:#181918}",
    ".aisom-margini.tema-cdb td.am-nome{color:#181918}",
    ".aisom-margini.tema-cdb .am-st{border-radius:2px}",
    ".aisom-margini.tema-cdb .am-st.ok{background:#e4f1e8}",
    ".aisom-margini.tema-cdb .am-st.basso{background:#f8eccd}",
    ".aisom-margini.tema-cdb .am-st.perdita{background:#f8e0e0}",
    ".aisom-margini.tema-cdb .am-msg{background:#f8e0e0;border-color:#e3b3b3;color:#5a1a1a;border-radius:2px}",
    ".aisom-margini.tema-cdb .am-cta a{border-radius:2px;font-weight:500}",
    ".aisom-margini.tema-cdb .am-cta .p{background:#181918;color:#fff}",
    ".aisom-margini.tema-cdb .am-cta .p:hover{background:#c6ac61;color:#181918}",
    ".aisom-margini.tema-cdb .am-cta .s{border-color:#deded7;color:#181918}",
  ].join('\n')

  var eur = function (x, dec) {
    if (x == null || !isFinite(x)) return '—'
    return x.toLocaleString('it-IT', { minimumFractionDigits: dec == null ? 2 : dec, maximumFractionDigits: dec == null ? 2 : dec }) + ' €'
  }
  var pct = function (x) { return x == null || !isFinite(x) ? '—' : Math.round(x * 100) + '%' }
  var num = function (v) { var n = Number(String(v).replace(',', '.')); return isFinite(n) && n > 0 ? n : 0 }
  var arrotonda = function (x, passo) { return Math.round(Math.ceil(x / passo - 1e-9) * passo * 100) / 100 }
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] }) }
  var track = function (n, p) { try { if (window.gtag) window.gtag('event', n, p || {}); if (window.fbq) window.fbq('trackCustom', n, p || {}) } catch (e) { /* niente */ } }
  var copia = function (o) { return JSON.parse(JSON.stringify(o)) }

  function calcola(s) {
    var fissi = Object.keys(s.costi).reduce(function (a, k) { return a + num(s.costi[k]) }, 0)
    var lordo = num(s.giorni) * num(s.clienti) * num(s.scontrino)
    var netto = lordo / (1 + num(s.iva) / 100)
    var quota = netto ? fissi / netto : null
    var fcMax = quota != null ? 1 - quota - num(s.margine) / 100 : null
    var pareggio = quota != null ? 1 - quota : null
    var voci = s.voci.map(function (v) {
      var conIva = 1 + (v.iva != null ? v.iva : num(s.iva)) / 100
      var costo = num(v.costo), prezzo = num(v.prezzo)
      var min = pareggio != null && pareggio > 0.02 ? costo / pareggio * conIva : null
      var cons = fcMax != null && fcMax >= 0.05 ? arrotonda(costo / fcMax * conIva, s.passo) : null
      var stato = pareggio == null || pareggio <= 0.02 || (min != null && prezzo < min - 0.005) ? 'perdita'
        : cons != null && prezzo < cons - 0.005 ? 'basso' : cons == null ? 'basso' : 'ok'
      var fc = prezzo ? costo / (prezzo / conIva) : null
      return { nome: v.nome, costo: costo, prezzo: prezzo, min: min, cons: cons, stato: stato, fc: fc }
    })
    return {
      fissi: fissi, lordo: lordo, netto: netto, quota: quota, fcMax: fcMax,
      perCliente: num(s.giorni) * num(s.clienti) ? fissi / (num(s.giorni) * num(s.clienti)) : null,
      voci: voci,
    }
  }

  var STATO = { ok: 'Ok', basso: 'Sotto obiettivo', perdita: 'In perdita' }

  function mount(root) {
    if (root.getAttribute('data-aisom-mounted')) return
    root.setAttribute('data-aisom-mounted', '1')
    root.classList.add('aisom-margini')
    if (root.getAttribute('data-tema') === 'cdb') root.classList.add('tema-cdb')
    var cta = root.getAttribute('data-cta-href') || 'https://www.ai-som.it/prova-margini.html#richiesta'
    var demoFull = 'https://ai-som-saas.vercel.app/margini/demo'
    var chiave = 'ristorante', s = copia(ESEMPI[chiave]), toccato = false

    root.innerHTML =
      '<span class="am-tag">Prova · locali di esempio</span>' +
      '<div class="am-tabs" role="tablist" aria-label="Scegli un esempio"></div>' +
      '<div class="am-body"></div>' +
      '<p class="am-note">Esempi inventati con costi tipici: cambia i numeri come vuoi. Con Margini i costi arrivano dalle tue fatture e bollette, non da stime.</p>' +
      '<div class="am-cta"><a class="p" href="' + esc(cta) + '">Provalo con una tua ricetta</a>' +
      '<a class="s" href="' + demoFull + '" target="_blank" rel="noopener">Apri la demo completa ↗</a></div>'

    var tabs = root.querySelector('.am-tabs'), body = root.querySelector('.am-body')
    Object.keys(ESEMPI).forEach(function (k) {
      var b = document.createElement('button')
      b.type = 'button'; b.className = 'am-tab'; b.setAttribute('role', 'tab'); b.textContent = ESEMPI[k].nome
      b.setAttribute('aria-selected', k === chiave ? 'true' : 'false')
      b.onclick = function () {
        chiave = k; s = copia(ESEMPI[k])
        tabs.querySelectorAll('.am-tab').forEach(function (t) { t.setAttribute('aria-selected', t === b ? 'true' : 'false') })
        disegna(); track('demo_avviata', { demo: 'margini', esempio: k })
      }
      tabs.appendChild(b)
    })
    root.querySelectorAll('.am-cta a').forEach(function (a, i) {
      a.addEventListener('click', function () { track('demo_cta', { demo: 'margini', esempio: chiave, cta: i ? 'demo_completa' : 'richiesta' }) })
    })

    function campo(etichetta, chiaveCampo, valore, dove) {
      return '<label>' + esc(etichetta) + '<input inputmode="decimal" data-k="' + chiaveCampo + '"' + (dove ? ' data-c="' + esc(dove) + '"' : '') + ' value="' + String(valore).replace('.', ',') + '"></label>'
    }

    function disegna() {
      var h = '<div class="am-grid">' +
        campo('Giorni di apertura al mese', 'giorni', s.giorni) +
        campo('Clienti al giorno', 'clienti', s.clienti) +
        campo('Scontrino medio (€)', 'scontrino', s.scontrino) +
        campo('Margine che vuoi (%)', 'margine', s.margine)
      Object.keys(s.costi).forEach(function (c) { h += campo(c + ' al mese (€)', 'costo', s.costi[c], c) })
      h += '</div><div class="am-out"></div>'
      body.innerHTML = h
      body.querySelectorAll('.am-grid input').forEach(function (inp) {
        inp.addEventListener('input', function () {
          var k = inp.getAttribute('data-k')
          if (k === 'costo') s.costi[inp.getAttribute('data-c')] = inp.value
          else s[k] = inp.value
          modifica(); risultati()
        })
      })
      risultati()
    }

    function modifica() { if (!toccato) { toccato = true; track('demo_modifica', { demo: 'margini', esempio: chiave }) } }

    function risultati() {
      var r = calcola(s), out = body.querySelector('.am-out')
      var h = '<div class="am-kpi">' +
        '<div class="am-k"><div class="l">Costi fissi del mese</div><div class="v">' + eur(r.fissi, 0) + '</div><div class="n">' + pct(r.quota) + ' dell’incasso netto</div></div>' +
        '<div class="am-k"><div class="l">Ogni cliente ti costa</div><div class="v">' + eur(r.perCliente) + '</div><div class="n">prima ancora delle materie prime</div></div>' +
        '<div class="am-k"><div class="l">Incasso del mese</div><div class="v">' + eur(r.lordo, 0) + '</div><div class="n">IVA inclusa</div></div>' +
        '<div class="am-k oro"><div class="l">Food cost massimo</div><div class="v">' + pct(r.fcMax) + '</div><div class="n">per tenere il margine del ' + esc(String(s.margine)) + '%</div></div></div>'
      if (r.fcMax == null || r.fcMax < 0.05) {
        h += '<div class="am-msg">Con questi costi fissi e questo incasso il margine richiesto non è raggiungibile: servono più clienti, uno scontrino più alto o costi fissi più bassi.</div>'
      }
      h += '<table><thead><tr><th scope="col">Voce</th><th scope="col">Costo materie prime</th><th scope="col">Prezzo di vendita</th>' +
        '<th scope="col">Prezzo minimo</th><th scope="col">Prezzo consigliato</th><th scope="col">Stato</th></tr></thead><tbody>'
      r.voci.forEach(function (v, i) {
        h += '<tr><td class="am-nome">' + esc(v.nome) + '</td>' +
          '<td data-l="Costo"><input inputmode="decimal" aria-label="Costo materie prime ' + esc(v.nome) + '" data-v="' + i + '" data-f="costo" value="' + String(s.voci[i].costo).replace('.', ',') + '"></td>' +
          '<td data-l="Prezzo"><input inputmode="decimal" aria-label="Prezzo di vendita ' + esc(v.nome) + '" data-v="' + i + '" data-f="prezzo" value="' + String(s.voci[i].prezzo).replace('.', ',') + '"></td>' +
          '<td data-l="Minimo">' + eur(v.min) + '</td><td data-l="Consigliato"><strong>' + eur(v.cons) + '</strong></td>' +
          '<td data-l="Stato"><span class="am-st ' + v.stato + '">' + STATO[v.stato] + '</span></td></tr>'
      })
      h += '</tbody></table>'
      var attivo = document.activeElement, idAttivo = attivo && attivo.getAttribute && attivo.getAttribute('data-v') != null
        ? attivo.getAttribute('data-v') + ':' + attivo.getAttribute('data-f') : null
      var cursore = idAttivo ? attivo.selectionStart : null
      out.innerHTML = h
      out.querySelectorAll('input[data-v]').forEach(function (inp) {
        inp.addEventListener('input', function () {
          s.voci[+inp.getAttribute('data-v')][inp.getAttribute('data-f')] = inp.value
          modifica(); risultati()
        })
        if (idAttivo === inp.getAttribute('data-v') + ':' + inp.getAttribute('data-f')) {
          inp.focus(); try { inp.setSelectionRange(cursore, cursore) } catch (e) { /* niente */ }
        }
      })
    }

    disegna()
  }

  function init() {
    if (!document.getElementById('aisom-margini-css')) {
      var st = document.createElement('style'); st.id = 'aisom-margini-css'; st.textContent = CSS; document.head.appendChild(st)
    }
    document.querySelectorAll('[data-aisom-margini]').forEach(mount)
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init()
})()
