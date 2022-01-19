
// se il compleanno fa parte del periodo attualmente visualizzato
// nel calendario viene mostrato (in giallo)
function birthday_div(function_box_month, month, day){

    var primo_mese = function_box_month.split('/')[0];
    var secondo_mese = function_box_month.split('/')[1];

    if(month_to_index(primo_mese) === month || month_to_index(secondo_mese) === month || month_to_index(secondo_mese) === month){
        
        var no_leading_zero_day = parseInt(day);
        var selected_div = document.getElementById(no_leading_zero_day);
        if(selected_div == null) // l'evento inserito non è fra quelli attualmente mostrati
            return;

        // casi particolari, ad esempio non si mostra il compleanno nel box del primo aprile
        // se il compleanno è il primo marzo. Poteva succedere perchè nel function box potrebbero comparire
        // March/April nel caso in cui, nella visualizzazione settimanale, la settimana mostrata attraversi
        // i due mesi e quindi non si era in grado di distinguere primo marzo e primo aprile ...
        if(secondo_mese != null){
            if(parseInt(primo_mese) === parseInt(month) && parseInt(day) < 6){
                return
            }
            if(parseInt(primo_mese) < parseInt(month) && parseInt(day) > MONTH_DAYS[parseInt(primo_mese)] - 6){
                return;
            }
        }

        var check_presence = document.getElementById("compleanno");
        if(check_presence !== null)
            return;
        
        var event_div = document.createElement("div");
        event_div.setAttribute('id', "compleanno");
        event_div.setAttribute('class', 'event_div');

        event_div.innerHTML = "Happy Birthday! &#127873;"; // innerHTML usato solamente qui nel progetto per mostrare l'emoji :)
        event_div.setAttribute('style', 'background-color: yellow'); // sfondo giallo
        var br = document.createElement("br");
        event_div.appendChild(br);
        selected_div.appendChild(event_div);
    }
}



function visualizza_compleanno(birthday){

    // ricavo le informazioni per la visualizzazione, date è una stringa
    var splitted_date = birthday.split("-");
    var year = splitted_date[0];
    var month = splitted_date[1];
    var day = splitted_date[2];

    var function_box = document.getElementsByClassName("function_box")[0];
    var box_content = function_box.textContent;

    var URL_parameters = new URLSearchParams(window.location.search);
    var selected_modality = URL_parameters.get('selected_modality');

    var function_box_month = "";
    var splitted_box_content = box_content.split(" "); // divido i mesi dagli anni, o il mese dell'anno


    switch(selected_modality){

        case "Anno":
            function_box_year = splitted_box_content[0]; // c'è solo l'anno

            var no_leading_zero_day = parseInt(day);
            var selected_div  = document.getElementById(index_to_month(month) + '_' + no_leading_zero_day);
            selected_div.style.backgroundColor = "yellow"; // sfondo giallo per i compleanni

            break;

        case "Giorno":
        case "Settimana":
        case "Mese":
        default:
            function_box_month = splitted_box_content[0];
            function_box_year = splitted_box_content[1];
            birthday_div(function_box_month, month, day); // funzione definita sopra
    }
}