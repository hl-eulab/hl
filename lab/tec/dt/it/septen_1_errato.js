// septen_1.js - Calcolo dei settennati dal 1969

(function() {
    // Tabella dei numeri cardinali (in lettere) da 1 a 100
    const cardinali = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Twenty-one', 'Twenty-two', 'Twenty-three', 'Twenty-four', 'Twenty-fifth', 'Twenty-sixth', 'Twenty-seventh', 'Twenty-eighth', 'Twenty-ninth', 'Thirty', 'Thirty-one', 'Thirty-two', 'Thirty-three', 'Thirty-four', 'Thirty-five', 'Thirty-six', 'Thirty-seven', 'Thirty-eighth', 'Thirty-ninth', 'Forty', 'Forty-one', 'Forty-two', 'Forty-three', 'Forty-four', 'Forty-five', 'Forty-six', 'Forty-seven', 'Forty-eighth', 'Forty-ninth', 'Fifty', 'Fifty-one', 'Fifty-two', 'Fifty-three', 'Fifty-four', 'Fifty-five', 'Fifty-six', 'Fifty-seventh', 'Fifty-eighth', 'Fifty-ninth', 'Sixty', 'Sixty-one', 'Sixty-two', 'Sixty-three', 'Sixty-four', 'Sixty-five', 'Sixty-six', 'Sixty-seventh', 'Sixty-eighth', 'Sixty-ninth', 'Seventy', 'Seventy-one', 'Seventy-two', 'Seventy-three', 'Seventy-four', 'Seventy-five', 'Seventy-six', 'Seventy-seven', 'Seventy-eight', 'Seventy-nine', 'Eighty', 'Eighty-one', 'Eighty-two', 'Eighty-three', 'Eighty-four', 'Eighty-five', 'Eighty-six', 'Eighty-seven', 'Eighty-eight', 'Eighty-nine', 'Ninety', 'Ninety-one', 'Ninety-two', 'Ninety-three', 'Ninety-four', 'Ninety-five', 'Ninety-six', 'Ninety-seven', 'Ninety-eight', 'Ninety-nine', 'One hundred'];
    
    // Tabella degli ordinali (mantenuta per altri elementi)
    const ordinali = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth', 'Twentieth', 'Twenty-first', 'Twenty-second', 'Twenty-third', 'Twenty-fourth', 'Twenty-fifth', 'Twenty-sixth', 'Twenty-seventh', 'Twenty-eighth', 'Twenty-ninth', 'Thirtieth', 'Thirty-first', 'Thirty-second', 'Thirty-third', 'Thirty-fourth', 'Thirty-fifth', 'Thirty-sixth', 'Thirty-seventh', 'Thirty-eighth', 'Thirty-ninth', 'Fortieth', 'Forty-first', 'Forty-second', 'Forty-third', 'Forty-fourth', 'Forty-fifth', 'Forty-sixth', 'Forty-seventh', 'Forty-eighth', 'Forty-ninth', 'Fiftieth', 'Fifty-first', 'Fifty-second', 'Fifty-third', 'Fifty-fourth', 'Fifty-fifth', 'Fifty-sixth', 'Fifty-seventh', 'Fifty-eighth', 'Fifty-ninth', 'Sixtieth', 'Sixty-first', 'Sixty-second', 'Sixty-third', 'Sixty-fourth', 'Sixty-fifth', 'Sixty-sixth', 'Sixty-seventh', 'Sixty-eighth', 'Sixty-ninth', 'Seventieth', 'Seventy-first', 'Seventy-second', 'Seventy-third', 'Seventy-fourth', 'Seventy-fifth', 'Seventy-sixth', 'Seventy-seventh', 'Seventy-eighth', 'Seventy-ninth', 'Eightieth', 'Eighty-first', 'Eighty-second', 'Eighty-third', 'Eighty-fourth', 'Eighty-fifth', 'Eighty-sixth', 'Eighty-seventh', 'Eighty-eighth', 'Eighty-ninth', 'Ninetieth', 'Ninety-first', 'Ninety-second', 'Ninety-third', 'Ninety-fourth', 'Ninety-fifth', 'Ninety-sixth', 'Ninety-seventh', 'Ninety-eighth', 'Ninety-ninth', 'Hundredth'];
    
    // Simboli dei settenni (della Luna, dell'Atomo, ecc.)
    const simboli = ['of the Moon', 'of the Atom', 'of the Water', 'of the Wind', 'of the Fire', 'of the Earth', 'of the Sun'];

    // Impostazioni
    const ANNO_ZERO = 1969;
    const today = new Date();
    
    // Calcolo dell'anno attuale e dei settenni
    const annoCorrente = today.getFullYear();
    const anniTrascorsi = annoCorrente - ANNO_ZERO;
    
    // settennioAttuale: il settennio in corso (es. 9)
    const settennioAttuale = Math.ceil(anniTrascorsi / 7);
    
    // settenniTrascorsi: i settenni completati (es. 8)
    const settenniTrascorsi = settennioAttuale - 1;
    
    // settennioOrdinale: l'ordinale del settennio in corso (es. "Ninth")
    const settennioOrdinale = ordinali[settennioAttuale - 1] || settennioAttuale + '°';
    
    // FIX: Otteniamo il numero cardinale in lettere (es. "Eight") per i settenni COMPLETI (8)
    // L'array è a base zero, quindi usiamo settenniTrascorsi - 1
    const settenniTrascorsiCardinale = cardinali[settenniTrascorsi - 1] || settenniTrascorsi;
    
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
            // USIAMO IL VALORE CARDINALE IN LETTERE DEI SETTENNI TRASCORSI (es. "Eight")
            elemTrascorsi.textContent = settenniTrascorsiCardinale; 
        }
        
        if (elemAttuale) {
            elemAttuale.textContent = settennioAttuale; // Mostra 9
        }
        
        if (elemOrdinale) {
            elemOrdinale.textContent = settennioOrdinale; // Mostra "Ninth"
        }
        
        if (elemSimbolo) {
            elemSimbolo.textContent = settennioSimbolo;
        }
    });
    
    // Esporto i valori come proprietà globali per eventuali altri usi
    window.settenniData = {
        // Esporta il valore cardinale in lettere dei settenni completati (es. "Eight")
        trascorsi: settenniTrascorsiCardinale,
        attuale: settennioAttuale,
        ordinale: settennioOrdinale,
        simbolo: settennioSimbolo
    };
})();
