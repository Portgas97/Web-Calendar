// file login.js

var fields = document.getElementsByTagName("INPUT");
//0: username
//1: password
var shouldBeALPHANUMERICAL = [0, 1];

var MESSAGES = ["The following field does not have valid symbols: ",  
                "BENTORNATO!"]; 

// semplici espressioni regolari
var existALPHANUMERICAL    = /\w/; 
var existNONALPHANUMERICAL = /\W/; 

function error(idmess, field) {  
    window.alert(MESSAGES[idmess] + field.name);  
    field.focus();   
    field.select();  
} 

function isTrue(COND, ELEM, BOOL, MESS) { 
    for (var i = 0; i < ELEM.length; i++) {
          var j = ELEM[i];      
                field = fields[j];
                if (COND.test(field.value) == BOOL) { 
                    error(MESS, field); 
                    return true;      
                 }    
    } 
    return false;
}    

function validate() {  
    if (isTrue(existALPHANUMERICAL,    shouldBeALPHANUMERICAL, false, 0)) 
        return;  

    if (isTrue(existNONALPHANUMERICAL, shouldBeALPHANUMERICAL, true,  0)) 
        return;

    // console.log("login.js effettuato con successo");
     
}