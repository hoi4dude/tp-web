<?php
header('Content-Type: application/json');

//infos du sreveur
$serveur = "localhost";
$utilisateur = "root";
$mot_de_passe = "";
$base_de_donnees = "csv_db 6";

//connexion à la BD
$connexion = new mysqli($serveur, $utilisateur, $mot_de_passe, $base_de_donnees);

//on récupere la recherche
$recherche = isset($_GET['q']) ? $_GET['q'] : '';

if ($recherche !== '') {
    //on prépare la requête sql
    $requete = $connexion->prepare("SELECT * FROM communes WHERE nom LIKE ? LIMIT 10");
    $parametre_recherche = $recherche . '%'; //on recherche seulement dans le début su nom
    $requete->bind_param('s', $parametre_recherche);

    //on lance la recherche
    $requete->execute();
    $resultat = $requete->get_result();

    $donnees = [];

    //on récupère les résultats
    while ($ligne = $resultat->fetch_assoc()) {
        $donnees[] = $ligne; //on ajoute la lugne pour l'affichage
    }

    //on retourne les résultats en json
    echo json_encode($donnees);
} else {
    echo json_encode([]); //s'il y a rien on retourne un tableau vide
}

//on ferme la connexion
$connexion->close();
?>
