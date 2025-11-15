<?php

$email = $_POST['email'] ;

$message = $_POST['message'] ;

mail("eulab@hyperlinker.org", "Applauses & Booooos", $message, "From: $email");

header("Location: ok.php");

?>
