

// Human Powers - hp_random.js - Elenco delle qualità umane, selezione casuale, fissa per un giorno.

const pod = [
"0", "bon humeur", "virtuosité", "conscience", "robustesse", "décisivité", "imagination", "habileté", "dextérité", "fidélité", "bonheur", "compassion", "générosité", "altruisme", "attention", "vivacité", "consistance", "perspicacité", "autocritique", "splendeur", "délicatesse", "crédibilité", "promptitude", "brillance", "certitude", "planification", "prudence", "souvenir", "hospitalité", "scrupule", "infatigabilité", "maîtrise", "diplomatie", "intrédipidité", "providence", "flexibilité", "distinction", "honneur", "indépendance", "expertise", "harmonie", "lucidité", "vérification", "amabilité", "gratitude", "véracité", "méditation", "sollicitude", "praticité", "direction", "musicalité", "félicité", "cohésion", "gentillesse", "force", "cordialité", "noblesse", "vigueur", "propriété", "humilité", "frugalité", "intuition", "réconciliation", "vertu", "précision", "pureté", "richesse", "clairvoyance", "exactitude", "délice", "équanimité", "vitalité", "esprit", "gaîté", "autodiscipline", "enthousiasme", "protection", "opportunité", "finesse", "synthèse", "joie", "inventivité", "simplicité", "initiative", "pardon", "discernement", "prévoyance", "magnanimité", "observation", "réceptivité", "variété", "bienveillance", "quiétude", "intelligence", "ampleur", "enjouement", "miséricorde", "placidité", "rythme", "zèle", "polyvalence", "sociabilité", "tolérance", "calme", "acceptation", "résolution", "intérêt", "incisivité", "réflexion", "dignité", "charisme", "efficacité", "justesse", "grandeur", "acuité", "rapidité", "autorité", "sincérité", "vastitude", "équilibre", "utilité", "concentration", "logique", "tempérance", "frugalité", "exactitude", "contemplation", "ordre", "fraîcheur", "respect", "bonne volonté", "industrie", "nature aimable", "agilité", "concorde", "beauté", "sang-froid", "inspiration", "élévation", "décorum", "délibération", "amendement", "intégrité", "raison", "prospérité", "désir", "clarté", "courtoisie", "poésie", "estime", "approbation", "conclusivité", "éclat", "civilité", "fermeté", "catharsis", "méticulosité", "justice", "complétude", "responsabilité", "sobriété", "fraternité", "préparation", "affabilité", "franchise", "entièreté", "expressivité", "charité", "philanthropie", "rectitude", "humour", "solidité", "objectivité", "honnêteté", "paisibilité", "coopération", "impartialité", "fécondité", "modestie", "clémence", "cohérence", "maturité", "disponibilité", "audace", "amour", "jugement", "bonté de cœur", "authenticité", "humanité", "unité", "abnégation", "influence", "jovialité", "assiduité", "modération", "solidarité", "sécurité", "liberté", "signifiance", "validité", "laboriosité", "adaptabilité", "résistance", "raffinement", "diligence", "respectabilité", "ténacité", "sagesse", "douceur", "bienfaisance", "imperturbabilité", "évaluation", "munificence", "concision", "détermination", "conscience professionnelle", "longanimité", "éloquence", "analyse", "apprentissage", "génie", "valeur", "héroïsme", "positivité", "sagacité", "compréhension", "universalité", "silence", "émerveillement", "perfection", "estime de soi", "piété", "confiance", "douceur de vivre", "naturalité", "ingéniosité", "union", "immensité", "déduction", "ponctualité", "connaissance", "optimisme", "pleine conscience", "équité", "caution", "considération", "discrétion", "bonté", "contentement", "évolution", "grâce", "créativité", "magnificence", "indulgence", "agrément", "mysticisme", "tranquillité", "irréprochabilité", "paix", "originalité", "médiation", "persévérance", "synchronicité", "personnalité", "sensibilité", "courage", "sacralité", "bon sens", "raisonnabilité", "sympathie", "allégresse", "patience", "synchronisation", "ardeur", "bien-être", "raisonnement", "élégance", "accomplissement", "importance", "spontanéité", "énergie", "évidence", "compétence", "animation", "volonté", "vigilance", "gracieuseté", "dévotion", "fiabilité", "excellence", "constance", "libéralité", "loyauté", "vitesse", "amitié", "renaissance", "régularité", "renouveau", "bon goût", "solidité intérieure", "candeur", "sérieux", "politesse", "sérénité", "stabilité", "soin", "tact"
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

    document.write("<br><i>Pouvoir humain du jour : " + pod[indice] + "</i>");
}

// end


