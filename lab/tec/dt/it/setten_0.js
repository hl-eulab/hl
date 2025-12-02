
// Calcolo del Settennio ne "Il Calendario della Terra" con relativa evocazione
function calcolaDedicaSettennio() {
    // Anno di inizio della Nuova Era (Anno 0)
    const ANNO_EPOCH = 1969;
    // Temi fondamentali che ruotano per i Septennia
    const DEDICHE = ['della Luna', 'dell\'Atomo', 'dell\'Acqua', 'del Vento', 'del Fuoco', 'della Terra', 'del Sole'];
    
    // Array dei numeri ordinali
    const ORDINALI = ['Primo', 'Secondo', 'Terzo', 'Quarto', 'Quinto', 'Sesto', 'Settimo', 'Ottavo', 'Nono', 'Decimo', 'Undicesimo', 'Dodicesimo', 'Tredicesimo', 'Quattordicesimo', 'Quindicesimo', 'Sedicesimo', 'Diciassettesimo', 'Diciottesimo', 'Diciannovesimo', 'Ventesimo', 'Ventunesimo', 'Ventiduesimo', 'Ventitreesimo', 'Ventiquattresimo', 'Venticinquesimo', 'Ventiseiesimo', 'Ventisettesimo', 'Ventottesimo', 'Ventinovesimo', 'Trentesimo', 'Trentunesimo', 'Trentaduesimo', 'Trentatreesimo', 'Trentaquattresimo', 'Trentacinquesimo', 'Trentaseiesimo', 'Trentasettesimo', 'Trentottesimo', 'Trentanovesimo', 'Quarantesimo', 'Quarantunesimo', 'Quarantaduesimo', 'Quarantatreesimo', 'Quarantaquattresimo', 'Quarantacinquesimo', 'Quarantaseiesimo', 'Quarantasettesimo', 'Quarantottesimo', 'Quarantanovesimo', 'Cinquantesimo', 'Cinquantunesimo', 'Cinquantaduesimo', 'Cinquantatreesimo', 'Cinquantaquattresimo', 'Cinquantacinquesimo', 'Cinquantaseiesimo', 'Cinquantasettesimo', 'Cinquantottesimo', 'Cinquantanovesimo', 'Sessantesimo', 'Sessantunesimo', 'Sessantaduesimo', 'Sessantatreesimo', 'Sessantaquattresimo', 'Sessantacinquesimo', 'Sessantaseiesimo', 'Sessantasettesimo', 'Sessantottesimo', 'Sessantanovesimo', 'Settantesimo', 'Settantunesimo', 'Settantaduesimo', 'Settantatreesimo', 'Settantaquattresimo', 'Settantacinquesimo', 'Settantaseiesimo', 'Settantasettesimo', 'Settantottesimo', 'Settantanovesimo', 'Ottantesimo', 'Ottantunesimo', 'Ottantaduesimo', 'Ottantatreesimo', 'Ottantaquattresimo', 'Ottantacinquesimo', 'Ottantaseiesimo', 'Ottantasettesimo', 'Ottantottesimo', 'Ottantanovesimo', 'Novantesimo', 'Novantunesimo', 'Novantaduesimo', 'Novantatreesimo', 'Novantaquattresimo', 'Novantacinquesimo', 'Novantaseiesimo', 'Novantasettesimo', 'Novantottesimo', 'Novantanovesimo', 'Centesimo'];
    
    // 1. Dati di Partenza
    const annoCorrente = new Date().getFullYear();
    const annoNE = annoCorrente - ANNO_EPOCH;
    
    // 2. Determinazione del Numero Progressivo del Settennio
    const numeroSettennio = Math.floor(annoNE / 7) + 1;
    
    // 3. Determinazione del simbolo del Settennio
    const septenniumIndex = (numeroSettennio - 1) % 7;
    const temaSettennio = DEDICHE[septenniumIndex];
    
    // 4. Ottieni l'ordinale corrispondente
    const ordinaleSettennio = ORDINALI[numeroSettennio - 1];
    
    // 5. Formatta il risultato
    const risult_1 = `${ordinaleSettennio} Settennio`;
    const risult_2 = `${temaSettennio}`;
    
    // Inserisci i valori negli elementi HTML
    const elemRisult1 = document.getElementById('risult_1');
    const elemRisult2 = document.getElementById('risult_2');
    
    if (elemRisult1) {
        elemRisult1.textContent = risult_1;
    }
    
    if (elemRisult2) {
        elemRisult2.textContent = risult_2;
    }
}

// Esegui la funzione quando il DOM è pronto
window.addEventListener('DOMContentLoaded', calcolaDedicaSettennio);

