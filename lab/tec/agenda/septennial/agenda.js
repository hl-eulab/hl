// agenda.js - Logica principale dell'agenda TEC
// VERSIONE TEC: usa solo API TEC, niente duplicazioni

// ===== FUNZIONI DI VISUALIZZAZIONE =====

// Aggiorna data corrente nell'header
function updateCurrentDateDisplay() {
    const currentDate = TEC.getFormattedDate();
    document.getElementById('currentDateDisplay').textContent = 
        "Today is " + currentDate.formatted;
}

// Genera griglia settimana TEC
async function generateWeekGrid(date = new Date()) {
    const weekGrid = document.getElementById('weekGrid');
    
    // Mostra loader
    weekGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
            <div style="margin: 20px auto; width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #000; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p>Loading TEC week...</p>
        </div>
    `;
    
    const targetDate = new Date(date);
    const today = new Date();
    
    // Verifica database TEC
    if (!earthCalendarDB || !earthCalendarDB.isInitialized()) {
        throw new Error('Database TEC non inizializzato. Attendere.');
    }
    
    // Carica dati settimana TEC
    let weekData = null;
    try {
        weekData = await earthCalendarDB.loadWeek(targetDate);
        console.log('Dati settimana TEC caricati:', weekData.key);
    } catch (error) {
        console.error('Errore caricamento dati TEC:', error);
        
        // Fallback: crea in memoria
        try {
            const monday = TEC.getMondayOfWeek(targetDate);
            weekData = earthCalendarDB.createEmptyWeek(monday);
            console.log('Usando settimana TEC vuota in memoria');
        } catch (fallbackError) {
            throw new Error('Impossibile caricare dati TEC: ' + fallbackError.message);
        }
    }
    
    // Ottieni Moonday TEC
    const monday = TEC.getMondayOfWeek(targetDate);
    
    // Genera 7 giorni TEC
    let weekGridHTML = '';
    
    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);
        
        const tecDate = TEC.getDateForDay(currentDay);
        const tecDateKey = TEC.getTECDateKey(currentDay); // "DD-MM-YY"
        const isToday = currentDay.toDateString() === today.toDateString();
        const isWeekend = i >= 5; // Earthday (5) e Sunday (6) sono weekend
        
        const dayData = weekData.days[tecDateKey] || {
            notes: '',
            charCount: 0,
            saved: true
        };
        
        weekGridHTML += `
            <div class="day-card ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}" 
                 id="day${i + 1}" 
                 data-day="${tecDate.dayName.toLowerCase()}" 
                 data-tecdate="${tecDateKey}" 
                 data-weekkey="${weekData.key}">
                <div class="day-header">
                    <div class="day-name">${tecDate.dayName}</div>
                    <div class="day-number">${tecDate.monthName}, day ${tecDate.dayNumber}</div>
                </div>
                <div class="day-content">
                    <textarea class="notes-textarea ${isWeekend ? 'weekend' : ''} ${dayData.saved ? 'saved' : ''}" 
                              maxlength="1000">${dayData.notes}</textarea>
                </div>
                <div class="day-footer">
                    <div class="char-count">${dayData.charCount}/1000 chars</div>
                    <div class="save-indicator ${dayData.saved ? 'saved' : ''}">• ${dayData.saved ? 'Saved' : 'Unsaved'}</div>
                </div>
            </div>
        `;
    }
    
    weekGrid.innerHTML = weekGridHTML;
    
    // Aggiungi listener TEC
    addCharacterCountListeners();
    
    return weekData;
}

// Griglia con gestione errori
async function safeGenerateWeekGrid(date = new Date()) {
    try {
        const weekData = await generateWeekGrid(date);
        return { success: true, data: weekData };
    } catch (error) {
        console.error('Errore generazione griglia TEC:', error);
        
        const weekGrid = document.getElementById('weekGrid');
        if (weekGrid) {
            weekGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                    <h3>Unable to load TEC week data</h3>
                    <p>${error.message || 'Unknown error'}</p>
                    <button class="nav-btn" onclick="loadCurrentWeek()" style="margin-top: 20px;">
                        Load Current TEC Week
                    </button>
                </div>
            `;
        }
        
        showStatus('Error loading TEC data. Click "Current Week" to reload.', 5000);
        return { success: false, error: error };
    }
}

// ===== GESTIONE INPUT =====

// Aggiungi listener per conteggio caratteri
function addCharacterCountListeners() {
    const textareas = document.querySelectorAll('.notes-textarea');
    
    textareas.forEach(textarea => {
        updateCharCount(textarea);
        
        textarea.addEventListener('input', function() {
            updateCharCount(this);
            
            const tecDate = this.closest('.day-card').dataset.tecdate;
            const notes = this.value;
            
            if (earthCalendarDB && earthCalendarDB.isInitialized()) {
                earthCalendarDB.saveDayNotes(tecDate, notes).then((saved) => {
                    if (saved) {
                        updateSaveIndicator(this, true);
                        showStatus('Notes saved automatically', 1500);
                    }
                });
            } else {
                updateSaveIndicator(this, false);
                showStatus('TEC Database not ready. Changes not saved.', 2000);
            }
        });
        
        textarea.addEventListener('focus', function() {
            this.parentElement.parentElement.style.borderColor = '#000000';
        });
        
        textarea.addEventListener('blur', function() {
            if (!this.classList.contains('saved')) {
                this.parentElement.parentElement.style.borderColor = '#e0e0e0';
            }
        });
    });
}

// Aggiorna conteggio caratteri
function updateCharCount(textarea) {
    const charCount = textarea.value.length;
    const footer = textarea.closest('.day-card').querySelector('.char-count');
    footer.textContent = `${charCount}/1000 chars`;
}

// Aggiorna indicatore salvataggio
function updateSaveIndicator(textarea, isSaved) {
    const saveIndicator = textarea.closest('.day-card').querySelector('.save-indicator');
    if (isSaved) {
        saveIndicator.textContent = '• Saved';
        saveIndicator.classList.add('saved');
        textarea.classList.add('saved');
    } else {
        saveIndicator.textContent = '• Unsaved';
        saveIndicator.classList.remove('saved');
        textarea.classList.remove('saved');
    }
}

// ===== NAVIGAZIONE TEC =====

let currentWeekDate = new Date();

async function loadPreviousWeek() {
    const newDate = new Date(currentWeekDate);
    newDate.setDate(currentWeekDate.getDate() - 7);
    currentWeekDate = newDate;
    
    await safeGenerateWeekGrid(currentWeekDate);
    updateCurrentDateDisplay();
    showStatus('Previous TEC week loaded');
}

async function loadNextWeek() {
    const newDate = new Date(currentWeekDate);
    newDate.setDate(currentWeekDate.getDate() + 7);
    currentWeekDate = newDate;
    
    await safeGenerateWeekGrid(currentWeekDate);
    updateCurrentDateDisplay();
    showStatus('Next TEC week loaded');
}

async function loadCurrentWeek() {
    currentWeekDate = new Date();
    const result = await safeGenerateWeekGrid(currentWeekDate);
    if (result.success) {
        updateCurrentDateDisplay();
        showStatus('Current TEC week loaded');
    }
}

// ===== ESPORTAZIONE/IMPORTAZIONE =====

async function exportAllData() {
    try {
        if (!earthCalendarDB || !earthCalendarDB.isInitialized()) {
            showStatus('TEC Database not ready.');
            return;
        }
        
        const jsonData = await earthCalendarDB.exportAllData();
        
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tec-agenda-backup-${TEC.getTECDateKey()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showStatus('All TEC agenda data exported');
    } catch (error) {
        console.error('Errore export TEC:', error);
        showStatus('Error during export: ' + (error.message || 'Unknown error'));
    }
}

async function importAllData() {
    if (!earthCalendarDB || !earthCalendarDB.isInitialized()) {
        showStatus('TEC Database not ready.');
        return;
    }
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        if (!confirm('WARNING: This will replace ALL your TEC data. Continue?')) {
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            try {
                const jsonData = e.target.result;
                const result = await earthCalendarDB.importAllData(jsonData);
                showStatus(`TEC data imported! ${result.imported} weeks loaded.`);
                
                await loadCurrentWeek();
            } catch (error) {
                console.error('Errore import TEC:', error);
                showStatus('Error during import: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// ===== UTILITY =====

// Mostra messaggi di stato
function showStatus(message, duration = 3000) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.classList.add('show');
    
    setTimeout(() => {
        statusEl.classList.remove('show');
    }, duration);
}

// ===== INIZIALIZZAZIONE =====

function initAgenda() {
    updateCurrentDateDisplay();
    
    // Attendi database TEC
    const checkDBReady = () => {
        if (earthCalendarDB && earthCalendarDB.isInitialized()) {
            // Database TEC pronto
            loadCurrentWeek();
            
            // Event listener per navigazione
            document.getElementById('todayWeek').addEventListener('click', loadCurrentWeek);
            document.getElementById('prevWeek').addEventListener('click', loadPreviousWeek);
            document.getElementById('nextWeek').addEventListener('click', loadNextWeek);
            
            // Controlli
            document.getElementById('saveAllBtn').addEventListener('click', async () => {
                showStatus('Forcing TEC save...');
                
                if (!earthCalendarDB.isInitialized()) {
                    showStatus('TEC Database not ready');
                    return;
                }
                
                const textareas = document.querySelectorAll('.notes-textarea:not(.saved)');
                let savedCount = 0;
                
                for (const textarea of textareas) {
                    const tecDate = textarea.closest('.day-card').dataset.tecdate;
                    const notes = textarea.value;
                    
                    try {
                        await earthCalendarDB.saveDayNotes(tecDate, notes);
                        updateSaveIndicator(textarea, true);
                        savedCount++;
                    } catch (error) {
                        console.error('Errore salvataggio TEC:', error);
                    }
                }
                
                showStatus(`${savedCount} TEC notes saved`);
            });
            
            // Export/Import
            document.getElementById('exportAllBtn').addEventListener('click', exportAllData);
            document.getElementById('importAllBtn').addEventListener('click', importAllData);
            
        } else {
            setTimeout(checkDBReady, 500);
        }
    };
    
    checkDBReady();
    
    // Esponi globalmente
    window.showStatus = showStatus;
    window.updateSaveIndicator = updateSaveIndicator;
    window.loadCurrentWeek = loadCurrentWeek;
    window.loadPreviousWeek = loadPreviousWeek;
    window.loadNextWeek = loadNextWeek;
    window.exportAllData = exportAllData;
    window.importAllData = importAllData;
}

// Avvia quando DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgenda);
} else {
    initAgenda();
}
