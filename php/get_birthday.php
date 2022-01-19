<?php

    include 'utility.php';
    session_start();


    if(!isset($_SESSION['loggedin'])){ // si controlla se si è effettuato il login
        $errore = array('errore' => 'utente non loggato');
        print json_encode($errore);
        header('Location: ../index.html');
        exit;
    }

    $con = connect_DB();

    $username = test_input($_POST["Username"]);

    // query per vedere se il compleanno è stato inserito dall'utente in fase di registrazione
    $query = "SELECT A.birthday FROM accounts A WHERE A.username='{$username}' AND A.birthday IS NOT NULL";

    $result = $con->query($query);

    $result_array = array();

    if($row = $result->fetch_array()){
        $result_array = array("birthday" => $row['birthday']);
    } else {
        $result_array = array("birthday" => null);
    }

    print(json_encode($result_array)); // restituisco in formato JSON
   
?>