
// SEPTENNIUM CALCULATOR API - The Earth Calendar

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname
  
  // Clean, minimal homepage
  if (path === '/' || path === '') {
    const currentEarthYear = new Date().getFullYear() - 1969
    const currentSeptennium = Math.floor(currentEarthYear / 7) + 1
    
    return new Response(`
<!DOCTYPE html>
<html>
<head>
  <title>Septennium Calculator API - The Earth Calendar</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6; 
      color: #333;
      background: #ffffff;
      max-width: 900px;
      margin: 0 auto;
      padding: 30px 20px;
    }
    .header { 
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 25px;
      margin-bottom: 35px;
    }
    h1 { 
      font-weight: 400;
      font-size: 28px;
      color: #222;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #666;
      font-size: 16px;
      font-weight: 400;
    }
    .current-info {
      background: #f9f9f9;
      border: 1px solid #eaeaea;
      padding: 18px;
      margin: 25px 0;
      border-radius: 4px;
      font-size: 15px;
    }
    .endpoint-container {
      margin: 30px 0;
    }
    .endpoint {
      background: #fafafa;
      border: 1px solid #eee;
      border-radius: 4px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .endpoint-title {
      font-weight: 500;
      font-size: 18px;
      color: #222;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .endpoint-method {
      font-family: 'Monaco', 'Consolas', monospace;
      background: #f0f0f0;
      padding: 4px 10px;
      border-radius: 3px;
      font-size: 14px;
      color: #444;
    }
    .endpoint-path {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 16px;
      color: #0066cc;
      margin: 10px 0;
      word-break: break-all;
    }
    .example-list {
      margin: 15px 0;
      padding-left: 20px;
    }
    .example-list li {
      margin: 8px 0;
      font-size: 14.5px;
    }
    .example-link {
      color: #0066cc;
      text-decoration: none;
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 14px;
    }
    .example-link:hover {
      text-decoration: underline;
    }
    .param-note {
      font-size: 13.5px;
      color: #666;
      margin-top: 8px;
      font-style: italic;
    }
    .footer {
      margin-top: 50px;
      padding-top: 25px;
      border-top: 1px solid #eee;
      color: #777;
      font-size: 14px;
    }
    .system-info {
      background: #f5f5f5;
      border-left: 3px solid #ddd;
      padding: 15px;
      margin: 20px 0;
      font-size: 14px;
    }
    .system-info strong {
      color: #444;
    }
    code {
      font-family: 'Monaco', 'Consolas', monospace;
      background: #f0f0f0;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 14px;
      color: #333;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .endpoint-icon {
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Septennium Calculator API</h1>
    <div class="subtitle">The Earth Calendar • Seven-Year Cycle Calculator</div>
  </div>
  
  <div class="current-info">
    <strong>Current System Status:</strong><br>
    Earth Year: ${currentEarthYear} • Septennium: ${currentSeptennium} • Traditional Year: ${new Date().getFullYear()}
  </div>
  
  <p>This API provides programmatic access to septennium (7-year cycle) calculations for The Earth Calendar system. All endpoints return JSON data.</p>
  
  <div class="system-info">
    <strong>Earth Calendar Reference:</strong><br>
    • Year 0 = 1969 (First Moon landing and birth of the Internet)<br>
    • 7-year cycles (septennia) mirror weekly patterns<br>
    • Each septennium follows: Moon → Atom → Water → Wind → Fire → Earth → Sun
  </div>
  
  <div class="endpoint-container">
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">📅</span>
        Current Septennium
      </div>
      <div class="endpoint-path">GET /current</div>
      <div>Returns complete information about the current 7-year cycle.</div>
      <ul class="example-list">
        <li><a href="/current" class="example-link">${url.origin}/current</a></li>
      </ul>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">🔢</span>
        Calculate for Earth Year
      </div>
      <div class="endpoint-path">GET /calculate/&lt;earth_year&gt;</div>
      <div>Shows which septennium contains a specific Earth Year.</div>
      <ul class="example-list">
        <li><a href="/calculate/56" class="example-link">${url.origin}/calculate/56</a> (Year 56 = 2025)</li>
        <li><a href="/calculate/0" class="example-link">${url.origin}/calculate/0</a> (Year 0 = 1969)</li>
        <li><a href="/calculate/48" class="example-link">${url.origin}/calculate/48</a> (Year 48 = 2017)</li>
      </ul>
      <div class="param-note">Replace &lt;earth_year&gt; with the Earth Calendar year number</div>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">📊</span>
        All Years in a Septennium
      </div>
      <div class="endpoint-path">GET /cycle/&lt;septennium_number&gt;</div>
      <div>Returns all 7 years of a specific septennium with details.</div>
      <ul class="example-list">
        <li><a href="/cycle/8" class="example-link">${url.origin}/cycle/8</a> (8th Septennium: 2018-2024)</li>
        <li><a href="/cycle/1" class="example-link">${url.origin}/cycle/1</a> (1st Septennium: 1969-1975)</li>
        <li><a href="/cycle/9" class="example-link">${url.origin}/cycle/9</a> (Current: 2025-2031)</li>
      </ul>
      <div class="param-note">Replace &lt;septennium_number&gt; with the septennium number (starts from 1)</div>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">🔄</span>
        Convert Between Systems
      </div>
      <div class="endpoint-path">GET /convert?traditional=&lt;year&gt;</div>
      <div class="endpoint-path">GET /convert?earth=&lt;year&gt;</div>
      <div>Convert between traditional years and Earth Calendar years.</div>
      <ul class="example-list">
        <li><a href="/convert?traditional=2025" class="example-link">${url.origin}/convert?traditional=2025</a></li>
        <li><a href="/convert?earth=56" class="example-link">${url.origin}/convert?earth=56</a></li>
        <li><a href="/convert?traditional=1969" class="example-link">${url.origin}/convert?traditional=1969</a></li>
      </ul>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">📈</span>
        Future Septennia
      </div>
      <div class="endpoint-path">GET /future/&lt;count&gt;</div>
      <div>Get information about upcoming septennia.</div>
      <ul class="example-list">
        <li><a href="/future/3" class="example-link">${url.origin}/future/3</a> (Next 3 septennia)</li>
        <li><a href="/future/5" class="example-link">${url.origin}/future/5</a> (Next 5 septennia)</li>
        <li><a href="/future/1" class="example-link">${url.origin}/future/1</a> (Next septennium only)</li>
      </ul>
      <div class="param-note">Replace &lt;count&gt; with number of future septennia to retrieve (max 20)</div>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">🔍</span>
        Search Septennium by Year
      </div>
      <div class="endpoint-path">GET /find?year=&lt;traditional_year&gt;</div>
      <div>Find which septennium contains a specific traditional year.</div>
      <ul class="example-list">
        <li><a href="/find?year=2025" class="example-link">${url.origin}/find?year=2025</a></li>
        <li><a href="/find?year=1969" class="example-link">${url.origin}/find?year=1969</a></li>
        <li><a href="/find?year=2000" class="example-link">${url.origin}/find?year=2000</a></li>
      </ul>
    </div>
  </div>
  
  <div class="footer">
    <p><strong>The Earth Calendar API</strong><br>
    Septennium Calculator • Version 1.0</p>
    <p style="margin-top: 10px;">
      <a href="https://earthcal.hyperlinker.org">Main Calendar</a> • 
      <a href="https://epoch.hyperlinker.org">Epoch System</a> • 
      <a href="mailto:info@hyperlinker.org">Contact</a>
    </p>
    <p style="margin-top: 15px; font-size: 13px; color: #888;">
      All calculations based on The Earth Calendar system (Year 0 = 1969).<br>
      This API returns JSON data suitable for programmatic use.
    </p>
  </div>
</body>
</html>
`, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }
  
  // API endpoints handling (keep the same robust backend)
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
  } else if (path === '/find') {
    return findSeptenniumByYear(url)
  } else {
    return jsonResponse({
      error: 'Endpoint not found',
      available_endpoints: [
        '/current',
        '/calculate/<earth_year>',
        '/cycle/<septennium_number>',
        '/future/<count>',
        '/convert?traditional=<year>',
        '/convert?earth=<year>',
        '/find?year=<traditional_year>'
      ],
      documentation: url.origin
    }, 404)
  }
}

// ========== BACKEND FUNCTIONS (identical to previous robust version) ==========

function getCurrentSeptennium() {
  const currentYear = new Date().getFullYear() - 1969
  const septennium = Math.floor(currentYear / 7) + 1
  
  return jsonResponse(calculateSeptenniumDetails(septennium))
}

function calculateForYear(yearStr) {
  const earthYear = parseInt(yearStr)
  if (isNaN(earthYear) || earthYear < 0) {
    return jsonResponse({ 
      error: 'Invalid Earth Year',
      note: 'Earth Year must be a positive number (0 = 1969)',
      example: '/calculate/56'
    }, 400)
  }
  
  const septennium = Math.floor(earthYear / 7) + 1
  const position = (earthYear % 7) + 1
  
  const details = calculateSeptenniumDetails(septennium)
  
  return jsonResponse({
    requested_year: {
      earth_year: earthYear,
      traditional_year: 1969 + earthYear,
      year_name: getYearName(earthYear)
    },
    septennium_info: {
      number: septennium,
      type: details.type,
      position_in_septennium: position,
      position_name: getPositionName(position)
    },
    septennium_details: details
  })
}

function getSeptenniumCycle(septStr) {
  const septennium = parseInt(septStr)
  if (isNaN(septennium) || septennium < 1) {
    return jsonResponse({ 
      error: 'Invalid Septennium Number',
      note: 'Septennia start from 1',
      current_septennium: Math.floor((new Date().getFullYear() - 1969) / 7) + 1,
      example: '/cycle/8'
    }, 400)
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
      position_name: getPositionName(i + 1),
      is_current_year: earthYear === (new Date().getFullYear() - 1969),
      is_year_zero: earthYear === 0
    })
  }
  
  const currentEarthYear = new Date().getFullYear() - 1969
  const currentSeptennium = Math.floor(currentEarthYear / 7) + 1
  
  return jsonResponse({
    septennium: {
      number: septennium,
      type: type,
      full_name: `Septennium of the ${type}`,
      is_current: septennium === currentSeptennium,
      
      earth_years: {
        start: startEarthYear,
        end: startEarthYear + 6,
        range: `Years ${startEarthYear}-${startEarthYear + 6}`
      },
      
      traditional_years: {
        start: 1969 + startEarthYear,
        end: 1969 + startEarthYear + 6,
        range: `${1969 + startEarthYear}-${1969 + startEarthYear + 6}`,
        decade: getDecade(1969 + startEarthYear)
      },
      
      characteristics: getSeptenniumCharacteristics(type),
      all_years: years
    }
  })
}

function getFutureSeptennia(countStr) {
  const count = parseInt(countStr) || 5
  if (count > 20) count = 20
  if (count < 1) count = 1
  
  const currentYear = new Date().getFullYear() - 1969
  const currentSeptennium = Math.floor(currentYear / 7) + 1
  
  const future = []
  for (let i = 1; i <= count; i++) {
    const septennium = currentSeptennium + i
    future.push(calculateSeptenniumDetails(septennium))
  }
  
  return jsonResponse({
    current: calculateSeptenniumDetails(currentSeptennium),
    next_septennia: future,
    count: count,
    timespan: `${future[0]?.traditional_years?.start} - ${future[future.length-1]?.traditional_years?.end}`
  })
}

function convertSeptennium(url) {
  const params = url.searchParams
  const traditional = params.get('traditional')
  const earth = params.get('earth')
  
  if (traditional) {
    const tradYear = parseInt(traditional)
    if (isNaN(tradYear)) {
      return jsonResponse({ 
        error: 'Invalid Traditional Year',
        example: '/convert?traditional=2025'
      }, 400)
    }
    
    const earthYear = tradYear - 1969
    if (earthYear < 0) {
      return jsonResponse({
        error: 'Year before Earth Calendar epoch',
        note: 'The Earth Calendar starts from 1969 (Year 0)',
        earliest_year: 1969
      }, 400)
    }
    
    const septennium = Math.floor(earthYear / 7) + 1
    
    return jsonResponse({
      conversion: {
        from: 'traditional_year',
        to: 'earth_calendar'
      },
      traditional_year: tradYear,
      earth_year: earthYear,
      year_name: getYearName(earthYear),
      septennium: {
        number: septennium,
        type: ["Moon", "Atom", "Water", "Wind", "Fire", "Earth", "Sun"][(septennium - 1) % 7]
      }
    })
  }
  
  if (earth) {
    const earthYear = parseInt(earth)
    if (isNaN(earthYear) || earthYear < 0) {
      return jsonResponse({ 
        error: 'Invalid Earth Year',
        example: '/convert?earth=56'
      }, 400)
    }
    
    return jsonResponse({
      conversion: {
        from: 'earth_year',
        to: 'traditional_year'
      },
      earth_year: earthYear,
      traditional_year: 1969 + earthYear,
      year_name: getYearName(earthYear),
      septennium: {
        number: Math.floor(earthYear / 7) + 1,
        type: ["Moon", "Atom", "Water", "Wind", "Fire", "Earth", "Sun"][(Math.floor(earthYear / 7)) % 7]
      }
    })
  }
  
  return jsonResponse({
    error: 'Missing parameter',
    usage: 'Specify either ?traditional=YYYY or ?earth=N',
    examples: [
      '/convert?traditional=2025',
      '/convert?earth=56'
    ]
  }, 400)
}

function findSeptenniumByYear(url) {
  const params = url.searchParams
  const year = params.get('year')
  
  if (!year) {
    return jsonResponse({
      error: 'Missing year parameter',
      usage: 'Specify ?year=YYYY',
      example: '/find?year=2025'
    }, 400)
  }
  
  const tradYear = parseInt(year)
  if (isNaN(tradYear)) {
    return jsonResponse({ 
      error: 'Invalid Year Format',
      note: 'Use a valid year number',
      example: '/find?year=2025'
    }, 400)
  }
  
  const earthYear = tradYear - 1969
  if (earthYear < 0) {
    return jsonResponse({ 
      error: 'Year before Earth Calendar epoch',
      note: 'The Earth Calendar starts from 1969 (Year 0)',
      earliest_search: 1969
    }, 400)
  }
  
  const septennium = Math.floor(earthYear / 7) + 1
  const position = (earthYear % 7) + 1
  
  return jsonResponse({
    search: {
      traditional_year: tradYear,
      earth_year: earthYear,
      year_name: getYearName(earthYear)
    },
    found_in: {
      septennium: septennium,
      type: ["Moon", "Atom", "Water", "Wind", "Fire", "Earth", "Sun"][(septennium - 1) % 7],
      position_in_septennium: position,
      position_name: getPositionName(position)
    },
    septennium_details: calculateSeptenniumDetails(septennium)
  })
}

function calculateSeptenniumDetails(septennium) {
  const types = ["Moon", "Atom", "Water", "Wind", "Fire", "Earth", "Sun"]
  const type = types[(septennium - 1) % 7]
  
  const startEarthYear = (septennium - 1) * 7
  const currentYear = new Date().getFullYear() - 1969
  const currentSeptennium = Math.floor(currentYear / 7) + 1
  
  const yearsUntilStart = startEarthYear - currentYear
  const yearsUntilEnd = (startEarthYear + 6) - currentYear
  
  return {
    number: septennium,
    type: type,
    full_name: `Septennium of the ${type}`,
    
    earth_years: {
      start: startEarthYear,
      end: startEarthYear + 6,
      range: `Years ${startEarthYear}-${startEarthYear + 6}`,
      count: 7
    },
    
    traditional_years: {
      start: 1969 + startEarthYear,
      end: 1969 + startEarthYear + 6,
      range: `${1969 + startEarthYear}-${1969 + startEarthYear + 6}`,
      decade: getDecade(1969 + startEarthYear),
      century: Math.ceil((1969 + startEarthYear) / 100)
    },
    
    status: {
      is_current: septennium === currentSeptennium,
      is_past: septennium < currentSeptennium,
      is_future: septennium > currentSeptennium,
      years_until_start: yearsUntilStart > 0 ? yearsUntilStart : 0,
      years_until_end: yearsUntilEnd > 0 ? yearsUntilEnd : 0,
      progress: septennium === currentSeptennium ? 
        `${((currentYear - startEarthYear + 1) / 7 * 100).toFixed(1)}%` : null
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

function getPositionName(position) {
  const names = ["", "MoonYear", "AtomYear", "WaterYear", "WindYear", "FireYear", "EarthYear", "SunYear"]
  return names[position] || `Year ${position}`
}

function getDecade(year) {
  const decadeStart = Math.floor(year / 10) * 10
  return `${decadeStart}s`
}

function getSeptenniumCharacteristics(type) {
  const chars = {
    "Moon": "Study, research, preparation, learning, receptivity",
    "Atom": "Foundations, structure, basis, beginning of cycles, fundamentals",
    "Water": "Flow, development, growth, purification, adaptation",
    "Wind": "Movement, change, diffusion, collective action, communication",
    "Fire": "Energy, accomplishment, transformation, conclusion, intensity",
    "Earth": "Grounding, environment, community, planetary care, stability",
    "Sun": "Individual awareness, illumination, rest, celebration, clarity"
  }
  return chars[type]
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Septennium-API': '1.0',
      'X-Earth-Calendar-Year': (new Date().getFullYear() - 1969).toString(),
      'X-API-Domain': 'septennium.earthcal.hyperlinker.org'
    }
  })
}


