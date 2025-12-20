// journal_db.js - Database IndexedDB per il Journal TEC
// VERSIONE SEMPLIFICATA

function JournalDB() {
    this.db = null;
    this.dbName = 'EarthCalendarJournal';
    this.dbVersion = 1;
    this.storeName = 'journal_content';
    
    this.saveTimeout = null;
    this.DEBOUNCE_DELAY = 3000;
    
    this.initialized = false;
}

// ===== INIZIALIZZAZIONE =====
JournalDB.prototype.init = function() {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open(self.dbName, self.dbVersion);
        
        request.onerror = function(event) {
            console.error('Errore apertura database journal:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            self.db = event.target.result;
            self.initialized = true;
            console.log('Journal DB inizializzato');
            resolve(self.db);
        };
        
        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            
            if (!db.objectStoreNames.contains(self.storeName)) {
                var store = db.createObjectStore(self.storeName, { keyPath: 'id' });
                store.createIndex('lastModified', 'lastModified', { unique: false });
                
                console.log('Journal store creato');
                
                // Inizializza con diario vuoto
                var initialJournal = {
                    id: 'main_journal',
                    content: '',
                    createdAt: new Date().toISOString(),
                    lastModified: new Date().toISOString(),
                    totalCharacters: 0
                };
                
                store.add(initialJournal);
            }
        };
    });
};

// ===== CARICAMENTO =====
JournalDB.prototype.loadJournal = function() {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('Journal DB non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readonly');
        var store = transaction.objectStore(self.storeName);
        var request = store.get('main_journal');
        
        request.onsuccess = function(event) {
            var journal = event.target.result;
            
            if (!journal) {
                journal = {
                    id: 'main_journal',
                    content: '',
                    createdAt: new Date().toISOString(),
                    lastModified: new Date().toISOString(),
                    totalCharacters: 0
                };
                
                self.saveJournal(journal).then(function() {
                    console.log('Diario vuoto creato');
                }).catch(function(err) {
                    console.warn('Non salvato:', err);
                });
            }
            
            resolve(journal);
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
};

// ===== SALVATAGGIO =====
JournalDB.prototype.saveJournal = function(journalData) {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('Journal DB non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readwrite');
        var store = transaction.objectStore(self.storeName);
        
        journalData.lastModified = new Date().toISOString();
        journalData.totalCharacters = journalData.content.length;
        
        var request = store.put(journalData);
        
        request.onsuccess = function() {
            console.log('Diario salvato:', journalData.lastModified);
            resolve(true);
        };
        
        request.onerror = function(event) {
            console.error('Errore salvataggio:', event.target.error);
            reject(event.target.error);
        };
    });
};

// ===== EXPORT =====
JournalDB.prototype.exportJournal = function() {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('Journal DB non inizializzato'));
            return;
        }
        
        var exportData = {
            exportDate: new Date().toISOString(),
            databaseName: self.dbName,
            version: self.dbVersion,
            journal: null
        };
        
        var transaction = self.db.transaction([self.storeName], 'readonly');
        var store = transaction.objectStore(self.storeName);
        var request = store.get('main_journal');
        
        request.onsuccess = function(event) {
            exportData.journal = event.target.result;
            resolve(JSON.stringify(exportData, null, 2));
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
};

// ===== IMPORT =====
JournalDB.prototype.importJournal = function(jsonData) {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('Journal DB non inizializzato'));
            return;
        }
        
        try {
            var data = JSON.parse(jsonData);
            
            if (!data.journal || !data.journal.id) {
                throw new Error('Formato JSON non valido');
            }
            
            var transaction = self.db.transaction([self.storeName], 'readwrite');
            var store = transaction.objectStore(self.storeName);
            
            data.journal.lastModified = new Date().toISOString();
            data.journal.totalCharacters = data.journal.content.length;
            
            var request = store.put(data.journal);
            
            request.onsuccess = function() {
                console.log('Diario importato');
                resolve({ success: true, journal: data.journal });
            };
            
            request.onerror = function(event) {
                reject(event.target.error);
            };
            
        } catch (error) {
            reject(error);
        }
    });
};

// ===== CLEAR =====
JournalDB.prototype.clearJournal = function() {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('Journal DB non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readwrite');
        var store = transaction.objectStore(self.storeName);
        var request = store.clear();
        
        request.onsuccess = function() {
            console.log('Diario cancellato');
            resolve();
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
};

// ===== STATUS =====
JournalDB.prototype.isInitialized = function() {
    return this.initialized && this.db !== null;
};

// ===== STATS =====
JournalDB.prototype.getStats = function() {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('Journal DB non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readonly');
        var store = transaction.objectStore(self.storeName);
        var request = store.get('main_journal');
        
        request.onsuccess = function(event) {
            var journal = event.target.result;
            var stats = {
                totalCharacters: journal ? journal.totalCharacters : 0,
                lastModified: journal ? journal.lastModified : null,
                createdAt: journal ? journal.createdAt : null,
                lineCount: journal ? (journal.content.split('\n').length) : 0
            };
            resolve(stats);
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
};

// ===== ISTANZA GLOBALE =====
var journalDB = new JournalDB();

// Inizializza immediatamente, non aspettare window.onload
journalDB.init().then(function() {
    console.log('Journal DB pronto');
    window.journalDB = journalDB;
}).catch(function(error) {
    console.error('Errore inizializzazione Journal DB:', error);
    
    window.journalDB = {
        isInitialized: function() { return false; },
        loadJournal: function() { return Promise.reject('Database non disponibile'); },
        saveJournal: function() { return Promise.resolve(false); },
        init: function() { return Promise.reject('Database non disponibile'); }
    };
});