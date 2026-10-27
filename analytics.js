/* AI Som · misurazione con consenso (GA4 + Consent Mode v2).
   - Nessun cookie di statistica prima del consenso: tutto parte "denied".
   - Il banner chiede una sola volta; la scelta resta su questo browser (se lo storage è bloccato, si richiede).
   - Eventi: form_start, generate_lead (con offerta e sorgente), prenota_call, plus quelli dei widget demo.
   - I parametri UTM e fbclid della prima visita vengono copiati nei campi nascosti dei moduli.
   Per attivarlo basta impostare GA_ID con l'ID di misurazione GA4 (G-…). */
(function () {
  'use strict'
  var GA_ID = 'G-3MBYY15RHV'
  var CHIAVE = 'aisom_consenso_v1'
  var attivo = /^G-[A-Z0-9]{6,}$/.test(GA_ID) && GA_ID !== 'G-XXXXXXXXXX'

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments) }
  var gtag = window.gtag
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 })

  var leggi = function (k) { try { return localStorage.getItem(k) } catch (e) { return null } }
  var scrivi = function (k, v) { try { localStorage.setItem(k, v) } catch (e) { /* storage bloccato */ } }
  var leggiS = function (k) { try { return sessionStorage.getItem(k) } catch (e) { return null } }
  var scriviS = function (k, v) { try { sessionStorage.setItem(k, v) } catch (e) { /* storage bloccato */ } }

  if (attivo) {
    var s = document.createElement('script')
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID
    document.head.appendChild(s)
    gtag('js', new Date())
    gtag('config', GA_ID, { anonymize_ip: true })
  }

  function applica(scelta) {
    var si = scelta === 'si' ? 'granted' : 'denied'
    gtag('consent', 'update', { analytics_storage: si, ad_storage: si, ad_user_data: si, ad_personalization: si })
  }

  // ---- UTM: la sorgente della prima pagina vista in questa sessione accompagna il lead
  var CAMPI = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']
  var qs = new URLSearchParams(location.search)
  if (CAMPI.some(function (c) { return qs.get(c) })) {
    var visti = {}; CAMPI.forEach(function (c) { if (qs.get(c)) visti[c] = qs.get(c) })
    scriviS('aisom_utm', JSON.stringify(visti))
  }
  var utm = {}; try { utm = JSON.parse(leggiS('aisom_utm') || '{}') } catch (e) { utm = {} }

  function preparaModuli() {
    document.querySelectorAll('form').forEach(function (f) {
      CAMPI.concat(['pagina']).forEach(function (c) {
        var v = c === 'pagina' ? location.pathname : utm[c]
        if (!v) return
        var inp = f.querySelector('input[name="' + c + '"]')
        if (!inp) { inp = document.createElement('input'); inp.type = 'hidden'; inp.name = c; f.appendChild(inp) }
        inp.value = v
      })
      var iniziato = false
      f.addEventListener('focusin', function () {
        if (iniziato) return
        iniziato = true
        gtag('event', 'form_start', { offerta: f.getAttribute('data-offerta') || 'generico' })
      })
      f.addEventListener('submit', function () {
        gtag('event', 'generate_lead', { transport_type: 'beacon',
          offerta: f.getAttribute('data-offerta') || 'generico',
          sorgente: utm.utm_source || 'diretto', campagna: utm.utm_campaign || '',
        })
      })
    })
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]')
      if (!a) return
      if (/cal\.eu|calendly/.test(a.href)) gtag('event', 'prenota_call', { pagina: location.pathname })
      if (/^tel:/.test(a.href)) gtag('event', 'chiama', { pagina: location.pathname })
    })
  }

  // ---- banner
  function banner() {
    var css = '#aisom-consenso{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;background:#1A1A1A;color:#EDE6DD;border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:18px;font:14px/1.5 "Plus Jakarta Sans",system-ui,Arial,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.5)}' +
      '#aisom-consenso p{margin:0 0 12px}#aisom-consenso a{color:#E39AA4;text-decoration:underline}' +
      '#aisom-consenso .b{display:flex;gap:10px;flex-wrap:wrap}#aisom-consenso button{flex:1 1 140px;min-height:44px;border-radius:999px;font:600 14px "Plus Jakarta Sans",system-ui,sans-serif;cursor:pointer}' +
      '#aisom-consenso .si{background:#C43C4D;color:#fff;border:0}#aisom-consenso .no{background:transparent;color:#EDE6DD;border:1px solid rgba(255,255,255,.3)}' +
      '#aisom-consenso button:focus-visible{outline:2px solid #E39AA4;outline-offset:2px}'
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st)
    var d = document.createElement('div')
    d.id = 'aisom-consenso'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Consenso ai cookie')
    d.innerHTML = '<p>Usiamo cookie di statistica e marketing per capire quali pagine sono utili e misurare le campagne. Li attiviamo solo se accetti. <a href="/privacy.html">Informativa</a></p>' +
      '<div class="b"><button type="button" class="no">Rifiuta</button><button type="button" class="si">Accetta</button></div>'
    document.body.appendChild(d)
    d.querySelector('.si').onclick = function () { scrivi(CHIAVE, 'si'); applica('si'); d.remove() }
    d.querySelector('.no').onclick = function () { scrivi(CHIAVE, 'no'); applica('no'); d.remove() }
  }

  var scelta = leggi(CHIAVE)
  if (scelta) applica(scelta)

  function avvio() {
    preparaModuli()
    if (!scelta && attivo) banner()
    document.querySelectorAll('[data-consenso-reset]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); try { localStorage.removeItem(CHIAVE) } catch (x) { /* niente */ } location.reload() })
    })
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', avvio); else avvio()
})()
