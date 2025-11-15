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

$_1 = 'a great <b><font color="red">BOOOOO</font></b>';

}

if ($vote == "-1") {

$_1 = 'a little <b><font color="#bbbb00">booo</font></b>';

}

if ($vote == "0") {

$_1 = '<b><font color="navy">true indifference</font></b>';

}

if ($vote == "1") {

$_1 = 'a little <b><font color="00dd00">applause</font></b>';

}

if ($vote == "2") {

$_1 = 'a great <b><font color="green">APPLAUSE</font></b>';

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

voter number <b><?php echo $nvoter; ?></b>

<br><br>

has added <?php echo $_1; ?>

<br>

for as regards the issue:

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

echo ('This was the comment:<br><br><b><i>' . $comment . '</i></b><br><br>');

}

?>

Now come back to see<br>the whole response in the <b><a class="underline" href="arena.php">Arena</a></b>!

</font>

<br><br><br>

<SCRIPT language="JavaScript" src="signature.js">
</SCRIPT>

</td></tr></table></center>

</td></tr></table></center>

</BODY>

</HTML>