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

// ricavata ora di voto

$day = date("d"); 

$month = date("m");

$olderayear = date("Y");

$newerayear = $olderayear - 1969;

$d = $day."/".$month."/".$newerayear;

// ricavata data + nuova era

$vote = $_POST["vote"];

if ($vote == "-2") {

$_1 = 'un grande <b><font color="red">FISCHIO</font></b>';

$_2 = '<b><font color="red">red</font></b>';

$_3 = '<img src="r.gif" width="18pt" border="1">';

}

if ($vote == "-1") {

$_1 = 'un <b><font color="#bbbb00">fischio</font></b>';

$_2 = '<b><font color="#bbbb00">yellow</font></b>';

$_3 = '<img src="y.gif" width="18pt" border="1">';

}

if ($vote == "0") {

$_1 = '<b><font color="navy">la tua indifferenza</font></b>';

$_2 = '<b><font color="navy">white</font></b>';

$_3 = '<img src="w.gif" width="18pt" border="1">';

}

if ($vote == "1") {

$_1 = 'un <b><font color="#00dd00">applauso</font></b>';

$_2 = '<b><font color="#00dd00">lightgreen</font></b>';

$_3 = '<img src="l.gif" width="18pt" border="1">';

}

if ($vote == "2") {

$_1 = 'a grande <b><font color="green">APPLAUSO</font></b>';

$_2 = '<b><font color="green">green</font></b>';

$_3 = '<img src="g.gif" width="18pt" border="1">';

}

$voter = $_POST["voter"];

$voter = preg_replace("/[^\d\w\s]/", " ", $voter); // regex for digits, words, spaces

$comment = $_POST["comment"];

$comment = preg_replace("/[^\d\w\s:.;,]/", " ", $comment); // like above + punctuation

// pulisci campi da caratteri speciali

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

echo '<b>'.$voter.'</b><br><br>';

echo 'alle <b><a title="server side time">'.$hour.':'.$minute.':'.$second.'</a></b> del giorno <b><a title="in accordo con Il Calendario della Terra">'.$day.'/'.$month.'/'.$newerayear.'</a></b><br>';

echo 'dal numero IP <b>'.$_SERVER['REMOTE_ADDR'].'</b><br>hai espresso il tuo pensiero<br>riguardo la questione:<br><br><b>';

$title = file_get_contents ("title.txt");

echo $title.'</b><br><br>aggiungendo '.$_1.' rappresentato da un '.$_2.' quadrato: '.$_3.'<br>Precisamente sei il quadratino numero: <b>'.$nvoter.'</b><br><br>';

echo 'Ora vai a vedere l intero risultato nell<b><a class="underline" href="arena.php">Arena</a></b>!';

} else { // in case of double vote from the same IP

echo '<b>OLA!</b><br><br>Sei sicuro di non aver già votato?<br>Il tuo numero IP risulta aver votato proprio per ultimo.<br><br>Please: se hai già votato,<br>vai a vedere il risultato nell<b><a class="underline" href="arena.php">ARENA</a></b>.';

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