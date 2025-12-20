// goals.js - Logica per i Goals TEC
// VERSIONE COMPLETA: layout identico all'agenda settimanale

var goalsManager = {
    textarea: null,
    charCountEl: null,
    saveIndicatorEl: null,
    
    saveTimeout: null,
    DEBOUNCE_DELAY: 3000,
    
    currentGoals: null,
    isModified: false,
    
    // ===== INIZIALIZZAZIONE =====
    init: function() {
        console.log('INIZIO init() - Goals Manager');
        
        var self = this;
        
        this.textarea = document.getElementById('goalsTextarea');
        
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
            console.error('Elemento goalsTextarea non trovato!');
            return;
        }
        
        this.waitForDB().then(function() {
            console.log('DB pronto per Goals');
            return self.loadGoals();
        }).then(function() {
            self.addEventListeners();
            
            setInterval(function() {
                if (self.isModified && self.currentGoals) {
                    self.saveGoals();
                }
            }, 30000);
            
            console.log('Goals Manager inizializzato');
            
        }).catch(function(error) {
            console.error('Errore inizializzazione Goals Manager:', error);
            self.showStatus('Error initializing goals', 5000);
        });
    },
    
    // ===== ATTESA DB =====
    waitForDB: function() {
        var self = this;
        return new Promise(function(resolve) {
            var attempts = 0;
            var maxAttempts = 20;
            
            function checkDB() {
                attempts++;
                
                if (window.goalsDB && window.goalsDB.isInitialized && window.goalsDB.isInitialized()) {
                    console.log('Goals DB trovato dopo', attempts, 'tentativi');
                    resolve();
                } else if (attempts >= maxAttempts) {
                    console.error('Timeout attesa Goals DB');
                    resolve();
                } else {
                    setTimeout(checkDB, 500);
                }
            }
            
            checkDB();
        });
    },
    
    // ===== CARICAMENTO =====
    loadGoals: function() {
        var self = this;
        
        return goalsDB.loadGoals().then(function(goals) {
            console.log('Goals caricati dal DB:', goals ? 'SI' : 'NO');
            
            self.currentGoals = goals;
            self.textarea.value = goals.content;
            self.updateStats();
            self.updateSaveIndicator(true);
            
            self.textarea.focus();
            self.textarea.setSelectionRange(self.textarea.value.length, self.textarea.value.length);
            
            self.showStatus('Goals loaded', 1500);
            
        }).catch(function(error) {
            console.error('Errore caricamento goals:', error);
            
            var fallback = localStorage.getItem('tec_goals_fallback');
            if (fallback) {
                console.log('Usando fallback localStorage per goals');
                self.textarea.value = fallback;
                self.updateStats();
                self.updateSaveIndicator(true);
                self.showStatus('Goals loaded from local storage (DB error)', 3000);
            } else {
                console.log('Nessun dato goals trovato');
                self.updateSaveIndicator(true);
                self.showStatus('No previous goals found', 3000);
            }
        });
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
                console.log('Salvataggio immediato goals su blur');
                self.saveGoals();
            }
        };
        
        document.onkeydown = function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
                e.preventDefault();
                self.saveGoals();
                self.showStatus('Goals saved manually', 1500);
            }
        };
        
        window.onbeforeunload = function() {
            if (self.isModified) {
                console.log('Salvataggio goals prima di uscire');
                self.saveGoals();
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
            self.saveGoals();
        }, this.DEBOUNCE_DELAY);
    },
    
    saveGoals: function() {
        var self = this;
        
        if (!this.isModified) {
            console.log('Nessuna modifica goals da salvare');
            return;
        }
        
        if (!goalsDB || !goalsDB.isInitialized()) {
            console.log('Goals DB non disponibile, uso localStorage');
            localStorage.setItem('tec_goals_fallback', self.textarea.value);
            self.isModified = false;
            self.updateStats();
            self.updateSaveIndicator(true);
            self.showStatus('Goals saved to local storage', 1500);
            return;
        }
        
        console.log('Salvataggio goals in corso...');
        
        this.currentGoals.content = this.textarea.value;
        this.currentGoals.totalCharacters = this.textarea.value.length;
        
        goalsDB.saveGoals(this.currentGoals).then(function() {
            self.isModified = false;
            self.updateStats();
            self.updateSaveIndicator(true);
            
            localStorage.setItem('tec_goals_fallback', self.textarea.value);
            
            console.log('Goals salvati con successo');
            self.showStatus('Goals saved', 1500);
            
        }).catch(function(error) {
            console.error('Errore salvataggio goals:', error);
            
            localStorage.setItem('tec_goals_fallback', self.textarea.value);
            self.updateSaveIndicator(false);
            self.showStatus('Goals saved to local storage (DB error)', 2000);
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
        goalsManager.init();
    });
} else {
    goalsManager.init();
}

window.goalsManager = goalsManager;
