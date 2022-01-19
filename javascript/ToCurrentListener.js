/*
*
* listener per il ritorno alla visualizzazione coerente con la data corrente
* 
*/ 


function ToCurrentListener(){

    document.getElementById('button_to_current').addEventListener('click', function(){

        var contenuto = document.getElementById('calendar_container');
    
       clean_calendar();
       display_date();
    
        // funzioni di appoggio definite in calendar_utility.js
        switch(selected_modality){
            case "Giorno":
                cur_date(contenuto);
                break;
            case "Settimana":
                cur_week(contenuto);
                break;
            case "Mese":
                cur_month(contenuto);
                break;
            case "Anno":
                cur_year(contenuto);
                break;
            default:
                cur_month(contenuto);
                break;        
        }

        visualizza_eventi();
        visualizza_eventi(1); // parametro di default settato per la visualizzazione delle festività
    });
}
