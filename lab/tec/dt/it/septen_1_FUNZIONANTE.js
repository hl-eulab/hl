// septen_1.js - Calcolo dei settennati dal 1969

(function() {
    // Tabella degli ordinali
    const ordinali = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth', 'Twentieth', 'Twenty-first', 'Twenty-second', 'Twenty-third', 'Twenty-fourth', 'Twenty-fifth', 'Twenty-sixth', 'Twenty-seventh', 'Twenty-eighth', 'Twenty-ninth', 'Thirtieth', 'Thirty-first', 'Thirty-second', 'Thirty-third', 'Thirty-fourth', 'Thirty-fifth', 'Thirty-sixth', 'Thirty-seventh', 'Thirty-eighth', 'Thirty-ninth', 'Fortieth', 'Forty-first', 'Forty-second', 'Forty-third', 'Forty-fourth', 'Forty-fifth', 'Forty-sixth', 'Forty-seventh', 'Forty-eighth', 'Forty-ninth', 'Fiftieth', 'Fifty-first', 'Fifty-second', 'Fifty-third', 'Fifty-fourth', 'Fifty-fifth', 'Fifty-sixth', 'Fifty-seventh', 'Fifty-eighth', 'Fifty-ninth', 'Sixtieth', 'Sixty-first', 'Sixty-second', 'Sixty-third', 'Sixty-fourth', 'Sixty-fifth', 'Sixty-sixth', 'Sixty-seventh', 'Sixty-eighth', 'Sixty-ninth', 'Seventieth', 'Seventy-first', 'Seventy-second', 'Seventy-third', 'Seventy-fourth', 'Seventy-fifth', 'Seventy-sixth', 'Seventy-seventh', 'Seventy-eighth', 'Seventy-ninth', 'Eightieth', 'Eighty-first', 'Eighty-second', 'Eighty-third', 'Eighty-fourth', 'Eighty-fifth', 'Eighty-sixth', 'Eighty-seventh', 'Eighty-eighth', 'Eighty-ninth', 'Ninetieth', 'Ninety-first', 'Ninety-second', 'Ninety-third', 'Ninety-fourth', 'Ninety-fifth', 'Ninety-sixth', 'Ninety-seventh', 'Ninety-eighth', 'Ninety-ninth', 'Hundredth'];
    
    // Tabella dei simboli (si ripete ogni 7 settennati)
    const simboli = ['of the Moon', 'of the Atom', 'of the Water', 'of the Wind', 'of the Fire', 'of the Earth', 'of the Sun'];
    
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
