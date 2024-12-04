document.addEventListener('DOMContentLoaded', () => {

  //déclarations de variables
    const espaceOuLesFormesSont = document.getElementById('espaceOuLesFormesSont');
    const BoutonAjouterCarre = document.getElementById('ajouterCarre');
    const BoutonAjouterRond = document.getElementById('ajouterRond');
    const boutonFaireBouger = document.getElementById('start');
    const boutonArret = document.getElementById('arreter');
    const BoutonReset = document.getElementById('reset');
  
    let listeDesForme = [];
    let IdAnim = null;
    let YBougeTu = false;
  
    function valeurAleatoire(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function creerForme(type) {
      //déclarations de variables
      const taille = valeurAleatoire(30, 100);
      const couleur = `hsl(${valeurAleatoire(0, 360)}, 70%, 50%)`;
      const forme = document.createElement('div');
      forme.classList.add('shape');
      forme.style.width = `${taille}px`;
      forme.style.height = `${taille}px`;
      forme.style.backgroundColor = couleur;
      forme.style.left = `${valeurAleatoire(0, espaceOuLesFormesSont.clientWidth - taille)}px`;
      forme.style.top = `${valeurAleatoire(0, espaceOuLesFormesSont.clientHeight - taille)}px`;
  
      if (type === 'rond') {
        forme.style.borderRadius = '50%';
      }
  
      //Les formes bougent pas par defaut
      forme.dataset.dx = 0;
      forme.dataset.dy = 0;
  
      //Si les autres bougent deja, on donne une valeur
      if (YBougeTu) {
        const vitesse = valeurAleatoire(1, 3);
        forme.dataset.dx = vitesse;
        forme.dataset.dy = vitesse;
      }

      //listener qui va ecouter pour tout clic sur une forme
      forme.addEventListener('click', () => {
        if (!YBougeTu) {
          //on enlève la forme de l'écran
          espaceOuLesFormesSont.removeChild(forme);
          //On  l'enlève aussi de la liste
          const index = listeDesForme.indexOf(forme);
          if (index > -1) {
            listeDesForme.splice(index, 1);
          }
        }
      });
  
      espaceOuLesFormesSont.appendChild(forme);
      listeDesForme.push(forme);
    }
  
    //permettre les formes de bouger
    function faireBouger() {
      listeDesForme.forEach(forme => {
        //On lui donne une vitesse
        if (parseFloat(forme.dataset.dx) === 0 && parseFloat(forme.dataset.dy) === 0) {
          const vitesse = valeurAleatoire(1, 3);
          forme.dataset.dx = vitesse;
          forme.dataset.dy = vitesse;
        }
      });
      YBougeTu = true;
      animer();
    }
  
    //faire arreter de bouger les formes
    function arreterDeBouger() {
      listeDesForme.forEach(forme => {
        forme.dataset.dx = 0;
        forme.dataset.dy = 0;
      });
      YBougeTu = false;
      cancelAnimationFrame(IdAnim);
    }
  
    //la fonction qui s'occupe de faire bouger les formes
    function animer() {
      listeDesForme.forEach(forme => {
        let x = forme.offsetLeft;
        let y = forme.offsetTop;
        let dx = parseFloat(forme.dataset.dx);
        let dy = parseFloat(forme.dataset.dy);
        const taille = forme.offsetWidth;
  
        x += dx;
        y += dy;
  
        //Physique des objets
        //Horizontal
        if (x + taille >= espaceOuLesFormesSont.clientWidth) {
          x = espaceOuLesFormesSont.clientWidth - taille;
          dx = -Math.abs(dx);
        }
  
        if (x <= 0) {
          x = 0;
          dx = Math.abs(dx);
        }
  
        //Vertical
        if (y + taille >= espaceOuLesFormesSont.clientHeight) {
          y = espaceOuLesFormesSont.clientHeight - taille;
          dy = -Math.abs(dy);
        }
  
        if (y <= 0) {
          y = 0;
          dy = Math.abs(dy);
        }
  
        forme.style.left = `${x}px`;
        forme.style.top = `${y}px`;
        forme.dataset.dx = dx;
        forme.dataset.dy = dy;
      });
  
      IdAnim = requestAnimationFrame(animer);
    }
  
    //tous les events listeners qui vont appeler les bonnes fonctions quand un bouton est appuyé
    BoutonAjouterCarre.addEventListener('click', () => {
      creerForme('carré');
    });
  
    BoutonAjouterRond.addEventListener('click', () => {
      creerForme('rond');
    });
  
    boutonFaireBouger.addEventListener('click', () => {
      if (!YBougeTu) {
        faireBouger();
      }
    });
  
    boutonArret.addEventListener('click', () => {
      if (YBougeTu) {
        arreterDeBouger();
      }
    });
  
    BoutonReset.addEventListener('click', () => {
      listeDesForme.forEach(forme => {
        espaceOuLesFormesSont.removeChild(forme);
      });
      listeDesForme = [];
      arreterDeBouger();
    });
  });
  