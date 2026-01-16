
// Script de The Earth Calendar, calcolo della data

today = new Date

var oey = today.getFullYear()
var ney = oey-1969
var yos = ney%7

noy = new Array("de la Luna", "de l'Atomo", "de l'Agua", "del Viento", "del Fuego", "della Tierra", "del Sol")

moy = new Array("primero mes", "segundo mes", "tercer mes", "cuarto mes", "quinto mes", "sexto mes", "séptimo mes", "octavo mes", "noveno mes", "décimo mes", "undécimo mes", "duodécimo mes")

dow = new Array("Soldía", "Lunadía", "Atomdía", "Aguadía", "Vientodía", "Fuegodía", "Tierradía")

document.write("Hoy es " + dow[today.getDay()] + " " + today.getDate() + ", " + moy[today.getMonth()] + ", año " + ney + ", " + noy[yos] + "")

// end

