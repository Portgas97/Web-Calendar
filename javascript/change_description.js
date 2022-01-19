
// funzione per il cambio della descrizione degli eventi
// tramite l'operazione di modifica
function change_description(id_modified, new_description){

    var adjust_id = "DB_ID_" + id_modified;
    var modified_event_div = document.getElementById(adjust_id);
    var symbol = '\u2022'; 
    modified_event_div.textContent = symbol + ' ' + new_description; 
    
}