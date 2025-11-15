<?php

$email = $_POST['email'] ;

$message = $_POST['message'] ;

mail("tec@hyperlinker.com", "The Earth Calendar", $message, "From: $email");

header("Location: ok_en.php");

?>