 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

    *                       Listener per lo scorrimento in base al click sulla freccia destra

    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function btn_rightListener(){

    document.getElementById('btn_right').addEventListener('click', function(){

        var display_modality = "";
        if(typeof selected_modality === 'undefined' || selected_modality === null){
            display_modality = "Mese";
        } else{
            display_modality = selected_modality;
        }

        var contenuto = document.getElementById('calendar_container');

        // pulisco e mostro le informazioni base
        clean_calendar();
        display_date();

        switch(display_modality){ // divido i casi in base alla visualizzazione scelta dall'utente

            /*******************************************************************************************************************
            *                                                   DAY
            ********************************************************************************************************************/
            case "Giorno":

                display_day_right(contenuto);
                break;

            /*******************************************************************************************************************
            *                                                   WEEK
            ********************************************************************************************************************/    
            case "Settimana":

                display_week_right(contenuto);
                break;
            
            /*******************************************************************************************************************
            *                                                   MONTH
            ********************************************************************************************************************/    
            case "Mese":

                display_month_right(contenuto);
                break;

            /*******************************************************************************************************************
            *                                                   YEAR    
            ********************************************************************************************************************/    
            case "Anno":
                
                display_year_right(contenuto);
                break;

            default:
                alert("Switch di selezione della modalità errato");
        }

        // leggo gli eventi dal database
        visualizza_eventi();
        visualizza_eventi(1);
    });

}

