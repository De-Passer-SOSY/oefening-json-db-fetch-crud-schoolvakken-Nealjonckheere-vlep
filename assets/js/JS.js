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
            // Leeg het inputveld en vernieuw de lijst
            input.value = "";
            ophaallessen();
        }
    } catch (err) {
        console.error("Fout bij toevoegen:", err);
    }
}









function displaylessen(lessen) {
    let lijst = document.querySelector("#vakList");
    lijst.innerHTML = "";


    lessen.forEach(les => {
        let li = document.createElement("li");
        li.textContent = les.naam;


        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.addEventListener("click", () => deleteLes(les.id));

        li.appendChild(deleteBtn);
        lijst.appendChild(li);
    });
}