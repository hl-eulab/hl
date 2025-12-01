

// Calcolo del Settennio ne "Il Calendario della Terra" con relativo simbolo

function calcolaDedicaSettennio() {
    // Anno di inizio della Nuova Era (Anno 0)
    const ANNO_EPOCH = 1969;

    // Temi fondamentali che ruotano per i Septennia
    const ARS_TEMI = ['Luna', 'Atomo', 'Acqua', 'Vento', 'Fuoco', 'Terra', 'Sole'];

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
    const temaSettennio = ARS_TEMI[septenniumIndex];

    // 4. Formatta il risultato
    const risultato = `${numeroSettennio}° dell'${temaSettennio} (${annoCorrente} = Anno NE ${annoNE}).`;

    // Stampa il risultato direttamente nella pagina
    document.write(`<div style="font-family: Arial, sans-serif; font-size: 16px; padding: 10px; background-color: white;">
        <span style="font-weight: bold; color: black;">Settennio:</span> ${risultato}
    </div>`);
}

// Esegui la funzione
calcolaDedicaSettennio();



