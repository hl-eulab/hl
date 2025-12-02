
// Script de Il Calendario della Terra, calcolo della data

today = new Date

var oey = today.getFullYear()
var ney = oey-1969
var yos = ney%7

noy = new Array("della Luna", "dell'Atomo", "dell'Acqua", "del Vento", "del Fuoco", "della Terra", "del Sole")

moy = new Array("primo mese", "secondo mese", "terzo mese", "quarto mese", "quinto mese", "sesto mese", "settimo mese", "ottavo mese", "nono mese", "decimo mese", "undicesimo mese", "dodicesimo mese")

dow = new Array("Soled&igrave;", "Lunad&igrave;", "Atomd&igrave;", "Acquad&igrave;", "Ventod&igrave;", "Fuocod&igrave;", "Terrad&igrave;")

document.write("<a href='http://earthcal.hyperlinker.org' style='text-decoration: none' target='IlCalendariodellaTerra' title='Il Calendario della Terra'>Oggi &egrave; " + dow[today.getDay()] + " " + today.getDate() + ", " + moy[today.getMonth()] + ", anno " + ney + ", " + noy[yos] + "</a>")

// end

