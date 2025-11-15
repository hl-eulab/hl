<HTML>

<!-- Copyright © Eudaemony Laboratory -->

<HEAD>

<link rel=stylesheet href="ab_style.css" type="text/css">

<title>Applauses & Boos - Eudaemony Laboratory</title>

<SCRIPT LANGUAGE="JavaScript">

<!--

function val() {

if (document.form.voter.value=="") {

alert('Please: write your NAME or a NICK!');

document.form.submit = 0;

return false;

}

if (!document.form.vote[0].checked&&!document.form.vote[1].checked&&!document.form.vote[2].checked&&!document.form.vote[3].checked&&!document.form.vote[4].checked) {

alert('Please: set your VOTE!');

document.form.submit = 0;

return false;

}

if(document.form.comment.value.length > 1000) {

alert('Too much long text! Please be more synthetic!');

return false;

}

}

-->

</SCRIPT>

</HEAD>

<BODY bgcolor="white" background="bg1.gif" text="navy" link="navy" alink="navy" vlink="navy">

<center><table width="100%" height="100%"><tr><td align="center" valign="middle">

<center><table bgcolor="white" width="700pt" cellpadding="33pt"><tr><td align="center" valign="middle">

<img src="a&b.jpg">

<br><br>

<SCRIPT language="JavaScript" src="menu.js">
</SCRIPT>

<br><br><br>

<font face="verdana" color="navy" size="3">

<?php

$title = file_get_contents ("title.txt");

$title = mb_strtoupper($title);

echo ('Here we are facing the issue:<br><br><b>' . $title . '</b><br><br>');

if (is_readable ("brief.txt")) {

$brief = file_get_contents ("brief.txt");

echo ('In few words:<b><br><br>' . $brief . '</b><br><br>');

}

if (is_readable ("link.txt")) {

$link = file_get_contents ("link.txt");

echo ('Follow this link for further info:<br><br><b><a class="underline" href="' . $link . '" target="issue">' . $link . '</a></b><br><br>');

}

?>

<form name="form" action="vote.php" method="post" onsubmit="return val()">

<br>

In case you have already voted,<br>
go to see the result in the <b><a class="underline" href="arena.php">A R E N A</a></b>

<br><br><br>

Otherwise, please, vote now,<br>by writing your name or a nick:

<br><br>

<input type="text" name="voter" value="">

<br><br>

and express your thought:

<br>

<center><table cellspacing="24pt"><tr><td align="center" valign="middle">

<font size="2" color="red"><b>BOOOOOS</b></font>

<td align="center" valign="middle">

<img src="r.gif" width="12pt" border="1" alt="I completely disagree">

<br>

<input type="radio" name="vote" value="-2">

<td align="center" valign="middle">

<img src="y.gif" width="12pt" border="1" alt="I partially disagree">

<br>

<input type="radio" name="vote" value="-1">

<td align="center" valign="middle">

<img src="w.gif" width="12pt" border="1" alt="I am indifferent">

<br>

<input type="radio" name="vote" value="0">

<td align="center" valign="middle">

<img src="l.gif" width="12pt" border="1" alt="I partially agree">

<br>

<input type="radio" name="vote" value="1">

<td align="center" valign="middle">

<img src="g.gif" width="12pt" border="1" alt="I completely agree">

<br>

<input type="radio" name="vote" value="2">

<td align="center" valign="middle">

<font size="2" color="green"><b>APPLAUSES</b></font>

</td></tr></table></center>

<br>

If you want, leave a comment:

<br><br>

<textarea name="comment" rows="4" cols="44">
</textarea>

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