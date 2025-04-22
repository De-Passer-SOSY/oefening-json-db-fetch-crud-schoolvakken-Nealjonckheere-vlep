"use strict";


document.addEventListener("DOMContentLoaded", init);


function init() {
    console.log("De pagina is volledig geladen");
}



async function ophaallessen(){
    try {
        let response = await fetch("http://localhost:5688/vakken");

        let lessen = await response.json();

    } catch (err) {
        console.error("Fout:", err);
    }
}