// septen_1.js - Calcolo dei settenni dal 1969

(function() {
    // Tabella dei numeri cardinali (in lettere) da 1 a 100
    const cardinali = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seventh', 'thirty-eighth', 'thirty-ninth', 'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'forty-nine', 'fifty', 'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seventh', 'fifty-eighth', 'fifty-ninth', 'sixty', 'sixty-one', 'sixty-two', 'sixty-three', 'sixty-four', 'sixty-five', 'sixty-six', 'sixty-seventh', 'sixty-eighth', 'sixty-ninth', 'seventy', 'seventy-one', 'seventy-two', 'seventy-three', 'seventy-four', 'seventy-five', 'seventy-six', 'seventy-seven', 'seventy-eight', 'seventy-nine', 'eighty', 'eighty-one', 'eighty-two', 'eighty-three', 'eighty-four', 'eighty-five', 'eighty-six', 'eighty-seven', 'eighty-eight', 'eighty-nine', 'ninety', 'ninety-one', 'ninety-two', 'ninety-three', 'ninety-four', 'ninety-five', 'ninety-six', 'ninety-seven', 'ninety-eight', 'ninety-nine', 'one hundred'];
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
    const settenniTrascorsi = Math.floor(anniTrascorsi / 7); // 8
    
    // Ottieni il cardinale in lettere dei settenni trascorsi (es. "Eight")
    const settennioCardinale = cardinali[settenniTrascorsi - 1] || settenniTrascorsi;
    
    // Calcolo del settennio attuale in corso
    const settennioAttuale = settenniTrascorsi + 1; // 9
    
    // Ottieni l'ordinale in lettere del settennio in corso (es. "Ninth")
    const settennioOrdinale = ordinali[settennioAttuale - 1] || settennioAttuale;
    
    // Ottieni il simbolo (usa il modulo per far ripetere il ciclo ogni 7 settennati)
    const indiceSimbolo = (settennioAttuale - 1) % 7;
    const settennioSimbolo = simboli[indiceSimbolo];
    
    // Inserimento dei valori negli elementi HTML
    window.addEventListener('DOMContentLoaded', function() {
        const elemCardinale = document.getElementById('settennioCardinale');
        const elemOrdinale = document.getElementById('settennioOrdinale');
        const elemSimbolo = document.getElementById('settennioSimbolo');
        
        // Assegna il cardinale ("Eight") all'ID che rappresenta i settenni trascorsi
        if (elemCardinale) {
            elemCardinale.textContent = settennioCardinale;
        }
        
        // Assegna l'ordinale ("Ninth") all'ID che rappresenta il settennio in corso
        if (elemOrdinale) {
            elemOrdinale.textContent = settennioOrdinale;
        }
        
        if (elemSimbolo) {
            elemSimbolo.textContent = settennioSimbolo;
        }
    });
    
    // Esporto i valori come proprietà globali per eventuali altri usi
    window.settenniData = {
        cardinale: settennioCardinale,
        ordinale: settennioOrdinale,
        simbolo: settennioSimbolo,
    };
})();
