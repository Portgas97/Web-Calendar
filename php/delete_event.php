

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
	if (!isset($_POST['Date']) || !isset($_POST['Username']) || !isset($_POST['Description'])) {
        $errore = array('errore' => 'Parametri non corretti');
        print json_encode($errore);
        header('Location: ./calendar.php'); 
        exit;
	}

    $con = connect_DB();
    // Test e assegnamento delle variabili required
    // attenzione le chiavi sono maiuscole !!
    $date_delete = test_input($_POST["Date"]);
    $username = test_input($_POST['Username']);
    $description_delete = $_POST['Description'];


    // Eseguendo prima la selezione dell'id della riga che viene eliminata la pulizia lato client sarà più snella ed efficiente
    $query = "SELECT id FROM `venturini_548415_DB`.`events` WHERE `events`.`username` = '{$username}' AND `events`.`when` = '{$date_delete}' AND `events`.`description` = '{$description_delete}'";   

    $select_result = $con->query($query);

    $json_result = array();
    if($select_result->num_rows > 0){
        $row = $select_result->fetch_assoc(); // solamente una riga
        $json_result['select_result'] = $row['id'];
    } else {
        $json_result['select_result'] = "Errore nella select pre-delete";
    }
    
    // Eliminazione
    $query = "DELETE FROM `venturini_548415_DB`.`events` WHERE `events`.`username` = '{$username}' AND `events`.`when` = '{$date_delete}' AND `events`.`description` = '{$description_delete}'";   
 
    if ($con->query($query) === TRUE) {
        $json_result['delete_result'] = true;
    } else {
        $json_result['delete_result'] = $con->error;
    }
    
    print json_encode($json_result);

?>