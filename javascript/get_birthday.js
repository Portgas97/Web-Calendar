
// si occupa di ricavare l'informazione relativa al compleanno 
// se inserita in fase di registrazione, e quindi la visualizza

var contatore = 0;

$(document).ready(function(){ // quando il DOM è stato caricato

    var username = $('#hidden_username').val();
    var param = {Username: username};

    $.post('../php/get_birthday.php', param, function(result){ // callback, chiamata POST

        BIRTHDAY = result["birthday"]; // setto la variabile globale

        if(result["birthday"] != null)
            visualizza_compleanno(BIRTHDAY);
        

    }, "json"); // comunicazione JSON

});


