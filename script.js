//code wird erst durchgeführt wenn html durchgelaufen ist
document.addEventListener("DOMContentLoaded", function () {      
    
    //code wird ausgeführt wenn csv datei in Inbut eingefügt wird
    document.getElementById("csvInput").addEventListener("change", function (event) {
        

        const file = event.target.files[0];
        if (!file) return;

        // csv datei wird an papaparse übergeben und in ein java script array umgewandelt
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (result) {
                displayTable(result.data);   
            }

        });
    });
});

//Tabelle wird erstellt
function displayTable(data) {
    const table = document.getElementById("csvTable");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    thead.innerHTML = "";
    tbody.innerHTML = ""; 

    if (data.length === 0) return;

    //Spaltenüberschriften werden gemacht
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement("tr");
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);

    });
    thead.appendChild(headerRow);

    //Datenzeilen 
    data.forEach(row => {
        const tr = document.createElement("tr");
        headers.forEach(header =>  {
            const td = document.createElement("td");
            td.textContent = row[header];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
console.log("Daten aus CSV:", data);
}