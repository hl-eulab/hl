
// Calcolo del Settennio ne "The Earth Calendar" con relativa evocazione
function calcolaDedicaSettennio() {
    // Anno di inizio della Nuova Era (Anno 0)
    const ANNO_EPOCH = 1969;
    // Temi fondamentali che ruotano per i Septennia
    const DEDICHE = ['of the Moon', 'of the Atom', 'of the Water', 'of the Wind', 'of the Fire', 'of the Earth', 'of the Sun'];
    
    // Array dei numeri ordinali
    const ORDINALI = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth', 'Twentieth', 'Twenty-first', 'Twenty-second', 'Twenty-third', 'Twenty-fourth', 'Twenty-fifth', 'Twenty-sixth', 'Twenty-seventh', 'Twenty-eighth', 'Twenty-ninth', 'Thirtieth', 'Thirty-first', 'Thirty-second', 'Thirty-third', 'Thirty-fourth', 'Thirty-fifth', 'Thirty-sixth', 'Thirty-seventh', 'Thirty-eighth', 'Thirty-ninth', 'Fortieth', 'Forty-first', 'Forty-second', 'Forty-third', 'Forty-fourth', 'Forty-fifth', 'Forty-sixth', 'Forty-seventh', 'Forty-eighth', 'Forty-ninth', 'Fiftieth', 'Fifty-first', 'Fifty-second', 'Fifty-third', 'Fifty-fourth', 'Fifty-fifth', 'Fifty-sixth', 'Fifty-seventh', 'Fifty-eighth', 'Fifty-ninth', 'Sixtieth', 'Sixty-first', 'Sixty-second', 'Sixty-third', 'Sixty-fourth', 'Sixty-fifth', 'Sixty-sixth', 'Sixty-seventh', 'Sixty-eighth', 'Sixty-ninth', 'Seventieth', 'Seventy-first', 'Seventy-second', 'Seventy-third', 'Seventy-fourth', 'Seventy-fifth', 'Seventy-sixth', 'Seventy-seventh', 'Seventy-eighth', 'Seventy-ninth', 'Eightieth', 'Eighty-first', 'Eighty-second', 'Eighty-third', 'Eighty-fourth', 'Eighty-fifth', 'Eighty-sixth', 'Eighty-seventh', 'Eighty-eighth', 'Eighty-ninth', 'Ninetieth', 'Ninety-first', 'Ninety-second', 'Ninety-third', 'Ninety-fourth', 'Ninety-fifth', 'Ninety-sixth', 'Ninety-seventh', 'Ninety-eighth', 'Ninety-ninth', 'Hundredth'];
    
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
    const risult_1 = `${ordinaleSettennio} Septennium`;
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

