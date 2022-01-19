 /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

    *                       Listener per lo scorrimento in base al click sulla freccia sinistra

    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
    * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


 // descrizione duale al listener per lo scorrimento a destra


 function btn_leftListener(){
     
    document.getElementById('btn_left').addEventListener('click', function(){

        var display_modality = "";
        if(typeof selected_modality === 'undefined' || selected_modality === null){
            display_modality = "Mese";
        } else{
            display_modality = selected_modality;
        }

        var contenuto = document.getElementById('calendar_container');

        clean_calendar();
        display_date();

        switch(display_modality){

            /*******************************************************************************************************************
            *                                                   DAY
            ********************************************************************************************************************/
            case "Giorno":
                
                display_day_left(contenuto);
                break;


            /*******************************************************************************************************************
            *                                                   WEEK
            ********************************************************************************************************************/
            case "Settimana":
                  
                display_week_left(contenuto);            
                break;

            /*******************************************************************************************************************
            *                                                   MONTH
            ********************************************************************************************************************/  
            case "Mese":
                
                display_month_left(contenuto);
                break;

            /*******************************************************************************************************************
            *                                                   YEAR
            ********************************************************************************************************************/  
            case "Anno":
                
                display_year_left(contenuto);
                break;

            default:
                alert("Switch di selezione della modalità errato");
        }

        visualizza_eventi();
        visualizza_eventi(1); // parametro di default settato per la visualizzazione delle festività
    });

 }