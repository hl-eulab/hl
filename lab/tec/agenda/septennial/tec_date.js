// tec_date.js - The Earth Calendar Date Calculator
// VERSIONE CORRETTA: Moonday-first, solo date TEC

const TEC = {
    // ===== FUNZIONI BASE TEC =====
    
    // Formatta data completa TEC (per visualizzazione)
    getFormattedDate: function(date = new Date()) {
        const today = date;
        const oey = today.getFullYear();
        const ney = oey - 1969; // Anno Nuova Era (TEC Year)
        const yos = ney % 7;    // Year of Septennium (0-6)
        
        // Temi del settennio (per septen.js)
        const noy = ["of the Moon", "of the Atom", "of the Water", "of the Wind", 
                    "of the Fire", "of the Earth", "of the Sun"];
        
        // Mesi TEC (1-12)
        const moy = ["First month", "Second month", "Third month", "Fourth month", 
                    "Fifth month", "Sixth month", "Seventh month", "Eighth month", 
                    "Ninth month", "Tenth month", "Eleventh month", "Twelfth month"];
        
        // GIORNI TEC CORRETTI: Moonday-first
        const dow = ["Moonday", "Atomday", "Waterday", "Winday", 
                    "Fireday", "Earthday", "Sunday"];
        
        // Converti giorno JavaScript (0=Sun) a giorno TEC (0=Mon)
        const jsDay = today.getDay();
        const tecDay = (jsDay + 6) % 7; // Trasformazione elegante
        
        return {
            // Formato completo per display
            formatted: dow[tecDay] + " " + today.getDate() + ", " + 
                      moy[today.getMonth()] + ", year " + ney + ", " + noy[yos],
            
            // Componenti separati
            dayName: dow[tecDay],
            dayNumber: today.getDate(),
            monthName: moy[today.getMonth()],
            year: ney,
            septennium: noy[yos],
            
            // Date objects
            date: today,
            tecDayIndex: tecDay,     // 0=Moonday, 6=Sunday
            jsDayIndex: jsDay        // 0=Sunday, 6=Saturday
        };
    },
    
    // ===== UTILITÀ DATE TEC =====
    
    // Ottieni il Moonday della settimana TEC
    getMondayOfWeek: function(date = new Date()) {
        const d = new Date(date);
        const jsDay = d.getDay();          // 0=Sun, 1=Mon, etc.
        const tecDay = (jsDay + 6) % 7;    // 0=Moonday, 6=Sunday
        
        // Vai al Moonday (indietro di N giorni)
        d.setDate(d.getDate() - tecDay);
        return d;
    },
    
    // Genera chiave data TEC (DD-MM-YY)
    getTECDateKey: function(date = new Date()) {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = (d.getFullYear() - 1969).toString().padStart(2, '0');
        return `${day}-${month}-${year}`;
    },
    
    // Parsing chiave TEC in Date object
    parseTECDateKey: function(tecDateKey) {
        // Formato: "DD-MM-YY"
        const parts = tecDateKey.split('-');
        if (parts.length !== 3) return new Date();
        
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // JS month 0-11
        const year = 1969 + parseInt(parts[2], 10); // TEC Year → Gregorian
        
        return new Date(year, month, day);
    },
    
    // Info settimana TEC (per database)
    getWeekInfo: function(date = new Date()) {
        const monday = this.getMondayOfWeek(date);
        const tecDateKey = this.getTECDateKey(monday);
        
        // Calcolo numero settimana (Moonday-based)
        const startOfYear = new Date(monday.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((monday - startOfYear) / 86400000) + 1;
        const weekNumber = Math.ceil(dayOfYear / 7);
        
        const yearTEC = monday.getFullYear() - 1969;
        
        return {
            monday: monday,
            tecMondayKey: tecDateKey,
            yearTEC: yearTEC,
            weekNumber: weekNumber,
            weekKey: `${yearTEC.toString().padStart(2, '0')}-${weekNumber.toString().padStart(2, '0')}`
        };
    },
    
    // ===== COMPATIBILITÀ =====
    
    getDateForDay: function(date) {
        return this.getFormattedDate(date);
    }
};

// Esponi globalmente
if (typeof window !== 'undefined') {
    window.TEC = TEC;
}
