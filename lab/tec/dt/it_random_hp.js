

// Human Powers - hp_random.js - Elenco delle qualità umane, selezione casuale, fissa per un giorno.

const pod = [
"0", "buon umore", "virtuosità", "coscienza", "robustezza", "decisionalità", "immaginazione", "abilità", "destrezza", "fedeltà", "felicità", "compassione", "generosità", "altruismo", "attenzione", "vivacità", "coerenza", "perspicacia", "autocritica", "splendore", "delicatezza", "credibilità", "prontezza", "brillantezza", "certezza", "pianificazione", "prudenza", "memoria", "ospitalità", "scrupolosità", "instancabilità", "maestria", "diplomazia", "intrepidità", "provvidenza", "flessibilità", "distinzione", "onore", "indipendenza", "competenza", "armonia", "lucidità", "verifica", "amabilità", "gratitudine", "veracità", "meditazione", "sollecitudine", "praticità", "direzione", "musicalità", "beatitudine", "coesione", "gentilezza d'animo", "fortezza", "cordialità", "nobiltà", "vigore", "proprietà", "umiltà", "frugalità", "intuizione", "riconciliazione", "virtù", "precisione", "purezza", "ricchezza", "lungimiranza", "esattezza", "delizia", "equanimità", "vitalità", "arguzia", "gaiezza", "autodisciplina", "entusiasmo", "protezione", "tempestività", "finezza", "sintesi", "gioia", "inventiva", "semplicità", "iniziativa", "perdono", "discernimento", "preveggenza", "magnanimità", "osservazione", "ricettività", "varietà", "gentilezza", "quiete", "intelligenza", "ampiezza", "giocosità", "misericordia", "placidità", "ritmo", "zelo", "versatilità", "sociabilità", "tolleranza", "calma", "accettazione", "risolutezza", "interesse", "incisività", "riflessione", "dignità", "carisma", "efficacia", "giustezza", "grandezza", "acume", "rapidità", "autorità", "sincerità", "vastità", "equilibrio", "utilità", "concentrazione", "logica", "temperanza", "parsimonia", "accuratezza", "contemplazione", "ordine", "freschezza", "rispetto", "buonavolontà", "operosità", "indole buona", "agilità", "concordia", "bellezza", "compostezza", "ispirazione", "elevazione", "decoro", "deliberazione", "emendamento", "integrità", "ragione", "prosperità", "desiderio", "chiarezza", "cortesia", "poesia", "stima", "approvazione", "conclusività", "radiosità", "civiltà", "costanza", "catarsi", "meticolosità", "giustizia", "completezza", "responsabilità", "sobrietà", "fraternità", "preparazione", "affabilità", "franchezza", "interezza", "espressività", "carità", "filantropia", "rettitudine", "umorismo", "solidità", "oggettività", "onestà", "pacatezza", "cooperazione", "imparzialità", "fecondità", "modestia", "clemenza", "coerenza logica", "maturità", "prontezza operativa", "audacia", "amore", "giudizio", "amorevolezza", "autenticità", "umanità", "unità", "auto-abnegazione", "influenza", "giovialità", "assiduità", "moderazione", "solidarietà", "sicurezza", "libertà", "significatività", "validità", "laboriosità", "adattabilità", "resistenza", "raffinatezza", "diligenza", "rispettabilità", "tenacia", "saggezza", "mitezza", "benevolenza", "imperturbabilità", "valutazione", "munificenza", "concisione", "determinazione", "coscienziosità", "longanimità", "eloquenza", "analisi", "apprendimento", "genio", "valore", "eroismo", "positività", "sagacia", "comprensione", "universalità", "silenzio", "meraviglia", "perfezione", "autostima", "pietà", "fiducia", "dolcezza", "naturalezza", "ingegnosità", "unione", "immensità", "deduzione", "puntualità", "conoscenza", "ottimismo", "consapevolezza", "equità", "cautela", "considerazione", "discrezione", "bontà", "appagamento", "evoluzione", "grazia", "creatività", "magnificenza", "indulgenza", "piacevolezza", "misticismo", "tranquillità", "irreprensibilità", "pace", "originalità", "mediazione", "perseveranza", "sincronicità", "personalità", "sensibilità", "coraggio", "sacralità", "senso comune", "ragionevolezza", "simpatia", "allegria", "pazienza", "tempismo", "ardore", "benessere", "ragionamento", "eleganza", "realizzazione", "importanza", "spontaneità", "energia", "evidenza", "competenza operativa", "animazione", "volontà", "vigilanza", "leggiadria", "devozione", "affidabilità", "eccellenza", "costanza d'animo", "liberalità", "lealtà", "velocità", "amicizia", "rinascita", "regolarità", "rinnovamento", "buon gusto", "solidità interiore", "candore", "serietà", "garbo", "serenità", "stabilità", "cura", "tatto"
];

// Generatore casuale di potere dell'animo basato sulla data

// get the current date
var today = new Date();

// get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
var dayOfWeek = today.getDay();

// check if it's a weekday (Monday to Friday)
// dayOfWeek: 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday
if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // Crea un "seme" basato sulla data (anno-mese-giorno)
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // +1 perché i mesi partono da 0
    var day = today.getDate();
    
    // Combina anno, mese e giorno in un numero univoco per oggi
    var seed = year * 10000 + month * 100 + day; // es: 20251130
    
    // Usa il seed per generare un indice "casuale" ma consistente per oggi
    // Il modulo (pod.length - 1) assicura che l'indice sia valido per l'array
    var indice = (seed % (pod.length - 1)) + 1;

    document.write("<br><i>Human power of the day: " + pod[indice] + "</i>");
}

// end


