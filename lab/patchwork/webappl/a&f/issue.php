<HTML>

<!-- Copyright © Eudaemony Laboratory -->

<HEAD>

<link rel=stylesheet href="ab_style.css" type="text/css">

<title>Applausi & Fischi - Laboratorio Eudemonia</title>

</HEAD>

<BODY bgcolor="white" background="bg1.gif" text="navy" link="navy" alink="navy" vlink="navy">

<?php

$title = $_POST["title"];

$clean_title = strtolower($title);

$clean_title = preg_replace("/[^a-z0-9]/", " ", $clean_title);

// $clean_title serves to give a name to the folder
// preg_replace (search_for, replace_with, your_data)
// se possibile: cancellare eventuale doppio spazio

$words = explode(" ", $clean_title); // words separated by space

$char_0 = substr($words[0], 0, 1); // first char of first word

$char_1 = substr($words[1], 0, 1);

$r_0 = substr(rand(0,9999999), 0, 2); // first two nums of random number

$r_1 = substr(rand(0,9999999), 0, 2);

$alpha = "abcdefghijklmnopqrstuvwxyz";

$r_c = $alpha{rand(0,25)}; // add a final random alpha char

$folder = ('12'.$char_0.$r_0.$char_1.$r_1.$r_c); // 11: web appl id for a&f

// control for duplicate:

// $folder = "to test for a duplicate write here one";

$handle = fopen ("issues.csv", "r");

while (($data = fgetcsv($handle, 4096, ",")) !== FALSE) {

if ($folder == $data[1]) {

$folder = ''; // make null the folder in case of duplicate

}

}

fclose($handle);

if ($folder !== '') {

mkdir("$folder", 0777);

// new folder created!

$handle = fopen ("$folder/title.txt", "x+");

$title = preg_replace("/[^\d\w\s]/", " ", $title); // regex for digits, words, spaces

fwrite ($handle, $title);

fclose($handle);

$brief = $_POST["brief"];

$brief = preg_replace("/[^\d\w\s:.;,]/", " ", $brief); // like above + punctuation

if ($brief != NULL) {

$handle = fopen ("$folder/brief.txt", "x+");

fwrite ($handle, $brief);

fclose($handle);

$phrase_brief = ('<br><br>Questa è la tua tesi in breve:<br><br><b>' . $brief . '</b>');

}

$link = htmlspecialchars($_POST["link"], ENT_QUOTES);

if ($link != 'http://') {

$handle = fopen ("$folder/link.txt", "x+");

fwrite ($handle, $link);

fclose($handle);

$phrase_link = ('<br><br>Questo è il link di riferimento per ulteriori info:<br><br><b><a class="underline" href="' . $link . '" target="issue">' . $link . '</a></b>');

}

copy("model/index.php", "$folder/index.php");

copy("model/vote.php", "$folder/vote.php");

copy("model/arena.php", "$folder/arena.php");

copy("model/square.php", "$folder/square.php");

copy("model/direct.php", "$folder/direct.php");

copy("model/arena.csv", "$folder/arena.csv");

copy("model/ab_style.css", "$folder/ab_style.css");

copy("model/menu.js", "$folder/menu.js");

copy("model/signature.js", "$folder/signature.js");

copy("model/a&f.jpg", "$folder/a&f.jpg");

copy("model/bg1.gif", "$folder/bg1.gif");

copy("model/blank.gif", "$folder/blank.gif");

copy("model/r.gif", "$folder/r.gif");

copy("model/y.gif", "$folder/y.gif");

copy("model/w.gif", "$folder/w.gif");

copy("model/l.gif", "$folder/l.gif");

copy("model/g.gif", "$folder/g.gif");

// end of setting new folder

$hour = date("H");

$minute = date("i");

$second = date("s");

$t = $hour.":".$minute.":".$second;

// time of new issue setting

$day = date("d"); 

$month = date("m");

$olderayear = date("Y");

$newerayear = $olderayear - 1969;

$d = $day."/".$month."/".$newerayear;

// date of new issue setting

$handle = fopen("issues.csv","r");

while (($data = fgetcsv($handle, 4096, ",")) !== FALSE) {

$nissuer = $data[0];

}

$nissuer++;

fclose($handle);

// calcola il numero progressivo del record: prende l'ultimo in fondo al file e lo incrementa di 1

$handle = fopen ("issues.csv", "a+");

fwrite ($handle, '"'.$nissuer.'", ');

fwrite ($handle, '"'.$folder.'", ');

fwrite ($handle, '"'.$title.'", ');

fwrite ($handle, '"'.$_SERVER['REMOTE_ADDR'].'", ');

fwrite ($handle, '"'.$t.'", ');

fwrite ($handle, '"'.$d.'"');

$cr = chr(015);

fwrite ($handle, $cr);

$lf = chr(012);

fwrite ($handle, $lf);

fclose($handle);

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

if ($folder !== '') {

$base_url = ('http://www.hyperlinker.net/s.php?'.$folder);
$negg_url = ('http://www.hyperlinker.net/s.php?'.$folder.'&-2');
$neg_url = ('http://www.hyperlinker.net/s.php?'.$folder.'&-1');
$zero_url = ('http://www.hyperlinker.net/s.php?'.$folder.'&0');
$pos_url = ('http://www.hyperlinker.net/s.php?'.$folder.'&1');
$poss_url = ('http://www.hyperlinker.net/s.php?'.$folder.'&2');

echo ('La tua questione <b>'.$title.'</b> è stata approntata.'.$phrase_brief.$phrase_link.'<br><br><br>Quì è dove puoi recarti giusto ora<br>ad esprimere il tuo pensiero su di essa:<br><br><b><a class="underline" href="'.$base_url.'">'.$base_url.'</a></b><br><br>');

echo ('<br>E questo è l intero set di indirizzi per i tuoi amici:<br><br>');

echo ('<textarea onClick=this.select(); rows=10 cols=66>Per valutare dando un commento:
'.$base_url.'

Per valutare anonimamente semplicemente cliccando un link:
'.$negg_url.'  grande FIISCHIO!
'.$neg_url.'  piccolo fischio
'.$zero_url.'   vera indifferenza
'.$pos_url.'   piccolo applauso
'.$poss_url.'   grande APPLAUSO!
</textarea>');

} else {

echo 'Evento eccezionale!<br><br>Il nome della cartella<br>generato automaticamente per la tua questione<br>è già in uso nella nostra tabella.<br><br>Please: <b><a class="underline" href="index.php">ripeti</a></b> la procedura.';

}

?>

</b>

</font>

<br><br><br>

<SCRIPT language="JavaScript" src="signature.js">
</SCRIPT>

</td></tr></table></center>

</td></tr></table></center>

</BODY>

</HTML>