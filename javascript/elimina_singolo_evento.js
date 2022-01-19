
function elimina_singolo_evento(id_deleted, date){

    // ricavo le sottoinformazioni della data
    var splitted_date = date.split("-");
    var year = splitted_date[0];
    var month = splitted_date[1];
    var day = splitted_date[2];

    var function_box = document.getElementsByClassName("function_box")[0];
    var box_content = function_box.textContent;

    var URL_parameters = new URLSearchParams(window.location.search);
    var selected_modality = URL_parameters.get('selected_modality');

    var function_box_month = "";
    var function_box_year = "";
    var splitted_box_content = box_content.split(" ");


    switch(selected_modality){ // in base alla visualizzazione selezionata

        case "Anno":
            function_box_year = splitted_box_content[0]; // c'è solo l'anno
    
            if(function_box_year === year){  
                var no_leading_zero_day = parseInt(day);
                var selected_div  = document.getElementById(index_to_month(month) + '_' + no_leading_zero_day);
                
                var no_leading_zero_day = parseInt(day);
                var selected_div  = document.getElementById(index_to_month(month) + '_' + no_leading_zero_day);
                var children_number = selected_div.children.length;

                // nell visualizzazione annuale non vengono mostrati gli eventi per intero
                // ma solamente i colori, per tenere conto di quanti eventi sono ancora presenti
                // in un box si mantiene, per ogni giorno, un figlio nascosto nel DOM
                // il cui testo corrisponde al numero di figli
                if(children_number > 0){
                    var contenuto = selected_div.children[0].textContent;
                    var int_contenuto = parseInt(contenuto);
                    int_contenuto--;
                    selected_div.children[0].textContent = int_contenuto;

                    if(int_contenuto === 0){ // non ci sono più eventi questo giorno
                        selected_div.style.backgroundColor = "rgb(240,239,239)";     
                        selected_div.children[0].remove();
                    } else {
                        selected_div.backgroundColor = "0892D0";
                    }
                }
            }

            break;

        case "Giorno":
        case "Settimana":
        case "Mese":
        default:
            // id nella colonna id della tabella events del database
            // nel file html sono concatenati alla stringa DB_ID_
            var adjust_id = "DB_ID_" + id_deleted;
            var deleted_event_div = document.getElementById(adjust_id);
            deleted_event_div.remove(); // rimozione dell'elemento
            
    }
}