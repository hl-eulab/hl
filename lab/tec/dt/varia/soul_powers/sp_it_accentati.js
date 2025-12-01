

// Soul Powers - sp_it.js - Elenco delle qualità dell'animo umano

const pod = [
"0", "il buon umore", "il virtuosismo", "la coscienza", "la robustezza", "la decisione", "l'immaginazione", "l'abilità", "la destrezza", "la fedeltà", "la felicità", "la compassione", "la generosità", "l'altruismo", "l'attenzione", "la vivacità", "la consistenza", "l'eccellenza", "la perspicacia", "l'autocritica", "lo splendore", "la delicatezza", "la credibilità", "la speditezza", "la brillantezza", "la certezza", "la programmazione", "l'accortezza", "la rimembranza", "l'ospitalità", "la scrupolosità", "l'infaticabilità", "la maestria", "la diplomazia", "l'intrepidezza", "la provvidenza", "la flessibilità", "la distinzione", "l'onore", "l'indipendenza", "la perizia", "l'accordo", "la lucidità", "la verifica", "l'amabilità", "la riconoscenza", "la veracità", "la meditazione", "la sollecitudine", "la concretezza", "la direzione", "la musicalità", "la beatitudine", "la coesione", "la compiutezza", "la signorilità", "la tempra", "la cordialità", "la nobiltà", "il vigore", "l'armonia", "la correttezza", "l'umiltà", "la frugalità", "l'intuizione", "la riconciliazione", "la potenza", "la virtù", "la precisione", "la purezza", "la ricchezza", "la lungimiranza", "l'esattezza", "la delizia", "l'equanimità", "la vitalità", "l'arguzia", "la gaiezza", "l'autodisciplina", "l'entusiasmo", "la protezione", "la tempestività", "la finezza", "la sintesi", "la gioia", "l'inventiva", "la semplicità", "l'iniziativa", "il perdono", "la prudenza", "il discernimento", "la previdenza", "la concordanza", "la magnanimità", "l'osservazione", "la ricettività", "la varietà", "la gentilezza", "la quiete", "l'intelligenza", "l'ampiezza", "la giocosità", "la misericordia", "la placidità", "il ritmo", "lo zelo", "la versatilità", "la socievolezza", "la tolleranza", "la calma", "l'accettazione", "la risoluzione", "l'interessamento", "l'incisività", "la riflessione", "la dignità", "il carisma", "l'efficacia", "la giustezza", "la misura", "la grandezza", "l'acume", "la rapidità", "l'autorevolezza", "la sincerità", "la vastità", "l'equilibrio", "l'utilità", "la concentrazione", "la logica", "la temperanza", "il risparmio", "l'accuratezza", "la diligenza", "la contemplazione", "l'ordine", "la freschezza", "il rispetto", "la buona volontà", "l'operosità", "la bonarietà", "l'agilità", "la concordia", "la bellezza", "il contegno", "l'ispirazione", "l'elevatezza", "il decoro", "la ponderazione", "la discrezione", "il ravvedimento", "la beneficenza", "l'integrità", "la ragione", "la prosperità", "il desiderio", "la limpidezza", "la cortesia", "la poesia", "la stima", "il gradimento", "la concludenza", "la radiosità", "la civiltà", "la fermezza", "la catarsi", "la meticolosità", "la giustizia", "la completezza", "la responsabilità", "la sobrietà", "la fraternità", "la preparazione", "l'affabilità", "la franchezza", "l'interezza", "l'espressività", "la carità", "la filantropia", "la rettitudine", "l'umorismo", "l'assennatezza", "l'obiettività", "l'onestà", "la pacatezza", "la cooperazione", "l'imparzialità", "la fecondità", "la modestia", "la clemenza", "la coerenza", "la maturità", "la significanza", "la prontezza", "l'ardimento", "l'amore", "il criterio", "l'amorevolezza", "l'autenticità", "l'umanità", "l'unità", "l'abnegazione", "la gratitudine", "l'influenza", "la giovialità", "l'assiduità", "la moderazione", "la solidarietà", "la sicurezza", "la libertà", "il peso", "la validità", "la laboriosità", "l'adattabilità", "la resistenza", "la ricercatezza", "l'industriosità", "la rispettabilità", "la tenacia", "la saggezza", "la mitezza", "la benevolenza", "l'imperturbabilità", "la valutazione", "la munificenza", "la concisione", "la determinazione", "la coscienziosità", "la longanimità", "l'eloquenza", "l'analisi", "l'apprendimento", "la genialità", "il valore", "l'eroismo", "il tatto", "la positività", "la sagacia", "la comprensione", "l'universalità", "il silenzio", "la meraviglia", "la perfezione", "l'autostima", "la pietà", "la fiducia", "la soavità", "il bene", "l'instancabilità", "la naturalezza", "l'ingegno", "l'unione", "l'immensità", "la deduzione", "la puntualità", "la conoscenza", "l'ottimismo", "la consapevolezza", "l'equità", "la cautela", "la considerazione", "la riservatezza", "la bontà", "la contentezza", "l'evoluzione", "il potere", "la grazia", "il giudizio", "la creatività", "la magnificenza", "l'indulgenza", "la gradevolezza", "il misticismo", "la tranquillità", "l'irreprensibilità", "la pace", "l'originalità", "la mediazione", "la perseveranza", "la sincronia", "la personalità", "la sensibilità", "il coraggio", "la sacralità", "il buon senso", "la ragionevolezza", "la simpatia", "l'allegria", "la pazienza", "il tempismo", "l'ardore", "il benessere", "il raziocinio", "l'eleganza", "il compimento", "l'importanza", "la chiarezza", "la spontaneità", "l'energia", "la cospicuità", "la dolcezza", "la competenza", "l'animazione", "la volontà", "la vigilanza", "la leggiadria", "la devozione", "l'affidabilità", "la pregevolezza", "la costanza", "la liberalità", "la lealtà", "la velocità", "l'amicizia", "il ravvivamento", "la regolarità", "il rinnovamento", "il buon gusto", "la solidità", "la schiettezza", "la serietà", "la costumatezza", "la serenità", "la stabilità", "la cura", "il garbo"
];

// second string computation

// get the current date
var today = new Date();

// get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
var dayOfWeek = today.getDay();

// check if it's a weekday (Monday to Friday)
// dayOfWeek: 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday
if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    // get the year of the current date
    var year = today.getFullYear();

    // create a new Date object with the first day of the year
    var first_day = new Date(year, 0, 1);

    // calculate the number of milliseconds between the current date and the first day of the year
    var delta = today - first_day;

    // convert the number of milliseconds to days (86400000 milliseconds in a day)
    var day_of_year = Math.floor(delta / 86400000) + 1;

    document.write("<br><a href='http://earthcal.hyperlinker.org' style='text-decoration: none' target='IlCalendariodellaTerra' title='Il Calendario della Terra'><i>Potere dell'animo del giorno: " + pod[day_of_year] + "</i></a>");
}

// end

