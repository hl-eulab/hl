<HTML>

<!-- Copyright © Eudaemony Laboratory -->

<HEAD>

<link rel=stylesheet href="ab_style.css" type="text/css">

<title>Applauses & Boos - Eudaemony Laboratory</title>

</HEAD>

<BODY bgcolor="white" background="bg1.gif" text="navy" link="navy" alink="navy" vlink="navy">

<center><table width="100%" height="100%"><tr><td align="center" valign="middle">

<center><table bgcolor="white" width="700pt" cellpadding="33pt"><tr><td align="center" valign="middle">

<img src="a&b.jpg">

<br><br>

<SCRIPT language="JavaScript" src="menu.js">
</SCRIPT>

<br><br><br><br>

<font face="verdana" color="navy" size="3">

What follows is the synthesis of thought<br>of people about the issue:

<br><br>

<b>

<?php

$title = file_get_contents ("title.txt");

$title = mb_strtoupper($title); // uppercase title

echo $title;

?>

</b>

<br><br><br><br>

<div align="left">

<?php

$handle = fopen("arena.csv","r");

$data = fgetcsv($handle, 4096, ",");

fclose($handle);

if ($data[0] !== NULL) { // if no vote are present

$handle = fopen("arena.csv","r");

while (($data = fgetcsv($handle, 4096, ",")) !== FALSE) {

if ($data[6] == "-2") {

$gif = "r.gif";

}

if ($data[6] == "-1") {

$gif = "y.gif";

}

if ($data[6] == "0") {

$gif = "w.gif";

}

if ($data[6] == "1") {

$gif = "l.gif";

}

if ($data[6] == "2") {

$gif = "g.gif";

}

$string = '<a href="square.php?' . $data[0] .'" title="' . $data[0] . ' : ' . $data[4] . ' : ' . $data[5] . '"><img src="' . $gif . '" width="24pt" border="1"></a>' . ' ';

echo $string;

}

fclose($handle);

} else {

$string = '<center><b><font color="red">Still waiting for a vote.</b></font><br>Go right <b><a class="underline" href="index.php">now</b></a> to vote!</center>';

echo $string;

}

?>

</div>

</font>

<br><br><br>

<SCRIPT language="JavaScript" src="signature.js">
</SCRIPT>

</td></tr></table></center>

</td></tr></table></center>

</BODY>

</HTML>