
// per l'operazione di modifica di descrizione di un evento

$(document).ready(function(){ 

    $('#modify_submit').click(function(event){ 
        
        event.preventDefault(); 

        var id_DB = $('#id_modify').text();
        var id = id_DB.split('_')[2];
        var username = $('#hidden_username').val();
        var new_description = $('#description_modify').val();

        // costruisco l'oggetto per i parametri della post 
        var param = {ID: id, Username: username, NewDescription: new_description};

        $.post('../php/modify_by_id.php', param, function(result){ 

            var id_modified = result['select_result'];

            // mostro la nuova descrizione
            change_description(id_modified, new_description);
            $('#modify_reset').click(); // resetto il campo di input
            closeForm("modify_by_id"); // chiudo la form aperta

        }, "json");  // formato JSON

    });
});