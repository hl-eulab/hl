<HTML>

<!-- Copyright © Eudaemony Laboratory -->

<HEAD>

<link rel=stylesheet href="ab_style.css" type="text/css">

<title>Applausi & Fischi - Laboratorio Eudemonia</title>

</HEAD>

<BODY bgcolor="white" background="bg1.gif" text="navy" link="navy" alink="navy" vlink="navy">

<?php

$handle = fopen("arena.csv","r");

while (($data = fgetcsv($handle, 4096, ",")) !== FALSE) {

$ip_number = $data[3];

}

fclose($handle);

if ($_SERVER['REMOTE_ADDR'] !== $ip_number) { // if present IP differs from previous IP

$hour = date("H");

$minute = date("i");

$second = date("s");

$t = $hour.":".$minute.":".$second;

// got vote time

$day = date("d"); 

$month = date("m");

$olderayear = date("Y");

$newerayear = $olderayear - 1969;

$d = $day."/".$month."/".$newerayear;

// got date + new era

$vote = ($_SERVER['QUERY_STRING']);

if (($vote == "-2") or ($vote == "-1") or ($vote == "0") or ($vote == "1") or ($vote == "2")) { // if $vote contains a valid value

if ($vote == "-2") {

$_1 = 'a great <b><font color="red">BOOOOO</font></b>';

$_2 = '<b><font color="red">red</font></b>';

$_3 = '<img src="r.gif" width="18pt" border="1">';

}

if ($vote == "-1") {

$_1 = 'a <b><font color="#bbbb00">booo</font></b>';

$_2 = '<b><font color="#bbbb00">yellow</font></b>';

$_3 = '<img src="y.gif" width="18pt" border="1">';

}

if ($vote == "0") {

$_1 = '<b><font color="navy">your indifference</font></b>';

$_2 = '<b><font color="navy">white</font></b>';

$_3 = '<img src="w.gif" width="18pt" border="1">';

}

if ($vote == "1") {

$_1 = 'an <b><font color="#00dd00">applause</font></b>';

$_2 = '<b><font color="#00dd00">lightgreen</font></b>';

$_3 = '<img src="l.gif" width="18pt" border="1">';

}

if ($vote == "2") {

$_1 = 'a great <b><font color="green">APPLAUSE</font></b>';

$_2 = '<b><font color="green">green</font></b>';

$_3 = '<img src="g.gif" width="18pt" border="1">';

}

$voter = NULL;

$comment = NULL;

// make null fields of name and comment

$handle = fopen("arena.csv","r");

while (($data = fgetcsv($handle, 4096, ",")) !== FALSE) {

$nvoter = $data[0];

}

$nvoter++;

fclose($handle);

// calcola il numero progressivo del record: prende l'ultimo in fondo al file e lo incrementa di 1

$handle = fopen ("arena.csv", "a+");

fwrite ($handle, '"'.$nvoter.'", ');

fwrite ($handle, '"'.$t.'", ');

fwrite ($handle, '"'.$d.'", ');

fwrite ($handle, '"'.$_SERVER['REMOTE_ADDR'].'", ');

fwrite ($handle, '"'.$voter.'", ');

fwrite ($handle, '"'.$comment.'", ');

fwrite ($handle, '"'.$vote.'"');

$cr = chr(015);

fwrite ($handle, $cr);

$lf = chr(012);

fwrite ($handle, $lf);

fclose($handle);

} else { // if $vote does not contain a valid value

$vote = NULL;

}

} else {

$vote = 'double_vote'; // if present IP equal previous IP

}

?>

<center><table width="100%" height="100%"><tr><td align="center" valign="middle">

<center><table bgcolor="white" width="700pt" cellpadding="33pt"><tr><td align="center" valign="middle">

<img src="a&f.jpg">

<br><br>

<SCRIPT language="JavaScript" src="menu.js">
</SCRIPT>

<br><br><br>

<font face="verdana" color="navy" size="3">

<?php

if ($vote !== 'double_vote') { // if present IP equal previous IP

if ($vote !== NULL) { // if $vote does not contain a valid value

$title = file_get_contents ("title.txt");

echo ('<b>OLA!</b><br><br>Alle <b><a title="server side time">'.$hour.':'.$minute.':'.$second.'</a></b> del giorno <b><a title="in accordo con Il Calendario della Terra">'.$day.'/'.$month.'/'.$newerayear.'</a></b><br>');

echo ('dal numero IP <b>'.$_SERVER['REMOTE_ADDR'].'</b><br>hai espresso il tuo pensiero<br>riguardo la seguente questione:<br><br><b>'.$title.'</b><br><br>');

echo ('aggiungendo '.$_1.' rappresentato da un '.$_2.' quadrato: '.$_3.'<br>Precisamente sei il quadratino numero: <b>'.$nvoter.'</b><br><br>Ora vai a vedere la risposta dell intera <b><a class="underline" href="arena.php">Arena</a></b>!');

} else {

echo 'Spiacenti: il tuo voto è NULLO.<br><br>Please, controlla l URL.<br><br>O vai direttamente a <b><a class="underline" href="index.php">votare</a></b>.';

}

} else { // in case of double vote from the same IP

echo '<b>HI!</b><br><br>Sei sicuro di non aver già votato?<br>Il tuo numero IP risulta aver votato proprio per ultimo.<br><br>Please: se hai già votato,<br>vai a vedere la risposta dell intera <b><a class="underline" href="arena.php">ARENA</a></b>.';

}

?>

</font>

<br><br><br>

<SCRIPT language="JavaScript" src="signature.js">
</SCRIPT>

</td></tr></table></center>

</td></tr></table></center>

</BODY>

</HTML>