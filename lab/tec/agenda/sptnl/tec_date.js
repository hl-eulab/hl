// tec_date.js - The Earth Calendar Date Calculator per SETTENNIAL AGENDA
// VERSIONE SPECIFICA: solo funzioni per gestione anni e settenni TEC

var TEC = {
    
    // ===== COSTANTI TEC =====
    EPOCH_YEAR: 1969,
    
    YEAR_NAMES: ["Moonyear", "Atomyear", "Wateryear", "Windyear", 
                 "Fireyear", "Earthyear", "Sunyear"],
    
    SEPTENNIUM_THEMES: ["of the Moon", "of the Atom", "of the Water", "of the Wind", 
                        "of the Fire", "of the Earth", "of the Sun"],
    
    ORDINALS: ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", 
               "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth", "Thirteenth", 
               "Fourteenth", "Fifteenth", "Sixteenth", "Seventeenth", "Eighteenth", 
               "Nineteenth", "Twentieth", "Twenty-first", "Twenty-second", 
               "Twenty-third", "Twenty-fourth", "Twenty-fifth", "Twenty-sixth", 
               "Twenty-seventh", "Twenty-eighth", "Twenty-ninth", "Thirtieth"],
    
    // ===== FUNZIONI BASE ANNI TEC =====
    
    // Converti data in anno TEC (0 = 1969 Epoch)
    getYearTEC: function(date) {
        date = date || new Date();
        return date.getFullYear() - this.EPOCH_YEAR;
    },
    
    // Ottieni nome anno TEC (Moonyear, Atomyear, ecc.)
    getYearName: function(yearTEC) {
        var yearIndex = yearTEC % 7;
        return this.YEAR_NAMES[yearIndex];
    },
    
    // ===== INFO ANNO TEC COMPLETO =====
    
    getYearInfo: function(date) {
        date = date || new Date();
        var yearTEC = this.getYearTEC(date);
        var yearIndex = yearTEC % 7;
        
        return {
            yearTEC: yearTEC,
            yearName: this.getYearName(yearTEC),
            yearIndex: yearIndex,
            yearKey: ('000' + yearTEC).slice(-3) // Chiave a 3 cifre: 000, 001, ..., 056
        };
    },
    
    // ===== INFO SETTENNIO TEC =====
    
    getSeptenniumInfo: function(date) {
        date = date || new Date();
        var yearTEC = this.getYearTEC(date);
        
        // Settennio TEC (1-based)
        var septenniumTEC = Math.floor(yearTEC / 7) + 1;
        
        // Anno nel settennio (0-6)
        var yearInSeptennium = yearTEC % 7;
        
        // Primo e ultimo anno TEC del settennio
        var firstYearTEC = (septenniumTEC - 1) * 7;
        var lastYearTEC = firstYearTEC + 6;
        
        // Tema del settennio
        var themeIndex = (septenniumTEC - 1) % 7;
        var theme = this.SEPTENNIUM_THEMES[themeIndex];
        
        // Nome ordinale
        var ordinal = this.ORDINALS[septenniumTEC - 1] || (septenniumTEC + 'th');
        
        return {
            septenniumTEC: septenniumTEC,
            ordinalSeptennium: ordinal,
            theme: theme,
            yearInSeptennium: yearInSeptennium,
            firstYearTEC: firstYearTEC,
            lastYearTEC: lastYearTEC,
            rangeTEC: 'Years ' + firstYearTEC + '–' + lastYearTEC,
            displayFull: ordinal + ' Septennium ' + theme,
            septenniumKey: ('000' + septenniumTEC).slice(-3)
        };
    },
    
    // ===== UTILITY NAVIGAZIONE =====
    
    // Ottieni la data del primo anno (Moonyear) del settennio corrente
    getFirstYearOfSeptennium: function(date) {
        date = date || new Date();
        var septenniumInfo = this.getSeptenniumInfo(date);
        var firstYearGregorian = this.EPOCH_YEAR + septenniumInfo.firstYearTEC;
        return new Date(firstYearGregorian, 0, 1); // 1 gennaio
    },
    
    // Vai al settennio precedente
    getPreviousSeptennium: function(date) {
        date = date || new Date();
        var currentYear = date.getFullYear();
        var newYear = currentYear - 7;
        return new Date(newYear, date.getMonth(), date.getDate());
    },
    
    // Vai al settennio successivo
    getNextSeptennium: function(date) {
        date = date || new Date();
        var currentYear = date.getFullYear();
        var newYear = currentYear + 7;
        return new Date(newYear, date.getMonth(), date.getDate());
    },
    
    // ===== PARSING CHIAVI =====
    
    // Converti chiave anno TEC in Date
    parseYearKey: function(yearKey) {
        var yearTEC = parseInt(yearKey, 10);
        var yearGregorian = this.EPOCH_YEAR + yearTEC;
        return new Date(yearGregorian, 0, 1); // 1 gennaio di quell'anno
    },
    
    // Converti chiave settennio in Date (primo anno)
    parseSeptenniumKey: function(septenniumKey) {
        var septenniumTEC = parseInt(septenniumKey, 10);
        var firstYearTEC = (septenniumTEC - 1) * 7;
        var yearGregorian = this.EPOCH_YEAR + firstYearTEC;
        return new Date(yearGregorian, 0, 1);
    },
    
    // ===== COMPATIBILITÀ (per eventuali funzioni che lo richiedono) =====
    
    getFormattedDate: function(date) {
        // Versione semplificata per Septennial Agenda
        var yearInfo = this.getYearInfo(date);
        var septenniumInfo = this.getSeptenniumInfo(date);
        
        return {
            formatted: yearInfo.yearName + ', Year ' + yearInfo.yearTEC + ' TEC, ' + 
                      septenniumInfo.displayFull,
            yearName: yearInfo.yearName,
            yearTEC: yearInfo.yearTEC,
            septenniumInfo: septenniumInfo
        };
    },
    
    // Per coerenza con altre parti del codice
    getDateForDay: function(date) {
        return this.getFormattedDate(date);
    }
};

// Esponi globalmente
if (typeof window !== 'undefined') {
    window.TEC = TEC;
}
