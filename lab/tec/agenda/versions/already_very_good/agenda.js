// agenda.js - Logica principale dell'agenda TEC (AGGIORNATO)

// Funzione per ottenere il lunedì di una settimana data una data
function getMondayOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
}

// Funzione per aggiornare la data corrente nell'header
function updateCurrentDateDisplay() {
    const currentDate = TEC.getFormattedDate();
    document.getElementById('currentDateDisplay').textContent = 
        "Today is " + currentDate.formatted;
}

// Funzione per generare la griglia della settimana (CORRETTA)
async function generateWeekGrid(date = new Date()) {
    const weekGrid = document.getElementById('weekGrid');
    
    // Mostra loader durante il caricamento
    weekGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
            <div style="margin: 20px auto; width: 40px; height: 40px; border: 3px solid #f3f3f3; border-top: 3px solid #000; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p>Loading week...</p>
        </div>
    `;
    
    // USA LA DATA PASSATA COME PARAMETRO, non sempre oggi!
    const targetDate = new Date(date);
    const today = new Date();
    
    // Troviamo il Moonday (Lunedì) della settimana TARGET
    const monday = getMondayOfWeek(targetDate);
    
    // Verifica se il database è inizializzato
    if (!earthCalendarDB || !earthCalendarDB.isInitialized()) {
        throw new Error('Database non inizializzato. Attendere o ricaricare la pagina.');
    }
    
    // Carica dati dal database per la settimana TARGET
    let weekData = null;
    try {
        weekData = await earthCalendarDB.loadWeek(targetDate);
        console.log('Dati settimana caricati:', weekData.key, 'per data:', targetDate);
    } catch (error) {
        console.error('Errore caricamento dati:', error);
        
        // Se c'è un errore col database, prova a creare una settimana vuota in memoria
        try {
            const startDate = getMondayOfWeek(targetDate);
            const tecYear = startDate.getFullYear() - 1969;
            const weekKey = earthCalendarDB.getWeekKey(startDate);
            
            weekData = earthCalendarDB.createEmptyWeek(startDate, tecYear, parseInt(weekKey.split('-')[1]));
            console.log('Usando settimana vuota di fallback (in memoria) per:', startDate);
        } catch (fallbackError) {
            console.error('Errore anche nel fallback:', fallbackError);
            showStatus('Errore caricamento dati. Ricaricare la pagina.', 5000);
            throw error;
        }
    }
    
    // Generiamo i 7 giorni della settimana TARGET
    let weekGridHTML = '';
    
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(monday);
        currentDate.setDate(monday.getDate() + i);
        
        const tecDate = TEC.getDateForDay(currentDate);
        const isToday = currentDate.toDateString() === today.toDateString();
        const isWeekend = i >= 5; // Earthday (6) e Sunday (7) sono weekend
        
        const dateKey = currentDate.toISOString().split('T')[0];
        const dayData = weekData.days[dateKey] || {
            notes: '',
            charCount: 0,
            saved: true
        };
        
        weekGridHTML += `
            <div class="day-card ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}" 
                 id="day${i + 1}" 
                 data-day="${tecDate.dayName.toLowerCase()}" 
                 data-date="${dateKey}" 
                 data-weekkey="${weekData.key}">
                <div class="day-header">
                    <div class="day-name">${tecDate.dayName}</div>
                    <div class="day-number">${tecDate.monthName}, day ${tecDate.dayNumber}${isToday ? ' • Today' : ''}</div>
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
    
    // Aggiungi event listener per il conteggio caratteri
    addCharacterCountListeners();
    
    return weekData;
}

// Funzione safe per generare la griglia con gestione errori
async function safeGenerateWeekGrid(date = new Date()) {
    try {
        const weekData = await generateWeekGrid(date);
        return { success: true, data: weekData };
    } catch (error) {
        console.error('Errore generazione griglia:', error);
        
        // Mostra messaggio d'errore nella griglia
        const weekGrid = document.getElementById('weekGrid');
        if (weekGrid) {
            weekGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                    <h3>Unable to load week data</h3>
                    <p>${error.message || 'Unknown error'}</p>
                    <button class="nav-btn" onclick="loadCurrentWeek()" style="margin-top: 20px;">
                        Load Current Week
                    </button>
                </div>
            `;
        }
        
        showStatus('Error loading data. Click "Current Week" to reload.', 5000);
        return { success: false, error: error };
    }
}

// Funzione per aggiungere listener al conteggio caratteri
function addCharacterCountListeners() {
    const textareas = document.querySelectorAll('.notes-textarea');
    
    textareas.forEach(textarea => {
        // Aggiorna il conteggio iniziale
        updateCharCount(textarea);
        
        // Aggiungi listener per input
        textarea.addEventListener('input', function() {
            updateCharCount(this);
            
            // Salva automaticamente dopo 2 secondi
            const date = this.closest('.day-card').dataset.date;
            const notes = this.value;
            
            // Verifica che il database sia pronto
            if (earthCalendarDB && earthCalendarDB.isInitialized()) {
                earthCalendarDB.saveDayNotes(date, notes).then((saved) => {
                    if (saved) {
                        updateSaveIndicator(this, true);
                        showStatus('Notes saved automatically', 1500);
                    }
                });
            } else {
                // Database non pronto, mostra avviso
                updateSaveIndicator(this, false);
                showStatus('Database not ready. Changes not saved.', 2000);
            }
        });
        
        // Aggiungi listener per focus/blur
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

// Funzione per aggiornare il conteggio caratteri
function updateCharCount(textarea) {
    const charCount = textarea.value.length;
    const footer = textarea.closest('.day-card').querySelector('.char-count');
    footer.textContent = `${charCount}/1000 chars`;
}

// Funzione per aggiornare l'indicatore di salvataggio
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

// Funzione per mostrare messaggi di estado
function showStatus(message, duration = 3000) {
    const statusEl = document.getElementById('statusMessage');
    statusEl.textContent = message;
    statusEl.classList.add('show');
    
    setTimeout(() => {
        statusEl.classList.remove('show');
    }, duration);
}

// Navigazione tra settimane
let currentWeekDate = new Date();

async function loadPreviousWeek() {
    // Crea una nuova data (immutabile)
    const newDate = new Date(currentWeekDate);
    newDate.setDate(currentWeekDate.getDate() - 7);
    currentWeekDate = newDate;
    
    await safeGenerateWeekGrid(currentWeekDate);
    updateCurrentDateDisplay();
    showStatus('Previous week loaded');
}

async function loadNextWeek() {
    // Crea una nuova data (immutabile)
    const newDate = new Date(currentWeekDate);
    newDate.setDate(currentWeekDate.getDate() + 7);
    currentWeekDate = newDate;
    
    await safeGenerateWeekGrid(currentWeekDate);
    updateCurrentDateDisplay();
    showStatus('Next week loaded');
}

async function loadCurrentWeek() {
    currentWeekDate = new Date();
    const result = await safeGenerateWeekGrid(currentWeekDate);
    if (result.success) {
        updateCurrentDateDisplay();
        showStatus('Current week loaded');
    }
}

// Funzioni export/import
async function exportAllData() {
    try {
        // Verifica che il database sia inizializzato
        if (!earthCalendarDB || !earthCalendarDB.isInitialized()) {
            showStatus('Database not ready. Please wait.');
            return;
        }
        
        const jsonData = await earthCalendarDB.exportAllData();
        
        // Crea blob e scarica
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `earth-calendar-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showStatus('All agenda data exported successfully');
    } catch (error) {
        console.error('Errore export:', error);
        showStatus('Error during export: ' + (error.message || 'Unknown error'));
    }
}

async function importAllData() {
    // Verifica che il database sia inizializzato
    if (!earthCalendarDB || !earthCalendarDB.isInitialized()) {
        showStatus('Database not ready. Please wait.');
        return;
    }
    
    // Creiamo un input file nascosto
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        // Chiedi conferma (sostituirà tutti i dati!)
        if (!confirm('WARNING: This will replace ALL your existing data. Continue?')) {
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            try {
                const jsonData = e.target.result;
                const result = await earthCalendarDB.importAllData(jsonData);
                showStatus(`All agenda data imported successfully! ${result.imported} weeks loaded.`);
                
                // Ricarica la settimana corrente
                await loadCurrentWeek();
            } catch (error) {
                console.error('Errore import:', error);
                showStatus('Error during import: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Inizializzazione
function initAgenda() {
    updateCurrentDateDisplay();
    
    // Aspetta che il database sia inizializzato PRIMA di generare la griglia
    const checkDBReady = () => {
        if (earthCalendarDB && earthCalendarDB.isInitialized()) {
            // Database pronto, carica la settimana corrente
            loadCurrentWeek();
            
            // Aggiungi event listeners per i bottoni di navigazione
            document.getElementById('todayWeek').addEventListener('click', loadCurrentWeek);
            document.getElementById('prevWeek').addEventListener('click', loadPreviousWeek);
            document.getElementById('nextWeek').addEventListener('click', loadNextWeek);
            
            // Bottoni di controllo
            document.getElementById('saveAllBtn').addEventListener('click', async () => {
                showStatus('Forcing save...');
                
                // Verifica che il database sia pronto
                if (!earthCalendarDB.isInitialized()) {
                    showStatus('Database not ready');
                    return;
                }
                
                // Forza salvataggio di tutte le textarea modificate
                const textareas = document.querySelectorAll('.notes-textarea:not(.saved)');
                let savedCount = 0;
                
                for (const textarea of textareas) {
                    const date = textarea.closest('.day-card').dataset.date;
                    const notes = textarea.value;
                    
                    try {
                        await earthCalendarDB.saveDayNotes(date, notes);
                        updateSaveIndicator(textarea, true);
                        savedCount++;
                    } catch (error) {
                        console.error('Errore salvataggio:', error);
                    }
                }
                
                showStatus(`${savedCount} notes saved successfully`);
            });
            
            // CAMBIATI GLI ID QUI:
            document.getElementById('exportAllBtn').addEventListener('click', exportAllData);
            document.getElementById('importAllBtn').addEventListener('click', importAllData);
            
        } else {
            // Database non ancora pronto, riprova dopo 500ms
            console.log('Waiting for database initialization...');
            setTimeout(checkDBReady, 500);
        }
    };
    
    // Avvia il check
    checkDBReady();
    
    // Esponi le funzioni globalmente
    window.showStatus = showStatus;
    window.updateSaveIndicator = updateSaveIndicator;
    window.loadCurrentWeek = loadCurrentWeek;
    window.loadPreviousWeek = loadPreviousWeek;
    window.loadNextWeek = loadNextWeek;
    window.exportAllData = exportAllData;
    window.importAllData = importAllData;
}

// Attendi che il DOM sia completamente caricato
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAgenda);
} else {
    initAgenda();
}
