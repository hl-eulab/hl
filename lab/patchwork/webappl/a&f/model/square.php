<HTML>

<!-- Copyright © Eudaemony Laboratory -->

<HEAD>

<link rel=stylesheet href="ab_style.css" type="text/css">

<title>Applausi & Fischi - Laboratorio Eudemonia</title>

</HEAD>

<BODY bgcolor="white" background="bg1.gif" text="navy" link="navy" alink="navy" vlink="navy">

<center><table width="100%" height="100%"><tr><td align="center" valign="middle">

<center><table bgcolor="white" width="700pt" cellpadding="33pt"><tr><td align="center" valign="middle">

<img src="a&f.jpg">

<br><br>

<SCRIPT language="JavaScript" src="menu.js">
</SCRIPT>

<br><br><br>

<font face="verdana" color="navy" size="3">

<?php

$askedrow = intval($_SERVER['QUERY_STRING']);

$row = 0;

$handle = fopen("arena.csv","r");

while ($row !== $askedrow) {

$data = fgetcsv($handle, 4096, ",");

$row++;

}

$nvoter = $data[0];

$t = $data[1];

$d = $data[2];

$ipnumber = $data[3];

$voter = $data[4];

$comment = $data[5];

$vote = $data[6];

fclose($handle);

if ($vote == "-2") {

$_1 = 'un grande <b><font color="red">FISCHIO</font></b>';

}

if ($vote == "-1") {

$_1 = 'un piccolo <b><font color="#bbbb00">fischio</font></b>';

}

if ($vote == "0") {

$_1 = '<b><font color="navy">vera indifferenza</font></b>';

}

if ($vote == "1") {

$_1 = 'un piccolo <b><font color="00dd00">applauso</font></b>';

}

if ($vote == "2") {

$_1 = 'un grande <b><font color="green">APPLAUSO</font></b>';

}

?>

<!--

At <b> <a title="server side time"> <?php echo $t; ?> </a> </b> on the day <b> <a title="accordingly to The Earth Calendar"> <?php echo $d; ?> </a> </b>

<br>

from the IP number <b> <?php echo $ipnumber; ?> </b>

<br><br>

-->

<b><?php echo $voter; ?></b>

<br>

votante numero <b><?php echo $nvoter; ?></b>

<br><br>

ha aggiunto <?php echo $_1; ?>

<br>

per quanto riguarda la questione:

<br><br>

<b>

<?php

$title = file_get_contents ("title.txt");

echo '<a class="underline" href="index.php">'.$title.'</a>';

?>

</b>

<br><br>

<?php

if ($comment != null) {

echo ('Questo è stato il commento:<br><br><b><i>' . $comment . '</i></b><br><br>');

}

?>

Ora torna a vedere<br>la risposta dell intera <b><a class="underline" href="arena.php">Arena</a></b>!

</font>

<br><br><br>

<SCRIPT language="JavaScript" src="signature.js">
</SCRIPT>

</td></tr></table></center>

</td></tr></table></center>

</BODY>

</HTML>