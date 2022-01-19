

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
	if (!isset($_POST['Username'], $_POST['ID'], $_POST['NewDescription'])) {
        $errore = array('errore' => 'Parametri non corretti');
        print json_encode($errore);
        header('Location: ./calendar.php'); 
        exit;
	}

    $con = connect_DB(); // connessione al database

    $id_delete = test_input($_POST["ID"]);
    $username = test_input($_POST['Username']);
    $new_description = test_input($_POST['NewDescription']);

    // query per la selezione degli id delle righe che verranno modificate
    $query = "SELECT id, `when` FROM `venturini_548415_DB`.`events` WHERE `events`.`username` = '{$username}' AND `events`.`id` = '{$id_delete}'";   

    $select_result = $con->query($query);

    $json_result = array();
    if($select_result->num_rows > 0){
        $row = $select_result->fetch_assoc(); // solamente una riga
        $json_result['select_result'] = $row['id'];
        $json_result['select_when'] = $row['when'];
    } else {
        $json_result['select_result'] = "Errore nella select pre-delete";
    }
    
    // query per la modifica
    $query = "UPDATE `venturini_548415_DB`.`events` SET `events`.`description` = '{$new_description}' WHERE `events`.`username` = '{$username}' AND `events`.`id` = '{$id_delete}'";   
 
    if ($con->query($query) === TRUE) {
        $json_result['delete_result'] = true;
    } else {
        $json_result['delete_result'] = $con->error;
    }
    
    print json_encode($json_result); // risultato JSON

?>