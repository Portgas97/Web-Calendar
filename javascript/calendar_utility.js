// quanti giorni prima del lunedì
function calendar_padding_year(weekday){
    for(var i = 0; i < WEEKDAY.length; i++){
        if(weekday === WEEKDAY[i])
            return i;
    }
}

// controlla se un dato anno è bisestile
function leapYear(year){
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

// a causa di alcune funzioni predefinite che contano la settimana partendo dalla domenica,
//  la mia implementazione parte dal lunedì
function normalizza_indici(week_index){
    switch(week_index){
        case 0:
            return 6;
        case 1:
            return 0;
        case 2:
            return 1;
        case 3:
            return 2;
        case 4:
            return 3;
        case 5:
            return 4;
        case 6:
            return 5;
    }
}

// pulisce per ricostruire successivamente il contenuto
function clean_calendar(){
    var contenuto = document.getElementById('calendar_container');
    contenuto.textContent = '';
}

// mostra la data corrente sopra al calendario
function display_date(){
    var contenuto = document.getElementById('calendar_container');
    var day_pres = document.createElement('div');
    day_pres.setAttribute('class', 'day_presentation');
    day_pres.textContent = "Current Date: " + week_day + " " + fixed_month + " " + day_of_month + ", " + year;
    contenuto.appendChild(day_pres);
    var br = document.createElement("br");
    contenuto.appendChild(br);
}

// utilizzata solo all'interno di questo file
// si occupa del settaggio di default delle variabili globali
function pulisci(){
    day_of_month = current_date.getDate();
    month_index = current_date.getMonth();
    fixed_month = MONTH[current_date.getMonth()]
    month_name = MONTH[month_index];
    year = current_date.getFullYear();
    DAY_COUNTER = day_of_month;
    WEEK_COUNTER = day_of_month - normalizza_indici(week_day_index);
    days_sum = 0;
    week_day_index = current_date.getDay();
    week_day = WEEKDAY[normalizza_indici(week_day_index)];
    YEAR_COUNTER = year;
    show_year = year;
    weeks_sum = 0;
}

// uso del bottone ToCurrent nella visualizzazione giornaliera
function cur_date(contenuto){
    pulisci();

    var function_box = document.getElementsByClassName('function_box');
    function_box[0].textContent = month_name + " " + year;

    var square_day = document.createElement('div');
    square_day.setAttribute('class', 'square_day');
    square_day.setAttribute('id', day_of_month);
    square_day.textContent = day_of_month;
    contenuto.appendChild(square_day);

    var last_div = document.getElementsByClassName('square_day');
    var br = document.createElement("br");
    last_div[0].appendChild(br);
    var hr = document.createElement("hr");
    hr.setAttribute('class', 'bolder_line');
    last_div[0].appendChild(hr);
}

// uso del bottone ToCurrent nella visualizzazione settimanale
function cur_week(contenuto){
    pulisci();

    var inserted_squares = 0;
    
    monday_to_sunday(contenuto);

    var today = new Date(Date.now());
   
    var base_for_current = new Date(today.getTime() + weeks_sum * MILLISECONDS_PER_DAY);
    // console.log("BASE avanti: " + base_for_current);

    var monday_of_week = base_for_current.getDate() - normalizza_indici(base_for_current.getDay());
    // console.log("monday: " + monday_of_week);

    // visualizzazione del periodo in function_box
    if(monday_of_week <= 0){ // overflow nel mese precedente
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

    } else if(monday_of_week + 6 > MONTH_DAYS[month_index]){ // overflow nel mese successivo
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
    if(monday_of_week <= 0){ // overflow nel mese precedente
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
    } else { // caso base o overflow nel mese successivo
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

// si occupa di scrivere Lun - Dom
function monday_to_sunday(contenuto){
    for(var i = 0; i < 7; i++){
        var square_week = document.createElement('div');
        square_week.setAttribute('id', WEEKDAY_ABBR[i]);
        square_week.setAttribute('class', 'day_name');
        square_week.textContent = WEEKDAY_ABBR[i];
        contenuto.appendChild(square_week);
    }

    var br = document.createElement("br");
    contenuto.appendChild(br);
}

// uso del bottone ToCurrent nella visualizzazione mensile
function cur_month(contenuto){
    pulisci();
    var function_box = document.getElementsByClassName('function_box');
    function_box[0].textContent = month_name + " " + year; 
    monday_to_sunday(contenuto);

    var inserted_squares = 0;
    month_name = MONTH[month_index];

    base_for_current = current_date;
    var monday_of_week = base_for_current.getDate() - normalizza_indici(base_for_current.getDay());

    var function_box = document.getElementsByClassName('function_box');
    function_box[0].textContent = month_name + " " + base_for_current.getFullYear();

    while(monday_of_week > 0){
            monday_of_week = monday_of_week - 7;
    }

    if(monday_of_week != -6){ // overflow del mese
        for(var i = monday_of_week; i <= 0; i++){
            var square_month = document.createElement('div');
            square_month.setAttribute('class', 'square_month');
            var prev_month_days;
            if(month_index != 0){
                if(month_index === 2)
                    prev_month_days = 29;
                else    
                    prev_month_days = MONTH_DAYS[month_index - 1];
                
                square_month.textContent = prev_month_days + i;
            }
            else 
                square_month.textContent = MONTH_DAYS[11] + i;
    
            contenuto.appendChild(square_month);
            inserted_squares++;
            if(inserted_squares % 6 === 0){
                var br = document.createElement('br');
                contenuto.appendChild(br);
            }
        }
    }
    
    var current_month_days;
    // controllo sui casi particolari
    if(month_index === 1 && leapYear(base_for_current.getFullYear()))
        current_month_days = 29;
    else
        current_month_days = MONTH_DAYS[month_index];

    for(var i = 0; i < current_month_days; i++){
        var square_month = document.createElement('div');
        square_month.setAttribute('class', 'square_month');
        square_month.setAttribute('id', i+1);
        square_month.textContent = i + 1;
        contenuto.appendChild(square_month);
        inserted_squares++;
        if(inserted_squares % 6 === 0){
            var br = document.createElement('br');
            contenuto.appendChild(br);
        }
    }
    var COND = 0;
    // eventuali padding dei mesi esterni a quello visualizzato
    if(monday_of_week === -6){
        monday_of_week = 0;
        COND = MONTH_MATRIX - current_month_days;
    } else
        COND = MONTH_MATRIX - current_month_days - Math.abs(monday_of_week) - 1;

    for(var i = 0; i < COND; i++){
        var square_month = document.createElement('div');
        square_month.setAttribute('class', 'square_month_ext');
        square_month.textContent = i + 1;
        contenuto.appendChild(square_month);
        inserted_squares++;
        if(inserted_squares % 6 === 0){
            var br = document.createElement('br');
            contenuto.appendChild(br);
        }
    }

    pulisci(); 
}

// uso del bottone ToCurrent nella visualizzazione annuale
function cur_year(contenuto){

    pulisci();
    var bypass = false;
    var month_counter = 0;

    var function_box = document.getElementsByClassName('function_box');
    function_box[0].textContent = year;

    // per il caso di anno bisestile
    if(leapYear(year)){
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

        var time = Date.parse(year + '-' + month_counter + '-' + '01');
        // ricavo il giorno della settimana del primo di questo mese
        var time_of_date = new Date(time);
        var weekday = normalizza_indici(time_of_date.getDay());
        var weekday_name = WEEKDAY[weekday];

        // calcolo del padding
        var padding = calendar_padding_year(weekday_name);
        for(var k = 0; k < padding; k++){
            var square_ext = document.createElement('div');
            square_ext.setAttribute('class', 'square_year_ext');
            square_ext.setAttribute('id', 'padding_pre_' + k);
            square_ext.textContent = ' ';
            month_container.appendChild(square_ext);
        }

        // eventuale anno bisestile
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
        if(month_counter % 4 === 0){
            var br = document.createElement('br');
            contenuto.appendChild(br);
        }
    }
}

// creazione del box relativo al giorno
function draw_day(contenuto, DAY_COUNTER){
    var square_day = document.createElement('div');

    square_day.setAttribute('class', 'square_day');
    square_day.setAttribute('id', DAY_COUNTER);
    square_day.textContent = DAY_COUNTER;
    contenuto.appendChild(square_day);

    var last_div = document.getElementsByClassName('square_day');
    var br = document.createElement("br");
    last_div[0].appendChild(br);
    var hr = document.createElement("hr");
    hr.setAttribute('class', 'bolder_line');
    last_div[0].appendChild(hr);
}

// funzione di utilità autoesplicativa
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