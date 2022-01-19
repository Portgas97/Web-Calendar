
<?php
// Prelievo degli, eventuali, prossimi due eventi per l'utente 

    include 'utility.php';
    session_start();


    if(!isset($_SESSION['loggedin'])){
        $errore = array('errore' => 'utente non loggato');
        print json_encode($errore);
        header('Location: ../index.html');
        exit;
    }

    $con = connect_DB();

    $Username = test_input($_POST["Username"]);

    // sfrutta order by per ordinare i risultati, limitando la selezione alle prime due righe
    $query = "SELECT E.when, E.description FROM events E WHERE E.username='{$Username}' AND E.when > CURRENT_DATE  ORDER BY E.when LIMIT 2";
       
    $result = $con->query($query);


    $result_array = array();
    $i = 0;
    while($row = $result->fetch_array()){
        $event = array("description" => $row['description'], "when" => $row['when']);
        $result_array[$i] = $event; 
        $i++;
    }

    print(json_encode($result_array));
   
?>