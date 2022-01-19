
// eliminazione di un evento tramite uso diretto della form relativa

$(document).ready(function(){ // quando il DOM è stato caricato

    $('#delete_btn').click(function(event){ // listener sul click
        
        event.preventDefault();

        var date = $('#date_delete').val();
        var description = $('#description_delete').val();
        var username = $('#hidden_username').val(); // leggo il campo nascosto per ricavare lo username, necessario per la query
        var param = {Date: date, Description: description, Username: username}; // oggetto

        $.post('../php/delete_event.php', param, function(result){ // callback, chiamata POST

            var id_deleted = result['select_result'];
            elimina_singolo_evento(id_deleted, date); // funzione di utilità, elimina in base all'id nel database

        }, "json"); // formato JSON per le comunicazioni con il server

    });
});


