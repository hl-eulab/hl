// db.js - Gestione database IndexedDB per The Earth Calendar - SETTENNIAL AGENDA
// VERSIONE SETTENNALE: gestisce note annuali invece che giornaliere

function SeptennialDB() {
    this.db = null;
    this.dbName = 'EarthCalendarSeptennial';
    this.dbVersion = 1;
    this.storeName = 'yearly_notes';
    
    this.saveTimeouts = {};
    this.DEBOUNCE_DELAY = 2000;
    
    this.currentSeptenniumCache = null;
    this.currentSeptenniumKey = null;
    
    this.initialized = false;
}

// ===== INIZIALIZZAZIONE =====
SeptennialDB.prototype.init = function() {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open(self.dbName, self.dbVersion);
        
        request.onerror = function(event) {
            console.error('Errore DB Settennale:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            self.db = event.target.result;
            self.initialized = true;
            console.log('DB Settennale TEC pronto');
            resolve(self.db);
        };
        
        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            if (!db.objectStoreNames.contains(self.storeName)) {
                var store = db.createObjectStore(self.storeName, { keyPath: 'key' });
                store.createIndex('septennium_year', ['septenniumTEC', 'yearTEC'], { unique: true });
                console.log('Store Settennale TEC creato');
            }
        };
    });
};

// ===== UTILITY =====
SeptennialDB.prototype.getSeptenniumKey = function(date) {
    date = date || new Date();
    var septenniumInfo = TEC.getSeptenniumInfo(date);
    return septenniumInfo.septenniumKey; // Es: "004"
};

SeptennialDB.prototype.getYearKey = function(date) {
    date = date || new Date();
    var yearInfo = TEC.getYearInfo(date);
    return yearInfo.yearKey; // Es: "028"
};

// ===== CREAZIONE SETTENNIO VUOTO =====
SeptennialDB.prototype.createEmptySeptennium = function(startDate) {
    var septenniumInfo = TEC.getSeptenniumInfo(startDate);
    var years = {};
    
    // Crea 7 anni (Moonyear a Sunyear)
    for (var i = 0; i < 7; i++) {
        var currentYearTEC = septenniumInfo.firstYearTEC + i;
        var yearKey = ('000' + currentYearTEC).slice(-3);
        
        years[yearKey] = {
            notes: '',
            charCount: 0,
            lastModified: null,
            saved: true,
            yearName: TEC.getYearName(currentYearTEC),
            yearTEC: currentYearTEC,
            yearIndex: i
        };
    }
    
    return {
        key: septenniumInfo.septenniumKey,
        septenniumTEC: septenniumInfo.septenniumTEC,
        ordinalSeptennium: septenniumInfo.ordinalSeptennium,
        theme: septenniumInfo.theme,
        firstYearTEC: septenniumInfo.firstYearTEC,
        lastYearTEC: septenniumInfo.lastYearTEC,
        years: years,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
};

// ===== CARICAMENTO SETTENNIO =====
SeptennialDB.prototype.loadSeptennium = function(date) {
    var self = this;
    date = date || new Date();
    var septenniumKey = this.getSeptenniumKey(date);
    
    // Cache: se abbiamo già questo settennio, ritorna copia
    if (this.currentSeptenniumKey === septenniumKey && this.currentSeptenniumCache) {
        return Promise.resolve(this.copySeptenniumData(this.currentSeptenniumCache));
    }
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('DB Settennale non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readonly');
        var store = transaction.objectStore(self.storeName);
        var request = store.get(septenniumKey);
        
        request.onsuccess = function(event) {
            var septenniumData = event.target.result;
            
            if (!septenniumData) {
                // Settennio non esiste, crea nuovo
                var firstYear = TEC.getFirstYearOfSeptennium(date);
                septenniumData = self.createEmptySeptennium(firstYear);
                
                // Salva nel DB in background
                self.saveSeptennium(septenniumData).catch(function(err) {
                    console.warn('Creazione settennio non salvata:', err);
                });
                console.log('Nuovo settennio creato:', septenniumKey);
            } else {
                // IMPOSTA TUTTI GLI ANNI COME SALVATI
                for (var yearKey in septenniumData.years) {
                    if (septenniumData.years.hasOwnProperty(yearKey)) {
                        septenniumData.years[yearKey].saved = true;
                    }
                }
                console.log('Settennio caricato dal DB:', septenniumKey);
            }
            
            // AGGIORNA CACHE CON COPIA
            self.currentSeptenniumCache = self.copySeptenniumData(septenniumData);
            self.currentSeptenniumKey = septenniumKey;
            
            resolve(self.copySeptenniumData(septenniumData));
        };
        
        request.onerror = function(event) {
            console.error('Errore caricamento settennio:', event.target.error);
            
            // Fallback: crea settennio vuoto
            var firstYear = TEC.getFirstYearOfSeptennium(date);
            var septenniumData = self.createEmptySeptennium(firstYear);
            self.currentSeptenniumCache = self.copySeptenniumData(septenniumData);
            self.currentSeptenniumKey = septenniumKey;
            resolve(self.copySeptenniumData(septenniumData));
        };
    });
};

// ===== COPIA DATI SETTENNIO =====
SeptennialDB.prototype.copySeptenniumData = function(septenniumData) {
    return JSON.parse(JSON.stringify(septenniumData));
};

// ===== SALVATAGGIO SETTENNIO =====
SeptennialDB.prototype.saveSeptennium = function(septenniumData) {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('DB Settennale non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readwrite');
        var store = transaction.objectStore(self.storeName);
        
        septenniumData.updatedAt = new Date().toISOString();
        
        var request = store.put(septenniumData);
        
        request.onsuccess = function() {
            console.log('Settennio salvato:', septenniumData.key);
            resolve(septenniumData.key);
        };
        
        request.onerror = function(event) {
            console.error('Errore salvataggio settennio:', event.target.error);
            reject(event.target.error);
        };
    });
};

// ===== SALVA NOTE ANNO =====
SeptennialDB.prototype.saveYearNotes = function(yearKey, notes) {
    var self = this;
    
    // Cancella timeout precedente
    if (self.saveTimeouts[yearKey]) {
        clearTimeout(self.saveTimeouts[yearKey]);
    }
    
    return new Promise(function(resolve) {
        self.saveTimeouts[yearKey] = setTimeout(function() {
            delete self.saveTimeouts[yearKey];
            
            var dateObj = TEC.parseYearKey(yearKey);
            
            self.loadSeptennium(dateObj).then(function(septenniumData) {
                if (!septenniumData.years[yearKey]) {
                    console.error('Anno non trovato:', yearKey);
                    resolve(false);
                    return;
                }
                
                // Aggiorna dati
                septenniumData.years[yearKey].notes = notes;
                septenniumData.years[yearKey].charCount = notes.length;
                septenniumData.years[yearKey].lastModified = new Date().toISOString();
                septenniumData.years[yearKey].saved = false;
                
                // Salva settennio
                return self.saveSeptennium(septenniumData).then(function() {
                    // Aggiorna cache solo dopo successo
                    if (self.currentSeptenniumCache && 
                        self.currentSeptenniumCache.key === septenniumData.key &&
                        self.currentSeptenniumCache.years[yearKey]) {
                        self.currentSeptenniumCache.years[yearKey].notes = notes;
                        self.currentSeptenniumCache.years[yearKey].charCount = notes.length;
                        self.currentSeptenniumCache.years[yearKey].lastModified = new Date().toISOString();
                        self.currentSeptenniumCache.years[yearKey].saved = true;
                    }
                    resolve(true);
                }).catch(function(error) {
                    console.error('Errore salvataggio settennio:', error);
                    resolve(false);
                });
            }).catch(function(error) {
                console.error('Errore caricamento settennio:', error);
                resolve(false);
            });
        }, self.DEBOUNCE_DELAY);
    });
};

// ===== FUNZIONI AGGIUNTIVE =====
SeptennialDB.prototype.clearAllTimeouts = function() {
    for (var yearKey in this.saveTimeouts) {
        clearTimeout(this.saveTimeouts[yearKey]);
    }
    this.saveTimeouts = {};
};

SeptennialDB.prototype.isInitialized = function() {
    return this.initialized && this.db !== null;
};

// ===== INIZIALIZZAZIONE GLOBALE =====
(function() {
    var septennialDB = new SeptennialDB();
    window.septennialDB = septennialDB;
    
    septennialDB.init().then(function() {
        console.log('DB Settennale TEC inizializzato');
    }).catch(function(error) {
        console.error('Errore inizializzazione DB Settennale:', error);
    });
})();