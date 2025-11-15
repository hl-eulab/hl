/***       TEC_ES_1.JS - Copyright © 34 Laboratorio Eudemonia             ***/

/***                   Script per la data breve de                        ***/
/***                    Il Calendario della Terra                         ***/
/***    http://earthcal.hyperlinker.org - earthcal(at)hyperlinker.org     ***/

/*** Questo script può essere utilizzato per visualizzare la data         ***/
/*** breve de "Il Calendario della Terra" tanto sul desktop del proprio   ***/
/*** computer quanto sul proprio sito web. Tale script può essere         ***/
/*** modificato a patto che la data de "Il Calendario della Terra",       ***/
/*** con la sua originale nomenclatura, rimanga immutata, salvaguardando  ***/
/*** appieno il suo standard, ed a patto che sia riportata per intero     ***/
/*** questa nota e siano rispettati tutti i termini di questo accordo.    ***/

/*** Il nome "Il Calendario della Terra" ed il logo del suo almanacco,    ***/
/*** con l'originale nomenclatura, sono marchi del Laboratorio Eudemonia. ***/
/*** L'utilizzo commerciale, od anche semplicemente pubblico, di          ***/
/*** entrambi, quindi anche della nuova nomenclatura adottata da          ***/
/*** "Il Calendario della Terra", è concesso a condizione della           ***/
/*** sottoscrizione e del pieno rispetto della specifica licenza          ***/
/*** disponibile at http://www.hyperlinker.org/tec/licenza_i.htm          ***/

/*** Copyright e marchio: http://www.hyperlinker.org/tec/legale.htm       ***/

/*** Nessuna garanzia di buon funzionamento è fornita a questo script.    ***/
/*** Lo si usi dunque a proprio rischio e pericolo. Note sulla sua        ***/
/*** installazione, e gli eventuali aggiornamenti, sono reperibili        ***/
/*** a pagina: http://www.hyperlinker.org/tec/linee.htm                   ***/

/*** TEC_ES_1.JS - Script Version 1.0.2                                   ***/


// first string computation

today = new Date

var oey=today.getFullYear()
var ney=oey-1969
var yos=ney%7

noy = new Array("année de la Lune", "année de l'Atom", "année de l'Eau", "année du Vent", "année du Feu", "année de la Terre", "année du Soleil")

moy = new Array("premier mes", "second mes", "troisième mes", "quatrième mes", "cinquième mes", "sixième mes", "septième mes", "huitième mes", "neuvième mes", "dixième mes", "onzième mes", "douzième mes")

dow = new Array("Soleildi", "Lundi", "Atomdi", "Eaudi", "Ventdi", "Feudi", "Terredi")

document.write("<a class='tec_fr_1' href='http://www.hyperlinker.org/tec/index_fr.htm' style='text-decoration: none' target='LeCalandrierdelaTerre' title='Le Calendrier de la Terre'>Aujourd'hui il est " + dow[today.getDay()] + " " + today.getDate() + ", " + moy[today.getMonth()] + ", " + noy[yos] + " " + ney + "</a>")



// second string computation

// get the current date
var today = new Date();

// get the year of the current date
var year = today.getFullYear();

// create a new Date object with the first day of the year
var first_day = new Date(year, 0, 1);

// calculate the number of milliseconds between the current date and the first day of the year
var delta = today - first_day;

// convert the number of milliseconds to days (86400000 milliseconds in a day)
var day_of_year = Math.floor(delta / 86400000) + 1;


pod = new Array("0", "bonne humeur", "virtuosité", "conscience", "robustesse", "décision", "imagination", "habileté", "dextérité", "fidélité", "bonheur", "compassion", "générosité", "altruisme", "attention", "vivacité", "constance", "excellence", "perspicacité", "autocritique", "splendeur", "délicatesse", "crédibilité", "rapidité", "brio", "certitude", "planification", "finesse", "souvenir", "hospitalité", "scrupuleux ", "infatigabilité", "maîtrise", "diplomatie", "intrépidité", "providence", "souplesse", "distinction", "honneur", "indépendance", "expertise", "accord", "lucidité", "vérification", "bienveillance", "gratitude", "véracité", "méditation", "sollicitude", "concret", "sens", "musicalité", "béatitude", "cohésion", "complétude", "élégance", "tempérament", "cordialité", "noblesse", "vigueur", "harmonie", "justesse", "humilité", "frugalité", "intuition", "réconciliation", "puissance", "vertu", "précision", "pureté", "richesse", "prévoyance", "exactitude", "délice", "équanimité", "vitalité ", "esprit", "gaieté", "autodiscipline", "enthousiasme", "protection", "opportunité", "subtilité", "synthèse", "joie", "inventivité", "simplicité", "initiative", "pardon", "prudence", "discernement", "prévoyance", "concordance", "magnanimité", "observation", "réceptivité ", "variété ", "gentillesse", "calme", "intelligence", "ampleur", "espièglerie", "miséricorde", "placidité", "rythme", "zèle", "versatilité", "sociabilité", "tolérance", "acceptation", "résolution", "intérêt", "incisivité", "réflexion", "dignité", "charisme", "efficacité", "justice", "mesure", "grandeur", "perspicacité", "rapidité", "autorité", "sincérité", "immensité", "équilibre", "utilité", "concentration", "logique", "tempérance", "économie", "exactitude", "assiduité", "contemplation", "ordre", "fraîcheur", "respect", "bonne volonté", "industrie", "bonhomie", "concorde", "beauté", "tenue", "inspiration", "hauteur", "décorum", "pondération", "discrétion", "repentir", "bienfaisance", "intégrité", "raison", "prospérité", "désir", "clarté", "courtoisie", "poésie", "estime", "plaisir", "conclusion", "rayonnement", "civilité", "constance", "catharsis", "minutie", "justice", "complétude", "responsabilité", "sobriété", "fraternité", "préparation", "affabilité", "franchise", "complétude", "expressivité", "charité", "agilité", "philanthropie", "droiture", "humour", "sensibilité", "objectivité", "honnêteté ", "coopération", "impartialité", "fertilité", "modestie", "clémence", "cohérence", "maturité", "importance", "empressement", "audace", "amour", "critère", "gentillesse", "authenticité", "humanité", "unité", "abnégation", "gratitude", "influence", "jovialité", "assiduité", "modération", "solidarité", "sécurité", "liberté", "poids", "validité", "assiduité", "adaptabilité", "résistance", "sophistication", "l'industrie", "respectabilité", "ténacité", "sagesse", "douceur ", "gentillesse", "imperturbabilité", "évaluation", "munificence", "concision", "détermination", "conscience", "patience", "éloquence", "analyse", "savoir", "éclat", "vaillance", "héroïsme", "tact", "positivité", "sagacité", "compréhension", "universalité", "silence", "émerveillement", "perfection", "estime de soi", "pitié", "confiance", "douceur", "bien", "infatigable", "naturel", "ingéniosité", "union", "immensité", "déduction", "ponctualité", "connaissance", "optimisme", "conscience", "équité", "prudence", "considération", "confidentialité", "bienveillance", "satisfaction", "évolution", "puissance", "grâce", "jugement", "créativité", "magnificence", "indulgence", "agrément", "mysticisme", "tranquillité", "irréprochabilité", "paix", "originalité", "médiation", "persévérance", "synchronie", "personnalité", "sensibilité", "courage", "sacré", "bon sens", "raisonnabilité", "sympathie", "gaie", "patience", "timing", "ardeur", "bien-être", "raison", "élégance", "épanouissement", "importance", "clarté", "spontanéité", "énergie", "visibilité", "douceur", "compétence", "animation", "volonté", "vigilance", "beauté", "dévouement", "fiabilité", "valeur", "constance", "libéralité", "loyauté", "rapidité", "amitié", "vivacité", "régularité", "renouveau", "bon goût", "solidité", "franchise", "sérieux", "manières", "sérénité", "stabilité", "soin", "grâce")

document.write("<br><a class='tec_fr_2' href='http://www.hyperlinker.org/tec/index_fr.htm' style='text-decoration: none' target='LeCalandrierdelaTerre' title='Le Calandrier de la Terre'><i>Pouvoir de l'âme du jour: " + pod[day_of_year] + "</i></a>")


// end




