
<?php

// Ricava gli eventi dell'utente per poi visualizzare quelli appartenenti
// al periodo mostrato nella pagina web 

    include 'utility.php';
    session_start();


    if(!isset($_SESSION['loggedin'])){
        $errore = array('errore' => 'utente non loggato');
        print json_encode($errore);
        header('Location: ../index.html');
        exit;
    }

    $con = connect_DB();

    if(isset($_POST["Month"]))
        $Month = test_input($_POST["Month"]);
        
    if(isset($_POST["Month_Another"]))
        $Month_Another = test_input($_POST["Month_Another"]);

    if(isset($_POST["Year_Another"]))
        $Year_Another = test_input($_POST["Year_Another"]);

    $Year = test_input($_POST["Year"]);
    $Username = test_input($_POST["Username"]);

    // La selezione è differente in base alla modalità di visualizzazione scelta

    if($Month == null){ // visualizzazione sull'anno
        $query = "SELECT E.id, E.when, E.description FROM events E WHERE E.username='{$Username}' AND YEAR(E.when)='{$Year}'";

    } else if($Month_Another == null){ // visualizzazione sulla settimana, non attraversa due mesi. Oppure visualizzazione giornaliera normale.
        $query = "SELECT E.id, E.when, E.description FROM events E WHERE E.username='{$Username}' AND MONTH(E.when)='{$Month}' AND YEAR(E.when)='{$Year}'";

    } else if($Year_Another != null) { // visualizzazione settimana, la settimana attraversa due mesi a cavallo fra due anni
            $query = "SELECT E.id, E.when, E.description FROM events E WHERE E.username='{$Username}' AND (MONTH(E.when)='{$Month}' OR MONTH(E.when)='{$Month_Another}') AND (YEAR(E.when)='{$Year}' OR YEAR(E.when)='{$Year_Another}')";

    } else if($Year_Another == null) {
        $query = "SELECT E.id, E.when, E.description FROM events E WHERE E.username='{$Username}' AND (MONTH(E.when)='{$Month}' OR MONTH(E.when)='{$Month_Another}') AND YEAR(E.when)='{$Year}'";
        
    }
      
   
    $result = $con->query($query);

    $result_array = array();
    $i = 0;
    while($row = $result->fetch_array()){
        $desc_id = array("description" => $row['description'], "id" => $row['id']);
        $result_array[$row['when'].'_'."{$i}"] = $desc_id; // la concatenazione serve per differenziare gli eventi nella stessa data
        $i++;
    }

    print(json_encode($result_array));
   
?>