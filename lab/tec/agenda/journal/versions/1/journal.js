// journal.js - Logica per il diario TEC (Database separato)

class JournalManager {
    constructor() {
        this.textarea = document.getElementById('journalTextarea');
        this.charCountEl = document.getElementById('charCount');
        this.lastSavedEl = document.getElementById('lastSaved');
        this.currentDateEl = document.getElementById('currentDateDisplay');
        
        this.saveTimeout = null;
        this.DEBOUNCE_DELAY = 3000; // 3 secondi per salvataggio automatico
        
        this.currentJournal = null;
        this.isModified = false;
        this.isTodayHeaderAdded = false;
        
        this.init();
    }
    
    async init() {
        // Aggiorna la data corrente
        this.updateCurrentDate();
        
        // Aspetta che il database sia inizializzato
        await this.waitForDB();
        
        // Carica il diario
        await this.loadJournal();
        
        // Aggiungi event listeners
        this.addEventListeners();
        
        // Auto-salvataggio periodico ogni 30 secondi se modificato
        setInterval(() => {
            if (this.isModified && this.currentJournal) {
                this.saveJournal();
            }
        }, 30000);
        
        console.log('Journal Manager inizializzato');
    }
    
    async waitForDB() {
        return new Promise((resolve) => {
            const checkDB = () => {
                if (journalDB && journalDB.isInitialized()) {
                    resolve();
                } else {
                    console.log('In attesa del Journal DB...');
                    setTimeout(checkDB, 500);
                }
            };
            checkDB();
        });
    }
    
    updateCurrentDate() {
        const currentDate = TEC.getFormattedDate();
        this.currentDateEl.textContent = "Today is " + currentDate.formatted;
    }
    
    async loadJournal() {
        try {
            if (!journalDB || !journalDB.isInitialized()) {
                throw new Error('Journal DB non pronto');
            }
            
            this.currentJournal = await journalDB.loadJournal();
            
            // Imposta il contenuto nel textarea
            this.textarea.value = this.currentJournal.content;
            
            // Aggiorna statistiche
            this.updateStats();
            
            // Verifica se aggiungere l'header di oggi
            this.checkAndAddTodayHeader();
            
            // Metti il focus alla fine del testo
            this.textarea.focus();
            this.textarea.setSelectionRange(this.textarea.value.length, this.textarea.value.length);
            
            this.showStatus('Journal loaded', 1500);
            
        } catch (error) {
            console.error('Errore caricamento diario:', error);
            
            // Fallback a localStorage
            const fallback = localStorage.getItem('tec_journal_fallback');
            if (fallback) {
                this.textarea.value = fallback;
                this.updateStats();
                this.showStatus('Loaded from local storage (DB error)', 3000);
            } else {
                this.showStatus('Error loading journal', 3000);
            }
        }
    }
    
    checkAndAddTodayHeader() {
        if (this.isTodayHeaderAdded) return;
        
        const today = new Date();
        const tecDate = TEC.getFormattedDate();
        const content = this.textarea.value;
        
        // Formato dell'header: "7 December 2025 - Sunday 7, Twelfth month, year 56, of the Moon"
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        const todayHeader = `\n\n${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()} - ${tecDate.formatted}\n`;
        
        // Se il diario è completamente vuoto
        if (!content.trim()) {
            this.textarea.value = todayHeader.trimStart();
            this.isModified = true;
            this.isTodayHeaderAdded = true;
            return;
        }
        
        // Controlla se l'ultima data nel diario è di oggi
        const lines = content.split('\n');
        const lastFewLines = lines.slice(-10).join('\n'); // Controlla ultime 10 righe
        
        // Cerca la data di oggi nell'ultima parte
        const hasToday = lastFewLines.includes(tecDate.formatted) || 
                        lastFewLines.includes(`${today.getDate()} ${monthNames[today.getMonth()]}`);
        
        if (!hasToday) {
            // Aggiungi nuova data
            this.textarea.value = content + todayHeader;
            this.isModified = true;
            this.isTodayHeaderAdded = true;
        }
    }
    
    addEventListeners() {
        // Input sul textarea
        this.textarea.addEventListener('input', () => {
            this.isModified = true;
            this.updateStats();
            this.debouncedSave();
        });
        
        // Pulsante Export
        document.getElementById('exportJournalBtn').addEventListener('click', () => {
            this.exportJournal();
        });
        
        // Pulsante Import
        document.getElementById('importJournalBtn').addEventListener('click', () => {
            this.importJournal();
        });
        
        // Salvataggio con Ctrl+S
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveJournal();
                this.showStatus('Journal saved manually', 1500);
            }
        });
        
        // Salva quando l'utente lascia la pagina
        window.addEventListener('beforeunload', (e) => {
            if (this.isModified) {
                this.saveJournal();
                // Non mostriamo il prompt di conferma, salviamo silenziosamente
            }
        });
    }
    
    updateStats() {
        const charCount = this.textarea.value.length;
        this.charCountEl.textContent = `${charCount.toLocaleString()} characters`;
        
        if (this.currentJournal && this.currentJournal.lastModified) {
            const lastSaved = new Date(this.currentJournal.lastModified);
            this.lastSavedEl.textContent = `Last saved: ${lastSaved.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        }
    }
    
    debouncedSave() {
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        
        this.saveTimeout = setTimeout(() => {
            this.saveJournal();
        }, this.DEBOUNCE_DELAY);
    }
    
    async saveJournal() {
        if (!this.isModified || !journalDB || !journalDB.isInitialized()) {
            return;
        }
        
        try {
            this.currentJournal.content = this.textarea.value;
            this.currentJournal.totalCharacters = this.textarea.value.length;
            
            await journalDB.saveJournal(this.currentJournal);
            
            this.isModified = false;
            this.updateStats();
            
            // Salva anche in localStorage come backup
            localStorage.setItem('tec_journal_fallback', this.textarea.value);
            
        } catch (error) {
            console.error('Errore salvataggio diario:', error);
            
            // Fallback a localStorage
            localStorage.setItem('tec_journal_fallback', this.textarea.value);
            this.showStatus('Saved to local storage (DB error)', 2000);
        }
    }
    
    async exportJournal() {
        try {
            if (!journalDB || !journalDB.isInitialized()) {
                this.showStatus('Journal database not ready', 2000);
                return;
            }
            
            // Salva prima di esportare
            await this.saveJournal();
            
            const jsonData = await journalDB.exportJournal();
            
            // Crea e scarica il file
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `earth-calendar-journal-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showStatus('Journal exported successfully', 2000);
            
        } catch (error) {
            console.error('Errore export:', error);
            this.showStatus('Export error: ' + (error.message || 'Unknown error'), 3000);
        }
    }
    
    async importJournal() {
        try {
            if (!journalDB || !journalDB.isInitialized()) {
                this.showStatus('Journal database not ready', 2000);
                return;
            }
            
            // Chiedi conferma
            if (!confirm('WARNING: This will replace your current journal. Continue?')) {
                return;
            }
            
            // Crea input file nascosto
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            
            input.onchange = async (event) => {
                const file = event.target.files[0];
                if (!file) return;
                
                const reader = new FileReader();
                
                reader.onload = async (e) => {
                    try {
                        const jsonData = e.target.result;
                        const result = await journalDB.importJournal(jsonData);
                        
                        // Ricarica il diario
                        await this.loadJournal();
                        
                        this.showStatus('Journal imported successfully', 2000);
                        
                    } catch (error) {
                        console.error('Errore import:', error);
                        this.showStatus('Import error: ' + error.message, 3000);
                    }
                };
                
                reader.readAsText(file);
            };
            
            input.click();
            
        } catch (error) {
            console.error('Errore import:', error);
            this.showStatus('Import error: ' + (error.message || 'Unknown error'), 3000);
        }
    }
    
    showStatus(message, duration = 3000) {
        const statusEl = document.getElementById('statusMessage');
        statusEl.textContent = message;
        statusEl.classList.add('show');
        
        setTimeout(() => {
            statusEl.classList.remove('show');
        }, duration);
    }
}

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.journalManager = new JournalManager();
    });
} else {
    window.journalManager = new JournalManager();
}