<?php

$email = $_POST['email'] ;

$message = $_POST['message'] ;

mail("eulab@hyperlinker.com", "New Valuation", $message, "From: $email");

header("Location: ok.php");

?>