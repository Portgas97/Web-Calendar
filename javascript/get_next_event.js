// funzione su ready che chiama un php che prende i prossimi due eventi
// per mostrarli nell'external_box_left, dove ci sono i prossimi eventi in programma

// chiamata ogni 30 secondi per mantenere la visualizzazione aggiornata con il database
function next_events_polling(){
    console.log("polling");
    var username = $('#hidden_username').val();
    var param = {Username: username};

    $.post('../php/get_next_event.php', param, function(result){ // callback, chiamata POST

        console.log(result);
        mostra_prossimi_eventi(result);

    }, "json"); // comunicazioni in formato JSON
}


$(document).ready(function(){ // quando il DOM è stato caricato

    next_events_polling(); // funzione definita sopra
    setInterval(next_events_polling, 30000); // ogni 30 secondi la richiamo per vedere i cambiamenti

});


