
// mostra due confirm box sequenziali per la scelta dell'operazione
// prima per l'eventuale modifica e poi per l'eventuale eliminazione
function request_to_alter_event(event){

    // confirm box per la modifica
    if(confirm("Do you want to MODIFY the event? \n\r Click \'OK\', otherwise click \'Annulla\'")){
        var input_field = document.getElementById("id_modify");
        input_field.textContent = event.target.id;
        openForm("modify_by_id"); // apre la form relativa alla modifica degli eventi in cui inserire la nuova descrizione

    } else {

        // confirm box per l'eliminazione
        if(confirm("****************************************** \n\rDELETE the event permanently? \n\r To discard click on \'Annulla\' \n\r******************************************")){

            // vengono automativamente riempiti i campi della form (grazie a event.target)
            // poi si ha il submit
            var input_field = document.getElementById("id_delete");
            input_field.textContent = event.target.id;

            var submit_button = document.getElementById("delete_by_id");
            submit_button.click();
        }

    }
}
