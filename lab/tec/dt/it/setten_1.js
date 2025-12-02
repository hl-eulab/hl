// settenni.js - Calcolo dei settennati dal 1969

(function() {
    // Tabella degli ordinali
    const ordinali = ['Primo', 'Secondo', 'Terzo', 'Quarto', 'Quinto', 'Sesto', 'Settimo', 'Ottavo', 'Nono', 'Decimo', 'Undicesimo', 'Dodicesimo', 'Tredicesimo', 'Quattordicesimo', 'Quindicesimo', 'Sedicesimo', 'Diciassettesimo', 'Diciottesimo', 'Diciannovesimo', 'Ventesimo', 'Ventunesimo', 'Ventiduesimo', 'Ventitreesimo', 'Ventiquattresimo', 'Venticinquesimo', 'Ventiseiesimo', 'Ventisettesimo', 'Ventottesimo', 'Ventinovesimo', 'Trentesimo', 'Trentunesimo', 'Trentaduesimo', 'Trentatreesimo', 'Trentaquattresimo', 'Trentacinquesimo', 'Trentaseiesimo', 'Trentasettesimo', 'Trentottesimo', 'Trentanovesimo', 'Quarantesimo', 'Quarantunesimo', 'Quarantaduesimo', 'Quarantatreesimo', 'Quarantaquattresimo', 'Quarantacinquesimo', 'Quarantaseiesimo', 'Quarantasettesimo', 'Quarantottesimo', 'Quarantanovesimo', 'Cinquantesimo', 'Cinquantunesimo', 'Cinquantaduesimo', 'Cinquantatreesimo', 'Cinquantaquattresimo', 'Cinquantacinquesimo', 'Cinquantaseiesimo', 'Cinquantasettesimo', 'Cinquantottesimo', 'Cinquantanovesimo', 'Sessantesimo', 'Sessantunesimo', 'Sessantaduesimo', 'Sessantatreesimo', 'Sessantaquattresimo', 'Sessantacinquesimo', 'Sessantaseiesimo', 'Sessantasettesimo', 'Sessantottesimo', 'Sessantanovesimo', 'Settantesimo', 'Settantunesimo', 'Settantaduesimo', 'Settantatreesimo', 'Settantaquattresimo', 'Settantacinquesimo', 'Settantaseiesimo', 'Settantasettesimo', 'Settantottesimo', 'Settantanovesimo', 'Ottantesimo', 'Ottantunesimo', 'Ottantaduesimo', 'Ottantatreesimo', 'Ottantaquattresimo', 'Ottantacinquesimo', 'Ottantaseiesimo', 'Ottantasettesimo', 'Ottantottesimo', 'Ottantanovesimo', 'Novantesimo', 'Novantunesimo', 'Novantaduesimo', 'Novantatreesimo', 'Novantaquattresimo', 'Novantacinquesimo', 'Novantaseiesimo', 'Novantasettesimo', 'Novantottesimo', 'Novantanovesimo', 'Centesimo'];
    
    // Tabella dei simboli (si ripete ogni 7 settennati)
    const simboli = ['della Luna', 'dell\'Atomo', 'dell\'Acqua', 'del Vento', 'del Fuoco', 'della Terra', 'del Sole'];
    
    // Anno di partenza
    const annoInizio = 1969;
    
    // Anno corrente
    const annoCorrente = new Date().getFullYear();
    
    // Calcolo degli anni trascorsi
    const anniTrascorsi = annoCorrente - annoInizio;
    
    // Calcolo dei settennati trascorsi (completati)
    const settenniTrascorsi = Math.floor(anniTrascorsi / 7);
    
    // Calcolo del settennio attuale in corso
    const settennioAttuale = settenniTrascorsi + 1;
    
    // Ottieni l'ordinale (sottraiamo 1 perché l'array parte da 0)
    const settennioOrdinale = ordinali[settennioAttuale - 1] || settennioAttuale + '°';
    
    // Ottieni il simbolo (usa il modulo per far ripetere il ciclo ogni 7 settennati)
    const indiceSimbolo = (settennioAttuale - 1) % 7;
    const settennioSimbolo = simboli[indiceSimbolo];
    
    // Inserimento dei valori negli elementi HTML
    window.addEventListener('DOMContentLoaded', function() {
        const elemTrascorsi = document.getElementById('settenniTrascorsi');
        const elemAttuale = document.getElementById('settennioAttuale');
        const elemOrdinale = document.getElementById('settennioOrdinale');
        const elemSimbolo = document.getElementById('settennioSimbolo');
        
        if (elemTrascorsi) {
            elemTrascorsi.textContent = settenniTrascorsi;
        }
        
        if (elemAttuale) {
            elemAttuale.textContent = settennioAttuale;
        }
        
        if (elemOrdinale) {
            elemOrdinale.textContent = settennioOrdinale;
        }
        
        if (elemSimbolo) {
            elemSimbolo.textContent = settennioSimbolo;
        }
    });
    
    // Esporto i valori come proprietà globali per eventuali altri usi
    window.settenniData = {
        trascorsi: settenniTrascorsi,
        attuale: settennioAttuale,
        ordinale: settennioOrdinale,
        simbolo: settennioSimbolo,
        annoInizio: annoInizio,
        annoCorrente: annoCorrente
    };
})();
