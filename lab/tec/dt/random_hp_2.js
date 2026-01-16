

// Human Powers - hp_random.js - Elenco delle qualità umane, selezione casuale, fissa per un giorno.

const pod = [
"0", "good humor", "virtuosity", "conscience", "robustness", "decisiveness", "imagination", "skill", "dexterity", "fidelity", "happiness", "compassion", "generosity", "altruism", "attentiveness", "vivacity", "consistency", "perspicacity", "self-criticism", "splendor", "delicacy", "credibility", "promptness", "brilliance", "certainty", "planning", "prudence", "remembrance", "hospitality", "scrupulousness", "tirelessness", "mastery", "diplomacy", "intrepidity", "providence", "flexibility", "distinction", "honor", "independence", "expertise", "harmony", "lucidity", "verification", "amiability", "gratitude", "veracity", "meditation", "solicitude", "practicality", "direction", "musicality", "bliss", "cohesion", "gentility", "fortitude", "cordiality", "nobility", "vigor", "propriety", "humility", "frugality", "intuition", "reconciliation", "virtue", "precision", "purity", "richness", "foresight", "exactness", "delight", "equanimity", "vitality", "wit", "gaiety", "self-discipline", "enthusiasm", "protection", "timeliness", "finesse", "synthesis", "joy", "inventiveness", "simplicity", "initiative", "forgiveness", "discernment", "forethought", "magnanimity", "observation", "receptivity", "variety", "kindness", "quietude", "intelligence", "breadth", "playfulness", "mercy", "placidity", "rhythm", "zeal", "versatility", "sociability", "tolerance", "calmness", "acceptance", "resolve", "interest", "incisiveness", "reflection", "dignity", "charisma", "efficacy", "justness", "greatness", "acumen", "rapidity", "authority", "sincerity", "vastness", "balance", "utility", "concentration", "logic", "temperance", "thrift", "accuracy", "contemplation", "order", "freshness", "respect", "goodwill", "industry", "good-nature", "agility", "concord", "beauty", "composure", "inspiration", "elevation", "decorum", "deliberation", "amendment", "integrity", "reason", "prosperity", "desire", "clarity", "courtesy", "poetry", "esteem", "approval", "conclusiveness", "radiance", "civility", "steadfastness", "catharsis", "meticulousness", "justice", "completeness", "responsibility", "sobriety", "fraternity", "preparation", "affability", "frankness", "entirety", "expressiveness", "charity", "philanthropy", "rectitude", "humor", "soundness", "objectivity", "honesty", "peacefulness", "cooperation", "impartiality", "fecundity", "modesty", "clemency", "coherence", "maturity", "readiness", "boldness", "love", "judgment", "loving-kindness", "authenticity", "humanity", "unity", "self-abnegation", "influence", "joviality", "assiduity", "moderation", "solidarity", "security", "freedom", "significance", "validity", "industriousness", "adaptability", "resistance", "refinement", "diligence", "respectability", "tenacity", "wisdom", "meekness", "benevolence", "imperturbability", "evaluation", "munificence", "conciseness", "determination", "conscientiousness", "long-suffering", "eloquence", "analysis", "learning", "genius", "value", "heroism", "positivity", "sagacity", "understanding", "universality", "silence", "wonder", "perfection", "self-esteem", "piety", "trust", "sweetness", "naturalness", "ingenuity", "union", "immensity", "deduction", "punctuality", "knowledge", "optimism", "awareness", "equity", "caution", "consideration", "discretion", "goodness", "contentment", "evolution", "grace", "creativity", "magnificence", "indulgence", "pleasantness", "mysticism", "tranquility", "irreproachability", "peace", "originality", "mediation", "perseverance", "synchronicity", "personality", "sensitivity", "courage", "sacredness", "common sense", "reasonableness", "sympathy", "cheerfulness", "patience", "timing", "ardor", "well-being", "reasoning", "elegance", "fulfillment", "importance", "spontaneity", "energy", "conspicuousness", "competence", "animation", "will", "vigilance", "gracefulness", "devotion", "reliability", "excellence", "constancy", "liberality", "loyalty", "speed", "friendship", "revival", "regularity", "renewal", "good taste", "solidity", "candor", "seriousness", "politeness", "serenity", "stability", "care", "tact"
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


