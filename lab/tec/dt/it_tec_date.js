
// Script de The Earth Calendar, calcolo della data

today = new Date

var oey = today.getFullYear()
var ney = oey-1969
var yos = ney%7

noy = new Array("della Luna", "dell'Atomo", "dell'Acqua", "del Vento", "del Fuoco", "della Terra", "del Sole")

moy = new Array("primo mese", "secondo mese", "terzo mese", "quarto mese", "quinto mese", "sesto mese", "settimo mese", "ottavo mese", "nono mese", "decimo mese", "undicesimo mese", "dodicesimo mese")

dow = new Array("Soledì", "Lunadì", "Atomdì", "Acquadì", "Ventodì", "Fuocodì", "Terradì")

document.write("Oggi è " + dow[today.getDay()] + " " + today.getDate() + ", " + moy[today.getMonth()] + ", anno " + ney + ", " + noy[yos] + "")

// end

