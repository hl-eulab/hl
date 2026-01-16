

// Human Powers - hp_random.js - Elenco delle qualità umane, selezione casuale, fissa per un giorno.

const pod = [
"0", "buen humor", "virtuosidad", "conciencia", "robustez", "decisividad", "imaginación", "habilidad", "destreza", "fidelidad", "felicidad", "compasión", "generosidad", "altruismo", "atención", "vivacidad", "consistencia", "perspicacia", "autocrítica", "esplendor", "delicadeza", "credibilidad", "prontitud", "brillantez", "certeza", "planificación", "prudencia", "recuerdo", "hospitalidad", "escrupulosidad", "incansabilidad", "maestría", "diplomacia", "intrepidez", "providencia", "flexibilidad", "distinción", "honor", "independencia", "pericia", "armonía", "lucidez", "verificación", "amabilidad", "gratitud", "veracidad", "meditación", "solicitud", "practicidad", "dirección", "musicalidad", "bienaventuranza", "cohesión", "gentileza", "fortaleza", "cordialidad", "nobleza", "vigor", "propiedad", "humildad", "frugalidad", "intuición", "reconciliación", "virtud", "precisión", "pureza", "riqueza", "prospección", "exactitud", "deleite", "ecuanimidad", "vitalidad", "agudeza", "regocijo", "autodisciplina", "entusiasmo", "protección", "oportunidad", "fineza", "síntesis", "alegría", "inventiva", "sencillez", "iniciativa", "perdón", "discernimiento", "previsión", "magnanimidad", "observación", "receptividad", "variedad", "bondad", "quietud", "inteligencia", "amplitud", "jovialidad", "misericordia", "placidez", "ritmo", "celo", "versatilidad", "sociabilidad", "tolerancia", "calma", "aceptación", "resolución", "interés", "incisividad", "reflexión", "dignidad", "carisma", "eficacia", "justeza", "grandeza", "acumen", "rapidez", "autoridad", "sinceridad", "vastedad", "equilibrio", "utilidad", "concentración", "lógica", "templanza", "ahorro", "exactitud", "contemplación", "orden", "frescura", "respeto", "buena voluntad", "industria", "buena índole", "agilidad", "concordia", "belleza", "compostura", "inspiración", "elevación", "decoro", "deliberación", "enmienda", "integridad", "razón", "prosperidad", "deseo", "claridad", "cortesía", "poesía", "estima", "aprobación", "conclusividad", "radiancia", "civilidad", "firmeza", "catarsis", "meticulosidad", "justicia", "completitud", "responsabilidad", "sobriedad", "fraternidad", "preparación", "afabilidad", "franqueza", "entereza", "expresividad", "caridad", "filantropía", "rectitud", "humor", "solidez", "objetividad", "honestidad", "apacibilidad", "cooperación", "imparcialidad", "fecundidad", "modestia", "clemencia", "coherencia", "madurez", "disponibilidad", "audacia", "amor", "juicio", "cariño", "autenticidad", "humanidad", "unidad", "auto-abnegación", "influencia", "jocosidad", "asiduidad", "moderación", "solidaridad", "seguridad", "libertad", "significancia", "validez", "laboriosidad", "adaptabilidad", "resistencia", "refinamiento", "diligencia", "respetabilidad", "tenacidad", "sabiduría", "mansedumbre", "benevolencia", "imperturbabilidad", "evaluación", "munificencia", "concisión", "determinación", "concienzudez", "longanimidad", "elocuencia", "análisis", "aprendizaje", "genio", "valor", "heroísmo", "positividad", "sagacidad", "comprensión", "universalidad", "silencio", "maravilla", "perfección", "autoestima", "piedad", "confianza", "dulzura", "naturalidad", "ingenuidad", "unión", "inmensidad", "deducción", "puntualidad", "conocimiento", "optimismo", "conciencia plena", "equidad", "cautela", "consideración", "discreción", "bondad pura", "contento", "evolución", "gracia", "creatividad", "magnificencia", "indulgencia", "afabilidad", "misticismo", "tranquilidad", "irreprensibilidad", "paz", "originalidad", "mediación", "perseverancia", "sincronicidad", "personalidad", "sensibilidad", "coraje", "sacralidad", "sentido común", "razonabilidad", "simpatía", "alborozo", "paciencia", "tempismo", "ardor", "bienestar", "razonamiento", "elegancia", "cumplimiento", "importancia", "espontaneidad", "energía", "notoriedad", "competencia", "animación", "voluntad", "vigilancia", "donaire", "devoción", "fiabilidad", "excelencia", "constancia", "liberalidad", "lealtad", "velocidad", "amistad", "renacimiento", "regularidad", "renovación", "buen gusto", "solidez interna", "candor", "seriedad", "urbanidad", "serenidad", "estabilidad", "esmero", "tacto"
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

    document.write("<br><i>Poder humano del día: " + pod[indice] + "</i>");
}

// end


