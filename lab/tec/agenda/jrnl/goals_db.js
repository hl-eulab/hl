// goals_db.js - Database IndexedDB per i Goals TEC
// VERSIONE SEMPLIFICATA (simile a journal_db.js ma per goals)

function GoalsDB() {
    this.db = null;
    this.dbName = 'EarthCalendarGoals';
    this.dbVersion = 1;
    this.storeName = 'goals_content';
    
    this.saveTimeout = null;
    this.DEBOUNCE_DELAY = 3000;
    
    this.initialized = false;
}

// ===== INIZIALIZZAZIONE =====
GoalsDB.prototype.init = function() {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open(self.dbName, self.dbVersion);
        
        request.onerror = function(event) {
            console.error('Errore apertura database goals:', event.target.error);
            reject(event.target.error);
        };
        
        request.onsuccess = function(event) {
            self.db = event.target.result;
            self.initialized = true;
            console.log('Goals DB inizializzato');
            resolve(self.db);
        };
        
        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            
            if (!db.objectStoreNames.contains(self.storeName)) {
                var store = db.createObjectStore(self.storeName, { keyPath: 'id' });
                store.createIndex('lastModified', 'lastModified', { unique: false });
                
                console.log('Goals store creato');
                
                // Inizializza con goals vuoti
                var initialGoals = {
                    id: 'main_goals',
                    content: '',
                    createdAt: new Date().toISOString(),
                    lastModified: new Date().toISOString(),
                    totalCharacters: 0
                };
                
                store.add(initialGoals);
            }
        };
    });
};

// ===== CARICAMENTO =====
GoalsDB.prototype.loadGoals = function() {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('Goals DB non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readonly');
        var store = transaction.objectStore(self.storeName);
        var request = store.get('main_goals');
        
        request.onsuccess = function(event) {
            var goals = event.target.result;
            
            if (!goals) {
                goals = {
                    id: 'main_goals',
                    content: '',
                    createdAt: new Date().toISOString(),
                    lastModified: new Date().toISOString(),
                    totalCharacters: 0
                };
                
                self.saveGoals(goals).then(function() {
                    console.log('Goals vuoti creati');
                }).catch(function(err) {
                    console.warn('Non salvato:', err);
                });
            }
            
            resolve(goals);
        };
        
        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
};

// ===== SALVATAGGIO =====
GoalsDB.prototype.saveGoals = function(goalsData) {
    var self = this;
    
    return new Promise(function(resolve, reject) {
        if (!self.db) {
            reject(new Error('Goals DB non inizializzato'));
            return;
        }
        
        var transaction = self.db.transaction([self.storeName], 'readwrite');
        var store = transaction.objectStore(self.storeName);
        
        goalsData.lastModified = new Date().toISOString();
        goalsData.totalCharacters = goalsData.content.length;
        
        var request = store.put(goalsData);
        
        request.onsuccess = function() {
            console.log('Goals salvati:', goalsData.lastModified);
            resolve(true);
        };
        
        request.onerror = function(event) {
            console.error('Errore salvataggio:', event.target.error);
            reject(event.target.error);
        };
    });
};

// ===== STATUS =====
GoalsDB.prototype.isInitialized = function() {
    return this.initialized && this.db !== null;
};

// ===== ISTANZA GLOBALE =====
var goalsDB = new GoalsDB();

// Inizializza immediatamente, non aspettare window.onload
goalsDB.init().then(function() {
    console.log('Goals DB pronto');
    window.goalsDB = goalsDB;
}).catch(function(error) {
    console.error('Errore inizializzazione Goals DB:', error);
    
    window.goalsDB = {
        isInitialized: function() { return false; },
        loadGoals: function() { return Promise.reject('Database non disponibile'); },
        saveGoals: function() { return Promise.resolve(false); },
        init: function() { return Promise.reject('Database non disponibile'); }
    };
});