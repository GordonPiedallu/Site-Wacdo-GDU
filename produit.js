const produitsContainer = document.getElementById('zone-produit');
const btnRetour = document.getElementById("btnRetour");
const lieuCommande = localStorage.getItem('lieuCommande');

let panier =[];
let typeMenu = null; 
let typeAccompagnement = null;
let typeSauces = null;
let typeBoisson = null;
let menuEnCours = null;
let tailleBoisson = null;
let boissonEnCours = null;
let typeCommande = null;
let numeroChevalet = null;
let numeroCommande = null;

function ajouterAuPanier(nouvelArticle) {

    const articleExistant = panier.find(article =>
        article.nom === nouvelArticle.nom &&
        article.formule === nouvelArticle.formule &&
        article.accompagnement === nouvelArticle.accompagnement &&
        article.sauces === nouvelArticle.sauces &&
        article.boisson === nouvelArticle.boisson &&
        article.taille === nouvelArticle.taille
    );

    if (articleExistant) {

        articleExistant.quantite += nouvelArticle.quantite;

    } else {

        panier.push({
            ...nouvelArticle,
            quantite: nouvelArticle.quantite || 1
        });

    }

    afficherPanier();
    calculerTotal();
}

function chargerProduits(categories) {
    fetch('produits.json')
        .then(data => data.json())
        .then(data => {
            console.log(data)
            data[categories].forEach(produit => {
                const produitElement = document.createElement('div');
                produitElement.classList.add('produit');;                
                const imgElement = document.createElement('img');
                imgElement.classList.add('imgproduit');
                imgElement.src = produit.image;
                produitElement.appendChild(imgElement);
                const nomElement = document.createElement('p');
                nomElement.classList.add('text-produit');
                nomElement.textContent = produit.nom;
                produitElement.appendChild(nomElement);
                produitsContainer.appendChild(produitElement);
                const prixElement = document.createElement('p');
                prixElement.classList.add('prix-produit');
                prixElement.textContent = produit.prix.toFixed(2) + '€';
                produitElement.appendChild(prixElement);
                produitElement.addEventListener('click', () => {

                    if (categories === 'Menus') {
                        const overlay = document.getElementById('overlay-selection');
                        overlay.style.display = 'block';
                        menuEnCours = produit;
                        choixMenu();
                    }
                    
                    else if (categories === 'Boissons') {
                        const overlay = document.getElementById('overlay-selection');
                        overlay.style.display = 'block';
                        boissonEnCours = produit;
                        choixTailleBoisson();
                    }
                    else {
                    ajouterAuPanier({
                        nom: produit.nom,
                        prix: produit.prix,
                        type: categories,
                        quantite: 1
                    });
                }
afficherPanier()
calculerTotal()                    
                });
            })})};
            
            

chargerProduits('Menus');
creationNumeroCommande();
console.log(panier);

            function afficherPanier() {
    const listePanier = document.querySelector('#liste-articles');
    listePanier.innerHTML = '';
    panier.forEach((article, index) => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('ligne-panier');

        
        const ligneHaute = document.createElement('div');
        ligneHaute.classList.add('ligne-haute');

        const nomElement = document.createElement('p');
        nomElement.textContent = `${article.quantite} × ${article.nom}`;

        const prixArticle = document.createElement('p');
        prixArticle.textContent = (article.prix * article.quantite).toFixed(2) + '€';

        const boutonSupprimer = document.createElement('img');
        boutonSupprimer.src = 'images/trash.png';
        boutonSupprimer.addEventListener('click', () => {
            panier.splice(index, 1);
            afficherPanier();
            calculerTotal();
        });

        ligneHaute.appendChild(nomElement);
        ligneHaute.appendChild(prixArticle);
        ligneHaute.appendChild(boutonSupprimer);


        const formuleElement = document.createElement('p');
        formuleElement.textContent = article.formule;

        const accompagnementElement = document.createElement('p');
        accompagnementElement.textContent = article.accompagnement;

        const boissonElement = document.createElement('p');
        boissonElement.textContent = article.boisson;

        const saucesElement = document.createElement('p');
        saucesElement.textContent = article.sauces;
        

        articleElement.appendChild(ligneHaute);
        articleElement.appendChild(formuleElement);
        articleElement.appendChild(accompagnementElement);
        articleElement.appendChild(saucesElement);
        articleElement.appendChild(boissonElement);
        formuleElement.classList.add('detail-panier');
        accompagnementElement.classList.add('detail-panier');
        saucesElement.classList.add('detail-panier');
        boissonElement.classList.add('detail-panier');

        listePanier.appendChild(articleElement);
    });
}

                function calculerTotal () {
                    let total = 0;
                    panier.forEach (article => {
                    total += article.prix * article.quantite;
                    });
                    const prixTotal = document.getElementById('total-prix');
                    prixTotal.textContent = total.toFixed(2) +'€';
                    }
                // fermer l'overlay
                const overlay = document.getElementById('overlay-selection');
                const fermerOverlay = document.getElementById('imgfermer');
                const annulerOverlay = document.getElementById('btn-annuler');
                const btnFermer = document.getElementById('imgfermer');
                btnFermer.addEventListener('click', () => {
                    overlay.style.display = 'none';
                    typeMenu = null;
                    typeAccompagnement = null;
                    document.getElementById('contenu-overlay').innerHTML = '';
                });

            function choixMenu () {
                const overlay = document.getElementById('contenu-overlay');
                overlay.innerHTML = '';
                const titreModal = document.createElement('h1');
                titreModal.id = 'overlay-title';
                const sousTitreModal = document.createElement('p');
                sousTitreModal.id = 'overlay-text';
                const conteneurChoix = document.createElement('div');
                titreModal.textContent = 'Une grosse faim ? ';
                sousTitreModal.textContent = 'Le menu Maxi Best Of comprend un sandwich, une grande frite et une boisson 50 CL';
                overlay.appendChild(titreModal);
                overlay.appendChild(sousTitreModal);
                conteneurChoix.id = 'icone-choix';
                const element1 = document.createElement('div');
                element1.classList.add('choix-menu');
                const imgElement1 = document.createElement('img');
                const spanElement1 = document.createElement('span');
                imgElement1.src = 'images/illustration-best-of.png';
                spanElement1.textContent = 'Best Of';
                element1.appendChild(imgElement1);
                element1.appendChild(spanElement1);
                conteneurChoix.appendChild(element1);
                const element2 = document.createElement('div');
                element2.classList.add('choix-menu');
                const imgElement2 = document.createElement('img');
                const spanElement2 = document.createElement('span');
                imgElement2.src = 'images/illustration-maxi-best-of.png';
                spanElement2.textContent = 'Maxi Best Of';
                element2.appendChild(imgElement2);
                element2.appendChild(spanElement2);
                conteneurChoix.appendChild(element2);
                overlay.appendChild(conteneurChoix);
                const btnEtapeSuivante = document.createElement('button');
                btnEtapeSuivante.id = 'btn-etape-suivante';
                btnEtapeSuivante.textContent = 'Etape suivante';
                conteneurChoix.appendChild(btnEtapeSuivante);
                element1.addEventListener('click', () => {
                    typeMenu = 'Best Of';
                    element1.classList.add('selection-menu');
                    element2.classList.remove('selection-menu');
                   
                });
                element2.addEventListener('click', () => {
                    typeMenu = 'Maxi Best Of';
                    element2.classList.add('selection-menu');
                    element1.classList.remove('selection-menu');
                   
                });
                btnEtapeSuivante.addEventListener('click', () => {
                    if (typeMenu === 'Best Of' || typeMenu === 'Maxi Best Of') {
                        choixAccompagnement();
                    }});
                }



            function choixAccompagnement() {
                const overlay = document.getElementById('contenu-overlay');
                overlay.innerHTML = '';
                const titreModal = document.createElement('h1');
                titreModal.id = 'overlay-title';
                const sousTitreModal = document.createElement('p');
                sousTitreModal.id = 'overlay-text';
                const conteneurChoix = document.createElement('div');
                titreModal.textContent = 'Choisissez votre accompagnement';
                sousTitreModal.textContent = 'Frites, Potatoes, la pomme de terre dans tous ses états';
                overlay.appendChild(titreModal);
                overlay.appendChild(sousTitreModal);
                conteneurChoix.id = 'icone-choix';
                const element1 = document.createElement('div');
                element1.classList.add('choix-menu');
                const imgElement1 = document.createElement('img');
                const spanElement1 = document.createElement('span');
                imgElement1.src = 'frites/GRANDE_FRITE.png';
                spanElement1.textContent = 'Frites';
                element1.appendChild(imgElement1);
                element1.appendChild(spanElement1);
                conteneurChoix.appendChild(element1);
                const element2 = document.createElement('div');
                element2.classList.add('choix-menu');
                const imgElement2 = document.createElement('img');
                const spanElement2 = document.createElement('span');
                imgElement2.src = 'frites/GRANDE_POTATOES.png';
                spanElement2.textContent = 'Potatoes';
                element2.appendChild(imgElement2);
                element2.appendChild(spanElement2);
                conteneurChoix.appendChild(element2);
                overlay.appendChild(conteneurChoix);
                const btnEtapeSuivante = document.createElement('button');
                btnEtapeSuivante.id = 'btn-etape-suivante';
                btnEtapeSuivante.textContent = 'Etape suivante';
                conteneurChoix.appendChild(btnEtapeSuivante);
                element1.addEventListener('click', () => {
                    typeAccompagnement = 'Frites';
                    element1.classList.add('selection-menu');
                    element2.classList.remove('selection-menu');
                    
                });
                element2.addEventListener('click', () => {
                    typeAccompagnement = 'Potatoes';
                    element2.classList.add('selection-menu');
                    element1.classList.remove('selection-menu');
                   
                });
                btnEtapeSuivante.addEventListener('click', () => {
                    if (typeAccompagnement === 'Frites' || typeAccompagnement === 'Potatoes') {
                        choixSauce();
                    }
                });
                btnRetour.onclick = () => {
                    choixMenu()
            }
              
            }

function choixSauce () {
                const overlay = document.getElementById('contenu-overlay');
                overlay.innerHTML = '';
                const titreModal = document.createElement('h1');
                titreModal.id = 'overlay-title';
                const sousTitreModal = document.createElement('p');
                sousTitreModal.id = 'overlay-text';
                const conteneurChoix = document.createElement('div');
                titreModal.textContent = 'Choissisez la sauce qui vous accompagnera';
                sousTitreModal.textContent = 'Notre selection de sauce pour vous !';
                overlay.appendChild(titreModal);
                overlay.appendChild(sousTitreModal);
                
                fetch('produits.json')
                    .then (data => data.json())
                    .then (data => {
                        data['Sauces'].forEach(sauces => {
                            conteneurChoix.querySelectorAll('.choix-menu').forEach(el => el.classList.remove('selection-menu'))
                            const elementSauces = document.createElement('div');
                            elementSauces.classList.add('choix-menu');
                            const imgElementSauces = document.createElement('img');
                            const spanElementSauces = document.createElement('span');
                            imgElementSauces.src = sauces.image;
                            spanElementSauces.textContent = sauces.nom;
                            elementSauces.appendChild(imgElementSauces);
                            elementSauces.appendChild(spanElementSauces);
                            conteneurChoix.appendChild(elementSauces);
                           
                            elementSauces.addEventListener('click', () => {
                                typeSauces = sauces.nom;
                                conteneurChoix.querySelectorAll('.choix-menu').forEach(el => el.classList.remove('selection-menu'))
                                elementSauces.classList.add('selection-menu');
                            })
                        })
                        conteneurChoix.id='icone-choix-sauces';
                        overlay.appendChild(conteneurChoix);
                        const btnEtapeSuivante = document.createElement('button');
                        btnEtapeSuivante.id = 'btn-etape-suivante';
                        btnEtapeSuivante.textContent = 'Etape suivante';
                        overlay.appendChild(btnEtapeSuivante);
                        btnEtapeSuivante.addEventListener('click', () => {
                            if (typeSauces !== null) {
                        choixBoisson();
                    }});
                    
                btnRetour.onclick = () => {
                    console.log("Retour depuis Sauce");
                    choixAccompagnement()
}})
              
            }


        function choixBoisson() {
                const overlay = document.getElementById('contenu-overlay');
                overlay.innerHTML = '';
                const titreModal = document.createElement('h1');
                titreModal.id = 'overlay-title';
                const sousTitreModal = document.createElement('p');
                sousTitreModal.id = 'overlay-text';
                const conteneurChoix = document.createElement('div');
                titreModal.textContent = 'Choisissez votre boisson';
                sousTitreModal.textContent = "Un soda , un jus de fruit ou un verre d’eau pour accompagner votre repas";
                overlay.appendChild(titreModal);
                overlay.appendChild(sousTitreModal);
                
                fetch('produits.json')
                    .then (data => data.json())
                    .then (data => {
                        data['Boissons'].forEach(boisson => {
                            conteneurChoix.querySelectorAll('.choix-menu').forEach(el => el.classList.remove('selection-menu'))
                            const elementBoisson = document.createElement('div');
                            elementBoisson.classList.add('choix-menu');
                            const imgElementBoisson = document.createElement('img');
                            const spanElementBoisson = document.createElement('span');
                            imgElementBoisson.src = boisson.image;
                            spanElementBoisson.textContent = boisson.nom;
                            elementBoisson.appendChild(imgElementBoisson);
                            elementBoisson.appendChild(spanElementBoisson);
                            conteneurChoix.appendChild(elementBoisson);
                           
                            elementBoisson.addEventListener('click', () => {
                                typeBoisson = boisson.nom;
                                conteneurChoix.querySelectorAll('.choix-menu').forEach(el => el.classList.remove('selection-menu'))
                                elementBoisson.classList.add('selection-menu');
                            })
                        })
                        conteneurChoix.id='icone-choix-boisson';
                        overlay.appendChild(conteneurChoix);
                        const btnEtapeSuivante = document.createElement('button');
                        btnEtapeSuivante.id = 'btn-etape-suivante';
                        btnEtapeSuivante.textContent = 'Etape suivante';
                        overlay.appendChild(btnEtapeSuivante);
                        btnRetour.onclick = () => {
                        choixSauce()
                        } 
        
                        btnEtapeSuivante.addEventListener('click', () => {
                                    const surcharge = typeMenu === 'Maxi Best Of' ? 2.00 : 0;
                                    document.getElementById('overlay-selection').style.display = 'none';
                                    ajouterAuPanier({
                                    nom: menuEnCours.nom,
                                    formule: typeMenu,
                                    accompagnement: typeAccompagnement,
                                    sauces: typeSauces,
                                    boisson: typeBoisson,
                                    prix: menuEnCours.prix + surcharge,
                                    quantite: 1
                        });
        })})}
                            
        function choixTailleBoisson () {
                const overlay = document.getElementById('contenu-overlay');
                overlay.innerHTML = '';
                const titreModal = document.createElement('h1');
                titreModal.id = 'overlay-title';
                const sousTitreModal = document.createElement('p');
                sousTitreModal.id = 'overlay-text';
                const conteneurChoix = document.createElement('div');
                titreModal.textContent = 'Une petite soif ?';
                sousTitreModal.textContent = 'Choisissez la taille de votre boisson,  +0.50€ pour le format 50 Cl';
                overlay.appendChild(titreModal);
                overlay.appendChild(sousTitreModal);
                conteneurChoix.id = 'icone-choix';
                const element1 = document.createElement('div');
                element1.classList.add('choix-menu');
                const imgElement1 = document.createElement('img');
                const spanElement1 = document.createElement('span');
                imgElement1.src = 'boissons/coca-cola.png';
                spanElement1.textContent = '30Cl';
                element1.appendChild(imgElement1);
                element1.appendChild(spanElement1);
                conteneurChoix.appendChild(element1);
                const element2 = document.createElement('div');
                element2.classList.add('choix-menu');
                const imgElement2 = document.createElement('img');
                const spanElement2 = document.createElement('span');
                imgElement2.src = 'boissons/coca-cola.png';
                spanElement2.textContent = '50Cl';
                element2.appendChild(imgElement2);
                element2.appendChild(spanElement2);
                conteneurChoix.appendChild(element2);
                overlay.appendChild(conteneurChoix);
                const btnEtapeSuivante = document.createElement('button');
                btnEtapeSuivante.id = 'btn-etape-suivante';
                btnEtapeSuivante.textContent = 'Etape suivante';
                conteneurChoix.appendChild(btnEtapeSuivante);
                btnRetour.style.display = 'none';
                btnEtapeSuivante.style.display = 'none';
                element1.addEventListener('click', () => {
                    tailleBoisson = '30Cl';
                    element1.classList.add('selection-menu');
                    element2.classList.remove('selection-menu');
                   
                });
                element2.addEventListener('click', () => {
                    tailleBoisson = '50Cl';
                    element2.classList.add('selection-menu');
                    element1.classList.remove('selection-menu');
                   
                });
                let quantiteBoisson = 1;
                const compteurNombreBoisson = document.createElement('div');
                const btnMoins = document.createElement('button');
                btnMoins.id = 'bouton-moins'
                btnMoins.textContent = '-';
                const btnPlus = document.createElement('button');
                btnPlus.id = 'bouton-plus';
                btnPlus.textContent = '+';
                const nombreQtt = document.createElement('span');
                nombreQtt.textContent = quantiteBoisson;
                overlay.appendChild(compteurNombreBoisson);
                compteurNombreBoisson.appendChild(btnMoins);
                compteurNombreBoisson.appendChild(nombreQtt);
                compteurNombreBoisson.appendChild(btnPlus);
                compteurNombreBoisson.id = 'compteur';
                btnMoins.id ='btn-moins-plus';
                btnPlus.id ='btn-moins-plus';
                
                btnMoins.addEventListener ('click', () =>{
                    if (quantiteBoisson > 1) {
                        quantiteBoisson--;
                        nombreQtt.textContent = quantiteBoisson;
                    }
                    });

                btnPlus.addEventListener('click', () => {
                    quantiteBoisson++;
                    nombreQtt.textContent = quantiteBoisson;
                });
                const btnOverlayBoisson = document.createElement('div');
                btnOverlayBoisson.id = 'bouton-boisson';
                const btnAnnuler = document.createElement('button');
                btnAnnuler.id = 'btn-annuler';
                btnAnnuler.textContent = 'Annuler';
                btnOverlayBoisson.appendChild(btnAnnuler);
                btnAnnuler.addEventListener('click', () => {
                    document.getElementById('overlay-selection').style.display = 'none';
                    document.getElementById('contenu-overlay').innerHTML = '';
                });

                const btnAddCart = document.createElement('button');
                btnAddCart.id = 'btn-ajout-panier';
                btnAddCart.textContent = 'Ajouter a ma commande';
                btnOverlayBoisson.appendChild(btnAddCart);
                overlay.appendChild(btnOverlayBoisson);
                btnAddCart.addEventListener('click', () => {

                    if (tailleBoisson === null) {
                    alert("Veuillez sélectionner une taille.");
                    return;
                 }

                document.getElementById('overlay-selection').style.display = 'none';
                document.getElementById('contenu-overlay').innerHTML = '';

                ajouterAuPanier({
                    nom: boissonEnCours.nom + ' ' + tailleBoisson,
                    taille: tailleBoisson,
                    prix: tailleBoisson === '50Cl'
                    ? boissonEnCours.prix + 0.50
                    : boissonEnCours.prix,
                    quantite: quantiteBoisson
                });

        });
    }
        const boutonPayer = document.getElementById('button-payer');
            boutonPayer.addEventListener('click', () => {
            localStorage.setItem('panier', JSON.stringify(panier));
            localStorage.setItem('numeroCommande', numeroCommande);
    
            if (lieuCommande === 'sur-place') {
            window.location.href = 'numero-chevalet.html';
            } else {
            window.location.href = 'fin-commande.html';
            }
            });

        function creationNumeroCommande () {
            const numOrder = document.getElementById('numéro-commande');
            numeroCommande = Math.floor(Math.random() * 9000) + 1000;
            numOrder.textContent = numeroCommande;
           
    }
            
    




       
                            
                
              
        