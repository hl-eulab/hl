// tec_date.js - The Earth Calendar Date Calculator
// Versione modificata senza document.write()

const TEC = {
    getFormattedDate: function(date = new Date()) {
        const today = date;
        const oey = today.getFullYear();
        const ney = oey - 1969;
        const yos = ney % 7;
        
        const noy = ["of the Moon", "of the Atom", "of the Water", "of the Wind", 
                    "of the Fire", "of the Earth", "of the Sun"];
        
        const moy = ["First month", "Second month", "Third month", "Fourth month", 
                    "Fifth month", "Sixth month", "Seventh month", "Eighth month", 
                    "Ninth month", "Tenth month", "Eleventh month", "Twelfth month"];
        
        const dow = ["Sunday", "Moonday", "Atomday", "Waterday", "Winday", "Fireday", "Earthday"];
        
        return {
            formatted: dow[today.getDay()] + " " + today.getDate() + ", " + 
                      moy[today.getMonth()] + ", year " + ney + ", " + noy[yos],
            dayName: dow[today.getDay()],
            dayNumber: today.getDate(),
            monthName: moy[today.getMonth()],
            year: ney,
            septennium: noy[yos],
            date: today
        };
    },
    
    getDateForDay: function(date) {
        return this.getFormattedDate(date);
    }
};

// Per compatibilità con codice esistente
if (typeof window !== 'undefined') {
    window.TEC = TEC;
}
