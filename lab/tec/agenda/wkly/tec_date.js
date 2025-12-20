// tec_date.js - The Earth Calendar Date Calculator
// VERSIONE SEMPLIFICATA: solo funzioni essenziali

var TEC = {
    
    // Formatta data completa TEC
    getFormattedDate: function(date) {
        date = date || new Date();
        
        var oey = date.getFullYear();
        var ney = oey - 1969; // Anno Nuova Era
        var yos = ney % 7;    // Year of Septennium (0-6)
        
        // Temi del settennio
        var noy = ["of the Moon", "of the Atom", "of the Water", "of the Wind", 
                   "of the Fire", "of the Earth", "of the Sun"];
        
        // Mesi TEC
        var moy = ["First month", "Second month", "Third month", "Fourth month", 
                   "Fifth month", "Sixth month", "Seventh month", "Eighth month", 
                   "Ninth month", "Tenth month", "Eleventh month", "Twelfth month"];
        
        // Giorni TEC: Moonday-first
        var dow = ["Moonday", "Atomday", "Waterday", "Winday", 
                   "Fireday", "Earthday", "Sunday"];
        
        // Converti giorno JavaScript (0=Sun) a giorno TEC (0=Mon)
        var jsDay = date.getDay();
        var tecDay = (jsDay + 6) % 7;
        
        return {
            formatted: dow[tecDay] + " " + date.getDate() + ", " + 
                      moy[date.getMonth()] + ", year " + ney + ", " + noy[yos],
            
            dayName: dow[tecDay],
            dayNumber: date.getDate(),
            monthName: moy[date.getMonth()],
            year: ney,
            septennium: noy[yos],
            date: date,
            tecDayIndex: tecDay,
            jsDayIndex: jsDay
        };
    },
    
    // Ottieni il Moonday della settimana TEC
    getMondayOfWeek: function(date) {
        date = date || new Date();
        var d = new Date(date.getTime());
        var jsDay = d.getDay();
        var tecDay = (jsDay + 6) % 7;
        
        d.setDate(d.getDate() - tecDay);
        return d;
    },
    
    // Genera chiave data TEC (DD-MM-YY)
    getTECDateKey: function(date) {
        date = date || new Date();
        var d = new Date(date.getTime());
        var day = ('0' + d.getDate()).slice(-2);
        var month = ('0' + (d.getMonth() + 1)).slice(-2);
        var year = ('0' + (d.getFullYear() - 1969)).slice(-2);
        return day + '-' + month + '-' + year;
    },
    
    // Parsing chiave TEC in Date object
    parseTECDateKey: function(tecDateKey) {
        var parts = tecDateKey.split('-');
        if (parts.length !== 3) return new Date();
        
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1;
        var year = 1969 + parseInt(parts[2], 10);
        
        return new Date(year, month, day);
    },
    
    // Info settimana TEC
    getWeekInfo: function(date) {
        date = date || new Date();
        var monday = this.getMondayOfWeek(date);
        var tecDateKey = this.getTECDateKey(monday);
        
        // Calcolo numero settimana
        var startOfYear = new Date(monday.getFullYear(), 0, 1);
        var dayOfYear = Math.floor((monday - startOfYear) / 86400000) + 1;
        var weekNumber = Math.ceil(dayOfYear / 7);
        
        var yearTEC = monday.getFullYear() - 1969;
        
        return {
            monday: monday,
            tecMondayKey: tecDateKey,
            yearTEC: yearTEC,
            weekNumber: weekNumber,
            weekKey: ('0' + yearTEC).slice(-2) + '-' + ('0' + weekNumber).slice(-2)
        };
    },
    
    // Compatibilità
    getDateForDay: function(date) {
        return this.getFormattedDate(date);
    }
};

// Esponi globalmente
if (typeof window !== 'undefined') {
    window.TEC = TEC;
}
