
// funzione che mostra gli eventi restituiti dalla query relativa, se presenti nella visualizzazione corrente

function visualizza_eventi(username_default = 0){ // parametro di default per la visualizzaazione degli eventi standard come la festività

            // console.log("Esecuzione visualizza_eventi()");
            var period = $('.function_box').text();
            var splitted = period.split(" ");
            var box_year = "";
            var box_month = splitted[0];
            var splitted_month = box_month.split('/');
            var box_month_another = ""; // quando nella visualizzazione con settimane viene mostrata una settimana a cavallo tra due mesi
            var splitted_years = "";
            var box_year_another = "";

            if(splitted[1] === undefined){ // si sta visualizzando l'anno, il mese non viene mostrato
                box_month = null;
                box_year = splitted[0];
            } else {
                if(splitted_month[1] !== undefined){ // settimana che è in mezzo a due mesi
                    splitted_years = splitted[1].split('/');
                    if(splitted_years[1] !== undefined){ // la settimana attraversa anche due anniù
                        box_year_another = splitted_years[1];
                    } 
                    box_month = month_to_index(splitted_month[0]);
                    box_month_another = month_to_index(splitted_month[1]);
                } else { // settimana interna al mese
                    box_month = month_to_index(splitted[0]); 
                    box_month_another = null;
                }

                box_year = splitted[1];
            }

            var username;
            if(username_default !== 0)
                username = 'username_default';
            else
                username = $('#username').text();   

            // oggetto da passare alla chiamata POST tramite JSON
            var param = {Month: box_month, Month_Another: box_month_another, Year: box_year, Year_Another: box_year_another, Username: username};

            $.post('../php/get_event.php', param, function(result){ // callback, chiamata POST
    
                if(BIRTHDAY !== undefined && BIRTHDAY !== null) // il compleanno non è stato inserito in fase di registrazione
                    visualizza_compleanno(BIRTHDAY);

                var i = 0;
                for(when in result){
                    var id = result[when]["id"];

                    when = when.split('_')[0]; // estraggo la data
                    var splitted_when = when.split('-');

                    // var result_year = splitted_when[0]; // non utilizzato
                    
                    var result_month = splitted_when[1];
                    var result_day = splitted_when[2];
                    var no_leading_zero_day = parseInt(result_day);

                    if(box_month == null){ // la visualizzazioe dell'anno è diversa, per come sono costruiri gli ID dei DIV

                        var selected_div = document.getElementById(index_to_month(result_month) + '_' + no_leading_zero_day);
                        if(selected_div == null) // l'evento inserito non è fra quelli attualmente mostrati
                            continue;
                        
                        if(username_default !== 0)
                            selected_div.setAttribute('style', 'background-color: green');
                        else
                            selected_div.setAttribute('style', 'background-color: #0892D0');

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

                    } else { // tutti i casi che non sono la visualizzazione dell'anno

                        if(box_month_another != null){
                            // esempio: siamo a cavallo fra marzo e aprile, senza questi if un evento impostato per l'1 marzo viene visualizzato l'1 aprile
                            if(parseInt(box_month) === parseInt(result_month) && parseInt(result_day) < 6){
                                i++;
                                continue;
                            }
                            if(parseInt(box_month) < parseInt(result_month) && parseInt(result_day) > MONTH_DAYS[parseInt(box_month)] - 6){
                                i++;
                                continue;
                            }
                        }

                        var selected_div = document.getElementById(no_leading_zero_day);

                        if(selected_div == null){ // l'evento inserito non è fra quelli attualmente mostrati
                            i++;
                            continue;
                        } 
                        
                        var event_div = document.createElement("div");

                        event_div.setAttribute('id', "DB_ID_" + id);
                        event_div.setAttribute('class', 'event_div');

                        event_div.addEventListener('click', function(event){
                            request_to_alter_event(event); // delete_modify_event.js
                        });

                        // simbolo per il bullet tipico delle liste
                        var symbol = '\u2022'; 
                        event_div.textContent = symbol + " " + result[when + '_' + i]["description"];
                        if(username_default !== 0)
                            event_div.setAttribute('style', 'background-color: green');
                        else
                            event_div.setAttribute('style', 'background-color: #0892D0');

                        var br = document.createElement("br");
                        event_div.appendChild(br);

                        selected_div.appendChild(event_div);

                        i++;
                    }
                }                
                
            }, "json");  

}