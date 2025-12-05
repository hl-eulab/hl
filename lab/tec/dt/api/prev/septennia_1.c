// SETTENNIA CALCULATOR

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname
  
  // Homepage with instructions
  if (path === '/' || path === '') {
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Septennia Calculator - The Earth Calendar</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
            code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
            .endpoint { background: #f0f8ff; padding: 15px; margin: 10px 0; border-left: 4px solid #4682b4; }
            .note { background: #fffacd; padding: 10px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <h1>⏳ Septennia Calculator</h1>
          <p>Septenniums specialized calculator - The Earth Calendar</p>
          
          <div class="note">
            <strong>Nota:</strong> Questo Worker si specializza nei calcoli dei periodi di 7 anni.<br>
            Per la data corrente, usa: <a href="https://tec.hyperlinker.workers.dev">tec.hyperlinker.workers.dev</a>
          </div>
          
          <div class="endpoint">
            <h3>📅 Eptade corrente</h3>
            <code>GET ${url.origin}/current</code><br>
            <small>Informazioni complete sull'eptade attuale</small>
          </div>
          
          <div class="endpoint">
            <h3>🔢 Calcola per anno Terra</h3>
            <code>GET ${url.origin}/calculate/56</code><br>
            <small>Dettagli eptade per un anno specifico (56 = 2025)</small>
          </div>
          
          <div class="endpoint">
            <h3>📊 Tutti gli anni di un'eptade</h3>
            <code>GET ${url.origin}/cycle/8</code><br>
            <small>Lista completa dei 7 anni di un'eptade</small>
          </div>
          
          <div class="endpoint">
            <h3>🔄 Converti tra sistemi</h3>
            <code>GET ${url.origin}/convert?traditional=2025</code><br>
            <small>o: ${url.origin}/convert?earth=56</small>
          </div>
          
          <div class="endpoint">
            <h3>📈 Prossime eptadi</h3>
            <code>GET ${url.origin}/future/3</code><br>
            <small>Prossime 3 eptadi dall'attuale</small>
          </div>
          
          <hr>
          <p><small>Integrato con The Earth Calendar API | Anno Terra corrente: ${new Date().getFullYear() - 1969}</small></p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }
  
  // Gestione endpoint
  if (path === '/current') {
    return getCurrentSeptennium()
  } else if (path.startsWith('/calculate/')) {
    const yearStr = path.split('/calculate/')[1]
    return calculateForYear(yearStr)
  } else if (path.startsWith('/cycle/')) {
    const septStr = path.split('/cycle/')[1]
    return getSeptenniumCycle(septStr)
  } else if (path.startsWith('/future/')) {
    const countStr = path.split('/future/')[1]
    return getFutureSeptennia(countStr)
  } else if (path === '/convert') {
    return convertSeptennium(url)
  } else {
    return jsonResponse({
      error: 'Endpoint non trovato',
      hint: 'Visita la homepage per la lista completa'
    }, 404)
  }
}

// Funzioni principali
function getCurrentSeptennium() {
  const currentYear = new Date().getFullYear() - 1969
  const septennium = Math.floor(currentYear / 7) + 1
  
  return jsonResponse(calculateSeptenniumDetails(septennium))
}

function calculateForYear(yearStr) {
  const earthYear = parseInt(yearStr)
  if (isNaN(earthYear) || earthYear < 0) {
    return jsonResponse({ error: 'Anno Terra non valido' }, 400)
  }
  
  const septennium = Math.floor(earthYear / 7) + 1
  const position = (earthYear % 7) + 1
  
  const details = calculateSeptenniumDetails(septennium)
  
  return jsonResponse({
    earth_year: earthYear,
    traditional_year: 1969 + earthYear,
    septennium_info: {
      number: septennium,
      type: details.type,
      position_in_septennium: position,
      year_name: getYearName(earthYear)
    },
    septennium_details: details
  })
}

function getSeptenniumCycle(septStr) {
  const septennium = parseInt(septStr)
  if (isNaN(septennium) || septennium < 1) {
    return jsonResponse({ error: 'Numero eptade non valido' }, 400)
  }
  
  const types = ["Moon", "Atom", "Water", "Wind", "Fire", "Earth", "Sun"]
  const type = types[(septennium - 1) % 7]
  
  const startEarthYear = (septennium - 1) * 7
  const years = []
  
  for (let i = 0; i < 7; i++) {
    const earthYear = startEarthYear + i
    years.push({
      earth_year: earthYear,
      traditional_year: 1969 + earthYear,
      year_name: getYearName(earthYear),
      position_in_septennium: i + 1,
      is_current: earthYear === (new Date().getFullYear() - 1969)
    })
  }
  
  return jsonResponse({
    septennium: {
      number: septennium,
      type: type,
      full_name: `Septennium of the ${type}`,
      earth_years: {
        start: startEarthYear,
        end: startEarthYear + 6
      },
      traditional_years: {
        start: 1969 + startEarthYear,
        end: 1969 + startEarthYear + 6,
        decade: getDecade(1969 + startEarthYear)
      },
      all_years: years
    }
  })
}

function getFutureSeptennia(countStr) {
  const count = parseInt(countStr) || 5
  if (count > 20) count = 20 // Limite per sicurezza
  
  const currentYear = new Date().getFullYear() - 1969
  const currentSeptennium = Math.floor(currentYear / 7) + 1
  
  const future = []
  for (let i = 1; i <= count; i++) {
    const septennium = currentSeptennium + i
    future.push(calculateSeptenniumDetails(septennium))
  }
  
  return jsonResponse({
    current_septennium: currentSeptennium,
    next_septennia: future,
    count: count
  })
}

function convertSeptennium(url) {
  const params = url.searchParams
  const traditional = params.get('traditional')
  const earth = params.get('earth')
  
  if (traditional) {
    const tradYear = parseInt(traditional)
    if (isNaN(tradYear)) {
      return jsonResponse({ error: 'Anno tradizionale non valido' }, 400)
    }
    
    const earthYear = tradYear - 1969
    const septennium = Math.floor(earthYear / 7) + 1
    
    return jsonResponse({
      traditional_year: tradYear,
      earth_year: earthYear,
      septennium: septennium,
      year_name: getYearName(earthYear)
    })
  }
  
  if (earth) {
    const earthYear = parseInt(earth)
    if (isNaN(earthYear) || earthYear < 0) {
      return jsonResponse({ error: 'Anno Terra non valido' }, 400)
    }
    
    return jsonResponse({
      earth_year: earthYear,
      traditional_year: 1969 + earthYear,
      septennium: Math.floor(earthYear / 7) + 1,
      year_name: getYearName(earthYear)
    })
  }
  
  return jsonResponse({
    error: 'Specifica ?traditional=YYYY o ?earth=N',
    examples: [
      '/convert?traditional=2025',
      '/convert?earth=56'
    ]
  }, 400)
}

// Funzioni helper
function calculateSeptenniumDetails(septennium) {
  const types = ["Moon", "Atom", "Water", "Wind", "Fire", "Earth", "Sun"]
  const type = types[(septennium - 1) % 7]
  
  const startEarthYear = (septennium - 1) * 7
  const currentYear = new Date().getFullYear() - 1969
  const currentSeptennium = Math.floor(currentYear / 7) + 1
  
  return {
    number: septennium,
    type: type,
    full_name: `Septennium of the ${type}`,
    
    earth_years: {
      start: startEarthYear,
      end: startEarthYear + 6,
      range: `${startEarthYear}-${startEarthYear + 6}`
    },
    
    traditional_years: {
      start: 1969 + startEarthYear,
      end: 1969 + startEarthYear + 6,
      range: `${1969 + startEarthYear}-${1969 + startEarthYear + 6}`,
      decade: getDecade(1969 + startEarthYear)
    },
    
    status: {
      is_current: septennium === currentSeptennium,
      is_past: septennium < currentSeptennium,
      is_future: septennium > currentSeptennium,
      years_until: septennium > currentSeptennium ? septennium - currentSeptennium : 0
    },
    
    characteristics: getSeptenniumCharacteristics(type)
  }
}

function getYearName(earthYear) {
  const yos = earthYear % 7
  const names = [
    "of the Moon", "of the Atom", "of the Water", 
    "of the Wind", "of the Fire", "of the Earth", "of the Sun"
  ]
  return names[yos]
}

function getDecade(year) {
  const decadeStart = Math.floor(year / 10) * 10
  return `${decadeStart}s`
}

function getSeptenniumCharacteristics(type) {
  const chars = {
    "Moon": "Studio, ricerca, preparazione, apprendimento",
    "Atom": "Fondamenti, struttura, base, inizio cicli",
    "Water": "Flusso, sviluppo, crescita, purificazione",
    "Wind": "Movimento, cambiamento, diffusione, azione collettiva",
    "Fire": "Energia, realizzazione, trasformazione, conclusione",
    "Earth": "Radicamento, ambiente, comunità, cura del pianeta",
    "Sun": "Consapevolezza individuale, illuminazione, riposo, celebrazione"
  }
  return chars[type] || "Caratteristiche da definire"
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Septennia-API': 'v1.0'
    }
  })
}
