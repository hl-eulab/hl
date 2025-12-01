
// first string computation

today = new Date

var oey = today.getFullYear()
var ney = oey-1969
var yos = ney%7

noy = new Array("della Luna", "dell'Atomo", "dell'Acqua", "del Vento", "del Fuoco", "della Terra", "del Sole")

moy = new Array("primo mese", "secondo mese", "terzo mese", "quarto mese", "quinto mese", "sesto mese", "settimo mese", "ottavo mese", "nono mese", "decimo mese", "undicesimo mese", "dodicesimo mese")

dow = new Array("Soled&igrave;", "Lunad&igrave;", "Atomd&igrave;", "Acquad&igrave;", "Ventod&igrave;", "Fuocod&igrave;", "Terrad&igrave;")

document.write("<a class='tec_it_1' href='http://earthcal.hyperlinker.org' style='text-decoration: none' target='IlCalendariodellaTerra' title='Il Calendario della Terra'>Oggi &egrave; " + dow[today.getDay()] + " " + today.getDate() + ", " + moy[today.getMonth()] + ", anno " + ney + ", " + noy[yos] + "</a>")

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

document.write("<br><a class='tec_it_2' href='http://earthcal.hyperlinker.org' style='text-decoration: none' target='IlCalendariodellaTerra' title='Il Calendario della Terra'><i>Potere dell'animo del giorno: " + pod[day_of_year] + "</i></a>")

// end

