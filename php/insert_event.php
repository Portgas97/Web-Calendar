<?php
    include 'utility.php';
	session_start();


    if(!isset($_SESSION['loggedin'])){
        $errore = array('errore' => 'utente non loggato');
        print json_encode($errore);
        header('Location: ../index.html');
        exit;
    }

	// Si controlla se i dati required sono stati immessi
	if ( !isset($_POST['Description']) || !isset($_POST['Date']) ) {
        $errore = array('errore' => 'Parametri non corretti');
        print json_encode($errore);
        header('Location: ./calendar.php');
        exit;
	}

    $con = connect_DB(); // funzione in utility.php
    
    // Test e assegnamento delle variabili required
    // attenzione le chiavi sono maiuscole !!
    $description = test_input($_POST["Description"]);
    $date = test_input($_POST["Date"]);
    $username = test_input($_SESSION["username"]);
    
  	// Preparare gli statement SQL prviene le SQL injections, come visto a laboratorio
    $stmt = $con->prepare('INSERT INTO venturini_548415_DB.events (`id`, `username`, `when`, `description`) VALUES (NULL,?, ?, ?)');
    // var_dump($stmt);
    $stmt->bind_param('sss', $username, $date, $description); // s per le stringhe
    $query_result = $stmt->execute(); 
    $result = array('result' => $query_result, 'last_id' => $stmt->insert_id);
    print json_encode($result);

?>