<!-- File principale del progetto  -->

<!DOCTYPE html>
<html lang="it">
    <head>

        <meta charset="UTF-8">
        <meta name="keywords" content="ORGANIZER, calendar, HTML, CSS, JavaScript, PHP, SQL">
        <meta name="description" content="Calendario, blocco note e reminder per gestire gli impegni, progetto del corso Progettazione Web, UNIPI">
        <meta name="author" content="Francesco Venturini">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title> ORGANIZAER </title>

        <!-- fogli di stile utilizzati e inediti -->
        <link rel="stylesheet" type="text/css" href="../css/index_style.css"> 
        <link rel="stylesheet" type="text/css" href="../css/calendar_style.css"> 
        <link rel="stylesheet" type="text/css" href="../css/insert_form.css"> 

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> <!-- Libreria JQUERY, questa chiamata va posta per prima sennò $ risulta indefinito -->
        <!-- File javascript utilizzati e inediti -->
        <script src="../javascript/get_birthday.js"></script>
        <script src="../javascript/visualizza_compleanno.js"></script>
        <script src="../javascript/calendar.js"></script>
        <script src="../javascript/open-close-form.js"></script>
        <script src="../javascript/insert_jquery.js"></script>
        <script src="../javascript/delete_jquery.js"></script>
        <script src="../javascript/delete_modify_event.js"></script>
        <script src="../javascript/elimina_singolo_evento.js"></script>
        <script src="../javascript/calendar_utility.js"></script>
        <script src="../javascript/global_data.js"></script>
        <script src="../javascript/ToCurrentListener.js"></script>
        <script src="../javascript/btn_rightListener.js"></script>
        <script src="../javascript/btn_leftListener.js"></script>
        <script src="../javascript/jquery_utility.js"></script>
        <script src="../javascript/visualizza_eventi.js"></script>
        <script src="../javascript/btn_right_utility.js"></script>
        <script src="../javascript/btn_left_utility.js"></script>
        <script src="../javascript/delete_by_id_jquery.js"></script>
        <script src="../javascript/modify_by_id_jquery.js"></script>
        <script src="../javascript/change_description.js"></script>
        <script src="../javascript/get_next_event.js"></script>
        <script src="../javascript/mostra_prossimi_eventi.js"></script>
    </head>

    <body onload = main()> <!-- funzione in calendar.js -->

        <!-- Controllo che sia stato fatto il login, in caso redireziono verso index.html -->
        <?php
            session_start();
            // controllo se sono loggato
            if(!isset($_SESSION['loggedin'])){
                header('Location: ../index.html');
                exit;
            }

            if(isset($_SESSION['user_not_exists'])){
                alert("This username not exists");
                $_SESSION['user_not_exists'] = null;
            }
        ?>

        <div id="page-container-2"> <!-- permette di implementare sticky footer in fondo -->
            
            <div id="content-wrap"> <!-- tutto il contenuto della pagina accetto il footer-->

                <ul class="nav-links"> <!-- NAV BAR -->
                    <li class="logo"> Organizer </li>

                    <li id="no_transition">
                        <form id="modality_form" class="modality_form" action="./calendar.php" method="get">
                            <select class="elem_align" name="selected_modality" id="modality_select" oninput="this.form.submit()">
                                <option value="Giorno">Giorno</option>
                                <option value="Settimana">Settimana</option>
                                <option value="Mese" selected>Mese</option>
                                <option value="Anno">Anno</option>
                            </select>
                        </form>
                    </li>

                    <li style="float:right"> <a href="logout.php">Logout</a> </li> 
                </ul>
                
                <!-- Per dare il benvenuto all'utente, tramite le variabili di sessione -->
                <div style="float:left"> 
                    <?php
                        if(isset($_SESSION['first_time'])){
                            print("<h2> Benvenuto, ");
                            print($_SESSION['username']);
                            print(" &#128526; </h2>"); // emoji
                        }
                        else{
                            print("<h2> Bentornato, ");
                            print($_SESSION['username']);
                            print(" &#128525; </h2>"); // emoji
                        }

                        print("<div id='username' style='display:none'> {$_SESSION['username']} </div>");
                    ?>
                </div>

                <!-- riempito da next_events in javascript -->
                <div class="external_box_left" id="highlights_container">
                    <h1 id="change_color"> Eventi in Programma </h1>
                </div> 

                <!-- form a comparsa -->
                <button class="open-button" onclick="openForm('myform')">Inserisci</button>
                <button class="open-button-2" onclick="openForm('myform_delete')"> Elimina</button>
                <button class="open-button-1" onclick="openForm('myform_modify')"></button>


                <!-- FORM PER L'INSERIMENTO DI NUOVI EVENTI -->
                <div class="form-popup" id="myform">
                    <!-- action vuota perché gestito con jquery -->
                    <form action="#" method="post" class="form-container" enctype="application/x-www-form-urlencoded"> 
                        <h1>INSERT</h1>

                        <label for="date"><b>Date</b></label>
                        <!-- trick per vedere qualcosa di più carino fino all'evento onfocus -->
                        <input id="date" type="text" name="date" placeholder="DD/MM/YYYY" onfocus="(this.type ='date')" required>

                        <label for="description"><b>Description</b></label>
                        <input id="description" type="text" placeholder="Enter description" name="description" maxlength="100" autocomplete="off" required>
                        <?php
                            print("<input type = \"hidden\" name = \"username\" value =\"".$_SESSION['username']."\"/>");
                        ?>
                        
                        <button type="submit" class="insert_btn" id="insert_btn">Go</button>
                        <button type="button" class="insert_btn cancel" onclick="closeForm('myform')">Close</button>
                    </form>
                </div>

                <!-- FORM PER L'ELIMINAZIONE DIRETTA DEGLI EVENTI, form a comparsa -->
                <div class="form-popup" id="myform_delete">
                    <!-- action vuota perché gestito con jquery -->
                    <form action="#" method="post" class="form-container" enctype="application/x-www-form-urlencoded"> 
                        <h1>Delete</h1>

                        <label for="date"><b>Date</b></label>
                        <input id="date_delete" type="text" name="date" placeholder="DD/MM/YYYY" onfocus="(this.type ='date')" required>
                        <input id="description_delete" type="text" placeholder="Copy description of the event to delete" name="description" maxlength="100" autocomplete="off" required>

                        <?php
                            print("<input id=\"hidden_username\" type = \"hidden\" name = \"username\" value =\"".$_SESSION['username']."\"/>");
                        ?>
                        
                        <button type="submit" class="insert_btn" id="delete_btn">Go</button>
                        <button type="button" class="insert_btn cancel" onclick="closeForm('myform_delete')">Close</button>
                    </form>
                    
                </div>

                <!-- form nascosta per la MODIFICA sul click -->
                <div class="form-popup" id="modify_by_id">
                    <form action="#" method="post" class="form-container" enctype="application/x-www-form-urlencoded"> 
                            <h1>Modify</h1>
                            <input id="description_modify" type="text" autofocus placeholder="New Description" name="description"  maxlength="100" autocomplete="off" required>
                            <input style="display:none" id="id_modify" type="text" name="id" required>
                            <button type="submit" class="insert_btn" id="modify_submit">Go</button>
                            <button type="button" class="insert_btn cancel" onclick="closeForm('modify_by_id')">Close</button>
                            <input style="display:none" type="reset" id="modify_reset">

                    </form>
                </div>

                <!-- form nascosta per l'ELIMINAZIONE sul click -->
                <div class="form-popup" id="delete_by_id_form">
                    <form action="#" method="post" class="form-container" enctype="application/x-www-form-urlencoded"> 
                        <input id="id_delete" type="text" name="id" required>
                        <button type="submit" class="insert_btn" id="delete_by_id"></button>
                    </form>
                </div>

                <!-- riempito dinamicamente in base alla visualizzazione e allo scorrimento -->
                <div class="function_box"> 
                </div>

                <!-- Freccette per scorrere il calendario -->
                <div class='arrows'>
                        <div id="btn_left" class='btn_left'> &lt; </div>
                        <div id="btn_right" class='btn_right'> &gt; </div>
                </div>

                <!-- Bottone per tornare alla data corrente nel calendario, in base alla modalità di visualizzazione selezionata -->
                <div class="button_to_current" id="button_to_current">
                    To current date
                </div>

                <!-- CALENDARIO -->
                <div class= "external_box_right" id="calendar_container"> 
                
                    <?php
                        include 'utility.php';

                        $modality;
                        if(isset($_GET["selected_modality"])){
                            $modality = $_GET["selected_modality"];
                        }                   

                        // Variabili fondamentali riguardo alla data odierna
                        $date = getdate();
                        $day_of_month = $date['mday'];
                        $day_of_week = $date['wday'];
                        $month_number = $date['mon'];
                        $year = $date['year'];
                        $week_day = $date['weekday'];
                        $month_name = $date['month'];

                        // bisestile
                        if(strcmp($month_name, "february") == 0 && is_leap_year($year))
                            $month_name = "leap_february";

                        // visualizzazione data odierna
                        print("<div class='day_presentation'> Current Date: {$week_day} {$month_name} {$day_of_month}, {$year}</div>");
                        print("<br>");

                        $month_name = strtolower($month_name);

                        if(isset($modality)){
                            if($modality === 'Mese'){ // CALENDARIO MENSILE 
                                display_week_days();
                                $previous_month = compute_previous_month($month_name, $year);
                                display_month($week_day, $day_of_month, $month_name, $previous_month);

                            } elseif($modality === 'Anno'){ // CALENDARIO ANNUALE
                                display_year($year);
                                
                            } elseif($modality === 'Giorno'){ // CALENDARIO GIORNALIERO
                                display_day($day_of_month, $month_name);

                            } elseif($modality === 'Settimana'){ // CALENDARIO SETTIMANALE
                                display_week_days();
                                display_week($year, $month_name, $week_day, $day_of_month);
                            }
                        } else { // DEFAULT, se non si è settata una modalità viene mostrato il calendario mensile
                            display_week_days();  
                            display_month($week_day, $day_of_month, $month_name, $year);
                        }
                       
                    ?>
                </div>
            </div>    

            <!-- footer incollato in fondo -->
            <footer id="footer">
                <p>Author: Francesco Venturini</p>
                <p> Progetto per il corso di Progettazione Web</p>
                <p> Universit&#224; di Pisa</p>
                <p><a href="mailto:f.venturini12@studenti.unipi.it">send mail: f.venturini12@studenti.unipi.it</a></p>
            </footer>
        </div>
  
    </body>
    
</html>