<?php

$email = $_POST['email'] ;

$message = $_POST['message'] ;

mail("eulab@hyperlinker.com", "Il Calendario della Terra", $nome_cognome, "From: $email");

header("Location: ok_it.php");

?>