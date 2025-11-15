<?php

$email = $_POST['email'] ;

$message = $_POST['message'] ;

mail("eulab@hyperlinker.com", "Applausi & Fischi", $message, "From: $email");

header("Location: ok.php");

?>