

var dir = location.href.substring(0,location.href.lastIndexOf('/')+1);
var page = location.href.substring(dir.length,location.href.length+1);


// The two lines above come from a javascript available at
// The JavaScript Source - http://javascript.internet.com

// The lines below are made by the Eudaemony Laboratory
// for The Earth Calendar - http://earthcal.hyperlinker.org


document.write("<FONT face='verdana' size='2'>")


link = "index.php"
if (page == link)
    document.write("New Issue | ");
      else
    document.write("<a class='linkub' HREF='index.php'>New Issue</a> | ")

link = "info.php"
if (page == link)
    document.write("Info | ");
      else
    document.write("<a class='linkub' HREF='info.php'>Info</a> | ")

link = "rules.php"
if (page == link)
    document.write("Rules | ");
      else
    document.write("<a class='linkub' HREF='rules.php'>Rules</a> | ")

link = "index.htm"
if (page == link)
    document.write("Theory | ");
      else
    document.write("<a class='linkub' HREF='http://patchwork.hyperlinker.org'>Theory</a> | ")

link = "about.php"
if (page == link)
    document.write("About | ");
      else
    document.write("<a class='linkub' HREF='about.php'>About</a> | ")

link = "contact.php"
if (page == link)
    document.write("Contact");
      else
    document.write("<a class='linkub' HREF='contact.php'>Contact</a>")


document.write("</FONT>")

