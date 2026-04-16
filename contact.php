<?php
include 'data.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = $profile['email'];
    $subject = "New Contact Form Message from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Thank you for your message! I will get back to you soon.'); window.location.href='index.php';</script>";
    } else {
        echo "<script>alert('Sorry, there was an error sending your message. Please try again.'); window.location.href='index.php';</script>";
    }
} else {
    header("Location: index.php");
    exit();
}
?>