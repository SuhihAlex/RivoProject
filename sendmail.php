<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail -> CharSet = 'UTF-8';
    $mail -> setLanguage('en', 'phpmailer/language/');
    $mail -> IsHTML(true);

    $mail -> setFrom('suhari93@mail.ru');

    $mail -> addAddress('suhari93@mail.ru');

    $mail -> Subject = 'Alex';

    $body = '<h1>Hello!</h1>';

    if (trim(!empty($_POST['name']))) {
        $body .= '<p><strong>Name:</strong> '.$_POST['name'].'</p>';
    }
    if (trim(!empty($_POST['email']))) {
        $body .= '<p><strong>Email:</strong> '.$_POST['email'].'</p>';
    }
    if (trim(!empty($_POST['phone']))) {
        $body .= '<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
    }
    if (trim(!empty($_POST['message']))) {
        $body .= '<p><strong>Message:</strong> '.$_POST['message'].'</p>';
    }


    if (!empty($_FILES['image']['tmp_name'])) {
        $filePath = __DIR__ . '/files/' . $_FILES['image']['name'];

        if(copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body = '<p><strong>Foro</strong>';
            $mail -> addAttachment($fileAttach);
        }
    }

    $mail -> Body = $body;

    if (!mail -> send()) {
        $message = 'Error';
    } else {
        $message = 'Success';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

?>