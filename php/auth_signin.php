<?php
   include 'utility.php';
	session_start();

	$con = connect_DB(); // connessione al database (file utility.php)

	// Si controlla se i dati required sono stati immessi
	if ( !isset($_POST['username']) || !isset($_POST['password']) || !isset($_POST['e-mail']) || !isset($_POST['name']) || !isset($_POST['surname'])   ) {
		exit('Please fill the required fields!');
	}

   // Test e/o assegnamento delle variabili che potrebbero essere null
   if(!isset($_POST['telephone']))
      $telephone = null;
   else
      $telephone = test_input($_POST['telephone']);

   if(!isset($_POST['birthday']))
      $birthday = null;
   else
      $birthday = test_input($_POST['birthday']);

   // Test e assegnamento delle restant variabili (required)
   $name = $surname = $email = $username = $password = "";
   $name = test_input($_POST["name"]);
   $surname = test_input($_POST["surname"]);
   $username = test_input($_POST["username"]);
   $password = test_input($_POST["password"]);
   $password_hash = password_hash($password, PASSWORD_DEFAULT);

   $email = test_input($_POST["e-mail"]);
   if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      exit("Invalid e-mail format");
   }
   
   // controllo che lo username non sia già in uso
   $sql = ("SELECT username FROM accounts WHERE username='$username'");
   $result = $con->query($sql);
   $_SESSION['result'] = $result;

   if ($result->num_rows > 0) { // username già in uso
      $_SESSION['user_exists'] = TRUE;
      header('Location: ../signin.php');
      exit;
   }

  	// Preparare gli statement SQL prviene le SQL injections, come visto a laboratorio
	$stmt = $con->prepare('INSERT INTO venturini_548415_DB.accounts (`id`, `name`, `surname`, `e-mail`, `telephone`, `birthday`, `username`, `password`) VALUES (NULL,?, ?, ?, ?, ?, ?, ?)');
   // var_dump($stmt);

   $stmt->bind_param('sssisss', $name, $surname, $email, $telephone, $birthday, $username, $password_hash); // s per le stringhe, i per gli interi

   $stmt->execute();

   $stmt->store_result();
   session_regenerate_id();

   // setto le variabili di sessione
   $_SESSION['loggedin'] = TRUE;
   $_SESSION['first_time'] = TRUE;
   $_SESSION['username'] = $username;
   $last_id = $con->insert_id; // funzione predefinita per leggere l'ultimo id inserito
   $_SESSION['account_id'] = $last_id;

   header('Location: ./calendar.php'); // redirezione
   $stmt->close(); // chiusura connessione

?>