

<?php
// Semplice meccanismo di logout
// Distruggo la sessione 
// Redirigo a index.html
    session_start();
    session_destroy();
    header('Location: ../index.html');
?>