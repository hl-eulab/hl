
// Script de The Earth Calendar, calcolo della data

today = new Date

var oey = today.getFullYear()
var ney = oey-1969
var yos = ney%7

noy = new Array("of the Moon", "of the Atom", "of the Water", "of the Wind", "of the Fire", "of the Earth", "of the Sun")

moy = new Array("first month", "second month", "third month", "fourth month", "fifth month", "sixth month", "seventh month", "eighth month", "ninth month", "tenth month", "eleventh month", "twelfth month")

dow = new Array("Sunday", "Moonday", "Atomday", "Waterday", "Winday", "Fireday", "Earthday")

document.write("Today is " + dow[today.getDay()] + " " + today.getDate() + ", " + moy[today.getMonth()] + ", year " + ney + ", " + noy[yos] + "")

// end

