
// Calcolo del Settennio ne "Il Calendario della Terra" con relativo simbolo

function calcolaDedicaSettennio() {
    // Anno di inizio della Nuova Era (Anno 0)
    const ANNO_EPOCH = 1969;

    // Temi fondamentali che ruotano per i Septennia
    const DEDICHE = ['della Luna', 'dell\'Atomo', 'dell\'Acqua', 'del Vento', 'del Fuoco', 'della Terra', 'del Sole'];
    
    // Array dei numeri ordinali
    const ORDINALI = ['Primo', 'Secondo', 'Terzo', 'Quarto', 'Quinto', 'Sesto', 'Settimo', 'Ottavo', 'Nono', 'Decimo', 'Undicesimo', 'Dodicesimo', 'Tredicesimo', 'Quattordicesimo', 'Quindicesimo', 'Sedicesimo', 'Diciassettesimo', 'Diciottesimo', 'Diciannovesimo', 'Ventesimo', 'Ventunesimo', 'Ventiduesimo', 'Ventitreesimo', 'Ventiquattresimo', 'Venticinquesimo', 'Ventiseiesimo', 'Ventisettesimo', 'Ventottesimo', 'Ventinovesimo', 'Trentesimo', 'Trentunesimo', 'Trentaduesimo', 'Trentatreesimo', 'Trentaquattresimo', 'Trentacinquesimo', 'Trentaseiesimo', 'Trentasettesimo', 'Trentottesimo', 'Trentanovesimo', 'Quarantesimo', 'Quarantunesimo', 'Quarantaduesimo', 'Quarantatreesimo', 'Quarantaquattresimo', 'Quarantacinquesimo', 'Quarantaseiesimo', 'Quarantasettesimo', 'Quarantottesimo', 'Quarantanovesimo', 'Cinquantesimo', 'Cinquantunesimo', 'Cinquantaduesimo', 'Cinquantatreesimo', 'Cinquantaquattresimo', 'Cinquantacinquesimo', 'Cinquantaseiesimo', 'Cinquantasettesimo', 'Cinquantottesimo', 'Cinquantanovesimo', 'Sessantesimo', 'Sessantunesimo', 'Sessantaduesimo', 'Sessantatreesimo', 'Sessantaquattresimo', 'Sessantacinquesimo', 'Sessantaseiesimo', 'Sessantasettesimo', 'Sessantottesimo', 'Sessantanovesimo', 'Settantesimo', 'Settantunesimo', 'Settantaduesimo', 'Settantatreesimo', 'Settantaquattresimo', 'Settantacinquesimo', 'Settantaseiesimo', 'Settantasettesimo', 'Settantottesimo', 'Settantanovesimo', 'Ottantesimo', 'Ottantunesimo', 'Ottantaduesimo', 'Ottantatreesimo', 'Ottantaquattresimo', 'Ottantacinquesimo', 'Ottantaseiesimo', 'Ottantasettesimo', 'Ottantottesimo', 'Ottantanovesimo', 'Novantesimo', 'Novantunesimo', 'Novantaduesimo', 'Novantatreesimo', 'Novantaquattresimo', 'Novantacinquesimo', 'Novantaseiesimo', 'Novantasettesimo', 'Novantottesimo', 'Novantanovesimo', 'Centesimo'];
    
    // 1. Dati di Partenza
    const annoCorrente = new Date().getFullYear();
    const annoNE = annoCorrente - ANNO_EPOCH; // Esempio: 2025 - 1969 = 56

    // 2. Determinazione del Numero Progressivo del Settennio
    // Settennio 1 = Anni NE 0-6. Settennio 9 = Anni NE 56-62.
    const numeroSettennio = Math.floor(annoNE / 7) + 1; // Esempio: Math.floor(56/7) + 1 = 9

    // 3. Determinazione del simbolo del Settennio
    // Usiamo (numeroSettennio - 1) per avere l'indice 0 per il 1° Settennio.
    // Esempio: (9 - 1) % 7 = 1. L'indice 1 corrisponde a 'Atomo'.
    const septenniumIndex = (numeroSettennio - 1) % 7;
    const temaSettennio = DEDICHE[septenniumIndex];

    // 4. Ottieni l'ordinale corrispondente
    const ordinaleSettennio = ORDINALI[numeroSettennio - 1]; // -1 perché l'array parte da 0

    // 5. Formatta il risultato
    const risultato = `${ordinaleSettennio} Settennio, ${temaSettennio}, della Nuova Era Terrestre`;

    // Stampa il risultato direttamente nella pagina
    document.write(`${risultato}`);
}
// Esegui la funzione
calcolaDedicaSettennio();


