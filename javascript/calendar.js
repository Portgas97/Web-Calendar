
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
*
*                                   FUNZIONE MAIN, sull'evento onload
*
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

function main(){ 
        
    // questa sezione si occupa di mostrare la modalità di visualizzazione selezionata dall'utente
    if(typeof selected_modality !== 'undefined' &&  selected_modality !== null){
        document.getElementsByTagName('option')[0].removeAttribute('selected');
        document.getElementsByTagName('option')[1].removeAttribute('selected');
        document.getElementsByTagName('option')[2].removeAttribute('selected');
        document.getElementsByTagName('option')[3].removeAttribute('selected');

        // questi due sono i casi in cui nel function_box può essere mostrato qualcosa di non standard
        // come solo l'anno e non mese + anno, oppure due mesi quando le settimane attraversano due mesi
        var year_visual = 0;
        var week_visual = 0;
        switch(selected_modality){
            case "Giorno":
                document.getElementsByTagName('option')[0].setAttribute('selected', '');
                break;
            case "Settimana":
                week_visual = 1;
                document.getElementsByTagName('option')[1].setAttribute('selected', '');
                break;
            case "Mese":
                document.getElementsByTagName('option')[2].setAttribute('selected', '');
                break;
            case "Anno":
                year_visual = 1;
                document.getElementsByTagName('option')[3].setAttribute('selected', '');
                break;
            default:
                alert("Switch di selezione della modalità errato");
        }
    }

    // settaggio del mese da mostrare (default)
    var function_box = document.getElementsByClassName('function_box');
    if(year_visual === 1)
        function_box[0].textContent =  year;
    else if(week_visual === 1){
        console.log("week_visual");
        var squares = document.getElementsByClassName('square_week');
        
        for(var i = 1; i < squares.length; i++){
            var tmp = squares[i-1].id + 1;

            // se non sono sequenziali vuol dire che si attraversa un mese
            if(parseInt(squares[i].id) != parseInt(squares[i-1].id) + 1){ 
                if(day_of_month < 7){ 
                    var prev_month;
                    if(month_index === 0){
                        prev_month = 11;
                        var tmp = year - 1;
                        function_box[0].textContent = MONTH[prev_month] + '/' + month_name  +  " " + year + '/' + tmp;
                    }
                    else {
                        prev_month = month_index - 1;
                        function_box[0].textContent = MONTH[prev_month] + '/' + month_name  +  " " + year;
                    }
                } else {
                    var next_month;
                    if(month_index === 11){
                        next_month = 0;
                        var tmp = year + 1;
                        function_box[0].textContent = month_name + '/' + MONTH[next_month] +  " " + year + '/' + tmp;
                    }
                    else {
                        next_month = month_index + 1;
                        function_box[0].textContent = month_name + '/' + MONTH[next_month] +  " " + year;
                    }
                }

                break; // sennò i rimanenti giorni cambiando il contenuto di function box

            } else {
                function_box[0].textContent = month_name + " " + year;
            }
        }
    } else {
        function_box[0].textContent = month_name + " " + year;
    }

    pulisci(); // risetto le variabili globali al valore corretto ad ogni refresh

    // chiamata ai vari listener per l'interattività dela visualizzazione
    ToCurrentListener();

    btn_rightListener();

    btn_leftListener();

    visualizza_eventi();

    visualizza_eventi(1); // carico gli eventi comuni (festività e simili), parametro di default settato

}
