
//  per aprire e chiudere le form a comparsa in calendar.php

function openForm(id) {
  // console.log("APERTURA form");
  document.getElementById(id).style.display = "block";
}

function closeForm(id) {
  // console.log("CHIUSURA form");
  document.getElementById(id).style.display = "none";
}

