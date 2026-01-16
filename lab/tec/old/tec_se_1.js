/***        TEC_EN_1.JS - Copyright © 34 Eudaemony Laboratory             ***/

/***                 Script for the short date of                         ***/
/***                      The Earth Calendar                              ***/
/***     http://www.hyperlinker.org/tec/ - hl.srvc(at)protonmail.ch        ***/

/*** This script can be used to show the date of "The Earth Calendar"     ***/
/*** both on the desktop of one's own computer and on one's own web site. ***/
/*** This script can be modified provided that no change will be made     ***/
/*** to the date of "The Earth Calendar", protecting its standard,        ***/
/*** and that will be fully respected and reported all the terms of       ***/
/*** this agreement.                                                      ***/

/*** The logo of the almanac of "The Earth Calendar",                     ***/
/*** with its original nomenclature, is trademark of the                  ***/
/*** Eudaemony Laboratory. Its commercial or simply public use,           ***/
/*** therefore also of the new nomenclature adopted by                    ***/
/*** "The Earth Calendar", is granted at condition of the subscription    ***/
/*** and of the full respect of the special license available             ***/
/*** at http://www.hyperlinker.org/tec/license_1.htm                       ***/

/*** Copyright and trademark: http://www.hyperlinker.org/tec/legal.htm     ***/

/*** No warranty of good working is furnished to this script.             ***/
/*** Therefore use it at your own risk. Notes on its installation,        ***/
/*** and the eventual updates, are available at:                          ***/
/*** http://www.hyperlinker.org/tec/lines.htm                              ***/

/*** TEC_EN_1.JS - Script Version 1.0.2                                   ***/


today = new Date

var oey=today.getFullYear()
var ney=oey-1969

var yos=ney%7

noy = new Array("Måneår", "Atomår", "Vattenår", "Vindår", "Eldår", "Jordår", "Solår")

moy = new Array("första månaden", "andra månaden", "tredje månaden", "fjärde månaden", "femte månaden", "sjätte månad", "sjunde månaden", "åttonde månaden", "nionde månaden", "tionde månaden", "elfte månad", "tolfte månaden")

dow = new Array("Soldag", "Månedag", "Atomdag", "Vattendag", "Vindag", "Eldag", "Jordag")

document.write("<a class='tec_se_1' href='http://www.hyperlinker.org/tec/index_se.htm' style='text-decoration: none' target='DenJordenKalender' title='Den Jorden Kalender'>Idag är " + dow[today.getDay()] + " " + today.getDate() + ", " + moy[today.getMonth()] + ", " + noy[yos] + " " + ney + "</a>")

