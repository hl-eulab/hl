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


today = new Date

var oey=today.getFullYear()
var ney=oey-1969
var yos=ney%7

noy = new Array("año de la Luna", "año de l'Atomo", "año de l'Agua", "año del Viento", "año del Fuego", "año della Tierra", "año del Sol")

moy = new Array("primero mes", "segundo mes", "tercer mes", "cuarto mes", "quinto mes", "sexto mes", "séptimo mes", "octavo mes", "noveno mes", "décimo mes", "undécimo mes", "duodécimo mes")

dow = new Array("Soldía", "Lunadía", "Atomdía", "Aguadía", "Vientodía", "Fuegodía", "Tierradía")

document.write("<a class='tec_es_1' href='http://www.hyperlinker.org/tec/index_es.htm' style='text-decoration: none' target='ElCalendariodelaTierra' title='El Calendario de la Tierra'>Hoy es " + dow[today.getDay()] + " " + today.getDate() + ", " + moy[today.getMonth()] + ", " + noy[yos] + " " + ney + "</a>")




