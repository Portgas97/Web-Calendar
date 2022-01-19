
 /*******************************************************************************************************************
*                                                   DAY
********************************************************************************************************************/

// visualizzazione dei singoli giorni
function display_day_right(contenuto){
    var COND;
    if(month_index == 1 && leapYear(show_year)) // anno bisestile
        COND = 29;
    else   
        COND = MONTH_DAYS[month_index];

    // aggiornamento variabili globali
    if(DAY_COUNTER === COND){ 
        if(month_index === 11){
            month_index = 0;
            show_year++;
        } else{
            month_index++;
        }
        DAY_COUNTER = 1;
        month_name = MONTH[month_index];
    }
    else
        DAY_COUNTER++;

    // scrivo nel box relativo al mese e all'anno
    var function_box = document.getElementsByClassName('function_box');
    function_box[0].textContent = month_name + " " + show_year;

    // funzione di utilità per scrivere il box del giorno
    draw_day(contenuto, DAY_COUNTER);
}


/*******************************************************************************************************************
*                                                   WEEK
********************************************************************************************************************/

// visualizzazione per settimane
function display_week_right(contenuto){

    var inserted_squares = 0;
    weeks_sum = weeks_sum + 7;
    // console.log("SOMMA: " + weeks_sum);
    
    monday_to_sunday(contenuto);

    var today = new Date(Date.now()); // basato sul giorno corrente
 
    var base_for_current = new Date(today.getTime() + weeks_sum * MILLISECONDS_PER_DAY);
    console.log("BASE avanti: " + base_for_current);

    var monday_of_week = base_for_current.getDate() - normalizza_indici(base_for_current.getDay());
    console.log("monday: " + monday_of_week);

    var prev_month;
    var next_month;

    // per la presentazione nel function_box del periodo corrente
    if(monday_of_week <= 0){
        month_index = base_for_current.getMonth();
        month_name = MONTH[month_index];
        if(month_index === 0)
            prev_month = 11;
        else    
            prev_month = month_index - 1;
        
        var prev_year = base_for_current.getFullYear() - 1;
        var function_box = document.getElementsByClassName('function_box');
        if(prev_month === 11)
            function_box[0].textContent = MONTH[prev_month] + '/' + month_name + " " + prev_year + '/' + base_for_current.getFullYear();
        else
            function_box[0].textContent = MONTH[prev_month] + '/' + month_name + " " + base_for_current.getFullYear();
    } else if(monday_of_week + 6 > MONTH_DAYS[month_index]){
        month_index = base_for_current.getMonth();
        month_name = MONTH[month_index];
        if(month_index === 11)
            next_month = 0;
        else    
            next_month = month_index + 1;
        
        var next_year = base_for_current.getFullYear() + 1;
        var function_box = document.getElementsByClassName('function_box');
        if(next_month === 0)
            function_box[0].textContent = month_name + '/' + MONTH[next_month] + " " + base_for_current.getFullYear() + '/' + next_year;
        else
            function_box[0].textContent = month_name + '/' + MONTH[next_month] + " " + base_for_current.getFullYear();
        } else {
        month_index = base_for_current.getMonth();
        month_name = MONTH[month_index];
        var function_box = document.getElementsByClassName('function_box');
        function_box[0].textContent = month_name + " " + base_for_current.getFullYear();
    }

    // scrittura dei giorni
    if(monday_of_week <= 0){ // underflow
        for(var i = monday_of_week; i <= 0; i++){
            var square_week_ext = document.createElement('div');
            square_week_ext.setAttribute('class', 'square_week');

            if(month_index != 0){
                if(month_index === 2 && leapYear(base_for_current.getFullYear())){ // caso anno bisestile
                    square_week_ext.textContent = 29 + i;
                    var string = 29 + i;
                    square_week_ext.setAttribute('id', string);
                } else {
                    square_week_ext.textContent = MONTH_DAYS[month_index - 1] + i;
                    var string = MONTH_DAYS[month_index - 1] + i;
                    square_week_ext.setAttribute('id', string);
                }
                
            }
            else{
                square_week_ext.textContent = MONTH_DAYS[11] + i;
                var string = MONTH_DAYS[11] + i;
                square_week_ext.setAttribute('id', string);

            }

            contenuto.appendChild(square_week_ext);
            inserted_squares++;
        }

        for(var i = 0; i < 7 - inserted_squares; i++){
            var square_week = document.createElement('div');
            square_week.setAttribute('class', 'square_week');
            var string = i + 1;
            square_week.setAttribute('id', string);
            square_week.textContent = i + 1;
            contenuto.appendChild(square_week);
        }
    } else { // caso normale ed eventuale overflow
        var next_days = 1;
        var COND;
        
        if(month_index === 1 && leapYear(base_for_current.getFullYear()))
            COND = 29;
        else    
            COND = MONTH_DAYS[month_index];

        for(var i = 0; i < 7; i++){
            var square_week = document.createElement('div');
            square_week.setAttribute('class', 'square_week');
            var string = "";

            if(monday_of_week + i > COND){
                string = next_days;
                next_days++;
            } else 
                string = monday_of_week + i;
                
            square_week.setAttribute('id', string);
            square_week.textContent = string;
            contenuto.appendChild(square_week);
        }
    }

}


/*******************************************************************************************************************
*                                                   MONTH
********************************************************************************************************************/

// visualizzazione tramite scorrimento dei mesi
function display_month_right(contenuto){

    var inserted_squares = 0;
    days_sum = days_sum + MONTH_DAYS[month_index];
    // console.log("SOMMA: " + days_sum);

    // aggiornamento corretto della variabile globale
    if(month_index === 11)
        month_index = 0;
    else
        month_index++;

    month_name = MONTH[month_index];

    monday_to_sunday(contenuto); // mostro Mon - Tue - Wed etc.

    // faccio si che lo scorrimento sia centrato al 15, in modo da non avere problemi con la disomogeneità dei mesi
    // ad esempio centrando alla data corrente, se fosse il 31 del mese poi avrei problemi con i mesi che non hanno il 31
    var today = new Date(Date.now());
    if(today.getDate() <= 15)
        today.setDate(today.getDate() + (15 - today.getDate()));
    else 
        today.setDate(today.getDate() - (today.getDate() - 15));
    
    // calcolo la base grazie alla variabile globale days_sum
    // che tiene conto di quanti mesi sono stati attraversati
    var base_for_current = new Date(today.getTime() + days_sum * MILLISECONDS_PER_DAY); 

    // console.log("BASE avanti: " + base_for_current);

    // aggiornata successivamente nel ciclo while sotto, tiene conto del primo lunedì che 
    // sfora il mese, andando indietro nel tempo, oppure del primo del mese se è proprio lunedì
    var monday_of_week = base_for_current.getDate() - normalizza_indici(base_for_current.getDay());

    var function_box = document.getElementsByClassName('function_box');
    function_box[0].textContent = month_name + " " + base_for_current.getFullYear();

    while(monday_of_week > 0){
            monday_of_week = monday_of_week - 7;
    }

    if(monday_of_week !== -6){ // underflow
        for(var i = monday_of_week; i <= 0; i++){
            var square_month = document.createElement('div');
            square_month.setAttribute('class', 'square_month_ext');
            if(month_index != 0){
                if(month_index === 2 && leapYear(base_for_current.getFullYear())){
                    square_month.textContent = 29 + i;
                    var string = 29 + i;
                    square_month.setAttribute('id', 'padding_pre_' + string);
                }
                square_month.textContent = MONTH_DAYS[month_index - 1] + i;
                var string = MONTH_DAYS[month_index - 1] + i;
                square_month.setAttribute('id', 'padding_pre_' + string);
            }
            else{
                square_month.textContent = MONTH_DAYS[11] + i;
                var string = MONTH_DAYS[11] + i;
                square_month.setAttribute('id', 'padding_pre_' + string);
            }

            contenuto.appendChild(square_month);
            inserted_squares++;
            if(inserted_squares % 6 === 0){
                var br = document.createElement('br');
                contenuto.appendChild(br);
            }
        }
    }
    
    var current_month_days;
    if(month_index === 1 && leapYear(base_for_current.getFullYear())){
        current_month_days = 29;
    } else {
        current_month_days = MONTH_DAYS[month_index];
    }
    for(var i = 0; i < current_month_days; i++){
        var square_month = document.createElement('div');
        square_month.setAttribute('class', 'square_month');
        var string = i + 1;
        square_month.setAttribute('id', string);
        square_month.textContent = i + 1;
        contenuto.appendChild(square_month);
        inserted_squares++;
        if(inserted_squares % 6 === 0){
            var br = document.createElement('br');
            contenuto.appendChild(br);
        }
    }

    var COND = 0;
    if(monday_of_week === -6){
        monday_of_week = 0;
        COND = MONTH_MATRIX - current_month_days;
    } else
        COND = MONTH_MATRIX - current_month_days - Math.abs(monday_of_week) - 1;

    for(var i = 0; i < COND; i++){
        var square_month = document.createElement('div');
        square_month.setAttribute('class', 'square_month_ext');
        var string = i + 1;
        square_month.setAttribute('id', 'padding_post_' + string);
        square_month.textContent = i + 1;
        contenuto.appendChild(square_month);
        inserted_squares++;
        if(inserted_squares % 6 === 0){
            var br = document.createElement('br');
            contenuto.appendChild(br);
        }
    }


}


/*******************************************************************************************************************
*                                                   YEAR
********************************************************************************************************************/

// visualizzazione degli anni
function display_year_right(contenuto){
    var bypass = false;
    var month_counter = 0;

    YEAR_COUNTER++; // variabile globale condivisa fra il bottone di sinistra e di destra
    var function_box = document.getElementsByClassName('function_box');
    function_box[0].textContent = YEAR_COUNTER;

    if(leapYear(YEAR_COUNTER)){
        bypass = true;
    } else {
        bypass = false;
    }

    for(var i = 0; i < MONTH.length; i++){
        
        month_counter++;

        var month_container = document.createElement('div');
        month_container.setAttribute('class', 'month_container');
        month_container.setAttribute('id', MONTH[i]);
        month_container.textContent = MONTH[i];
        contenuto.appendChild(month_container);
        var br = document.createElement('br');
        month_container.appendChild(br);
        var hr = document.createElement('hr');
        month_container.appendChild(hr);

        var time = Date.parse(YEAR_COUNTER + '-' + month_counter + '-' + '01');
        // console.log('time (primo del mese): ' + time_of_date);

        // ricavo il giorno della settimana del primo di questo mese
        var time_of_date = new Date(time);
        // console.log("Nuova Data: " + time_of_date);
        
        var weekday =normalizza_indici(time_of_date.getDay());
        var weekday_name = WEEKDAY[weekday];

        // calcolo del padding
        var padding =calendar_padding_year(weekday_name);
        for(var k = 0; k < padding; k++){
            var square_ext = document.createElement('div');
            square_ext.setAttribute('class', 'square_year_ext');
            square_ext.setAttribute('id', 'padding_pre_' + k);
            square_ext.textContent = ' ';
            month_container.appendChild(square_ext);
        }

        if(i === 1 && bypass === true)
            COND = 29;
        else
            COND = MONTH_DAYS[i];
        
        for(var k = 1; k < COND + 1; k++){
            var square_year = document.createElement('div');
            square_year.setAttribute('class', 'square_year');
            square_year.setAttribute('id', MONTH[i] + '_' + k);
            square_year.textContent = k;
            month_container.appendChild(square_year);
            if(k % 7 === 0){
                var br = document.createElement('br');
                month_container.appendChild(br);
            }

        }
        if(month_counter % 4 === 0){ // per una visualizzazione più pulita, 4 mesi a riga
            var br = document.createElement('br');
            contenuto.appendChild(br);
        }
    }
                
}