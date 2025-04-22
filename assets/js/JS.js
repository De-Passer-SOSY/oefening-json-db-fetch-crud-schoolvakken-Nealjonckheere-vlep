"use strict";


document.addEventListener("DOMContentLoaded", init);


function init() {
    console.log("De pagina is volledig geladen");
}



async function ophaallessen(){
    try {
        let response = await fetch("http://localhost:5688/vakken");

        let lessen = await response.json();

        displaylessen(lessen)

    } catch (err) {
        console.error("Fout:", err);
    }
}

async function addles() {
    let input = document.querySelector("#vakInput");
    let nieuweNaam = input.value.trim();

    if (nieuweNaam === "") {
        alert("Vul een vaknaam in!");
        return;
    }

    try {
        let response = await fetch("http://localhost:5688/vakken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ naam: nieuweNaam })
        });

        if (response.ok) {
            input.value = "";
            ophaallessen();
        }
    } catch (err) {
        console.error("Fout bij toevoegen:", err);
    }
}


async function deleteVak(id) {
    try {
        let response = await fetch(`http://localhost:5688/vakken/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            ophaallessen(); // vernieuw de lijst na verwijderen
        }
    } catch (err) {
        console.error("Fout bij verwijderen:", err);
    }
}







function displayVakken(vakken) {
    let lijst = document.querySelector("#vakList");
    lijst.innerHTML = "";

    // Loop over alle vakken
    vakken.forEach(vak => {
        let li = document.createElement("li");
        li.textContent = vak.naam;


        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", () => deleteVak(vak.id));

        li.appendChild(deleteBtn);
        lijst.appendChild(li);
    });
}