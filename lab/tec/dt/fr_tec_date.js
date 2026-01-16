
// Script de The Earth Calendar, calcolo della data

today = new Date

var oey = today.getFullYear()
var ney = oey-1969
var yos = ney%7

noy = new Array("de la Lune", "de l'Atom", "de l'Eau", "du Vent", "du Feu", "de la Terre", "du Soleil")

moy = new Array("premier mes", "second mes", "troisième mes", "quatrième mes", "cinquième mes", "sixième mes", "septième mes", "huitième mes", "neuvième mes", "dixième mes", "onzième mes", "douzième mes")

dow = new Array("Soleildi", "Lundi", "Atomdi", "Eaudi", "Ventdi", "Feudi", "Terredi")

document.write("Aujourd'hui il est " + dow[today.getDay()] + " " + today.getDate() + ", " + moy[today.getMonth()] + ", année " + ney + ", " + noy[yos] + "")

// end

