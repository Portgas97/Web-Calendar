<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title> Sign in Form</title>
    <link rel="stylesheet" type="text/css" href="css/signin_style.css">
    <script src="javascript/signin.js"></script>
  </head>

  <body>

    <div id="page-container"> <!-- permette di implementare sticky footer in fondo-->

      <div id="content-wrap">

        <ul class="nav-links">
          <li class="logo"> Organizer </li>
          <li> <a href="index.html">Home</a> </li>
          <li> <a href="about.html">About</a> </li>
          <li style="float:right"> <a class="right" href="login.html">Login</a> </li>
        </ul>

        <?php

          session_start();
          include './php/utility.php';

          if(isset($_SESSION['user_exists'])){
            alert("This username already exists");
            $_SESSION['user_exists'] = null;
          }

        ?>
        
        <form class="box" onsubmit="return validate()" action="php/auth_signin.php" method="post" enctype="application/x-www-form-urlencoded"> <!-- enctype come nelle slide del corso -->
          <div class="special">
            <h5 class="special">*Campo Obbligatorio</h5>
          </div>    
          <h1> Register</h1>
          <p><label for="name">Name*<input type="text" name="name" id="name" placeholder="Francesco" maxlength=100 autofocus required autocomplete="off"></label></p>
          <p><label for="surname">Surname*<input type="text" name="surname" id="surname" placeholder="Venturini" maxlength=100 required autocomplete="off"></label></p>
          <p><label for="e-mail">e-mail*<input type="email" name="e-mail" id="e-mail" placeholder="something@example.com" maxlength=100 autocomplete="off" required></label></p>
          <p><label for="telephone">Telephone<input type="tel" name="telephone" id="telephone" placeholder="+39 xxx xx xx xxx" maxlength=100 autocomplete="off"></label></p>
          <p><label for="birthday">Birthday<input type="date" name="birthday" id="birthday"></label></p>
          <p><label for="username">Username*<input type="text" name="username" id="username" placeholder="-" maxlength=100 autocomplete="off" required></label></p>
          <p><label for="password">Password(At Least 8 char)*<input minlength="8" pattern=".{8,}" type="password" name="password" id="password" placeholder="-" maxlength=100></label></p>
          <input type="submit" name="submit" value="Sign In">
          <input type="reset" name="reset" value="reset">
        </form>
    
      </div>

      <footer id="footer">
        <p>Author: Francesco Venturini</p>
        <p> Progetto per il corso di Progettazione Web</p>
        <p> Universit&#224; di Pisa</p>
        <p><a href="mailto:f.venturini12@studenti.unipi.it">send mail: f.venturini12@studenti.unipi.it</a></p>
      </footer>
    </div>

  </body>
</html>