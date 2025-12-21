// The Earth Calendar Date API
// Clean, minimal version for tec-date.earthcal.hyperlinker.org

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname
  
  // Clean, minimal homepage
  if (path === '/' || path === '') {
    const currentDate = new Date()
    const currentEarthYear = currentDate.getFullYear() - 1969
    const currentSeptennium = Math.floor(currentEarthYear / 7) + 1
    
    return new Response(`
<!DOCTYPE html>
<html>
<head>
  <title>The Earth Calendar Date API</title>
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
    .current-date {
      background: #f9f9f9;
      border: 1px solid #eaeaea;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
      font-size: 15px;
      font-family: 'Monaco', 'Consolas', monospace;
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
    .live-example {
      margin-top: 15px;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 4px;
      border: 1px dashed #ddd;
    }
    .json-preview {
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 12px;
      background: #f5f5f5;
      padding: 10px;
      border-radius: 3px;
      overflow-x: auto;
      white-space: pre;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>The Earth Calendar Date API</h1>
    <div class="subtitle">Complete date conversion and calculation system</div>
  </div>
  
  <div class="current-date" id="currentDate">
    Loading current Earth Calendar date...
  </div>
  
  <p>This API provides complete date conversion between traditional Gregorian calendar and The Earth Calendar system. All endpoints return structured JSON data.</p>
  
  <div class="system-info">
    <strong>Earth Calendar System Reference:</strong><br>
    • Year 0 = 1969 (First Moon landing and birth of the Internet)<br>
    • 7-year cycles (septennia) with types: Moon → Atom → Water → Wind → Fire → Earth → Sun<br>
    • 7-day week: Sunday, Moonday, Atomday, Waterday, Winday, Fireday, Earthday<br>
    • 12 months: First month through Twelfth month
  </div>
  
  <div class="endpoint-container">
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">📅</span>
        Current Date
      </div>
      <div class="endpoint-path">GET /today</div>
      <div>Returns complete Earth Calendar information for the current date.</div>
      <ul class="example-list">
        <li><a href="/today" class="example-link">${url.origin}/today</a></li>
      </ul>
      <div class="live-example">
        <strong>Live preview:</strong>
        <div class="json-preview" id="todayPreview">Click example to see JSON response</div>
      </div>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">🔄</span>
        Convert Date
      </div>
      <div class="endpoint-path">GET /convert/&lt;YYYY-MM-DD&gt;</div>
      <div>Convert any Gregorian date to Earth Calendar format.</div>
      <ul class="example-list">
        <li><a href="/convert/2025-12-04" class="example-link">${url.origin}/convert/2025-12-04</a> (Today)</li>
        <li><a href="/convert/1969-07-20" class="example-link">${url.origin}/convert/1969-07-20</a> (First Moon landing)</li>
        <li><a href="/convert/1969-09-02" class="example-link">${url.origin}/convert/1969-09-02</a> (Internet birth)</li>
        <li><a href="/convert/2000-01-01" class="example-link">${url.origin}/convert/2000-01-01</a> (New millennium)</li>
      </ul>
      <div class="param-note">Replace &lt;YYYY-MM-DD&gt; with any valid Gregorian date</div>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">📊</span>
        Year Information
      </div>
      <div class="endpoint-path">GET /year/&lt;earth_year&gt;</div>
      <div>Get detailed information about a specific Earth Calendar year.</div>
      <ul class="example-list">
        <li><a href="/year/56" class="example-link">${url.origin}/year/56</a> (Current: 2025)</li>
        <li><a href="/year/0" class="example-link">${url.origin}/year/0</a> (Year 0: 1969)</li>
        <li><a href="/year/48" class="example-link">${url.origin}/year/48</a> (Year 48: 2017)</li>
        <li><a href="/year/100" class="example-link">${url.origin}/year/100</a> (Year 100: 2069)</li>
      </ul>
      <div class="param-note">Replace &lt;earth_year&gt; with the Earth Calendar year number</div>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">⏳</span>
        Septennium Information
      </div>
      <div class="endpoint-path">GET /septennium/&lt;septennium_number&gt;</div>
      <div>Get information about a specific 7-year cycle (septennium).</div>
      <ul class="example-list">
        <li><a href="/septennium/9" class="example-link">${url.origin}/septennium/9</a> (Current: 2025-2031)</li>
        <li><a href="/septennium/1" class="example-link">${url.origin}/septennium/1</a> (First: 1969-1975)</li>
        <li><a href="/septennium/8" class="example-link">${url.origin}/septennium/8</a> (Previous: 2018-2024)</li>
        <li><a href="/septennium/10" class="example-link">${url.origin}/septennium/10</a> (Next: 2032-2038)</li>
      </ul>
      <div class="param-note">Replace &lt;septennium_number&gt; with the septennium number (starts from 1)</div>
    </div>
  </div>
  
  <div class="system-info">
    <strong>Algorithm Source:</strong><br>
    All calculations are based on the original <code>tec_date.js</code> algorithm with exact Earth Calendar specifications:<br>
    • Year calculation: <code>earth_year = traditional_year - 1969</code><br>
    • Septennium type: <code>type = ["Moon","Atom","Water","Wind","Fire","Earth","Sun"][(septennium-1) % 7]</code><br>
    • Year type: <code>year_name = ["of the Moon","of the Atom","of the Water","of the Wind","of the Fire","of the Earth","of the Sun"][earth_year % 7]</code>
  </div>
  
  <div class="footer">
    <p><strong>The Earth Calendar Date API</strong><br>
    Complete Date Conversion System • Version 1.0</p>
    <p style="margin-top: 10px;">
      <a href="https://earthcal.hyperlinker.org">Main Calendar</a> • 
      <a href="https://septennium.earthcal.hyperlinker.org">Septennium API</a> • 
      <a href="https://epoch.hyperlinker.org">Epoch System</a>
    </p>
    <p style="margin-top: 15px; font-size: 13px; color: #888;">
      API Domain: tec-date.earthcal.hyperlinker.org<br>
      All responses are in JSON format with CORS enabled for cross-origin requests.
    </p>
  </div>
  
  <script>
    // Load current date immediately
    fetch('/today')
      .then(response => response.json())
      .then(data => {
        document.getElementById('currentDate').textContent = data.full_string;
      })
      .catch(() => {
        document.getElementById('currentDate').textContent = 'Earth Calendar system active';
      });
    
    // Preview today's endpoint
    document.querySelector('a[href="/today"]').addEventListener('click', function(e) {
      e.preventDefault();
      fetch('/today')
        .then(response => response.json())
        .then(data => {
          document.getElementById('todayPreview').textContent = 
            JSON.stringify({full_string: data.full_string}, null, 2);
          window.location = this.href;
        });
    });
  </script>
</body>
</html>
`, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    })
  }
  
  // API endpoints handling
  if (path === '/today') {
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
      error: 'Endpoint not found', 
      available_endpoints: [
        '/today', 
        '/convert/<YYYY-MM-DD>', 
        '/year/<earth_year>', 
        '/septennium/<septennium_number>'
      ],
      documentation: url.origin
    }, 404)
  }
}

// ALGORITHM tec_date.js based
function calculateEarthDate(date = new Date()) {
  const oey = date.getFullYear()
  const ney = oey - 1969  // New Era Year
  const yos = ney % 7     // Position in Septennium (0-6)
  
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
  
  // Septennium calculation (7-year week)
  const septennium = Math.floor(ney / 7) + 1
  const yearInSeptennium = (ney % 7)
  const septenniumType = noy[(septennium - 1) % 7].replace('of the ', '')
  
  return {
    // Complete string format
    full_string: `${dow[date.getDay()]} ${date.getDate()}, ${moy[date.getMonth()]}, year ${ney}, ${noy[yos]}`,
    
    // Structured data
    traditional_date: date.toISOString().split('T')[0],
    earth_calendar: {
      year: ney,
      year_name: noy[yos],
      year_symbol: noy[yos].replace('of the ', ''),
      month: moy[date.getMonth()],
      month_number: date.getMonth() + 1,
      day: dow[date.getDay()],
      day_number: date.getDate(),
      day_of_week: date.getDay(),
      day_name: dow[date.getDay()]
    },
    septennium: {
      number: septennium,
      type: septenniumType,
      year_in_septennium: yearInSeptennium + 1,
      earth_years: {
        start: (septennium - 1) * 7,
        end: septennium * 7 - 1,
        range: `Years ${(septennium - 1) * 7}-${septennium * 7 - 1}`
      },
      traditional_years: {
        start: 1969 + (septennium - 1) * 7,
        end: 1969 + septennium * 7 - 1,
        range: `${1969 + (septennium - 1) * 7}-${1969 + septennium * 7 - 1}`,
        decade: getDecade(1969 + (septennium - 1) * 7)
      }
    }
  }
}

// Endpoint: Today's date
function getToday() {
  const result = calculateEarthDate()
  return jsonResponse(result)
}

// Endpoint: Convert specific date
function convertDate(dateStr) {
  try {
    const date = new Date(dateStr + 'T12:00:00Z')
    if (isNaN(date.getTime())) {
      return jsonResponse({ 
        error: 'Invalid date format', 
        correct_format: 'YYYY-MM-DD',
        example: '/convert/1969-07-20',
        note: 'Use ISO 8601 date format'
      }, 400)
    }
    
    const result = calculateEarthDate(date)
    
    // Add note for important historical dates
    if (dateStr === '1969-07-20') {
      result.historical_note = 'First human Moon landing - Apollo 11 mission'
      result.significance = 'Earth Calendar Year 0 defining event'
    } else if (dateStr === '1969-09-02') {
      result.historical_note = 'Birth of the Internet - First ARPANET node installed at UCLA'
      result.significance = 'Earth Calendar Year 0 defining event'
    }
    
    return jsonResponse(result)
  } catch (e) {
    return jsonResponse({ 
      error: 'Date conversion error',
      details: 'Please check the date format',
      example: '/convert/2025-12-04'
    }, 400)
  }
}

// Endpoint: Information about a specific year
function getYearInfo(yearStr) {
  const year = parseInt(yearStr)
  if (isNaN(year) || year < 0) {
    return jsonResponse({ 
      error: 'Invalid Earth Year',
      note: 'Earth Year must be a positive number (0 = 1969)',
      example: '/year/56',
      current_year: new Date().getFullYear() - 1969
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
      position_name: getPositionName((year % 7) + 1)
    },
    
    status: {
      is_current_year: year === currentYear,
      is_past: year < currentYear,
      is_future: year > currentYear,
      is_year_zero: year === 0,
      years_from_now: year - currentYear
    },
    
    notable_dates: year === 0 ? [
      { date: '1969-07-20', event: 'First Moon landing' },
      { date: '1969-09-02', event: 'Birth of the Internet' }
    ] : []
  })
}

// Endpoint: Information about a Septennium
function getSeptenniumInfo(septStr) {
  const sept = parseInt(septStr)
  if (isNaN(sept) || sept < 1) {
    return jsonResponse({ 
      error: 'Invalid Septennium Number',
      note: 'Septennia start from 1',
      current_septennium: Math.floor((new Date().getFullYear() - 1969) / 7) + 1,
      example: '/septennium/9'
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
      position_in_septennium: i + 1,
      position_name: getPositionName(i + 1)
    })
  }
  
  const currentEarthYear = new Date().getFullYear() - 1969
  const currentSeptennium = Math.floor(currentEarthYear / 7) + 1
  
  return jsonResponse({
    septennium: {
      number: sept,
      type: type,
      full_name: `Septennium of the ${type}`,
      current_septennium: sept === currentSeptennium,
      
      earth_years: {
        start: startEarthYear,
        end: endEarthYear,
        range: `Years ${startEarthYear}-${endEarthYear}`,
        count: 7
      },
      
      traditional_years: {
        start: 1969 + startEarthYear,
        end: 1969 + endEarthYear,
        range: `${1969 + startEarthYear}-${1969 + endEarthYear}`,
        decade: getDecade(1969 + startEarthYear),
        century: Math.ceil((1969 + startEarthYear) / 100)
      },
      
      characteristics: getSeptenniumCharacteristics(type),
      all_years: years
    }
  })
}

// Helper functions
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

// JSON Response Helper
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Earth-Calendar-API': '1.0',
      'X-API-Domain': 'tec-date.earthcal.hyperlinker.org',
      'X-Algorithm': 'tec_date.js original'
    }
  })
}
