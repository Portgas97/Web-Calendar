// FILE DELLE VARIABILI GLOBALI

// Per tenere traccia della modalità di visualizzazione selezionata
var URL_parameters = new URLSearchParams(window.location.search);
var selected_modality = URL_parameters.get('selected_modality');

// Data odierna
var current_date = new Date();

// Giorni della settimana inglese
var WEEKDAY = new Array(7);
WEEKDAY[0] = "Monday";
WEEKDAY[1] = "Tuesday";
WEEKDAY[2] = "Wednesday";
WEEKDAY[3] = "Thursday";
WEEKDAY[4] = "Friday";
WEEKDAY[5] = "Saturday";
WEEKDAY[6] = "Sunday";

// Indice nell'array dei giorni della settimana, lunedì è diverso da 0
// infatti sotto si usa la funzione normalizza_indici
var week_day_index = current_date.getDay(); 
var week_day = WEEKDAY[normalizza_indici(week_day_index)];

// Versione abbreviata per la visualizzazione nel calendario
var WEEKDAY_ABBR = new Array(7);
WEEKDAY_ABBR[0] = "Mon";
WEEKDAY_ABBR[1] = "Tue";
WEEKDAY_ABBR[2] = "Wed";
WEEKDAY_ABBR[3] = "Thu";
WEEKDAY_ABBR[4] = "Fri";
WEEKDAY_ABBR[5] = "Sat";
WEEKDAY_ABBR[6] = "Sun";

// Mesi dell'anno
var MONTH = new Array();
MONTH[0] = "January";
MONTH[1] = "February";
MONTH[2] = "March";
MONTH[3] = "April";
MONTH[4] = "May";
MONTH[5] = "June";
MONTH[6] = "July";
MONTH[7] = "August";
MONTH[8] = "September";
MONTH[9] = "October";
MONTH[10] = "November";
MONTH[11] = "December";

// Indice del mese della data odierna, poi questa variabile verrà aggiornata negli scorrimenti
var month_index = current_date.getMonth();
// Versione con il nome e non con l'indice, aggiornata dagli scorrimenti
var month_name = MONTH[month_index];

// Indice, valore fisso
var fixed_month_index = current_date.getMonth();
// Nome, valore fisso
var fixed_month = MONTH[fixed_month_index];

// Anno attuale
var year = current_date.getFullYear();

// Questa variabile verrà modificata dagli scorrimenti
var show_year = year;

// Giorno del mese odierno
var day_of_month = current_date.getDate();

// Per tenere conto delle volte che viene premuto il bottone di scorrimento
var DAY_COUNTER = day_of_month; 
var WEEK_COUNTER = day_of_month - normalizza_indici(week_day_index); // numero del mese del lunedì della settimana considerata
var YEAR_COUNTER = year;


// Per gli overflow nella visualizzazione settimanale che può attraversare sia mesi ...
// ... successivi ...
var overflow = 0;
var pushed = 0;
var just_passed = 0;    
// ... che precedenti
var overflow_back = 0;
var pushed_back = 0;
var just_passed_back = 0;

// Somma delle settimana attraversate
var weeks_sum = 0;

// Numero di giorni per ogni mese
var MONTH_DAYS = new Array();
MONTH_DAYS[0] = 31;
MONTH_DAYS[1] = 28;
// MONTH_DAYS[2] = 29; // febbraio negli anni bisestili, non utilizzato perché gestito manualmente nei listener relativi
MONTH_DAYS[2] = 31;
MONTH_DAYS[3] = 30;
MONTH_DAYS[4] = 31;
MONTH_DAYS[5] = 30;
MONTH_DAYS[6] = 31;
MONTH_DAYS[7] = 31;
MONTH_DAYS[8] = 30;
MONTH_DAYS[9] = 31;
MONTH_DAYS[10] = 30;
MONTH_DAYS[11] = 31;

// Variabile per una visualizzazione quadrata del mese, quando possibile
var MONTH_MATRIX = 35;

// Numero di millisecondi in un giorno
var MILLISECONDS_PER_DAY = 86400000;

// Per contare il numero di giorni passati nella visualizzazione annuale...
var days_sum = 0;

// Variabile globale che contiene la data del compleanno dell'utente, se presente
var BIRTHDAY;

