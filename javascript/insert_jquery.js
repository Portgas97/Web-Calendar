// chiamata AJAX con JQUERY per l'inserimento di nuovi eventi

// le funzioni di appoggio sono definite in jquert_utility.js

$(document).ready(function(){ // quando il DOM è stato caricato

    $('#insert_btn').click(function(event){ // listener sul click

        event.preventDefault();

        var date = $('#date').val();
        var description = $('#description').val();
        var param = {Date: date, Description: description};

        $.post('../php/insert_event.php', param, function(result){ // callback, chiamata POST

            var last_id = result['last_id'];
            visualizza_nuovo_evento(date, description, last_id); // mostro l'evento nel document

        }, "json");  // comunicazioni tramite lo standard de facto JSON

    });
});

