
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
    document.write("<a class='linkub' HREF='index.htm'>Home</a> | ")

link = "introduction.htm"
if (page == link)
    document.write("<font color='#0950b1'>Introduction | </font>");
      else
    document.write("<a class='linkub' HREF='introduction.htm'>Introduction</a> | ")

link = "publishings.htm"
if (page == link)
    document.write("<font color='#0950b1'>Book & almanac | </font>");
      else
    document.write("<a class='linkub' HREF='publishings.htm'>Book & almanac</a> | ")

link = "prints.htm"
if (page == link)
    document.write("<font color='#0950b1'>Prints | </font>");
      else
    document.write("<a class='linkub' HREF='prints.htm'>Prints</a> | ")

link = "lines.htm"
if (page == link)
    document.write("<font color='#0950b1'>Code lines | </font>");
      else
    document.write("<a class='linkub' HREF='lines.htm'>Code lines</a> | ")

link = "wheel.htm"
if (page == link)
    document.write("<font color='#0950b1'>Year's wheel<br></font>");
      else
    document.write("<a class='linkub' HREF='wheel.htm'>Year's wheel</a><br>")

link = "feedbacks.htm"
if (page == link)
    document.write("<font color='#0950b1'>Feedbacks | </font>");
      else
    document.write("<a class='linkub' HREF='feedbacks.htm'>Feedbacks</a> | ")

link = "story.htm"
if (page == link)
    document.write("<font color='#0950b1'>The story | </font>");
      else
    document.write("<a class='linkub' HREF='story.htm'>The story</a> | ")

link = "webliography.htm"
if (page == link)
    document.write("<font color='#0950b1'>Webliography | </font>");
      else
    document.write("<a class='linkub' HREF='webliography.htm'>Webliography</a> | ")

link = "we.htm"
if (page == link)
    document.write("<font color='#0950b1'>About us | </font>");
      else
    document.write("<a class='linkub' HREF='we.htm'>About us</a> | ")

link = "license_1.htm"
if (page == link)
    document.write("<font color='#0950b1'>License</font>");
      else
    document.write("<a class='linkub' HREF='license_1.htm'>License</a>")



// link = "campaigns.htm"
// if (page == link)
//     document.write("<font color='#0950b1'>Campaigns</font>");
//       else
//     document.write("<a class='linkub' HREF='campaigns.htm'>Campaigns</a>")



