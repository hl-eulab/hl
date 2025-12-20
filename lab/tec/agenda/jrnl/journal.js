// journal.js - Logica per il diario TEC
// VERSIONE COMPLETA: layout identico all'agenda settimanale

var journalManager = {
    textarea: null,
    charCountEl: null,
    saveIndicatorEl: null,
    
    saveTimeout: null,
    DEBOUNCE_DELAY: 3000,
    
    currentJournal: null,
    isModified: false,
    isTodayHeaderAdded: false,
    
    // ===== INIZIALIZZAZIONE =====
    init: function() {
        console.log('INIZIO init() - Journal Manager');
        
        var self = this;
        
        this.textarea = document.getElementById('journalTextarea');
        
        // MODIFICATO: Cerchiamo nel journal-card
        var journalCard = this.textarea ? this.textarea.parentNode : null;
        
        if (journalCard) {
            var statsContainer = journalCard.querySelector('.journal-stats');
            if (statsContainer) {
                this.charCountEl = statsContainer.querySelector('.char-count');
                this.saveIndicatorEl = statsContainer.querySelector('.save-indicator');
            }
        }
        
        if (!this.textarea) {
            console.error('Elemento journalTextarea non trovato!');
            return;
        }
        
        // Aggiorna data TEC
        this.updateCompactDate();
        
        // Aspetta DB
        this.waitForDB().then(function() {
            console.log('DB pronto per Journal');
            return self.loadJournal();
        }).then(function() {
            self.addEventListeners();
            
            // Auto-salvataggio ogni 30 secondi
            setInterval(function() {
                if (self.isModified && self.currentJournal) {
                    self.saveJournal();
                }
            }, 30000);
            
            console.log('Journal Manager inizializzato');
            
        }).catch(function(error) {
            console.error('Errore inizializzazione Journal Manager:', error);
            self.showStatus('Error initializing journal', 5000);
        });
    },
    
    // ===== DATA TEC COMPATTA =====
    updateCompactDate: function() {
        var currentDate = TEC.getFormattedDate();
        var dateEl = document.getElementById('tecDateCompact');
        
        if (dateEl) {
            var dayNum = ('0' + currentDate.date.getDate()).slice(-2);
            var monthNum = ('0' + (currentDate.date.getMonth() + 1)).slice(-2);
            var year = currentDate.year;
            
            dateEl.innerHTML = 
                '<span class="tec-day">' + currentDate.dayName + '</span>' +
                '<span class="tec-date-numbers"> ' + dayNum + '/' + monthNum + '/' + year + '</span>';
        }
    },
    
    // ===== ATTESA DB =====
    waitForDB: function() {
        var self = this;
        return new Promise(function(resolve) {
            var attempts = 0;
            var maxAttempts = 20;
            
            function checkDB() {
                attempts++;
                
                if (window.journalDB && window.journalDB.isInitialized && window.journalDB.isInitialized()) {
                    console.log('Journal DB trovato dopo', attempts, 'tentativi');
                    resolve();
                } else if (attempts >= maxAttempts) {
                    console.error('Timeout attesa Journal DB');
                    resolve();
                } else {
                    setTimeout(checkDB, 500);
                }
            }
            
            checkDB();
        });
    },
    
    // ===== CARICAMENTO =====
    loadJournal: function() {
        var self = this;
        
        return journalDB.loadJournal().then(function(journal) {
            console.log('Journal caricato dal DB:', journal ? 'SI' : 'NO');
            
            self.currentJournal = journal;
            self.textarea.value = journal.content;
            self.updateStats();
            self.updateSaveIndicator(true);
            self.checkAndAddTodayHeader();
            
            // Focus alla fine
            self.textarea.focus();
            self.textarea.setSelectionRange(self.textarea.value.length, self.textarea.value.length);
            
            self.showStatus('Journal loaded', 1500);
            
        }).catch(function(error) {
            console.error('Errore caricamento journal:', error);
            
            // Fallback localStorage
            var fallback = localStorage.getItem('tec_journal_fallback');
            if (fallback) {
                console.log('Usando fallback localStorage per journal');
                self.textarea.value = fallback;
                self.updateStats();
                self.updateSaveIndicator(true);
                self.checkAndAddTodayHeader();
                self.showStatus('Loaded from local storage (DB error)', 3000);
            } else {
                console.log('Nessun dato journal trovato');
                self.updateSaveIndicator(true);
                self.checkAndAddTodayHeader();
                self.showStatus('No previous journal found', 3000);
            }
        });
    },
    
    // ===== HEADER DATA OGGI (MODIFICATO: AGGIUNGE IN CIMA) =====
    checkAndAddTodayHeader: function() {
        if (this.isTodayHeaderAdded) return;
        
        var tecDate = TEC.getFormattedDate();
        var content = this.textarea.value;
        
        console.log('checkAndAddTodayHeader - Contenuto:', content.length, 'caratteri');
        
        var todayHeader = tecDate.formatted + '\n\n';
        
        var hasContent = content.trim().length > 0;
        
        if (!hasContent) {
            console.log('Journal vuoto - aggiungo data');
            this.textarea.value = todayHeader;
            this.isModified = true;
            this.isTodayHeaderAdded = true;
            this.updateSaveIndicator(false);
            this.updateStats();
            return;
        }
        
        // MODIFICATO: Cerchiamo nelle PRIME 10 righe invece delle ultime
        var lines = content.split('\n');
        var firstFewLines = lines.slice(0, 10).join('\n');
        var hasToday = firstFewLines.indexOf(tecDate.formatted) !== -1;
        
        if (!hasToday) {
            console.log('Data odierna non trovata - aggiungo IN CIMA');
            // MODIFICATO: Aggiungiamo in cima invece che in fondo
            this.textarea.value = todayHeader + content;
            this.isModified = true;
            this.isTodayHeaderAdded = true;
            this.updateSaveIndicator(false);
            this.updateStats();
        } else {
            console.log('Data odierna già presente in cima');
        }
    },
    
    // ===== EVENT LISTENERS =====
    addEventListeners: function() {
        var self = this;
        
        this.textarea.oninput = function() {
            self.isModified = true;
            self.updateStats();
            self.updateSaveIndicator(false);
            self.debouncedSave();
        };
        
        this.textarea.onblur = function() {
            if (self.isModified) {
                console.log('Salvataggio immediato su blur');
                self.saveJournal();
            }
        };
        
        document.onkeydown = function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                self.saveJournal();
                self.showStatus('Journal saved manually', 1500);
            }
        };
        
        window.onbeforeunload = function() {
            if (self.isModified) {
                console.log('Salvataggio prima di uscire');
                self.saveJournal();
            }
        };
    },
    
    // ===== STATISTICHE =====
    updateStats: function() {
        if (this.charCountEl) {
            var charCount = this.textarea.value.length;
            this.charCountEl.textContent = charCount.toLocaleString() + ' characters';
        }
    },
    
    // ===== AGGIORNA INDICATORE SALVATAGGIO =====
    updateSaveIndicator: function(isSaved) {
        if (!this.saveIndicatorEl) return;
        
        if (isSaved) {
            this.saveIndicatorEl.textContent = 'Saved';
            this.saveIndicatorEl.className = 'save-indicator saved';
        } else {
            this.saveIndicatorEl.textContent = 'Unsaved';
            this.saveIndicatorEl.className = 'save-indicator';
        }
    },
    
    // ===== SALVATAGGIO =====
    debouncedSave: function() {
        var self = this;
        
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        
        this.saveTimeout = setTimeout(function() {
            self.saveJournal();
        }, this.DEBOUNCE_DELAY);
    },
    
    saveJournal: function() {
        var self = this;
        
        if (!this.isModified) {
            console.log('Nessuna modifica da salvare');
            return;
        }
        
        if (!journalDB || !journalDB.isInitialized()) {
            console.log('Journal DB non disponibile, uso localStorage');
            localStorage.setItem('tec_journal_fallback', self.textarea.value);
            self.isModified = false;
            self.updateStats();
            self.updateSaveIndicator(true);
            self.showStatus('Saved to local storage', 1500);
            return;
        }
        
        console.log('Salvataggio journal in corso...');
        
        this.currentJournal.content = this.textarea.value;
        this.currentJournal.totalCharacters = this.textarea.value.length;
        
        journalDB.saveJournal(this.currentJournal).then(function() {
            self.isModified = false;
            self.updateStats();
            self.updateSaveIndicator(true);
            
            // Backup localStorage
            localStorage.setItem('tec_journal_fallback', self.textarea.value);
            
            console.log('Journal salvato con successo');
            self.showStatus('Journal saved', 1500);
            
        }).catch(function(error) {
            console.error('Errore salvataggio journal:', error);
            
            localStorage.setItem('tec_journal_fallback', self.textarea.value);
            self.updateSaveIndicator(false);
            self.showStatus('Saved to local storage (DB error)', 2000);
        });
    },
    
    // ===== UTILITY =====
    showStatus: function(message, duration) {
        duration = duration || 3000;
        var statusEl = document.getElementById('statusMessage');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = 'show';
            
            setTimeout(function() {
                statusEl.className = '';
            }, duration);
        }
    }
};

// Avvia
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        journalManager.init();
    });
} else {
    journalManager.init();
}

window.journalManager = journalManager;