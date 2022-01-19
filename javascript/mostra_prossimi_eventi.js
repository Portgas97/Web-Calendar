// funzioni per la visualizzazione nel box delle highlights dei prossimi due eventi
// se presenti, tramite alcuni effetti interattivi

var interval;
var colors = ['yellow', 'orange', 'green', 'blue', 'rebeccapurple', 'orangered', 'tomato'];

// si cambia colore dello sfondo delle highlights, per "stile"
// ogni seconds secondi
function change_color(div, seconds){
    var random_index = Math.floor(Math.random()*7);
    setTimeout(function(){
            div.style.backgroundColor = colors[random_index];
    }, seconds);
}

// visualizzazione degli eventi restituiti dall'interrogazione al database
// se presenti, altrimenti viene mostrato del testo
function mostra_prossimi_eventi(result){
    
    var primo_evento = result[0];
    var secondo_evento = result[1];

    var deleted_events = document.getElementsByClassName("highlights");
    if(deleted_events != null && deleted_events != undefined)
        while(deleted_events.length)
            deleted_events[0].remove();

    var to_delete = document.getElementById("no_events_h3");
    if(to_delete != null && to_delete != undefined)
        to_delete.remove();

    var box_left = document.getElementById("highlights_container");

    if(primo_evento != null && primo_evento != undefined){ // c'è almeno un evento in programma, fra quelli inseriti dall'utente

        var new_div = document.createElement("div");
        new_div.setAttribute("class", "highlights");
        new_div.setAttribute('style', 'white-space: pre;'); // per permettere la formattazione
        new_div.textContent = "Il tuo prossimo evento in programma \r\n\r\n \'" + primo_evento["description"] + "\'\r\n\r\n il  " + primo_evento["when"]; 
        box_left.appendChild(new_div);
        change_color(new_div, 1000); // visualizzazione del colore di sfondo dopo 1 secondo

        if(secondo_evento != null && secondo_evento != undefined){ // c'è, almeno, anche un altro evento in programma
            var new_div2 = document.createElement("div");
            new_div2.setAttribute("class", "highlights");
            new_div2.setAttribute('style', 'white-space: pre;');
            new_div2.textContent = "Successivamente \r\n\r\n \'" + secondo_evento["description"] + "\'\r\n\r\n il  " + secondo_evento["when"]; 
            box_left.appendChild(new_div2);
            change_color(new_div2, 2000); // visualizzazione del colore di sfondo dopo 2 secondi

        } else { // non è presente un secondo evento
            var h3 = document.createElement("h3");
            h3.setAttribute("id", "no_events_h3");
            h3.textContent = "Non ci sono ulteriori eventi da mostrare"
            box_left.appendChild(h3);
        }

    } else { // ancora non è stato inserito nessun evento dall'utente

        var h3 = document.createElement("h3");
        h3.setAttribute("id", "no_events_h3");
        h3.setAttribute('style', 'white-space: pre;');
        h3.textContent = "\r\n\r\nNon sono presenti eventi personali in programma \r\n\r\n\r\n\r\n Inserisci un evento tramite il pulsante qui sotto!"
        box_left.appendChild(h3);
       
    }

}