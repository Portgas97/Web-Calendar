// file signin.js

var fields = document.getElementsByTagName("INPUT");

// Ordine dei campi
//0: name
//1: surname
//2: e-mail
//3: telephone
//4: birth
//5: username
//6: password

var shouldBeALPHANUMERICAL = [0, 1, 5, 6];
var shouldBeNUMERICAL = [3];
var shouldBeALPHABETICAL = [0, 1];
var shouldBeEMAIL = [2]
var MESSAGES = ["The following field does not have valid symbols: ",  
                "The following field is not exclusively numerical: ",  
                "The following field must have only letters: ",   
                "...",  
                "BENVENUTO!"] // window.alert non più usata

// Espressioni regolari
var existALPHANUMERICAL    = /\w/; 
var existNONALPHANUMERICAL = /\W/; 
var existNONNUMERICAL      = /\D/; 
var existNUMERICAL         = /\d/; 
var exist5NUMERICAL        = /\d{5}/; 
var existEMAIL = /^[^@]+@\w+(\.\w+)+\w$/;



function error(idmess, field) {  
    window.alert(MESSAGES[idmess] + field.name);  
    field.focus();   
    field.select();  
} 

function isTrue(COND, ELEM, BOOL, MESS) { 
    // console.log("log_debug: chiamata alla funzione isTrue");
    // console.log("COND: " + COND + " ELEM: " + ELEM + " BOOL: " + BOOL + " MESS: " + MESS);
    for (var i = 0; i < ELEM.length; i++) {
          var j = ELEM[i];      
                field = fields[j];    // global variable with the form inputs
                if (COND.test(field.value) == BOOL) { // test for a match in a string, returns true or false   
                    error(MESS, field); 
                    return true;      
                }    
    } 
    return false;
}    

function validate() {  

    // console.log("Chiamata a validate()");
    var validate_fail = false;

    if(isTrue(existEMAIL,             shouldBeEMAIL,           false, 0)) {
        // console.log("Errore 0");
        return false;
    }  
 
    if (isTrue(existALPHANUMERICAL,    shouldBeALPHANUMERICAL, false, 0)) {
        // console.log("Errore 1");
        return false;
    }  

    if (isTrue(existNONALPHANUMERICAL, shouldBeALPHANUMERICAL, true,  0)) {
        // console.log("Errore 2");
        return false;
    }  

    if (isTrue(existNONNUMERICAL,      shouldBeNUMERICAL,      true,  1)) {
        // console.log("Errore 3");
        return false;
    }   

    if (isTrue(existNUMERICAL,         shouldBeALPHABETICAL,   true,  2)) {
        // console.log("Errore 5");
        return false;
    }  

    if (isTrue(existNONALPHANUMERICAL, shouldBeALPHABETICAL,   true,  2)) {
        // console.log("Errore 6");
        return false;
    }  

    console.log("signin utente avvenuto con successo");
    return true;
    
}