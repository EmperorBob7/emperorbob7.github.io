<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$headers = 'From: CA <ca@ca.com>' . "\r\n" .
    'Reply-To: '.$email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$email_message = "

Name: ".$name."
Email: ".$email."
Phone: ".$phone."
Subject: ".$subject."
Message: ".$message."

";

mail ("ca@ca.com" , "Contact Form ", $email_message, $headers);
mail ($email , "Contact Form", $email_message, $headers);
header("location: ../contact-submission.html");
?>


