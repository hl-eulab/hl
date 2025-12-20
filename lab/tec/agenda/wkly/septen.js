// septen.js - Calcolo del Settennio nel "The Earth Calendar"
// VERSIONE SEMPLIFICATA: solo calcolo base

function calcolaDedicaSettennio() {
    var ANNO_EPOCH = 1969;
    
    var DEDICHE = [
        'of the Moon', 
        'of the Atom', 
        'of the Water', 
        'of the Wind', 
        'of the Fire', 
        'of the Earth', 
        'of the Sun'
    ];
    
    var ORDINALI = [
        'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 
        'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 
        'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 
        'Nineteenth', 'Twentieth', 'Twenty-first', 'Twenty-second', 
        'Twenty-third', 'Twenty-fourth', 'Twenty-fifth', 'Twenty-sixth', 
        'Twenty-seventh', 'Twenty-eighth', 'Twenty-ninth', 'Thirtieth',
        'Thirty-first', 'Thirty-second', 'Thirty-third', 'Thirty-fourth', 
        'Thirty-fifth', 'Thirty-sixth', 'Thirty-seventh', 'Thirty-eighth', 
        'Thirty-ninth', 'Fortieth', 'Forty-first', 'Forty-second', 
        'Forty-third', 'Forty-fourth', 'Forty-fifth', 'Forty-sixth', 
        'Forty-seventh', 'Forty-eighth', 'Forty-ninth', 'Fiftieth'
    ];
    
    // Calcolo
    var annoCorrente = new Date().getFullYear();
    var annoNE = annoCorrente - ANNO_EPOCH;
    var numeroSettennio = Math.floor(annoNE / 7) + 1;
    var septenniumIndex = (numeroSettennio - 1) % 7;
    var temaSettennio = DEDICHE[septenniumIndex];
    var ordinaleSettennio = ORDINALI[numeroSettennio - 1] || (numeroSettennio + 'th');
    
    // Risultati
    var risult_1 = ordinaleSettennio + ' Septennium';
    var risult_2 = temaSettennio;
    
    // Inserisci nei DOM (se esistono)
    var elemRisult1 = document.getElementById('risult_1');
    var elemRisult2 = document.getElementById('risult_2');
    
    if (elemRisult1) {
        elemRisult1.textContent = risult_1;
    }
    
    if (elemRisult2) {
        elemRisult2.textContent = risult_2;
    }
    
    return {
        septennium: risult_1,
        theme: risult_2
    };
}

// Esegui quando DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', calcolaDedicaSettennio);
} else {
    calcolaDedicaSettennio();
}
