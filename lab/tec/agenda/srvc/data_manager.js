/**
 * data_manager.js - Unified Data Management for The Earth Calendar (TEC)
 * Fixed version for Journal/Goals compatibility.
 * Author: Danilo D'Antonio (ARS/HSR Concept)
 */

var DataManager = {
    modules: [
        { name: 'weekly', dbName: 'EarthCalendarAgenda', storeName: 'weekly_notes' },
        { name: 'septennial', dbName: 'EarthCalendarSeptennial', storeName: 'yearly_notes' },
        { name: 'journal', dbName: 'EarthCalendarJournal', storeName: 'journal_content' },
        { name: 'goals', dbName: 'EarthCalendarGoals', storeName: 'goals_content' }
    ],

    getTECTimestamp: function() {
        var d = new Date();
        var yy = ('0' + (d.getFullYear() - 1969)).slice(-2);
        var mm = ('0' + (d.getMonth() + 1)).slice(-2);
        var dd = ('0' + d.getDate()).slice(-2);
        return yy + mm + dd;
    },

    exportAll: function() {
        var self = this;
        var backup = {
            header: {
                system: "The Earth Calendar",
                concept: "Harmonic Social Rotation (ARS/HSR)",
                author: "Danilo D'Antonio",
                export_tec_date: self.getTECTimestamp(),
                export_epoch: Math.floor(Date.now() / 1000),
                version: "1.1"
            },
            payload: {}
        };

        var promises = this.modules.map(function(mod) {
            return self.fetchStoreData(mod.dbName, mod.storeName).then(function(data) {
                backup.payload[mod.name] = data;
            });
        });

        Promise.all(promises).then(function() {
            var blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'TEC_Backup_' + self.getTECTimestamp() + '.json';
            a.click();
            self.showStatus('Export successful: TEC_' + self.getTECTimestamp());
        }).catch(function(err) {
            console.error('Export error:', err);
            self.showStatus('Export failed!');
        });
    },

    importAll: function(jsonData) {
        var self = this;
        try {
            var data = JSON.parse(jsonData);
            if (!data.payload) throw new Error("Invalid TEC format");

            var promises = this.modules.map(function(mod) {
                if (data.payload[mod.name]) {
                    return self.restoreStoreData(mod.dbName, mod.storeName, data.payload[mod.name]);
                }
            });

            Promise.all(promises).then(function() {
                self.showStatus('Import completed! Reloading...');
                setTimeout(function() { location.reload(); }, 2000);
            });
        } catch (e) {
            self.showStatus('Error: Invalid JSON file');
        }
    },

    fetchStoreData: function(dbName, storeName) {
        return new Promise(function(resolve) {
            var request = indexedDB.open(dbName);
            request.onsuccess = function(e) {
                var db = e.target.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    resolve([]); 
                    return;
                }
                var transaction = db.transaction([storeName], 'readonly');
                var store = transaction.objectStore(storeName);
                
                // Usiamo un cursore per essere sicuri di prendere tutto, 
                // indipendentemente dalla struttura (array o oggetto singolo)
                var allData = [];
                store.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        allData.push(cursor.value);
                        cursor.continue();
                    } else {
                        resolve(allData);
                    }
                };
            };
            request.onerror = function() { resolve([]); };
        });
    },

    restoreStoreData: function(dbName, storeName, items) {
        return new Promise(function(resolve) {
            var request = indexedDB.open(dbName);
            request.onsuccess = function(e) {
                var db = e.target.result;
                var transaction = db.transaction([storeName], 'readwrite');
                var store = transaction.objectStore(storeName);
                store.clear().onsuccess = function() {
                    if (items && items.length > 0) {
                        items.forEach(function(item) { store.put(item); });
                    }
                    resolve();
                };
            };
            request.onerror = function() { resolve(); };
        });
    },

    showStatus: function(msg) {
        var el = document.getElementById('statusMessage');
        if (el) {
            el.textContent = msg;
            el.className = 'show';
            setTimeout(function() { el.className = ''; }, 4000);
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    var expBtn = document.getElementById('exportAllBtn');
    var impBtn = document.getElementById('importAllBtn');
    if (expBtn) expBtn.onclick = function() { DataManager.exportAll(); };
    if (impBtn) impBtn.onclick = function() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = function(e) {
            var reader = new FileReader();
            reader.onload = function() { DataManager.importAll(reader.result); };
            reader.readAsText(e.target.files[0]);
        };
        input.click();
    };
});
