// variabile globale per alternare i colori nel div a comparsa
var change = 0;


// funzione per mostrare un "alert" lampeggiante per la conferma di inserimento
function tempAlert(msg, duration){
    var el = document.createElement("div");
    el.setAttribute('class', 'alert_box');
    el.textContent = msg;

    var interval_alert = window.setInterval(function(){
        if(change % 2 === 0)
            el.setAttribute("style", "background-color: rgb(240, 239, 239); color: #191919;")
        else
            el.setAttribute("style", "background-color: #191919; color: rgb(240, 239, 239);")
        change++;
    }, 500);

    setTimeout(function(){
        el.parentNode.removeChild(el);
        clearInterval(interval_alert);
    }, duration);
    document.body.appendChild(el);
}

// funzione auto-esplicativa
// gli indici sono nel formato tipico delle date, come 01 per Gennaio
function month_to_index(month){
    switch(month){
        case "January":
            return "01";
        case "February":
            return "02";
        case "March":
            return "03";
        case "April":
            return "04";
        case "May":
            return "05";
        case "June":
            return "06";
        case "July":
            return "07";
        case "August":
            return "08";
        case "September":
            return "09";
        case "October":
            return "10";
        case "November":
            return "11";
        case "December":
            return "12";
    }
}

// operazione inversa alla precedente
function index_to_month(index){
    switch(index){
        case "01":
            return "January";
        case "02":
            return "February";
        case "03":
            return "March";
        case "04":
            return "April";
        case "05":
            return "May";
        case "06":
            return "June";
        case "07":
            return "July";
        case "08":
            return "August";
        case "09":
            return "September";
        case "10":
            return "October";
        case "11":
            return "November";
        case "12":
            return "December";
    }
}

// funzione auto-esplicativa
function compute_next_month(month){
    switch(month){
        case "January":
            return "February";
        case "February":
            return "March";
        case "March":
            return "April";
        case "April":
            return "May";
        case "May":
            return "June";
        case "June":
            return "July";
        case "July":
            return "August";
        case "August":
            return "September";
        case "September":
            return "October";
        case "October":
            return "November";
        case "November":
            return "December";
        case "December":
            return "January";

    }
}

// aggiornamento contenuto, se presente nella viewport attuale
// si basa sul contenuto del function_box, già splittato in function_box_month e function_box_year
function change_div(function_box_month, function_box_year, year, month, day, description, last_id){

    // se presenti ricavo i cross-mesi o i cross-anni
    var primo_mese = function_box_month.split('/')[0];
    var secondo_mese = function_box_month.split('/')[1];
    var primo_anno = function_box_year.split('/')[0];
    var secondo_anno = function_box_year.split('/')[1];

    // se l'evento è nel periodo mostrato attualmente (non è detto che venga visualizzato
    // ad esempio è un evento di marzo, ma la settimana attualmente mostrata non è quella dell'evento
    // che stiamo analizzando)
    if((month_to_index(primo_mese) === month  && primo_anno === year) || (month_to_index(secondo_mese) === month && primo_anno === year) || (month_to_index(secondo_mese) === month && secondo_anno === parseInt(year))){
        var no_leading_zero_day = parseInt(day);
        var selected_div = document.getElementById(no_leading_zero_day);
        if(selected_div == null) // l'evento inserito non è fra quelli attualmente mostrati
            return;
        if(secondo_mese != null){
            if(parseInt(primo_mese) === parseInt(month) && parseInt(day) < 6){
                return
            }
            if(parseInt(primo_mese) < parseInt(month) && parseInt(day) > MONTH_DAYS[parseInt(primo_mese)] - 6){
                return;
            }
        }
        var event_div = document.createElement("div");
        event_div.setAttribute('id', "DB_ID_" + last_id);
        event_div.setAttribute('class', 'event_div');
        event_div.addEventListener('click', function(event){
            // aggiungo il listener per la successiva possibilità di modificare l'evento,
            // o eliminarlo, tramite click
            request_to_alter_event(event); // delete_modify_event.js
        });

        // simbolo per il bullet tipico delle liste
        var symbol = '\u2022'; 
        event_div.textContent = symbol + " " + description;
        event_div.setAttribute('style', 'background-color: #0892D0');

        // vado a capo ogni nuovo evento
        var br = document.createElement("br");
        event_div.appendChild(br);

        selected_div.appendChild(event_div);
    }
}


// è stato inserito un evento, questa funzione si occupa di mostrarlo
// nel calendario
function visualizza_nuovo_evento(date, description, last_id){

    // alert + chiudo la "finestra a comparsa" dell'inserimento 
    tempAlert("Evento \r\n inserito \r\n correttamente", 2500);
    document.getElementById("myform").style.display = "none";

    // ricavo le informazioni per la visualizzazione, date è una stringa
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


    switch(selected_modality){ // casistiche in base alla visualizzazione selezionata dall'utente

        case "Anno":

            function_box_year = splitted_box_content[0]; // tanto c'è solo l'anno in questo caso

            if(function_box_year === year){
                var no_leading_zero_day = parseInt(day);
                var selected_div  = document.getElementById(index_to_month(month) + '_' + no_leading_zero_day);
                selected_div.style.backgroundColor = "#0892D0";   
                var children_number = selected_div.children.length;

                if(children_number === 0){
                    var child = document.createElement("div");
                    child.style.display = "none";
                    child.textContent = 1;
                    selected_div.appendChild(child);
                } else {
                    var contenuto = selected_div.children[0].textContent;
                    var int_contenuto = parseInt(contenuto);
                    int_contenuto++;
                    selected_div.children[0].textContent = int_contenuto;
                }
                
            }

            break;

        case "Giorno":
        case "Settimana":
        case "Mese":
        default:
            function_box_month = splitted_box_content[0];
            function_box_year = splitted_box_content[1];
            change_div(function_box_month, function_box_year, year, month, day, description, last_id);
    }
}