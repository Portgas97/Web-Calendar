<?php

    // VARIABILI GLOBALI - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


    $days_per_month = array(
        "january" => 31, "february" => 28, "leap_february" => 29, 
        "march" => 31, "april" => 30, "may" => 31, 
        "june" => 30, "july" => 31, "august" => 31, 
        "september" => 30, "october" => 31, "november" => 30, 
        "december" => 31
    );


    $month_index = array("january" => 1, "february" => 2, "leap_february" => 2, 
    "march" => 3, "april" => 4, "may" => 5, 
    "june" => 6, "july" => 7, "august" => 8, 
    "september" => 9, "october" => 10, "november" => 11, 
    "december" => 12
    );


    $day_name = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    
    // FUNZIONI DI UTILITA' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

    // per la pulizia degli input dell'utente passati al server
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        $data = str_replace("'", " ", $data); 
        return $data;
    }

    // check sull'anno bisestile
    function is_leap_year($year_to_check){
        return ((($year_to_check % 4) == 0) && ((($year_to_check % 100) != 0) || (($year_to_check %400) == 0)));
    }

    // per fare un alert tramite php
    function alert($msg) {
        echo "<script type='text/javascript'>alert('$msg');</script>";
    }

    // restituisce l'indice nell'array day_name relativo al giorno della settimana 
    // del primo giorno del mese considerato attualmente
    function calendar_padding($day_num, $week_day){

        global $day_name;
        if($day_num % 7 === 0 && $week_day === "Monday")
            return 0;
        
        $index;
        for($i = 0; $i < 7; $i++){
            if($week_day == $day_name[$i]){
                $index = $i;
                break;
            }
        }

        $delta = $day_num % 7;
        $delta = $delta - 1;

        $index = ($index - $delta) % 7;
        return $index; 

    }

    #
    # funzioni per la stampa dei calendari, mostra i giorni della settimana 
    #
    function display_week_days(){
        $day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ];
        for($i = 0; $i < 7; $i++){
            print("<div class='day_name' id={$day_names[$i]}> {$day_names[$i]} </div>");
        }    
        print("<br>");
    }

    # MESE
    // funzione autoesplicativa
    function compute_previous_month($month_name, $year){
        switch($month_name){
            case "january":
                return "december";
            case "february":
                return "january";
            case "march":
                if(is_leap_year($year))
                    return "leap_february";
                return "february";
            case "april":
                return "march";
            case "may":
                return "april";
            case "june":
                return "may";
            case "july":
                return "june";
            case "august":
                return "july";
            case "september":
                return "august";
            case "october":
                return "september";
            case "november":
                return "october";
            case "december":
                return "november";
                      
        }
    }

    
    function display_month($week_day, $day_of_month, $month_name, $year){

        global $days_per_month;
        $inserted_square = 0; // per mandare a capo nel momento giusto quando si mostra il mese corrente

        $previous_month = compute_previous_month($month_name, $year); // definita sopra   

        $padding = calendar_padding($day_of_month, $week_day); // definita sopra

        for($k = 0; $k < $padding; $k++){
            $previous_days = $days_per_month[$previous_month];
            $printed_day = $previous_days - ($padding - 1) + $k;
            print("<div class='square_month_ext' id='padding_pre_".$month_name.'_'.$k."'>".$printed_day."</div>");
            $inserted_square++;
            if($inserted_square % 6 === 0){
                print("<br>");
            }
        }
    
        $box_number = range(1, $days_per_month[$month_name]);
        // scorro tutti i giorni del mese
        foreach($box_number as $key => $value){
            print("<div class='square_month' id='".$value."'>".$value."</div>");
            
            $inserted_square++;
            if($inserted_square % 6 === 0){
                print("<br>");
            }

            if(is_leap_year($year) && $month_name === "february" && $value === 28){ // anno bisestile
                print("<div class='square_month' id='29'>29</div>");
                $inserted_square++;
                if($inserted_square % 6 === 0){
                    print("<br>");
                }
            }
        }

        $leap;
        if(is_leap_year($year) && $month_name === "february")
            $leap = 29;
        else    
            $leap = $days_per_month[$month_name];

        for($i = 0; $i < 35 - $leap - $padding; $i++){ 
            print("<div class='square_month_ext' id='padding_post_".$month_name.'_'.$i."'>".($i + 1)."</div>");
            $inserted_square++;
            if($inserted_square % 6 === 0){
                print("<br>");
            }
        }
    }

    // quanti giorni ci sono fra il giorno della settimana passato e il lunedì precedente
    function compute_padding($week_day){
        switch($week_day){
            case "Monday":
                return 0;
            case "Tuesday":
                return 1;
            case "Wednesday":
                return 2;
            case "Thursday":
                return 3;
            case "Friday":
                return 4;
            case "Saturday":
                return 5;
            case "Sunday":
                return 6;
            default:
                echo "Problema nello switch di selezione del giorno";  
        }
    }

    // funzione autoesplicativa
    function weekday_index($week_day){
        switch($week_day){
            case "Monday":
                return 0;
            case "Tuesday":
                return 1;
            case "Wednesday":
                return 2;
            case "Thursday":
                return 3;
            case "Friday":
                return 4;
            case "Saturday":
                return 5;
            case "Sunday":
                return 6;
            default:
                echo "Problema nello switch di selezione del giorno";  
        }
    }

    // per mostrare la settimana corrente al caricamento della pagina
    function display_week($year, $month_name, $week_day, $day_of_month){

        global $days_per_month;

        $padding = 0;
        $padding = compute_padding($week_day); // definita sopra

        $previous_month = compute_previous_month($month_name, $year); // definita sopra 

        if($previous_month === "leap_february") // gestione del caso bisestile
            $base = 29;
        else
            $base = $days_per_month[$previous_month];
            
        for($k = 0; $k < $padding; $k++){
            if($day_of_month < 7){ // stiamo sforando nel mese precedente
                $expr = $base - $padding + $k + 1; 
                print("<div class='square_week' id='{$expr}'> {$expr} </div>");
            }
            else {
                $expr = $day_of_month - $padding + $k; // caso "interno" al mese
                print("<div class='square_week' id='{$expr}'> {$expr} </div>");
            }
        }

        $next_days = 1;
        $COND;
        if($month_name === "february" && is_leap_year($year))
            $COND = 29;
        else 
            $COND = $days_per_month[$month_name];

        // print($month_name);
        for($i = 0; $i < 7 - $padding; $i++){
            if($day_of_month + $i > $COND){ // verifica che non si stia sforando nel mese successivo 
                $tmp = $next_days++;
                print("<div class='square_week' id='{$tmp}'> $tmp </div>");
            } else {
                $tmp = $day_of_month + $i;
                print("<div class='square_week' id={$tmp}> {$tmp} </div>");
            }
            
        }      
    }

    // inserimento del box/div relativo a un giorno nella visualizzazione annuale
    function display_day($day_of_month, $month_name){
        
        print("<div class='square_day' id='".$day_of_month."'>".$day_of_month);
        print('<br>');
        print("<hr class='bolder_line'>");
        print("</div>");
    }

    // quando la pagina viene caricata e la visualizzazione è quella dell'anno
    function display_year($year){

        global $days_per_month, $month_index, $day_name;
        $bypass = false;
        if(is_leap_year($year))
            $bypass = true;

        $count = 0;
        foreach($days_per_month as $key => $value){

            $count++;
            if($bypass === true && $key === 'february')
                continue;
            elseif($bypass === false && $key === 'leap_february')
                continue;
            $box_number = range(1, $days_per_month[$key]);
            print("<div class='month_container' id='".ucfirst($key)."'>".ucfirst($key));
            print("<br>");
            print("<hr>");
            
            // PADDING 
            $tmp = $month_index[$key];
            $time_of_date = strtotime("{$year}-{$tmp}-01");
            $first_of_the_month_day = date('w', "$time_of_date");

            if($first_of_the_month_day == 0) // questo perchè nella logica del programma si indicizza da zero, "date" parte da 1
                $first_of_the_month_day = 6;
            else
                $first_of_the_month_day--; 
            $name_of_day = $day_name[$first_of_the_month_day];

            $padding = calendar_padding("01", $name_of_day); 
            for($k = 0; $k < $padding; $k++){
                print("<div class='square_year_ext' id='padding_pre_".$tmp.'_'.$k."'>  </div>");
            }

            foreach($box_number as $v){
                print("<div class='square_year' id='".ucfirst($key).'_'.$v."'>".$v."</div>");
                if($v % 7 == 0) // formazione delle righe per i giorni
                    print("<br>");
            } 
            print("</div>");
            if($count % 4 == 0) // formazione delle righe dei mesi
                print("<br>");
        }
    }

    // Per incapsulare le azioni comuni alla creazione della connessione col database
    function connect_DB(){
        $DATABASE_HOST = 'localhost';
        $DATABASE_USER = 'root';
        $DATABASE_PASS = '';
        $DATABASE_NAME = 'venturini_548415_DB';

        // Tentativo di connessione
        $con = mysqli_connect($DATABASE_HOST, $DATABASE_USER, $DATABASE_PASS, $DATABASE_NAME);
        if ( mysqli_connect_errno() ) {
            exit('Failed to connect to MySQL: ' . mysqli_connect_error());
        }

        return $con;
    }
    

?>