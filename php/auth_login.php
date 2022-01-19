<?php
	include 'utility.php';
	session_start();

	$con = connect_DB(); // connessione col database
	
	// Si controlla se i dati sono stati immessi
	if ( !isset($_POST['username']) || !isset($_POST['password']) ) {
		exit('Please fill both the required fields!');
	}

	$username = test_input($_POST["username"]);
    $password = test_input($_POST["password"]);
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

	// Prepara gli statement SQL previene le SQL injections, come visto a laboratorio
	if ($stmt = $con->prepare('SELECT id, password FROM accounts WHERE username = ?')) { 

		$stmt->bind_param('s', $_POST['username']); // s per le stringhe
		$stmt->execute();
		$stmt->store_result();

		if ($stmt->num_rows > 0) { // se ci sono risultati
			$stmt->bind_result($id, $password);
			$stmt->fetch();

			// Verifichiamo la password
			// Si usa password_hash
			if (password_verify($_POST['password'], $password)) { 
				// OK, lo user si logga, creiamo una sessione per ricordarlo
				session_regenerate_id();
				$_SESSION['loggedin'] = TRUE;
				$_SESSION['username'] = $username;
				$_SESSION['account_id'] = $id;
				header('Location: ./calendar.php');

			} else {
				// Password errata
				echo 'Incorrect password!';
			}
		} else {
			// Incorrect username
			echo 'Incorrect username!';
		}

		// chiusura connessione
		$stmt->close();
	}

?>

