
// eliminazione indiretta tramite uso della forma nascosta
// basata sui click sopra agli eventi

$(document).ready(function(){ 

    $('#delete_by_id').click(function(event){ 
        
        event.preventDefault(); // standard

        var id_DB = $('#id_delete').text();
        var id = id_DB.split('_')[2];
        var username = $('#hidden_username').val(); // ricavo dal campo nascosto, per formare la query
        var param = {ID: id, Username: username};

        $.post('../php/delete_by_id.php', param, function(result){ 

            var id_deleted = result['select_result'];
            var date_of_event = result['select_when'];
            elimina_singolo_evento(id_deleted, date_of_event); // chiamo la funzione per l'eliminazione

        }, "json");  

    });
});