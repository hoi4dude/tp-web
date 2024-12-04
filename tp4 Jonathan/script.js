/*
Auteur: Jonathan Desrochers
date de créaton: 13 novembre 2024
dernière date de modification: 13 novembre 2024
description: ce script prend le contenue de toutes les div avec l'ID "écriture" et mets en bas
             de la page les data-notes de tous les mots spéciales définis avec l'attribut "a".
*/ 

$(document).ready(function(){
    let noteFinPage = $('<div></div>')
        .attr('id', 'refcan_final')
        .css({
            'width': '100%',
            'background-color': '#EAEAEA', //gris
            'margin-top': '20px',
        });

    //on le met à la fin du body
    $('body').append(noteFinPage);

    let compteurLien = 1;

    //on va voir chaque élément avec l'id "ecriture"
    $('div[id="ecriture"]').each(function(){

        //on s'en va prendre l'élément note de chaque lien.
        $(this).find('a.piedpage').each(function(){
            let note = $(this).data('note');

            //on ajoute une entrée avec la valeur du compteur et le contenu de note dans un élément paragraphe.
            noteFinPage.append(`<p>${compteurLien}. ${note}</p>`);

            //on met la notte dans un attribut
            $(this).attr('data-note-affichage', note);

            compteurLien++;
        });

    });

    //effet de hover quand on passe la souris sur les liens
    $('a.piedpage').hover(
        function() {
            //quand la souris passe sur le lien
            let noteTexte = $(this).data('note-affichage');

            let boiteTexte = $('<span></span>')
                .addClass('tooltip')
                .text(noteTexte)
                .css({
                    'position': 'absolute',
                    'background-color': '#EAEAEA', //gris encore
                    'padding': '5px', //sans sa la boite de texte se ramasse en bas de la page
                    'z-index': '1000',
                    'top': $(this).offset().top + 20,
                    'left': $(this).offset().left
                });

            //on met la boite de texte dans le document
            $('body').append(boiteTexte);
            $(this).data('boiteTexte', boiteTexte);
        },
        function() {
            $(this).data('boiteTexte').remove(); //on enlève la boite de texte quand la souris part
        }
    );
});
