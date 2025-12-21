// Human Powers API - The Earth Calendar
// Clean, minimal version for powers.earthcal.hyperlinker.org
// Preserves original array with duplicates for future refinement

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname
  
  // Clean, minimal homepage
  if (path === '/' || path === '') {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5
    const analysis = analyzePowers()
    
    return new Response(`
<!DOCTYPE html>
<html>
<head>
  <title>Human Powers API - The Earth Calendar</title>
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
    .current-power {
      background: #f9f9f9;
      border: 1px solid #eaeaea;
      padding: 25px;
      margin: 25px 0;
      border-radius: 4px;
      font-size: 16px;
      text-align: center;
    }
    .power-text {
      font-size: 22px;
      font-weight: 500;
      color: #2c3e50;
      margin: 10px 0;
    }
    .weekend-notice {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
      text-align: center;
      font-size: 16px;
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
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin: 25px 0;
    }
    .stat-box {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      padding: 15px;
      border-radius: 4px;
      text-align: center;
    }
    .stat-value {
      font-size: 24px;
      font-weight: 500;
      color: #2c3e50;
    }
    .stat-label {
      font-size: 13px;
      color: #6c757d;
      margin-top: 5px;
    }
    .note-box {
      background: #e8f4f8;
      border: 1px solid #b8e2f0;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Human Powers API</h1>
    <div class="subtitle">The Earth Calendar • Daily Human Qualities Inspiration</div>
  </div>
  
  ${isWeekday ? `
  <div class="current-power">
    <div>Today's Human Power</div>
    <div class="power-text" id="currentPower">Loading...</div>
    <div style="font-size: 14px; color: #666; margin-top: 10px;">
      Available Moonday through Fireday • Refreshes daily at midnight UTC
    </div>
  </div>
  ` : `
  <div class="weekend-notice">
    <div style="font-size: 20px; margin-bottom: 10px;">🌅 Weekend Reflection</div>
    <div>Human Powers are available Moonday through Fireday only.</div>
    <div style="margin-top: 10px; font-size: 14px; color: #666;">
      Earthday and Sunday are for rest, environment care, and personal reflection.
    </div>
  </div>
  `}
  
  <div class="note-box">
    <strong>📝 Note on Array Composition:</strong><br>
    The powers array contains ${analysis.powers_without_empty} entries including ${analysis.duplicate_count} duplicates. 
    These duplicates are preserved for future refinement and represent emphasis on certain qualities.
    The system uses all ${analysis.powers_without_empty} entries exactly as in the original algorithm.
  </div>
  
  <div class="stats">
    <div class="stat-box">
      <div class="stat-value">${analysis.powers_without_empty}</div>
      <div class="stat-label">Array Entries</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${analysis.unique_powers}</div>
      <div class="stat-label">Unique Powers</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">5</div>
      <div class="stat-label">Days per Week</div>
    </div>
  </div>
  
  <p>This API provides daily human qualities (powers) for personal development, available Moonday through Fireday. Each power is uniquely assigned to a specific date using a deterministic algorithm.</p>
  
  <div class="system-info">
    <strong>Algorithm Specification:</strong><br>
    • Based on original <code>hp_random.js</code> algorithm<br>
    • Seed calculation: <code>seed = year × 10000 + month × 100 + day</code><br>
    • Index selection: <code>index = (seed % (pod.length - 1)) + 1</code><br>
    • Array contains ${analysis.powers_without_empty} entries (index 0 is empty)<br>
    • Available only on weekdays (Moonday-Fireday)<br>
    • Duplicates preserved for future refinement
  </div>
  
  <div class="endpoint-container">
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">📅</span>
        Today's Human Power
      </div>
      <div class="endpoint-path">GET /today</div>
      <div>Returns the human power for the current weekday. Returns weekend notice on Saturday/Sunday.</div>
      <ul class="example-list">
        <li><a href="/today" class="example-link">${url.origin}/today</a></li>
      </ul>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">🔢</span>
        Power for Specific Date
      </div>
      <div class="endpoint-path">GET /date/&lt;YYYY-MM-DD&gt;</div>
      <div>Get the human power for any specific date (past or future).</div>
      <ul class="example-list">
        <li><a href="/date/2025-12-04" class="example-link">${url.origin}/date/2025-12-04</a> (Today)</li>
        <li><a href="/date/2025-12-01" class="example-link">${url.origin}/date/2025-12-01</a> (Monday)</li>
        <li><a href="/date/2025-12-06" class="example-link">${url.origin}/date/2025-12-06</a> (Saturday - Weekend)</li>
        <li><a href="/date/2026-01-15" class="example-link">${url.origin}/date/2026-01-15</a> (Future date)</li>
      </ul>
      <div class="param-note">Replace &lt;YYYY-MM-DD&gt; with any valid Gregorian date</div>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">📋</span>
        All Human Powers
      </div>
      <div class="endpoint-path">GET /list</div>
      <div>Returns the complete list of all ${analysis.powers_without_empty} human powers in the system (with duplicates preserved).</div>
      <ul class="example-list">
        <li><a href="/list" class="example-link">${url.origin}/list</a> (Complete list)</li>
        <li><a href="/list?limit=20" class="example-link">${url.origin}/list?limit=20</a> (First 20 powers)</li>
        <li><a href="/list?search=joy" class="example-link">${url.origin}/list?search=joy</a> (Search for "joy")</li>
      </ul>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">🔍</span>
        Search Powers
      </div>
      <div class="endpoint-path">GET /search?q=&lt;query&gt;</div>
      <div>Search through all human powers by keyword.</div>
      <ul class="example-list">
        <li><a href="/search?q=joy" class="example-link">${url.origin}/search?q=joy</a></li>
        <li><a href="/search?q=peace" class="example-link">${url.origin}/search?q=peace</a></li>
        <li><a href="/search?q=wisdom" class="example-link">${url.origin}/search?q=wisdom</a></li>
      </ul>
      <div class="param-note">Replace &lt;query&gt; with search term (English only)</div>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">📊</span>
        Week Powers
      </div>
      <div class="endpoint-path">GET /week/&lt;YYYY-MM-DD&gt;</div>
      <div>Get all human powers for a specific week (Moonday-Fireday).</div>
      <ul class="example-list">
        <li><a href="/week/2025-12-01" class="example-link">${url.origin}/week/2025-12-01</a> (Week starting Dec 1)</li>
        <li><a href="/week/current" class="example-link">${url.origin}/week/current</a> (Current week)</li>
      </ul>
    </div>
    
    <div class="endpoint">
      <div class="endpoint-title">
        <span class="endpoint-icon">📈</span>
        Array Analysis
      </div>
      <div class="endpoint-path">GET /analysis</div>
      <div>Get detailed analysis of the powers array including duplicates and statistics.</div>
      <ul class="example-list">
        <li><a href="/analysis" class="example-link">${url.origin}/analysis</a></li>
      </ul>
    </div>
  </div>
  
  <div class="footer">
    <p><strong>Human Powers API</strong><br>
    Daily Human Qualities System • Version 1.0</p>
    <p style="margin-top: 10px;">
      <a href="https://earthcal.hyperlinker.org">Main Calendar</a> • 
      <a href="https://tec-date.earthcal.hyperlinker.org">Date API</a> • 
      <a href="https://septennium.earthcal.hyperlinker.org">Septennium API</a>
    </p>
    <p style="margin-top: 15px; font-size: 13px; color: #888;">
      Based on original hp_random.js algorithm • ${analysis.powers_without_empty} array entries (${analysis.unique_powers} unique)<br>
      Powers refresh daily at 00:00 UTC • Available Moonday-Fireday only • Duplicates preserved
    </p>
  </div>
  
  <script>
    // Load today's power if it's a weekday
    fetch('/today')
      .then(response => response.json())
      .then(data => {
        if (data.power) {
          document.getElementById('currentPower').textContent = data.power;
        }
      })
      .catch(() => {
        document.getElementById('currentPower').textContent = 'Human Powers system active';
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
    return getTodayPower()
  } else if (path.startsWith('/date/')) {
    const dateStr = path.split('/date/')[1]
    return getPowerForDate(dateStr)
  } else if (path === '/list') {
    return getAllPowers(new URL(request.url))
  } else if (path === '/search') {
    return searchPowers(new URL(request.url))
  } else if (path.startsWith('/week/')) {
    const dateStr = path.split('/week/')[1]
    return getWeekPowers(dateStr)
  } else if (path === '/analysis') {
    return getArrayAnalysis()
  } else {
    return jsonResponse({ 
      error: 'Endpoint not found', 
      available_endpoints: [
        '/today',
        '/date/<YYYY-MM-DD>',
        '/list',
        '/search?q=<query>',
        '/week/<YYYY-MM-DD|current>',
        '/analysis'
      ],
      documentation: url.origin
    }, 404)
  }
}

// ========== ORIGINAL POWERS ARRAY (EXACTLY AS PROVIDED) ==========
const pod = [
"0", "good humor", "virtuosity", "conscience", "robustness", "decisiveness", "imagination", "skill", "dexterity", "fidelity", "happiness", "compassion", "generosity", "altruism", "attentiveness", "vivacity", "consistency", "excellence", "perspicacity", "self-criticism", "splendor", "delicacy", "credibility", "promptness", "brilliance", "certainty", "planning", "prudence", "remembrance", "hospitality", "scrupulousness", "tirelessness", "mastery", "diplomacy", "intrepidity", "providence", "flexibility", "distinction", "honor", "independence", "expertise", "harmony", "lucidity", "verification", "amiability", "gratitude", "veracity", "meditation", "solicitude", "practicality", "direction", "musicality", "bliss", "cohesion", "completeness", "gentility", "fortitude", "cordiality", "nobility", "vigor", "harmony", "propriety", "humility", "frugality", "intuition", "reconciliation", "power", "virtue", "precision", "purity", "richness", "foresight", "exactness", "delight", "equanimity", "vitality", "wit", "gaiety", "self-discipline", "enthusiasm", "protection", "timeliness", "finesse", "synthesis", "joy", "inventiveness", "simplicity", "initiative", "forgiveness", "prudence", "discernment", "forethought", "concord", "magnanimity", "observation", "receptivity", "variety", "kindness", "quietude", "intelligence", "breadth", "playfulness", "mercy", "placidity", "rhythm", "zeal", "versatility", "sociability", "tolerance", "calmness", "acceptance", "resolve", "interest", "incisiveness", "reflection", "dignity", "charisma", "efficacy", "justness", "moderation", "greatness", "acumen", "rapidity", "authority", "sincerity", "vastness", "balance", "utility", "concentration", "logic", "temperance", "thrift", "accuracy", "diligence", "contemplation", "order", "freshness", "respect", "goodwill", "industry", "good-nature", "agility", "concord", "beauty", "composure", "inspiration", "elevation", "decorum", "deliberation", "discretion", "amendment", "benevolence", "integrity", "reason", "prosperity", "desire", "clarity", "courtesy", "poetry", "esteem", "approval", "conclusiveness", "radiance", "civility", "steadfastness", "catharsis", "meticulousness", "justice", "completeness", "responsibility", "sobriety", "fraternity", "preparation", "affability", "frankness", "entirety", "expressiveness", "charity", "philanthropy", "rectitude", "humor", "soundness", "objectivity", "honesty", "peacefulness", "cooperation", "impartiality", "fecundity", "modesty", "clemency", "coherence", "maturity", "significance", "readiness", "boldness", "love", "judgment", "loving-kindness", "authenticity", "humanity", "unity", "self-abnegation", "gratitude", "influence", "joviality", "assiduity", "moderation", "solidarity", "security", "freedom", "significance", "validity", "industriousness", "adaptability", "resistance", "refinement", "diligence", "respectability", "tenacity", "wisdom", "meekness", "benevolence", "imperturbability", "evaluation", "munificence", "conciseness", "determination", "conscientiousness", "long-suffering", "eloquence", "analysis", "learning", "genius", "value", "heroism", "tact", "positivity", "sagacity", "understanding", "universality", "silence", "wonder", "perfection", "self-esteem", "piety", "trust", "sweetness", "goodness", "tirelessness", "naturalness", "ingenuity", "union", "immensity", "deduction", "punctuality", "knowledge", "optimism", "awareness", "equity", "caution", "consideration", "discretion", "goodness", "contentment", "evolution", "power", "grace", "judgment", "creativity", "magnificence", "indulgence", "pleasantness", "mysticism", "tranquility", "irreproachability", "peace", "originality", "mediation", "perseverance", "synchronicity", "personality", "sensitivity", "courage", "sacredness", "common sense", "reasonableness", "sympathy", "cheerfulness", "patience", "timing", "ardor", "well-being", "reasoning", "elegance", "fulfillment", "importance", "clarity", "spontaneity", "energy", "conspicuousness", "sweetness", "competence", "animation", "will", "vigilance", "gracefulness", "devotion", "reliability", "excellence", "constancy", "liberality", "loyalty", "speed", "friendship", "revival", "regularity", "renewal", "good taste", "solidity", "candor", "seriousness", "politeness", "serenity", "stability", "care", "tact"
];

// ========== HELPER FUNCTIONS ==========

// Analyze the powers array (preserving duplicates)
function analyzePowers() {
  const powerList = pod.slice(1); // Remove initial "0"
  
  // Count occurrences
  const counts = {};
  const duplicates = [];
  
  powerList.forEach(power => {
    counts[power] = (counts[power] || 0) + 1;
  });
  
  // Find duplicates
  for (const [power, count] of Object.entries(counts)) {
    if (count > 1) {
      duplicates.push({ power, count });
    }
  }
  
  return {
    total_elements_in_array: pod.length,
    empty_element: pod[0] === "0" ? 1 : 0,
    powers_without_empty: powerList.length,
    unique_powers: Object.keys(counts).length,
    duplicate_count: duplicates.length,
    duplicates: duplicates.sort((a, b) => b.count - a.count)
  };
}

// Original algorithm from hp_random.js (preserved exactly)
function calculatePowerForDate(date = new Date()) {
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Moonday, ..., 6 = Earthday
  
  // Check if it's a weekday (Moonday to Fireday)
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Create seed based on date (year-month-day)
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // +1 because months start from 0
    const day = date.getDate();
    
    // Combine year, month and day into a unique number for today
    const seed = year * 10000 + month * 100 + day; // e.g.: 20251130
    
    // Use seed to generate a "random" but consistent index for today
    // The modulo (pod.length - 1) ensures the index is valid for the array
    const index = (seed % (pod.length - 1)) + 1;
    
    return {
      power: pod[index],
      index: index,
      total_powers: pod.length - 1
    };
  }
  
  return null; // Weekend or invalid
}

// ========== API ENDPOINT FUNCTIONS ==========

// Endpoint: Today's human power
function getTodayPower() {
  const today = new Date()
  const result = calculatePowerForDate(today)
  const dayOfWeek = today.getDay()
  
  if (result) {
    return jsonResponse({
      date: today.toISOString().split('T')[0],
      day_of_week: getDayName(dayOfWeek),
      is_weekday: true,
      power: result.power,
      index: result.index,
      algorithm: {
        seed: today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate(),
        formula: "seed = year × 10000 + month × 100 + day",
        selection: "index = (seed % (pod.length - 1)) + 1"
      },
      system: {
        total_array_entries: result.total_powers + 1, // +1 for the initial "0"
        entries_used: result.total_powers,
        available_days: "Moonday through Fireday"
      }
    })
  } else {
    return jsonResponse({
      date: today.toISOString().split('T')[0],
      day_of_week: getDayName(dayOfWeek),
      is_weekday: false,
      message: "Human Powers are available Moonday through Fireday only",
      weekend_note: "Earthday and Sunday are for rest, environment care, and personal reflection",
      next_power: getNextWeekdayDate(today)
    })
  }
}

// Endpoint: Power for specific date
function getPowerForDate(dateStr) {
  try {
    const date = new Date(dateStr + 'T12:00:00Z')
    if (isNaN(date.getTime())) {
      return jsonResponse({ 
        error: 'Invalid date format', 
        correct_format: 'YYYY-MM-DD',
        example: '/date/2025-12-04'
      }, 400)
    }
    
    const result = calculatePowerForDate(date)
    const dayOfWeek = date.getDay()
    
    if (result) {
      return jsonResponse({
        date: date.toISOString().split('T')[0],
        day_of_week: getDayName(dayOfWeek),
        is_weekday: true,
        power: result.power,
        index: result.index,
        total_entries: result.total_powers,
        algorithm_parameters: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          seed: date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate(),
          calculated_index: result.index
        }
      })
    } else {
      return jsonResponse({
        date: date.toISOString().split('T')[0],
        day_of_week: getDayName(dayOfWeek),
        is_weekday: false,
        message: "Human Powers are available Moonday through Fireday only",
        next_weekday: getNextWeekdayDate(date)
      })
    }
  } catch (e) {
    return jsonResponse({ 
      error: 'Date processing error',
      details: 'Please check the date format',
      example: '/date/2025-12-04'
    }, 400)
  }
}

// Endpoint: All powers list
function getAllPowers(url) {
  const params = url.searchParams
  const limit = params.get('limit') ? parseInt(params.get('limit')) : null
  const search = params.get('search') || ''
  
  let powerList = pod.slice(1) // Remove initial "0"
  
  // Apply search if provided
  if (search) {
    powerList = powerList.filter(power => 
      power.toLowerCase().includes(search.toLowerCase())
    )
  }
  
  // Apply limit if provided
  if (limit && limit > 0) {
    powerList = powerList.slice(0, limit)
  }
  
  return jsonResponse({
    powers: powerList.map((power, index) => ({
      original_index: pod.indexOf(power),
      power: power,
      occurrences: countOccurrences(power)
    })),
    metadata: {
      count: powerList.length,
      total_entries: pod.length - 1,
      search_applied: search || null,
      limit_applied: limit || null,
      note: "Array includes duplicates preserved for future refinement"
    }
  })
}

// Endpoint: Search powers
function searchPowers(url) {
  const params = url.searchParams
  const query = params.get('q')
  
  if (!query) {
    return jsonResponse({
      error: 'Missing search query',
      usage: 'Specify ?q=<search_term>',
      example: '/search?q=joy'
    }, 400)
  }
  
  const powerList = pod.slice(1)
  const results = powerList.filter(power => 
    power.toLowerCase().includes(query.toLowerCase())
  )
  
  return jsonResponse({
    search: {
      query: query,
      results_count: results.length,
      total_entries: powerList.length
    },
    results: results.map(power => ({
      original_index: pod.indexOf(power),
      power: power,
      occurrences: countOccurrences(power)
    })),
    suggestions: results.length === 0 ? getSimilarPowers(query, powerList) : []
  })
}

// Endpoint: Week powers
function getWeekPowers(dateStr) {
  try {
    let startDate
    if (dateStr === 'current') {
      startDate = new Date()
      // Go to Moonday of current week
      const day = startDate.getDay()
      const diff = startDate.getDate() - day + (day === 0 ? -6 : 1)
      startDate = new Date(startDate.setDate(diff))
    } else {
      startDate = new Date(dateStr + 'T12:00:00Z')
      if (isNaN(startDate.getTime())) {
        return jsonResponse({ 
          error: 'Invalid date format', 
          correct_format: 'YYYY-MM-DD or "current"',
          example: '/week/2025-12-01'
        }, 400)
      }
    }
    
    const weekPowers = []
    const currentDate = new Date(startDate)
    
    // Get Moonday to Fireday
    for (let i = 0; i < 5; i++) {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + i)
      
      const result = calculatePowerForDate(date)
      weekPowers.push({
        date: date.toISOString().split('T')[0],
        day_of_week: getDayName(date.getDay()),
        is_weekday: result !== null,
        power: result ? result.power : null,
        index: result ? result.index : null,
        occurrences: result ? countOccurrences(result.power) : null
      })
    }
    
    const weekStart = new Date(startDate)
    const weekEnd = new Date(startDate)
    weekEnd.setDate(weekEnd.getDate() + 4)
    
    return jsonResponse({
      week: {
        start: weekStart.toISOString().split('T')[0],
        end: weekEnd.toISOString().split('T')[0],
        days_count: 5,
        weekend_days: 2
      },
      powers: weekPowers,
      statistics: {
        powers_assigned: weekPowers.filter(p => p.power).length,
        unique_powers: new Set(weekPowers.filter(p => p.power).map(p => p.power)).size,
        duplicate_powers: weekPowers.filter(p => p.power && p.occurrences > 1).length
      }
    })
  } catch (e) {
    return jsonResponse({ 
      error: 'Week calculation error',
      details: e.message,
      example: '/week/2025-12-01'
    }, 400)
  }
}

// Endpoint: Array analysis
function getArrayAnalysis() {
  const analysis = analyzePowers()
  
  return jsonResponse({
    array_analysis: analysis,
    algorithm: {
      total_elements: pod.length,
      initial_element: pod[0],
      usable_elements: pod.length - 1,
      seed_formula: "seed = year × 10000 + month × 100 + day",
      index_formula: "index = (seed % (pod.length - 1)) + 1",
      note: "Index 0 is excluded from selection"
    },
    duplicates: {
      count: analysis.duplicate_count,
      list: analysis.duplicates,
      note: "Duplicates are preserved for future refinement and represent emphasis"
    },
    statistics: {
      entries_per_year: 5 * 52, // 5 days/week × 52 weeks
      unique_combinations: Math.pow(analysis.powers_without_empty, 5),
      days_until_repeat: Math.floor(analysis.powers_without_empty / 5)
    }
  })
}

// ========== UTILITY FUNCTIONS ==========

function getDayName(dayIndex) {
  const days = ["Sunday", "Moonday", "Atomday", "Waterday", "Winday", "Fireday", "Earthday"]
  return days[dayIndex]
}

function getNextWeekdayDate(date) {
  const nextDate = new Date(date)
  do {
    nextDate.setDate(nextDate.getDate() + 1)
  } while (nextDate.getDay() === 0 || nextDate.getDay() === 6)
  
  return {
    date: nextDate.toISOString().split('T')[0],
    day_of_week: getDayName(nextDate.getDay()),
    days_until: Math.ceil((nextDate - date) / (1000 * 60 * 60 * 24))
  }
}

function countOccurrences(power) {
  return pod.filter(p => p === power).length
}

function getSimilarPowers(query, powerList) {
  const queryWords = query.toLowerCase().split(' ')
  return powerList.filter(power => {
    const powerLower = power.toLowerCase()
    return queryWords.some(word => powerLower.includes(word))
  }).slice(0, 5)
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Human-Powers-API': '1.0',
      'X-API-Domain': 'powers.earthcal.hyperlinker.org',
      'X-Algorithm': 'hp_random.js original',
      'X-Array-Entries': (pod.length - 1).toString()
    }
  })
}
