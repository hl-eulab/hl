// journal_db.js - Database IndexedDB separato solo per il diario TEC

class JournalDB {
    constructor() {
        this.db = null;
        this.dbName = 'EarthCalendarJournal';
        this.dbVersion = 1;
        this.storeName = 'journal_content';
        
        // Debounce per salvataggio automatico
        this.saveTimeout = null;
        this.DEBOUNCE_DELAY = 3000; // 3 secondi
        
        this.initialized = false;
    }
    
    // ===== INIZIALIZZAZIONE =====
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = (event) => {
                console.error('Errore apertura database journal:', event.target.error);
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                this.initialized = true;
                console.log('Journal DB inizializzato con successo');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Crea UNO store semplice per il diario
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
                    
                    // Crea indice per ultima modifica
                    store.createIndex('lastModified', 'lastModified', { unique: false });
                    
                    console.log('Journal store creato:', this.storeName);
                    
                    // Inizializza con diario vuoto
                    const initialJournal = {
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
    }
    
    // ===== OPERAZIONI PRINCIPALI =====
    
    // Carica il diario (unico documento)
    async loadJournal() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Journal DB non inizializzato'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get('main_journal');
            
            request.onsuccess = (event) => {
                let journal = event.target.result;
                
                // Se per qualche motivo non esiste, crea diario vuoto
                if (!journal) {
                    journal = {
                        id: 'main_journal',
                        content: '',
                        createdAt: new Date().toISOString(),
                        lastModified: new Date().toISOString(),
                        totalCharacters: 0
                    };
                    
                    // Prova a salvare
                    this.saveJournal(journal).then(() => {
                        console.log('Diario vuoto creato e salvato');
                    }).catch(err => {
                        console.warn('Non salvato nel DB:', err);
                    });
                }
                
                resolve(journal);
            };
            
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    
    // Salva il diario
    async saveJournal(journalData) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Journal DB non inizializzato'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            
            // Aggiorna timestamp e conteggio caratteri
            journalData.lastModified = new Date().toISOString();
            journalData.totalCharacters = journalData.content.length;
            
            const request = store.put(journalData);
            
            request.onsuccess = () => {
                console.log('Diario salvato:', journalData.lastModified);
                resolve(true);
            };
            
            request.onerror = (event) => {
                console.error('Errore salvataggio diario:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // ===== ESPORTAZIONE/IMPORTAZIONE =====
    
    // Esporta il diario come JSON
    async exportJournal() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Journal DB non inizializzato'));
                return;
            }
            
            const exportData = {
                exportDate: new Date().toISOString(),
                databaseName: this.dbName,
                version: this.dbVersion,
                journal: null
            };
            
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get('main_journal');
            
            request.onsuccess = (event) => {
                exportData.journal = event.target.result;
                resolve(JSON.stringify(exportData, null, 2));
            };
            
            request.onerror = (event) => {
                console.error('Errore export diario:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // Importa diario da JSON
    async importJournal(jsonData) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Journal DB non inizializzato'));
                return;
            }
            
            try {
                const data = JSON.parse(jsonData);
                
                // Verifica struttura
                if (!data.journal || !data.journal.id) {
                    throw new Error('Formato JSON non valido per il diario');
                }
                
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                
                // Aggiorna timestamp
                data.journal.lastModified = new Date().toISOString();
                data.journal.totalCharacters = data.journal.content.length;
                
                const request = store.put(data.journal);
                
                request.onsuccess = () => {
                    console.log('Diario importato con successo');
                    resolve({ success: true, journal: data.journal });
                };
                
                request.onerror = (event) => {
                    reject(event.target.error);
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // Cancella tutto il diario (reset)
    async clearJournal() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Journal DB non inizializzato'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();
            
            request.onsuccess = () => {
                console.log('Diario cancellato');
                resolve();
            };
            
            request.onerror = (event) => {
                console.error('Errore cancellazione diario:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // ===== UTILITY =====
    
    // Verifica se il database è inizializzato
    isInitialized() {
        return this.initialized && this.db !== null;
    }
    
    // Ottieni statistiche
    async getStats() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Journal DB non inizializzato'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get('main_journal');
            
            request.onsuccess = (event) => {
                const journal = event.target.result;
                const stats = {
                    totalCharacters: journal ? journal.totalCharacters : 0,
                    lastModified: journal ? journal.lastModified : null,
                    createdAt: journal ? journal.createdAt : null,
                    lineCount: journal ? (journal.content.split('\n').length) : 0
                };
                resolve(stats);
            };
            
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
}

// Crea istanza globale
const journalDB = new JournalDB();

// Inizializza automaticamente al caricamento
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await journalDB.init();
        console.log('Journal DB pronto');
        
        // Esponi globalmente per debugging
        window.journalDB = journalDB;
    } catch (error) {
        console.error('Errore inizializzazione Journal DB:', error);
        
        // Fallback
        console.warn('IndexedDB non disponibile per il diario');
        window.journalDB = {
            isInitialized: () => false,
            loadJournal: () => Promise.reject('Database non disponibile'),
            saveJournal: () => Promise.resolve(false),
            init: () => Promise.reject('Database non disponibile')
        };
    }
});