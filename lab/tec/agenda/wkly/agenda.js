// agenda.js - Logica principale dell'agenda TEC
// VERSIONE CORRETTA: Gestione timeout e caratteri migliorata

var currentWeekDate = new Date();
var saveTimeouts = {}; // Gestione globale dei timeout

// ===== UTILITY =====
function showStatus(message, duration) {
    duration = duration || 3000;
    var statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.className = 'show';
    
    setTimeout(function() {
        statusEl.className = '';
    }, duration);
}

function updateCurrentDateDisplay() {
    var currentDate = TEC.getFormattedDate();
    document.getElementById('currentDateDisplay').textContent = 
        "Today is " + currentDate.formatted;
}

// ===== CONTATORE CARATTERI =====
function updateCharCount(textarea) {
    var charCount = textarea.value.length;
    var footer = textarea.closest('.day-card').querySelector('.char-count');
    
    // Aggiorna contatore
    footer.textContent = charCount + '/1000 chars';
    
    // Avviso quando si avvicina al limite
    if (charCount >= 990) {
        footer.style.color = '#c00';
        footer.style.fontWeight = 'bold';
    } else {
        footer.style.color = '';
        footer.style.fontWeight = '';
    }
}

// ===== GENERA GRIGLIA =====
function generateWeekGrid(date) {
    date = date || new Date();
    var weekGrid = document.getElementById('weekGrid');
    
    // Pulisci timeout
    earthCalendarDB.clearAllTimeouts();
    for (var key in saveTimeouts) {
        clearTimeout(saveTimeouts[key]);
    }
    saveTimeouts = {};
    
    weekGrid.innerHTML = '<div class="loader"><div class="loader-spinner"></div><p>Loading TEC week...</p></div>';
    
    var targetDate = new Date(date.getTime());
    var today = new Date();
    
    if (!earthCalendarDB || !earthCalendarDB.isInitialized()) {
        setTimeout(function() { generateWeekGrid(date); }, 500);
        return;
    }
    
    earthCalendarDB.loadWeek(targetDate).then(function(weekData) {
        var monday = TEC.getMondayOfWeek(targetDate);
        var weekGridHTML = '<div class="week-row">';
        
        for (var i = 0; i < 7; i++) {
            var currentDay = new Date(monday.getTime());
            currentDay.setDate(monday.getDate() + i);
            
            var tecDate = TEC.getFormattedDate(currentDay);
            var tecDateKey = TEC.getTECDateKey(currentDay);
            var isToday = currentDay.toDateString() === today.toDateString();
            var isWeekend = (i >= 5);
            
            var dayData = weekData.days[tecDateKey] || {
                notes: '',
                charCount: 0,
                saved: true
            };
            
            var todayClass = isToday ? ' today' : '';
            var weekendClass = isWeekend ? ' weekend' : '';
            
            weekGridHTML += 
                '<div class="day-card' + todayClass + weekendClass + '" ' +
                     'data-tecdate="' + tecDateKey + '">' +
                    '<div class="day-header">' +
                        '<div class="day-name">' + tecDate.dayName + '</div>' +
                        '<div class="day-number">' + tecDate.monthName + ', day ' + tecDate.dayNumber + '</div>' +
                    '</div>' +
                    '<div class="day-content">' +
                        '<textarea class="notes-textarea' + weekendClass + '" ' +
                                  'maxlength="1000">' + 
                                  (dayData.notes || '').replace(/</g, '&lt;').replace(/>/g, '&gt;') + 
                        '</textarea>' +
                    '</div>' +
                    '<div class="day-footer">' +
                        '<table><tr>' +
                            '<td class="char-count">' + (dayData.charCount || 0) + '/1000 chars</td>' +
                            '<td class="save-indicator' + (dayData.saved ? ' saved' : '') + '">' +
                                (dayData.saved ? 'Saved' : 'Unsaved') +
                            '</td>' +
                        '</tr></table>' +
                    '</div>' +
                '</div>';
        }
        
        weekGridHTML += '</div>';
        weekGrid.innerHTML = weekGridHTML;
        
        setupTextareaListeners();
        
    }).catch(function(error) {
        console.error('Errore:', error);
        weekGrid.innerHTML = 
            '<div class="loader">' +
                '<h3>Errore caricamento</h3>' +
                '<p>' + (error.message || 'Unknown error') + '</p>' +
                '<button onclick="loadCurrentWeek()">Riprova</button>' +
            '</div>';
    });
}

// ===== LISTENER (CORRETTI) =====
function setupTextareaListeners() {
    var textareas = document.querySelectorAll('.notes-textarea');
    
    for (var i = 0; i < textareas.length; i++) {
        (function(textarea) {
            var tecDateKey = textarea.closest('.day-card').getAttribute('data-tecdate');
            
            // Inizializza contatore
            updateCharCount(textarea);
            
            // Aggiorna stato salvato iniziale
            var saveIndicator = textarea.closest('.day-card').querySelector('.save-indicator');
            if (textarea.value === (textarea.defaultValue || '')) {
                saveIndicator.textContent = 'Saved';
                saveIndicator.className = 'save-indicator saved';
            }
            
            textarea.addEventListener('input', function() {
                updateCharCount(this);
                
                // Aggiorna stato
                saveIndicator.textContent = 'Unsaved';
                saveIndicator.className = 'save-indicator';
                
                // Cancella timeout precedente
                if (saveTimeouts[tecDateKey]) {
                    clearTimeout(saveTimeouts[tecDateKey]);
                }
                
                // Imposta nuovo timeout
                var currentValue = this.value;
                
                saveTimeouts[tecDateKey] = setTimeout(function() {
                    delete saveTimeouts[tecDateKey];
                    
                    if (earthCalendarDB && earthCalendarDB.isInitialized()) {
                        earthCalendarDB.saveDayNotes(tecDateKey, currentValue)
                            .then(function(saved) {
                                if (saved) {
                                    saveIndicator.textContent = 'Saved';
                                    saveIndicator.className = 'save-indicator saved';
                                }
                            })
                            .catch(function(err) {
                                console.error('Errore salvataggio:', err);
                            });
                    }
                }, 2000);
            });
        })(textareas[i]);
    }
}

// ===== NAVIGAZIONE =====
function loadPreviousWeek() {
    currentWeekDate.setDate(currentWeekDate.getDate() - 7);
    generateWeekGrid(currentWeekDate);
    updateCurrentDateDisplay();
    showStatus('Previous week loaded');
}

function loadNextWeek() {
    currentWeekDate.setDate(currentWeekDate.getDate() + 7);
    generateWeekGrid(currentWeekDate);
    updateCurrentDateDisplay();
    showStatus('Next week loaded');
}

function loadCurrentWeek() {
    currentWeekDate = new Date();
    generateWeekGrid(currentWeekDate);
    updateCurrentDateDisplay();
    showStatus('Current week loaded');
}

// ===== SALVA TUTTO =====
function saveAllChanges() {
    showStatus('Saving all changes...');
    
    if (!earthCalendarDB || !earthCalendarDB.isInitialized()) {
        showStatus('Database not ready');
        return;
    }
    
    var textareas = document.querySelectorAll('.notes-textarea');
    var savePromises = [];
    
    for (var i = 0; i < textareas.length; i++) {
        (function(textarea) {
            var tecDateKey = textarea.closest('.day-card').getAttribute('data-tecdate');
            var notes = textarea.value;
            var saveIndicator = textarea.closest('.day-card').querySelector('.save-indicator');
            
            // Salva solo se cambiato
            if (saveIndicator.textContent === 'Unsaved') {
                var promise = earthCalendarDB.saveDayNotes(tecDateKey, notes)
                    .then(function(saved) {
                        if (saved) {
                            saveIndicator.textContent = 'Saved';
                            saveIndicator.className = 'save-indicator saved';
                        }
                        return saved;
                    });
                savePromises.push(promise);
            }
        })(textareas[i]);
    }
    
    if (savePromises.length === 0) {
        showStatus('No changes to save');
        return;
    }
    
    Promise.all(savePromises).then(function(results) {
        var savedCount = 0;
        for (var j = 0; j < results.length; j++) {
            if (results[j]) savedCount++;
        }
        showStatus(savedCount + ' notes saved');
    });
}

// ===== INIZIALIZZAZIONE =====
function initAgenda() {
    updateCurrentDateDisplay();
    
    // Attendi DB
    function waitForDB() {
        if (earthCalendarDB && earthCalendarDB.isInitialized()) {
            loadCurrentWeek();
            
            // Setup event listeners
            document.getElementById('todayWeek').onclick = loadCurrentWeek;
            document.getElementById('prevWeek').onclick = loadPreviousWeek;
            document.getElementById('nextWeek').onclick = loadNextWeek;
            document.getElementById('saveAllLink').onclick = function(e) {
                e.preventDefault();
                saveAllChanges();
            };
        } else {
            setTimeout(waitForDB, 100);
        }
    }
    
    waitForDB();
}

// Avvia
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgenda);
} else {
    initAgenda();
}

// Esponi globalmente
window.loadCurrentWeek = loadCurrentWeek;
window.loadPreviousWeek = loadPreviousWeek;
window.loadNextWeek = loadNextWeek;