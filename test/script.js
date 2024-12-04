document.getElementById('commune').addEventListener('keyup', function (event) {
    let entree = this.value.trim();
    let listeresultat = document.getElementById('resultats');
    let details = document.getElementById('details');
    listeresultat.innerHTML = ''; //on vide la liste
    details.innerHTML = ''; //on vide les détails

    if (entree.length > 0) {

        //requete ajax
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `recherche.php?q=${encodeURIComponent(entree)}`, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data.length > 0) {
                    data.forEach((commune, index) => {
                        let li = document.createElement('li');
                        li.textContent = commune.je_sais_pas_sa_sert_a_quoi + '; ' + commune.numero_de_commune_peut_etre + '; ' + commune.nom; //on affiche le nom de la commune avec les numéro que je sais pas ils servent à quoi
                        li.dataset.index = index; //on sauvegarde l'index du résultat

                        //on gère le clic
                        li.addEventListener('click', function () {
                            afficherDetails(commune);
                        });
                        listeresultat.appendChild(li);
                    });

                    //on affiche le premier résultat si on appuie sur enter
                    if (event.key === 'Enter' && data.length > 0) {
                        afficherDetails(data[0]);
                    }
                } else {
                    listeresultat.innerHTML = '<li>Aucun résultat trouvé.</li>';

                    //on affiche un rappel pour les têtes durs
                    if (event.key === 'Enter') {
                        details.innerHTML = `<p><strong>C'est pas en appuyant sur enter qui va avoir plus de résultat</strong></p>`
                    }
                }
            }
        };
        xhr.send(); //on envoie la requête
    }
});

//on affiche les détails de la recherche
function afficherDetails(commune) {
    let details = document.getElementById('details');
    details.innerHTML = `
        <p><strong>je sais pas sa sert à quoi :</strong> ${commune.je_sais_pas_sa_sert_a_quoi}</p>
        <p><strong>Numéro de commune peut être:</strong> ${commune.numero_de_commune_peut_etre}</p>
        <p><strong>Nom :</strong> ${commune.nom}</p>
        <p><strong>Encore le nom :</strong> ${commune.encore_le_nom}</p>
        <p><strong>Pourquoi il y a 3 fois le nom :</strong> ${commune.pourquoi_il_y_3_fois_le_nom}</p>
        <p><strong>Je sais pas plus sa sert à quoi</strong> ${commune['je_sais_pas_plus_sa_sert-a-quoi']}</p>
    `;
}
