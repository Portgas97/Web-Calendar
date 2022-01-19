

<?php
    include 'utility.php';
	session_start();

    if(!isset($_SESSION['loggedin'])){
        $errore = array('errore' => 'utente non loggato');
        print json_encode($errore);
        header('Location: ../index.html');
        exit;
    }

	if (!isset($_POST['Username']) || !isset($_POST['ID'])) {
        $errore = array('errore' => 'Parametri non corretti');
        print json_encode($errore);
        header('Location: ./calendar.php'); 
        exit;
	}

    $con = connect_DB();
    $id_delete = test_input($_POST["ID"]);
    $username = test_input($_POST['Username']);


    // prima ricavo l'id per semplificare poi l'aggiornamento della visualizzazione lato client
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
    
    // query per l'eliminazione
    $query = "DELETE FROM `venturini_548415_DB`.`events` WHERE `events`.`username` = '{$username}' AND `events`.`id` = '{$id_delete}'";   
 
    if ($con->query($query) === TRUE) {
        $json_result['delete_result'] = true;
    } else {
        $json_result['delete_result'] = $con->error;
    }
    
    print json_encode($json_result);

?>