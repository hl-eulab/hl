// db.js - Gestione database IndexedDB per The Earth Calendar - AGENDA SETTIMANALE
// VERSIONE CORRETTA: Gestione cache e salvataggio migliorata

function EarthCalendarDB() {
    this.db = null;
    this.dbName = 'EarthCalendarAgenda';
    this.dbVersion = 2;
    this.storeName = 'weekly_notes';
    
    this.saveTimeouts = {};
    this.DEBOUNCE_DELAY = 2000;
    
    this.currentWeekCache = null;
    this.currentWeekKey = null;
    
    this.initialized = false;
}

// ===== INIZIALIZZAZIONE =====
EarthCalendarDB.prototype.init = function() {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open(self.dbName, self.dbVersion);
        
        request.onerror = function(event) {
            console.error('Errore DB:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            self.db = event.target.result;
            self.initialized = true;
            console.log('DB TEC pronto');
            resolve(self.db);
        };
        
        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            if (!db.objectStoreNames.contains(self.storeName)) {
                var store = db.createObjectStore(self.storeName, { keyPath: 'key' });
                store.createIndex('tec_year_week', ['yearTEC', 'weekNumber'], { unique: true });
                console.log('Store TEC creato');
            }
        };
    });
};

// ===== UTILITY =====
EarthCalendarDB.prototype.getWeekKey = function(date) {
    date = date || new Date();
    var weekInfo = TEC.getWeekInfo(date);
    return weekInfo.weekKey;
};

EarthCalendarDB.prototype.createEmptyWeek = function(startDate) {
    var weekInfo = TEC.getWeekInfo(startDate);
    var days = {};
    var date = new Date(startDate.getTime());
    
    for (var i = 0; i < 7; i++) {
        var currentDay = new Date(date.getTime());
        currentDay.setDate(date.getDate() + i);
        
        var tecDateKey = TEC.getTECDateKey(currentDay);
        
        days[tecDateKey] = {
            notes: '',
            charCount: 0,
            lastModified: null,
            saved: true,
            gregorianDate: currentDay.toISOString().split('T')[0]
        };
    }
    
    return {
        key: weekInfo.weekKey,
        yearTEC: weekInfo.yearTEC,
        weekNumber: weekInfo.weekNumber,
        tecStartDate: weekInfo.tecMondayKey,
        gregorianStartDate: startDate.toISOString().split('T')[0],
        days: days,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
};

// ===== CARICAMENTO (CORRETTO) =====
EarthCalendarDB.prototype.loadWeek = function(date) {
    var self = this;
    date = date || new Date();
    var weekKey = this.getWeekKey(date);
    
    // Cache: se abbiamo già questa settimana, ritorna copia
    if (this.currentWeekKey === weekKey && this.currentWeekCache) {
        return Promise.resolve(this.copyWeekData(this.currentWeekCache));
    }
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('DB non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readonly');
        var store = transaction.objectStore(self.storeName);
        var request = store.get(weekKey);
        
        request.onsuccess = function(event) {
            var weekData = event.target.result;
            
            if (!weekData) {
                // Settimana non esiste, crea nuova
                var monday = TEC.getMondayOfWeek(date);
                weekData = self.createEmptyWeek(monday);
                
                // Salva nel DB in background
                self.saveWeek(weekData).catch(function(err) {
                    console.warn('Creazione settimana non salvata:', err);
                });
            } else {
                // IMPOSTA TUTTI I GIORNI COME SALVATI
                for (var tecDateKey in weekData.days) {
                    if (weekData.days.hasOwnProperty(tecDateKey)) {
                        weekData.days[tecDateKey].saved = true;
                    }
                }
            }
            
            // AGGIORNA CACHE CON COPIA
            self.currentWeekCache = self.copyWeekData(weekData);
            self.currentWeekKey = weekKey;
            
            resolve(self.copyWeekData(weekData));
        };
        
        request.onerror = function(event) {
            console.error('Errore caricamento:', event.target.error);
            
            // Fallback: crea settimana vuota
            var monday = TEC.getMondayOfWeek(date);
            var weekData = self.createEmptyWeek(monday);
            self.currentWeekCache = self.copyWeekData(weekData);
            self.currentWeekKey = weekKey;
            resolve(self.copyWeekData(weekData));
        };
    });
};

// ===== COPIA DATI SETTIMANA =====
EarthCalendarDB.prototype.copyWeekData = function(weekData) {
    return JSON.parse(JSON.stringify(weekData));
};

// ===== SALVATAGGIO =====
EarthCalendarDB.prototype.saveWeek = function(weekData) {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('DB non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readwrite');
        var store = transaction.objectStore(self.storeName);
        
        weekData.updatedAt = new Date().toISOString();
        
        var request = store.put(weekData);
        
        request.onsuccess = function() {
            resolve(weekData.key);
        };
        
        request.onerror = function(event) {
            console.error('Errore salvataggio:', event.target.error);
            reject(event.target.error);
        };
    });
};

// ===== SALVA NOTE GIORNO (MIGLIORATO) =====
EarthCalendarDB.prototype.saveDayNotes = function(tecDateKey, notes) {
    var self = this;
    
    // Cancella timeout precedente
    if (self.saveTimeouts[tecDateKey]) {
        clearTimeout(self.saveTimeouts[tecDateKey]);
    }
    
    return new Promise(function(resolve) {
        self.saveTimeouts[tecDateKey] = setTimeout(function() {
            delete self.saveTimeouts[tecDateKey];
            
            var dateObj = TEC.parseTECDateKey(tecDateKey);
            
            self.loadWeek(dateObj).then(function(weekData) {
                if (!weekData.days[tecDateKey]) {
                    console.error('Giorno non trovato:', tecDateKey);
                    resolve(false);
                    return;
                }
                
                // Aggiorna dati
                weekData.days[tecDateKey].notes = notes;
                weekData.days[tecDateKey].charCount = notes.length;
                weekData.days[tecDateKey].lastModified = new Date().toISOString();
                weekData.days[tecDateKey].saved = false;
                
                // Salva settimana
                return self.saveWeek(weekData).then(function() {
                    // Aggiorna cache solo dopo successo
                    if (self.currentWeekCache && 
                        self.currentWeekCache.key === weekData.key &&
                        self.currentWeekCache.days[tecDateKey]) {
                        self.currentWeekCache.days[tecDateKey].notes = notes;
                        self.currentWeekCache.days[tecDateKey].charCount = notes.length;
                        self.currentWeekCache.days[tecDateKey].lastModified = new Date().toISOString();
                        self.currentWeekCache.days[tecDateKey].saved = true;
                    }
                    resolve(true);
                }).catch(function(error) {
                    console.error('Errore salvataggio:', error);
                    resolve(false);
                });
            }).catch(function(error) {
                console.error('Errore caricamento:', error);
                resolve(false);
            });
        }, self.DEBOUNCE_DELAY);
    });
};

// ===== FUNZIONI AGGIUNTIVE =====
EarthCalendarDB.prototype.clearAllTimeouts = function() {
    for (var tecDateKey in this.saveTimeouts) {
        clearTimeout(this.saveTimeouts[tecDateKey]);
    }
    this.saveTimeouts = {};
};

EarthCalendarDB.prototype.isInitialized = function() {
    return this.initialized && this.db !== null;
};

// ===== INIZIALIZZAZIONE GLOBALE =====
(function() {
    var earthCalendarDB = new EarthCalendarDB();
    window.earthCalendarDB = earthCalendarDB;
    
    earthCalendarDB.init().then(function() {
        console.log('DB TEC inizializzato');
    }).catch(function(error) {
        console.error('Errore DB:', error);
    });
})();