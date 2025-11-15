
var dir = location.href.substring(0,location.href.lastIndexOf('/')+1);
var page = location.href.substring(dir.length,location.href.length+1);

// The two lines above come from a javascript available at
// The JavaScript Source - http://javascript.internet.com

// The lines below are made by the Eudaemony Laboratory
// for The Earth Calendar - http://www.hyperlinker.org/tec/

link = "home.htm"
if (page == link)
    document.write("<font color='#0950b1'>Home | </font>");
      else
    document.write("<a class='linkub' HREF='index_it.htm'>Home</a> | ")

link = "presentazione.htm"
if (page == link)
    document.write("<font color='#0950b1'>Presentazione | </font>");
      else
    document.write("<a class='linkub' HREF='presentazione.htm'>Presentazione</a> | ")

link = "pubblicazioni.htm"
if (page == link)
    document.write("<font color='#0950b1'>Libro ed almanacco | </font>");
      else
    document.write("<a class='linkub' HREF='pubblicazioni.htm'>Libro ed almanacco</a> | ")

link = "stampe.htm"
if (page == link)
    document.write("<font color='#0950b1'>Stampe | </font>");
      else
    document.write("<a class='linkub' HREF='stampe.htm'>Stampe</a> | ")

link = "linee.htm"
if (page == link)
    document.write("<font color='#0950b1'>Linee di codice | </font>");
      else
    document.write("<a class='linkub' HREF='linee.htm'>Linee di codice</a> | ")

link = "ruota.htm"
if (page == link)
    document.write("<font color='#0950b1'>La ruota dell'anno<br></font>");
      else
    document.write("<a class='linkub' HREF='ruota.htm'>La ruota dell'anno</a><br>")

link = "riscontri.htm"
if (page == link)
    document.write("<font color='#0950b1'>Riscontri | </font>");
      else
    document.write("<a class='linkub' HREF='riscontri.htm'>Riscontri</a> | ")

link = "storia.htm"
if (page == link)
    document.write("<font color='#0950b1'>La storia | </font>");
      else
    document.write("<a class='linkub' HREF='storia.htm'>La storia</a> | ")

link = "webliografia.htm"
if (page == link)
    document.write("<font color='#0950b1'>Webliografia | </font>");
      else
    document.write("<a class='linkub' HREF='webliografia.htm'>Webliografia</a> | ")

link = "noi.htm"
if (page == link)
    document.write("<font color='#0950b1'>Chi siamo | </font>");
      else
    document.write("<a class='linkub' HREF='noi.htm'>Chi siamo</a> | ")

link = "licenza_1.htm"
if (page == link)
    document.write("<font color='#0950b1'>Licenza</font>");
      else
    document.write("<a class='linkub' HREF='licenza_1.htm'>Licenza</a>")



// link = "proposte.htm"
// if (page == link)
//     document.write("<font color='#0950b1'>Proposte</font>");
//       else
//     document.write("<a class='linkub' HREF='proposte.htm'>Proposte</a>")
