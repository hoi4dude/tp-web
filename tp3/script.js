//affiche les notifications (actions réussites, erreurs)
function afficherNotification(message, couleur) {

    //on crée un nouvel élément
    let notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.color = couleur;
    notification.style.fontSize = '24px';
    notification.style.marginBottom = '10px';

    //on mets l'élément dans la colonnes des notifications
    document.querySelector('.notifications').appendChild(notification);

    //on mets un timeout pour qu'il disparaisse tout seul après 3 secondes
    setTimeout(() => { notification.remove(); }, 3000);
}

//charge les livres du local storage
function chargerLivres() {
    //on obtient les livres contenu dans le local storage
    const livres = JSON.parse(localStorage.getItem('livres')) || [];

    //on passe directement à l'ajout des livres sans faire les checks. ils ont déja
    //été fait en appuyant sur le bouton ajouter, et de toute façon c'est le problème
    //de l'utilisateur s'il décide de modifier le local storage, pas le miens.
    livres.forEach(livre => ajouterLivreDansTable(livre.titre, livre.auteur, livre.isbn, false));
}

//ajoute un livre dans la table
function ajouterLivreDansTable(titre, auteur, isbn, sauverDansLocalStorage = true) {
    const tBody = document.querySelector('.liste_livre tbody');
    const ligne = document.createElement('tr');

    //on crée les colonnes
    const colonneTitre = document.createElement('td');
    colonneTitre.textContent = titre;

    const colonneAuteur = document.createElement('td');
    colonneAuteur.textContent = auteur;

    const colonneIsbn = document.createElement('td');
    colonneIsbn.textContent = isbn;
    colonneIsbn.setAttribute('data-isbn', isbn); //sans sa, le check pour le isbn ne fonctionne pas

    //on ajoute le bouton supprimer
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = ' X';
    boutonSupprimer.classList.add('btn-supprimer');
    boutonSupprimer.addEventListener('click', () => {
        tBody.removeChild(ligne);
        afficherNotification('Le livre a été enlevé de la liste', 'green');
        supprimerLivreDuLocalStorage(isbn);
    });

    colonneIsbn.appendChild(boutonSupprimer);

    //on ajoute la nouvelle ligne à la liste
    ligne.appendChild(colonneTitre);
    ligne.appendChild(colonneAuteur);
    ligne.appendChild(colonneIsbn);

    //on alterne la couleur des ligne entre le vers et le rouge
    ligne.style.backgroundColor = tBody.childElementCount % 2 === 0 ? 'green' : 'red';
    tBody.appendChild(ligne);

    //sauvegarde dans le local storage si nécessaire
    if (sauverDansLocalStorage) {
        let livres = JSON.parse(localStorage.getItem('livres')) || [];
        livres.push({ titre, auteur, isbn });
        localStorage.setItem('livres', JSON.stringify(livres));
    }
}


//supprime les livres du local storage
function supprimerLivreDuLocalStorage(isbn) {

    //on cherche le livre voulu et on l'enlève
    let livres = JSON.parse(localStorage.getItem('livres')) || [];
    livres = livres.filter(livre => livre.isbn !== isbn);
    localStorage.setItem('livres', JSON.stringify(livres));
}

//ajoute un livre dans la liste
function ajouterLivre() {

    //on obtiens les valeurs dans les champs de texte
    const titre = document.getElementById('titre').value.trim();
    const auteur = document.getElementById('auteur').value.trim();
    const isbn = document.getElementById('isbn').value.trim();

    //On regarde s'ils sont tous remplis
    if (!titre || !auteur || !isbn) {
        afficherNotification('Certains champs sont vides', 'red');
        return;
    }

    //faut s'assurer que le ISBN est pas déja là
    const lignes = document.querySelectorAll('.liste_livre tbody tr');
    for (let ligne of lignes) {
        const colonneIsbn = ligne.querySelector('td:nth-child(3)');
        if (colonneIsbn.getAttribute('data-isbn') === isbn) {
            afficherNotification('Un livre avec le même ISBN est déjà présent', 'red');
            return;
        }
    }

    //on ajoute le livre è la liste et on le mets dans le local storage.
    //L'ajout du livre est séparé en deux pour ne pas faire une fonction
    //de 500 kilomètres et parce qu'on skip les checks quand on charge les
    //livres du local storage.
    ajouterLivreDansTable(titre, auteur, isbn, true);
    afficherNotification('Le livre a été ajouté', 'green');

    //on vide les champs de texte
    document.getElementById('titre').value = '';
    document.getElementById('auteur').value = '';
    document.getElementById('isbn').value = '';
}


//listener pour éxécuter la fonction quand on clic sur ajouter
document.querySelector('.ajouter').addEventListener('click', ajouterLivre);

//listener pour loader le local storage
document.addEventListener('DOMContentLoaded', chargerLivres);
