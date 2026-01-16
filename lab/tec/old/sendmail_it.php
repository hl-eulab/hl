<?php

$email = $_POST['email'] ;

$message = $_POST['message'] ;

mail("tec@hyperlinker.com", "Il Calendario della Terra", $message, "From: $email");

header("Location: ok_it.php");

?>