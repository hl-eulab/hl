<HTML>

<!-- Copyright © Eudaemony Laboratory -->

<HEAD>

<link rel=stylesheet href="ab_style.css" type="text/css">

<title>Applausi & Fischi - Laboratorio Eudemonia</title>

<SCRIPT LANGUAGE="JavaScript">

<!--

function val() {

if (document.form.title.value=="") {

alert('Please: scrivi almeno il TITOLO della questione!');

document.form.submit = 0;

return false;

}

if(document.form.title.value.length > 44) {

alert('Testo troppo lungo! Per favore sii più sintetico!');

return false;

}

if(document.form.brief.value.length > 1000) {

alert('Testo troppo lungo! Per favore sii più sintetico!');

return false;

}

}

-->

</SCRIPT>

</HEAD>

<BODY bgcolor="white" background="bg1.gif" text="navy" link="navy" alink="navy" vlink="navy">

<center><table width="100%" height="100%"><tr><td align="center" valign="middle">

<center><table bgcolor="white" width="700pt" cellpadding="33pt"><tr><td align="center" valign="middle">

<img src="a&f.jpg">

<br><br>

<SCRIPT language="JavaScript" src="menu.js">
</SCRIPT>

<br><br><br><br>

<font face="verdana" color="navy" size="3">

<form name="form" action="issue.php" method="post" onsubmit="return val()">

Proponi la tua questione,<br>scrivi il suo titolo (richiesto):

<br><br>

<input type="text" name="title" size="24" value="" />

<br><br>

In poche parole:

<br><br>

<TEXTAREA NAME="brief" ROWS="4" COLS="44">
</TEXTAREA>

<br><br>

Link di riferimento:

<br><br>

<input type="text" name="link" size="44" value="http://" />

<br><br>

<input type="submit" value="SEND">

</form>

</font>

<br><br>

<SCRIPT language="JavaScript" src="signature.js">
</SCRIPT>

</td></tr></table></center>

</td></tr></table></center>

</BODY>

</HTML>