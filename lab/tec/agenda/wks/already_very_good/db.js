// db.js - Gestione database IndexedDB per The Earth Calendar Agenda

class EarthCalendarDB {
    constructor() {
        this.db = null;
        this.dbName = 'EarthCalendarAgenda';
        this.dbVersion = 1;
        this.storeName = 'weekly_notes';
        
        // Debounce per salvataggio automatico (2 secondi)
        this.saveTimeout = null;
        this.DEBOUNCE_DELAY = 2000;
        
        // Cache per la settimana corrente
        this.currentWeekCache = null;
        this.currentWeekKey = null;
        
        // Flag di inizializzazione
        this.initialized = false;
    }
    
    // ===== INIZIALIZZAZIONE DATABASE =====
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = (event) => {
                console.error('Errore apertura database:', event.target.error);
                reject(event.target.error);
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                this.initialized = true;
                console.log('Database inizializzato con successo');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Crea lo store se non esiste
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'key' });
                    
                    // Crea indici per ricerca veloce
                    store.createIndex('year_week', ['year', 'week'], { unique: true });
                    store.createIndex('startDate', 'startDate', { unique: false });
                    
                    console.log('Object store creato:', this.storeName);
                }
            };
        });
    }
    
    // ===== FUNZIONI UTILITY =====
    
    // Ottieni chiave settimana da una data (formato: "YYYY-WW")
    getWeekKey(date = new Date()) {
        const d = new Date(date);
        const dayNum = d.getDay() || 7; // Converti Domenica(0) in 7
        
        // Imposta al Lunedì della settimana
        d.setDate(d.getDate() + 1 - dayNum);
        
        // Calcola settimana ISO
        const yearStart = new Date(Date.UTC(d.getFullYear(), 0, 1));
        const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        
        return `${d.getFullYear()}-${weekNo.toString().padStart(2, '0')}`;
    }
    
    // Crea oggetto settimana vuoto
    createEmptyWeek(startDate, tecYear, weekNumber) {
        const days = {};
        const date = new Date(startDate);
        
        // Crea 7 giorni vuoti
        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(date);
            currentDay.setDate(date.getDate() + i);
            
            const dateKey = currentDay.toISOString().split('T')[0]; // "YYYY-MM-DD"
            
            days[dateKey] = {
                notes: '',
                charCount: 0,
                lastModified: null,
                saved: true
            };
        }
        
        return {
            key: this.getWeekKey(startDate),
            year: tecYear,
            week: weekNumber,
            startDate: startDate.toISOString().split('T')[0],
            days: days,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }
    
    // ===== OPERAZIONI CRUD =====
    
    // Salva/aggiorna una settimana
    async saveWeek(weekData) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database non inizializzato'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            
            // Aggiorna timestamp
            weekData.updatedAt = new Date().toISOString();
            
            const request = store.put(weekData);
            
            request.onsuccess = () => {
                console.log('Settimana salvata:', weekData.key);
                resolve(weekData.key);
            };
            
            request.onerror = (event) => {
                console.error('Errore salvataggio settimana:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // Carica una settimana per data
    async loadWeek(date = new Date()) {
        const weekKey = this.getWeekKey(date);
        
        // Controlla cache
        if (this.currentWeekKey === weekKey && this.currentWeekCache) {
            return this.currentWeekCache;
        }
        
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database non inizializzato'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(weekKey);
            
            request.onsuccess = async (event) => {
                let weekData = event.target.result;
                
                // Se non esiste, crea una nuova settimana vuota
                if (!weekData) {
                    const startDate = new Date(date);
                    const dayNum = startDate.getDay() || 7;
                    startDate.setDate(startDate.getDate() + 1 - dayNum); // Vai al Lunedì
                    
                    // Calcola anno TEC
                    const tecYear = startDate.getFullYear() - 1969;
                    const weekNumber = parseInt(weekKey.split('-')[1]);
                    
                    weekData = this.createEmptyWeek(startDate, tecYear, weekNumber);
                    
                    try {
                        // Prova a salvare la settimana vuota nel database
                        await this.saveWeek(weekData);
                        console.log('Nuova settimana vuota creata e salvata:', weekKey);
                    } catch (saveError) {
                        console.warn('Non è stato possibile salvare la settimana vuota nel DB:', saveError);
                        // Continuiamo comunque con i dati in memoria
                    }
                    
                    // Aggiorna cache
                    this.currentWeekCache = weekData;
                    this.currentWeekKey = weekKey;
                    resolve(weekData);
                } else {
                    // Aggiorna cache con dati esistenti
                    this.currentWeekCache = weekData;
                    this.currentWeekKey = weekKey;
                    resolve(weekData);
                }
            };
            
            request.onerror = (event) => {
                console.error('Errore caricamento settimana:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // Salva note per un giorno specifico (con debounce)
    async saveDayNotes(date, notes) {
        const weekKey = this.getWeekKey(date);
        const dateKey = new Date(date).toISOString().split('T')[0];
        
        // Cancella timeout precedente
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }
        
        // Nuovo timeout per salvataggio debounced
        return new Promise((resolve) => {
            this.saveTimeout = setTimeout(async () => {
                try {
                    // Carica la settimana corrente
                    const weekData = await this.loadWeek(date);
                    
                    // Aggiorna le note del giorno
                    if (weekData.days[dateKey]) {
                        weekData.days[dateKey].notes = notes;
                        weekData.days[dateKey].charCount = notes.length;
                        weekData.days[dateKey].lastModified = new Date().toISOString();
                        weekData.days[dateKey].saved = false;
                        
                        // Salva la settimana aggiornata
                        await this.saveWeek(weekData);
                        
                        // Aggiorna cache
                        this.currentWeekCache = weekData;
                        
                        // Marca come salvato
                        weekData.days[dateKey].saved = true;
                        
                        console.log(`Note salvate per ${dateKey}`);
                        resolve(true);
                    } else {
                        console.error(`Giorno non trovato: ${dateKey}`);
                        resolve(false);
                    }
                } catch (error) {
                    console.error('Errore salvataggio note:', error);
                    resolve(false);
                }
            }, this.DEBOUNCE_DELAY);
        });
    }
    
    // Ottieni tutte le settimane per l'anno corrente
    async getCurrentYearWeeks() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database non inizializzato'));
                return;
            }
            
            const currentYear = new Date().getFullYear();
            const weeks = [];
            
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const index = store.index('startDate');
            
            // Range per l'anno corrente
            const lowerBound = `${currentYear}-01-01`;
            const upperBound = `${currentYear}-12-31`;
            const range = IDBKeyRange.bound(lowerBound, upperBound);
            
            const request = index.openCursor(range);
            
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    weeks.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(weeks);
                }
            };
            
            request.onerror = (event) => {
                console.error('Errore lettura settimane:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // ===== ESPORTAZIONE/IMPORTAZIONE =====
    
    // Esporta TUTTO il database come JSON
    async exportAllData() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database non inizializzato'));
                return;
            }
            
            const allData = {
                exportDate: new Date().toISOString(),
                databaseName: this.dbName,
                version: this.dbVersion,
                weeks: []
            };
            
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.openCursor();
            
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    allData.weeks.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(JSON.stringify(allData, null, 2));
                }
            };
            
            request.onerror = (event) => {
                console.error('Errore export:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // Importa dati da JSON (SOSTITUISCE tutto)
    async importAllData(jsonData) {
        return new Promise(async (resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database non inizializzato'));
                return;
            }
            
            try {
                const data = JSON.parse(jsonData);
                
                // Verifica struttura
                if (!data.weeks || !Array.isArray(data.weeks)) {
                    throw new Error('Formato JSON non valido');
                }
                
                // Cancella tutto il database esistente
                await this.clearDatabase();
                
                // Importa tutte le settimane
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                
                let importCount = 0;
                let errorCount = 0;
                
                data.weeks.forEach((week) => {
                    const request = store.put(week);
                    
                    request.onsuccess = () => {
                        importCount++;
                    };
                    
                    request.onerror = () => {
                        errorCount++;
                    };
                });
                
                transaction.oncomplete = () => {
                    console.log(`Import completato: ${importCount} settimane importate, ${errorCount} errori`);
                    resolve({ imported: importCount, errors: errorCount });
                };
                
                transaction.onerror = (event) => {
                    reject(event.target.error);
                };
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // Cancella tutto il database
    async clearDatabase() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database non inizializzato'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.clear();
            
            request.onsuccess = () => {
                console.log('Database cancellato');
                this.currentWeekCache = null;
                this.currentWeekKey = null;
                resolve();
            };
            
            request.onerror = (event) => {
                console.error('Errore cancellazione database:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // ===== STATISTICHE =====
    
    // Ottieni statistiche del database
    async getStats() {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database non inizializzato'));
                return;
            }
            
            const stats = {
                totalWeeks: 0,
                totalNotes: 0,
                totalCharacters: 0,
                lastModified: null
            };
            
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.openCursor();
            
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    const week = cursor.value;
                    stats.totalWeeks++;
                    
                    // Conta note e caratteri
                    Object.values(week.days).forEach(day => {
                        if (day.notes && day.notes.trim().length > 0) {
                            stats.totalNotes++;
                            stats.totalCharacters += day.charCount;
                        }
                        
                        // Trova ultima modifica
                        if (day.lastModified) {
                            const dayTime = new Date(day.lastModified).getTime();
                            if (!stats.lastModified || dayTime > new Date(stats.lastModified).getTime()) {
                                stats.lastModified = day.lastModified;
                            }
                        }
                    });
                    
                    cursor.continue();
                } else {
                    resolve(stats);
                }
            };
            
            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    }
    
    // Verifica se il database è inizializzato
    isInitialized() {
        return this.initialized && this.db !== null;
    }
}

// Crea istanza globale
const earthCalendarDB = new EarthCalendarDB();

// Inizializza automaticamente al caricamento
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await earthCalendarDB.init();
        console.log('Earth Calendar DB pronto');
        
        // Esponi globalmente per debugging
        window.earthCalendarDB = earthCalendarDB;
    } catch (error) {
        console.error('Errore inizializzazione database:', error);
        
        // Fallback: mostra avviso ma continua
        console.warn('IndexedDB non disponibile, alcune funzionalità saranno limitate');
        window.earthCalendarDB = {
            isInitialized: () => false,
            loadWeek: () => Promise.reject('Database non disponibile'),
            saveDayNotes: () => Promise.resolve(false),
            init: () => Promise.reject('Database non disponibile')
        };
    }
});
