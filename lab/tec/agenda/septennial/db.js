// db.js - Gestione database IndexedDB per The Earth Calendar Agenda
// VERSIONE TEC: usa solo date TEC, non ISO

class EarthCalendarDB {
    constructor() {
        this.db = null;
        this.dbName = 'EarthCalendarAgenda';
        this.dbVersion = 2; // INCREMENTATO per aggiornamento schema
        this.storeName = 'weekly_notes';
        
        // Debounce per salvataggio automatico
        this.saveTimeout = null;
        this.DEBOUNCE_DELAY = 2000;
        
        // Cache
        this.currentWeekCache = null;
        this.currentWeekKey = null;
        
        // Flag
        this.initialized = false;
    }
    
    // ===== INIZIALIZZAZIONE =====
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
                console.log('Database TEC inizializzato');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                const oldVersion = event.oldVersion;
                
                // Migrazione da v1 a v2: cambia schema per date TEC
                if (oldVersion < 2) {
                    // Elimina store vecchio se esiste
                    if (db.objectStoreNames.contains(this.storeName)) {
                        db.deleteObjectStore(this.storeName);
                    }
                }
                
                // Crea nuovo store con schema TEC
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const store = db.createObjectStore(this.storeName, { keyPath: 'key' });
                    
                    // Indici per ricerca TEC
                    store.createIndex('tec_year_week', ['yearTEC', 'weekNumber'], { unique: true });
                    store.createIndex('tec_startDate', 'tecStartDate', { unique: false });
                    
                    console.log('Object store TEC creato');
                }
            };
        });
    }
    
    // ===== UTILITÀ TEC =====
    
    // Chiave settimana TEC: "YY-WW"
    getWeekKey(date = new Date()) {
        const weekInfo = TEC.getWeekInfo(date);
        return weekInfo.weekKey;
    }
    
    // Crea settimana vuota TEC
    createEmptyWeek(startDate) {
        const weekInfo = TEC.getWeekInfo(startDate);
        const days = {};
        const date = new Date(startDate);
        
        // Crea 7 giorni con chiavi TEC
        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(date);
            currentDay.setDate(date.getDate() + i);
            
            const tecDateKey = TEC.getTECDateKey(currentDay);
            
            days[tecDateKey] = {
                notes: '',
                charCount: 0,
                lastModified: null,
                saved: true,
                // Backup gregoriano per compatibilità
                gregorianDate: currentDay.toISOString().split('T')[0]
            };
        }
        
        return {
            key: weekInfo.weekKey,
            yearTEC: weekInfo.yearTEC,
            weekNumber: weekInfo.weekNumber,
            tecStartDate: weekInfo.tecMondayKey, // Data TEC del Moonday
            gregorianStartDate: startDate.toISOString().split('T')[0],
            days: days,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }
    
    // ===== OPERAZIONI CRUD =====
    
    // Salva/aggiorna settimana TEC
    async saveWeek(weekData) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database non inizializzato'));
                return;
            }
            
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            
            weekData.updatedAt = new Date().toISOString();
            
            const request = store.put(weekData);
            
            request.onsuccess = () => {
                console.log('Settimana TEC salvata:', weekData.key);
                resolve(weekData.key);
            };
            
            request.onerror = (event) => {
                console.error('Errore salvataggio:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // Carica settimana TEC per data
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
                
                // Se non esiste, crea nuova settimana TEC
                if (!weekData) {
                    const monday = TEC.getMondayOfWeek(date);
                    weekData = this.createEmptyWeek(monday);
                    
                    try {
                        await this.saveWeek(weekData);
                        console.log('Nuova settimana TEC creata:', weekKey);
                    } catch (saveError) {
                        console.warn('Non salvato nel DB, ma disponibile in memoria:', saveError);
                    }
                    
                    this.currentWeekCache = weekData;
                    this.currentWeekKey = weekKey;
                    resolve(weekData);
                } else {
                    this.currentWeekCache = weekData;
                    this.currentWeekKey = weekKey;
                    resolve(weekData);
                }
            };
            
            request.onerror = (event) => {
                console.error('Errore caricamento:', event.target.error);
                reject(event.target.error);
            };
        });
    }
    
    // Salva note per giorno TEC (con debounce)
    async saveDayNotes(tecDateKey, notes) {
        // tecDateKey: "DD-MM-YY"
        
        // Debounce
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        
        return new Promise((resolve) => {
            this.saveTimeout = setTimeout(async () => {
                try {
                    const dateObj = TEC.parseTECDateKey(tecDateKey);
                    const weekData = await this.loadWeek(dateObj);
                    
                    if (weekData.days[tecDateKey]) {
                        weekData.days[tecDateKey].notes = notes;
                        weekData.days[tecDateKey].charCount = notes.length;
                        weekData.days[tecDateKey].lastModified = new Date().toISOString();
                        weekData.days[tecDateKey].saved = false;
                        
                        await this.saveWeek(weekData);
                        
                        this.currentWeekCache = weekData;
                        weekData.days[tecDateKey].saved = true;
                        
                        console.log(`Note TEC salvate per ${tecDateKey}`);
                        resolve(true);
                    } else {
                        console.error(`Giorno TEC non trovato: ${tecDateKey}`);
                        resolve(false);
                    }
                } catch (error) {
                    console.error('Errore salvataggio note TEC:', error);
                    resolve(false);
                }
            }, this.DEBOUNCE_DELAY);
        });
    }
    
    // ===== ESPORTAZIONE/IMPORTAZIONE =====
    
    // Esporta tutto come JSON
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
                tecBased: true, // Flag che indica dati TEC
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
                reject(event.target.error);
            };
        });
    }
    
    // Importa dati TEC
    async importAllData(jsonData) {
        return new Promise(async (resolve, reject) => {
            if (!this.db) {
                reject(new Error('Database non inizializzato'));
                return;
            }
            
            try {
                const data = JSON.parse(jsonData);
                
                if (!data.weeks || !Array.isArray(data.weeks)) {
                    throw new Error('Formato JSON non valido');
                }
                
                // Cancella tutto
                await this.clearDatabase();
                
                const transaction = this.db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                
                let importCount = 0;
                
                data.weeks.forEach((week) => {
                    const request = store.put(week);
                    request.onsuccess = () => importCount++;
                });
                
                transaction.oncomplete = () => {
                    console.log(`Import TEC: ${importCount} settimane`);
                    resolve({ imported: importCount });
                };
                
                transaction.onerror = reject;
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // Cancella database
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
                this.currentWeekCache = null;
                this.currentWeekKey = null;
                resolve();
            };
            
            request.onerror = reject;
        });
    }
    
    // ===== STATISTICHE =====
    
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
                    
                    Object.values(week.days).forEach(day => {
                        if (day.notes && day.notes.trim().length > 0) {
                            stats.totalNotes++;
                            stats.totalCharacters += day.charCount;
                        }
                        
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
            
            request.onerror = reject;
        });
    }
    
    isInitialized() {
        return this.initialized && this.db !== null;
    }
}

// Istanza globale
const earthCalendarDB = new EarthCalendarDB();

// Inizializza automaticamente
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await earthCalendarDB.init();
        console.log('Earth Calendar DB TEC pronto');
        window.earthCalendarDB = earthCalendarDB;
    } catch (error) {
        console.error('Errore inizializzazione DB TEC:', error);
        
        // Fallback
        window.earthCalendarDB = {
            isInitialized: () => false,
            loadWeek: () => Promise.reject('Database TEC non disponibile'),
            saveDayNotes: () => Promise.resolve(false),
            init: () => Promise.reject('Database TEC non disponibile')
        };
    }
});
