// septennial.js - Logica principale della Septennial Agenda TEC

var currentSeptenniumDate = new Date();
var saveTimeouts = {};

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

function updateCurrentSeptenniumDisplay() {
    var septenniumInfo = TEC.getSeptenniumInfo(currentSeptenniumDate);
    document.getElementById('currentSeptenniumDisplay').textContent = 
        septenniumInfo.ordinalSeptennium + ' Septennium, ' + 
        septenniumInfo.theme + ', ' + 
        septenniumInfo.rangeTEC;
}

// ===== CONTATORE CARATTERI =====
function updateCharCount(textarea) {
    var charCount = textarea.value.length;
    var footer = textarea.closest('.day-card').querySelector('.char-count');
    
    // Aggiorna contatore
    footer.textContent = charCount + '/5000 chars';
    
    // Avviso quando si avvicina al limite
    if (charCount >= 4900) {
        footer.style.color = '#c00';
        footer.style.fontWeight = 'bold';
    } else {
        footer.style.color = '';
        footer.style.fontWeight = '';
    }
}

// ===== GENERA GRIGLIA ANNI =====
function generateYearGrid(date) {
    date = date || new Date();
    var yearGrid = document.getElementById('yearGrid');
    
    // Pulisci timeout
    if (septennialDB && septennialDB.clearAllTimeouts) {
        septennialDB.clearAllTimeouts();
    }
    for (var key in saveTimeouts) {
        clearTimeout(saveTimeouts[key]);
    }
    saveTimeouts = {};
    
    yearGrid.innerHTML = '<div class="loader"><div class="loader-spinner"></div><p>Loading Septennium...</p></div>';
    
    var targetDate = new Date(date.getTime());
    var currentYearTEC = TEC.getYearTEC(new Date());
    
    if (!septennialDB || !septennialDB.isInitialized()) {
        setTimeout(function() { generateYearGrid(date); }, 500);
        return;
    }
    
    septennialDB.loadSeptennium(targetDate).then(function(septenniumData) {
        var septenniumInfo = TEC.getSeptenniumInfo(targetDate);
        var yearGridHTML = '<div class="week-row">';
        
        for (var i = 0; i < 7; i++) {
            var yearTEC = septenniumInfo.firstYearTEC + i;
            var yearKey = ('000' + yearTEC).slice(-3);
            var isCurrentYear = yearTEC === currentYearTEC;
            
            var yearData = septenniumData.years[yearKey] || {
                notes: '',
                charCount: 0,
                saved: true,
                yearName: TEC.getYearName(yearTEC)
            };
            
            var currentYearClass = isCurrentYear ? ' today' : '';
            
            yearGridHTML += 
                '<div class="day-card' + currentYearClass + '" ' +
                     'data-yearkey="' + yearKey + '">' +
                    '<div class="day-header">' +
                        '<div class="day-name">' + yearData.yearName + '</div>' +
                        '<div class="day-number">Year ' + yearTEC + '</div>' +
                    '</div>' +
                    '<div class="day-content">' +
                        '<textarea class="notes-textarea" maxlength="5000">' + 
                        (yearData.notes || '').replace(/</g, '&lt;').replace(/>/g, '&gt;') + 
                        '</textarea>' +
                    '</div>' +
                    '<div class="day-footer">' +
                        '<table><tr>' +
                            '<td class="char-count">' + (yearData.charCount || 0) + '/5000 chars</td>' +
                            '<td class="save-indicator' + (yearData.saved ? ' saved' : '') + '">' +
                                (yearData.saved ? 'Saved' : 'Unsaved') +
                            '</td>' +
                        '</tr></table>' +
                    '</div>' +
                '</div>';
        }
        
        yearGridHTML += '</div>';
        yearGrid.innerHTML = yearGridHTML;
        
        setupTextareaListeners();
        
    }).catch(function(error) {
        console.error('Errore:', error);
        yearGrid.innerHTML = 
            '<div class="loader">' +
                '<h3>Errore caricamento</h3>' +
                '<p>' + (error.message || 'Unknown error') + '</p>' +
                '<button onclick="loadCurrentSeptennium()">Riprova</button>' +
            '</div>';
    });
}

// ===== LISTENER TEXTAREA =====
function setupTextareaListeners() {
    var textareas = document.querySelectorAll('.notes-textarea');
    
    for (var i = 0; i < textareas.length; i++) {
        (function(textarea) {
            var yearKey = textarea.closest('.day-card').getAttribute('data-yearkey');
            
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
                if (saveTimeouts[yearKey]) {
                    clearTimeout(saveTimeouts[yearKey]);
                }
                
                // Imposta nuovo timeout
                var currentValue = this.value;
                
                saveTimeouts[yearKey] = setTimeout(function() {
                    delete saveTimeouts[yearKey];
                    
                    if (septennialDB && septennialDB.isInitialized()) {
                        septennialDB.saveYearNotes(yearKey, currentValue)
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

// ===== NAVIGAZIONE SETTENNI =====
function loadPreviousSeptennium() {
    currentSeptenniumDate = TEC.getPreviousSeptennium(currentSeptenniumDate);
    generateYearGrid(currentSeptenniumDate);
    updateCurrentSeptenniumDisplay();
    showStatus('Previous septennium loaded');
}

function loadNextSeptennium() {
    currentSeptenniumDate = TEC.getNextSeptennium(currentSeptenniumDate);
    generateYearGrid(currentSeptenniumDate);
    updateCurrentSeptenniumDisplay();
    showStatus('Next septennium loaded');
}

function loadCurrentSeptennium() {
    currentSeptenniumDate = new Date();
    generateYearGrid(currentSeptenniumDate);
    updateCurrentSeptenniumDisplay();
    showStatus('Current septennium loaded');
}

// ===== SALVA TUTTO =====
function saveAllChanges() {
    showStatus('Saving all changes...');
    
    if (!septennialDB || !septennialDB.isInitialized()) {
        showStatus('Database not ready');
        return;
    }
    
    var textareas = document.querySelectorAll('.notes-textarea');
    var savePromises = [];
    
    for (var i = 0; i < textareas.length; i++) {
        (function(textarea) {
            var yearKey = textarea.closest('.day-card').getAttribute('data-yearkey');
            var notes = textarea.value;
            var saveIndicator = textarea.closest('.day-card').querySelector('.save-indicator');
            
            // Salva solo se cambiato
            if (saveIndicator.textContent === 'Unsaved') {
                var promise = septennialDB.saveYearNotes(yearKey, notes)
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
        showStatus(savedCount + ' year notes saved');
    });
}

// ===== INIZIALIZZAZIONE =====
function initSeptennial() {
    updateCurrentSeptenniumDisplay();
    
    // Attendi DB
    function waitForDB() {
        if (septennialDB && septennialDB.isInitialized()) {
            loadCurrentSeptennium();
            
            // Setup event listeners
            document.getElementById('currentSeptennium').onclick = loadCurrentSeptennium;
            document.getElementById('prevSeptennium').onclick = loadPreviousSeptennium;
            document.getElementById('nextSeptennium').onclick = loadNextSeptennium;
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
    document.addEventListener('DOMContentLoaded', initSeptennial);
} else {
    initSeptennial();
}

// Esponi globalmente
window.loadCurrentSeptennium = loadCurrentSeptennium;
window.loadPreviousSeptennium = loadPreviousSeptennium;
window.loadNextSeptennium = loadNextSeptennium;
