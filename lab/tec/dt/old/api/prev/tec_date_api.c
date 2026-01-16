// The Earth Calendar date API

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname
  
  if (path === '/today' || path === '/') {
    return getToday()
  } else if (path.startsWith('/convert/')) {
    const dateStr = path.split('/convert/')[1]
    return convertDate(dateStr)
  } else if (path.startsWith('/year/')) {
    const yearStr = path.split('/year/')[1]
    return getYearInfo(yearStr)
  } else if (path.startsWith('/septennium/')) {
    const septStr = path.split('/septennium/')[1]
    return getSeptenniumInfo(septStr)
  } else {
    return jsonResponse({ 
      error: 'Endpoint non trovato', 
      endpoints_available: [
        '/today', 
        '/convert/YYYY-MM-DD', 
        '/year/N', 
        '/septennium/N'
      ] 
    }, 404)
  }
}

// ALGORITMO PRECISISSIMO basato sul TUO tec_date.js
function calculateEarthDate(date = new Date()) {
  const oey = date.getFullYear()
  const ney = oey - 1969  // Anno Nuova Era
  const yos = ney % 7     // Posizione nell'eptade (0-6)
  
  // I TUOI ESATTI array originali
  const noy = [
    "of the Moon", 
    "of the Atom", 
    "of the Water", 
    "of the Wind", 
    "of the Fire", 
    "of the Earth", 
    "of the Sun"
  ]
  
  const moy = [
    "First month", 
    "Second month", 
    "Third month", 
    "Fourth month", 
    "Fifth month", 
    "Sixth month", 
    "Seventh month", 
    "Eighth month", 
    "Ninth month", 
    "Tenth month", 
    "Eleventh month", 
    "Twelfth month"
  ]
  
  const dow = [
    "Sunday", 
    "Moonday", 
    "Atomday", 
    "Waterday", 
    "Winday", 
    "Fireday", 
    "Earthday"
  ]
  
  // Calcolo eptade (settimana di 7 anni)
  const septennium = Math.floor(ney / 7) + 1
  const yearInSeptennium = (ney % 7)
  const septenniumType = noy[(septennium - 1) % 7].replace('of the ', '')
  
  return {
    // Formato stringa completo (identico al tuo script)
    full_string: `Today is ${dow[date.getDay()]} ${date.getDate()}, ${moy[date.getMonth()]}, year ${ney}, ${noy[yos]}`,
    
    // Dati strutturati
    traditional_date: date.toISOString().split('T')[0],
    earth_calendar: {
      year: ney,
      year_name: noy[yos],
      year_symbol: noy[yos].replace('of the ', ''),
      month: moy[date.getMonth()],
      month_number: date.getMonth() + 1,
      day: dow[date.getDay()],
      day_number: date.getDate(),
      day_of_week: date.getDay()
    },
    septennium: {
      number: septennium,
      type: septenniumType,
      year_in_septennium: yearInSeptennium + 1, // 1-based per leggibilità
      years_range: {
        start_earth_year: (septennium - 1) * 7,
        end_earth_year: septennium * 7 - 1,
        start_traditional: 1969 + (septennium - 1) * 7,
        end_traditional: 1969 + septennium * 7 - 1
      }
    }
  }
}

// Endpoint: Data di oggi
function getToday() {
  const result = calculateEarthDate()
  return jsonResponse(result)
}

// Endpoint: Converti data specifica
function convertDate(dateStr) {
  try {
    const date = new Date(dateStr + 'T12:00:00Z') // Mezzogiorno UTC per evitare problemi fuso
    if (isNaN(date.getTime())) {
      return jsonResponse({ 
        error: 'Data non valida', 
        correct_format: 'YYYY-MM-DD',
        example: '1969-07-20' 
      }, 400)
    }
    
    const result = calculateEarthDate(date)
    
    // Aggiungi nota per date storiche importanti
    if (dateStr === '1969-07-20') {
      result.historical_note = 'First human Moon landing - Apollo 11'
    } else if (dateStr === '1969-09-02') {
      result.historical_note = 'Birth of the Internet - First ARPANET node'
    }
    
    return jsonResponse(result)
  } catch (e) {
    return jsonResponse({ 
      error: 'Errore di conversione',
      details: e.message 
    }, 400)
  }
}

// Endpoint: Informazioni su un anno specifico
function getYearInfo(yearStr) {
  const year = parseInt(yearStr)
  if (isNaN(year) || year < 0) {
    return jsonResponse({ 
      error: 'Anno non valido',
      note: 'L\'anno deve essere un numero positivo (0 = 1969)' 
    }, 400)
  }
  
  const traditionalYear = 1969 + year
  const yos = year % 7
  const noy = [
    "of the Moon", "of the Atom", "of the Water", 
    "of the Wind", "of the Fire", "of the Earth", "of the Sun"
  ]
  
  const septennium = Math.floor(year / 7) + 1
  const currentYear = new Date().getFullYear() - 1969
  
  return jsonResponse({
    earth_year: year,
    traditional_year: traditionalYear,
    year_name: noy[yos],
    year_symbol: noy[yos].replace('of the ', ''),
    
    septennium_info: {
      number: septennium,
      type: ["Moon", "Atom", "Water", "Wind", "Fire", "Earth", "Sun"][(septennium - 1) % 7],
      year_position: (year % 7) + 1,
      years_in_septennium: [
        { position: 1, name: "MoonYear" },
        { position: 2, name: "AtomYear" },
        { position: 3, name: "WaterYear" },
        { position: 4, name: "WindYear" },
        { position: 5, name: "FireYear" },
        { position: 6, name: "EarthYear" },
        { position: 7, name: "SunYear" }
      ]
    },
    
    status: {
      is_current_year: year === currentYear,
      is_past: year < currentYear,
      is_future: year > currentYear,
      year_zero: year === 0
    }
  })
}

// Endpoint: Informazioni su un'eptade
function getSeptenniumInfo(septStr) {
  const sept = parseInt(septStr)
  if (isNaN(sept) || sept < 1) {
    return jsonResponse({ 
      error: 'Eptade non valida',
      note: 'Le eptadi iniziano da 1' 
    }, 400)
  }
  
  const types = ["Moon", "Atom", "Water", "Wind", "Fire", "Earth", "Sun"]
  const type = types[(sept - 1) % 7]
  
  const startEarthYear = (sept - 1) * 7
  const endEarthYear = sept * 7 - 1
  
  const years = []
  for (let i = 0; i < 7; i++) {
    const earthYear = startEarthYear + i
    const yos = earthYear % 7
    const noy = [
      "of the Moon", "of the Atom", "of the Water", 
      "of the Wind", "of the Fire", "of the Earth", "of the Sun"
    ]
    
    years.push({
      earth_year: earthYear,
      traditional_year: 1969 + earthYear,
      year_name: noy[yos],
      year_symbol: noy[yos].replace('of the ', ''),
      position_in_septennium: i + 1
    })
  }
  
  const currentEarthYear = new Date().getFullYear() - 1969
  const currentSeptennium = Math.floor(currentEarthYear / 7) + 1
  
  return jsonResponse({
    septennium: {
      number: sept,
      type: type,
      current_septennium: sept === currentSeptennium,
      
      earth_years: {
        start: startEarthYear,
        end: endEarthYear
      },
      
      traditional_years: {
        start: 1969 + startEarthYear,
        end: 1969 + endEarthYear,
        decade: `${Math.floor((1969 + startEarthYear) / 10) * 10}s`
      },
      
      all_years: years
    }
  })
}

// Helper per risposte JSON
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Earth-Calendar-API': 'v1.0',
      'X-Algorithm-Source': 'tec_date.js original'
    }
  })
}


