document.addEventListener("DOMContentLoaded", () => {
    let sportRecherche = document.body.getAttribute("data-sport");

    if (!sportRecherche) {
        const nomFichier = window.location.pathname.split("/").pop().replace(".html", "");
        sportRecherche = nomFichier.charAt(0).toUpperCase() + nomFichier.slice(1).toLowerCase();
    }

    fetch("../Excel/Activite.xlsx")
        .then(response => {
            if (!response.ok) throw new Error("Fichier Excel non trouvé");
            return response.arrayBuffer();
        })
        .then(buffer => {
            const workbook = XLSX.read(buffer, { type: "buffer" });
            const sheetName = workbook.SheetNames[0]; // Supposons que les données sont dans la première feuille
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            // Chercher la ligne où Sport correspond à sportRecherche
            const infos = data.find(row => row.Sport && row.Sport.toLowerCase() === sportRecherche.toLowerCase());

            if (!infos) {
                document.getElementById("contenu-sport").innerHTML = "<p>Sport non trouvé.</p>";
                return;
            }

            document.getElementById("description").innerHTML = (infos["Description"] || "").replace(/\n/g, "<br>");
            document.getElementById("contact").innerHTML = (infos["Contact"] || "").replace(/\n/g, "<br>");
            document.getElementById("horaires").innerHTML = (infos["Horaires"] || "").replace(/\n/g, "<br>");
            document.getElementById("materiel").innerHTML = (infos["Materiel"] || "").replace(/\n/g, "<br>");
            document.getElementById("lieu").innerHTML = (infos["Lieu de pratique"] || "").replace(/\n/g, "<br>");

            const tarifsContainer = document.getElementById("tarifs");
            tarifsContainer.innerHTML = "";

            // ----------- Tableau 1 : Adhésion VUC Omnisports -----------

            const table1 = document.createElement("table");
            table1.classList.add("table", "table-bordered", "mb-4");

            const thead1 = document.createElement("thead");
            const headerRow1 = document.createElement("tr");
            const th1 = document.createElement("th");
            th1.colSpan = 2;
            th1.textContent = "Adhésion VUC Omnisports";
            headerRow1.appendChild(th1);
            thead1.appendChild(headerRow1);
            table1.appendChild(thead1);

            const tbody1 = document.createElement("tbody");

            const ligneEnfants = document.createElement("tr");
            const cellLabelEnfants = document.createElement("td");
            const cellValueEnfants = document.createElement("td");
            cellLabelEnfants.textContent = "Enfants Etudiants UPHF Personnels UPHF";
            cellValueEnfants.textContent = "15 €";
            ligneEnfants.appendChild(cellLabelEnfants);
            ligneEnfants.appendChild(cellValueEnfants);

            const ligneAdultes = document.createElement("tr");
            const cellLabelAdultes = document.createElement("td");
            const cellValueAdultes = document.createElement("td");
            cellLabelAdultes.textContent = "Adultes";
            cellValueAdultes.textContent = "20 €";
            ligneAdultes.appendChild(cellLabelAdultes);
            ligneAdultes.appendChild(cellValueAdultes);

            tbody1.appendChild(ligneEnfants);
            tbody1.appendChild(ligneAdultes);
            table1.appendChild(tbody1);

            tarifsContainer.appendChild(table1);

            // ----------- Tableau 2 : Cotisation Omnisports -----------

            const tarifsText = infos["Tarifs"] || "";
            const lignes = tarifsText.split("\n").filter(ligne => ligne.trim() !== "");

            const table2 = document.createElement("table");
            table2.classList.add("table", "table-bordered", "mb-4");

            const thead2 = document.createElement("thead");
            const headerRow2 = document.createElement("tr");
            const th2 = document.createElement("th");
            th2.colSpan = 2;
            th2.textContent = "Cotisation VUC";
            headerRow2.appendChild(th2);
            thead2.appendChild(headerRow2);
            table2.appendChild(thead2);

            const tbody2 = document.createElement("tbody");

            lignes.forEach(ligne => {
                const lastColonIndex = ligne.lastIndexOf(":");
                if (lastColonIndex !== -1) {
                    const label = ligne.slice(0, lastColonIndex).trim();
                    const value = ligne.slice(lastColonIndex + 1).trim();
                    const row = document.createElement("tr");
                    const cellLabel = document.createElement("td");
                    const cellValue = document.createElement("td");
                    cellLabel.innerHTML = label.replace(/, /g, "<br>"); // retour à la ligne après chaque ", "
                    cellValue.textContent = value;
                    cellValue.style.verticalAlign = "middle";
                    cellValue.style.textAlign = "center";
                    cellValue.style.whiteSpace = "nowrap";
                    row.appendChild(cellLabel);
                    row.appendChild(cellValue);
                    tbody2.appendChild(row);
                }
            });

            table2.appendChild(tbody2);
            tarifsContainer.appendChild(table2);

            // ----------- Bouton d'inscription -----------

            const lienInscription = (infos["Lien"] || "").trim();
            if (lienInscription.startsWith("http")) {
                const bouton = document.createElement("a");
                bouton.href = lienInscription;
                bouton.className = "btn-inscription";
                bouton.textContent = "S’inscrire";
                bouton.target = "_blank";
                const conteneur = document.getElementById("bouton-inscription");
                conteneur.appendChild(bouton);
            }
        })
        .catch(error => {
            console.error("Erreur lors de la lecture du fichier Excel :", error);
            document.getElementById("contenu-sport").innerHTML = "<p>Erreur lors du chargement des données.</p>";
        });
});
