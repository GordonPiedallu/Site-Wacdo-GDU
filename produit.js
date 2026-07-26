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

function rendreAccessible(element, label) {
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    if (label) {
        element.setAttribute('aria-label', label);
    }
    element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            element.click();
        }
    });
}

// --- Accessibilité overlay ---
let elementDeclencheur = null; 

function elementsFocusablesOverlay() {
    const conteneur = document.getElementById('choix-overlay');
    return Array.from(
        conteneur.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(el => el.offsetParent !== null);
}

function ouvrirOverlaySelection() {
    elementDeclencheur = document.activeElement;
    const overlay = document.getElementById('overlay-selection');
    overlay.style.display = 'block';
    const choixOverlay = document.getElementById('choix-overlay');
    choixOverlay.setAttribute('role', 'dialog');
    choixOverlay.setAttribute('aria-modal', 'true');
    setTimeout(() => {
        const elements = elementsFocusablesOverlay();
        if (elements.length > 0) {
            elements[0].focus();
        }
    }, 0);
}

function fermerOverlaySelection() {
    document.getElementById('overlay-selection').style.display = 'none';
    typeMenu = null;
    typeAccompagnement = null;
    typeSauces = null;
    typeBoisson = null;
    tailleBoisson = null;
    document.getElementById('contenu-overlay').innerHTML = '';
    if (elementDeclencheur) {
        elementDeclencheur.focus();
        elementDeclencheur = null;
    }
}

document.getElementById('choix-overlay').addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const elements = elementsFocusablesOverlay();
    if (elements.length === 0) return;
    const premier = elements[0];
    const dernier = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === premier) {
        event.preventDefault();
        dernier.focus();
    } else if (!event.shiftKey && document.activeElement === dernier) {
        event.preventDefault();
        premier.focus();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.getElementById('overlay-selection').style.display === 'block') {
        fermerOverlaySelection();
    }
});

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
function abandonPanier () {
    const boutonAbandon = document.getElementById('button-abandon');
    boutonAbandon.addEventListener('click', ()  => {
    if (confirm("Voulez-vous vraiment abandonner votre commande ?")) {
        panier = [];
        localStorage.clear();
        afficherPanier();
        calculerTotal();
        window.location.href = "index.html";
    }
    })
}
abandonPanier();

function chargerProduits(categories) {
    fetch('produits.json')
        .then(data => data.json())
        .then(data => {
            console.log(data)
            data[categories].forEach(produit => {
                const produitElement = document.createElement('div');
                produitElement.classList.add('produit');
                rendreAccessible(produitElement, `Ajouter ${produit.nom}, ${produit.prix.toFixed(2)} euros`);
                const imgElement = document.createElement('img');
                imgElement.classList.add('imgproduit');
                imgElement.src = produit.image;
                imgElement.alt = produit.nom;
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
                        ouvrirOverlaySelection();
                        menuEnCours = produit;
                        choixMenu();
                    }
                    
                    else if (categories === 'Boissons') {
                        ouvrirOverlaySelection();
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
        boutonSupprimer.alt = `Supprimer ${article.nom} du panier`;
        rendreAccessible(boutonSupprimer, `Supprimer ${article.nom} du panier`);
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

                const btnFermer = document.getElementById('imgfermer');
                btnFermer.addEventListener('click', () => {
                    fermerOverlaySelection();
                });
                btnFermer.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        btnFermer.click();
                    }
                });

            function choixMenu () {
                btnRetour.style.display = '';
                const overlay = document.getElementById('contenu-overlay');
                overlay.innerHTML = '';
                const titreModal = document.createElement('h2');
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
                imgElement1.alt = '';
                spanElement1.textContent = 'Best Of';
                element1.appendChild(imgElement1);
                element1.appendChild(spanElement1);
                conteneurChoix.appendChild(element1);
                rendreAccessible(element1, 'Best Of');
                const element2 = document.createElement('div');
                element2.classList.add('choix-menu');
                const imgElement2 = document.createElement('img');
                const spanElement2 = document.createElement('span');
                imgElement2.src = 'images/illustration-maxi-best-of.png';
                imgElement2.alt = '';
                spanElement2.textContent = 'Maxi Best Of';
                element2.appendChild(imgElement2);
                element2.appendChild(spanElement2);
                conteneurChoix.appendChild(element2);
                rendreAccessible(element2, 'Maxi Best Of');
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
                const titreModal = document.createElement('h2');
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
                imgElement1.alt = '';
                spanElement1.textContent = 'Frites';
                element1.appendChild(imgElement1);
                element1.appendChild(spanElement1);
                conteneurChoix.appendChild(element1);
                rendreAccessible(element1, 'Frites');
                const element2 = document.createElement('div');
                element2.classList.add('choix-menu');
                const imgElement2 = document.createElement('img');
                const spanElement2 = document.createElement('span');
                imgElement2.src = 'frites/GRANDE_POTATOES.png';
                imgElement2.alt = '';
                spanElement2.textContent = 'Potatoes';
                element2.appendChild(imgElement2);
                element2.appendChild(spanElement2);
                conteneurChoix.appendChild(element2);
                rendreAccessible(element2, 'Potatoes');
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
                const titreModal = document.createElement('h2');
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
                            imgElementSauces.alt = '';
                            spanElementSauces.textContent = sauces.nom;
                            elementSauces.appendChild(imgElementSauces);
                            elementSauces.appendChild(spanElementSauces);
                            conteneurChoix.appendChild(elementSauces);
                            rendreAccessible(elementSauces, sauces.nom);
                           
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
                const titreModal = document.createElement('h2');
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
                            imgElementBoisson.alt = '';
                            spanElementBoisson.textContent = boisson.nom;
                            elementBoisson.appendChild(imgElementBoisson);
                            elementBoisson.appendChild(spanElementBoisson);
                            conteneurChoix.appendChild(elementBoisson);
                            rendreAccessible(elementBoisson, boisson.nom);
                           
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
                                    ajouterAuPanier({
                                    nom: menuEnCours.nom,
                                    formule: typeMenu,
                                    accompagnement: typeAccompagnement,
                                    sauces: typeSauces,
                                    boisson: typeBoisson,
                                    prix: menuEnCours.prix + surcharge,
                                    quantite: 1
                        });
                        fermerOverlaySelection();
        })})}
                            
        function choixTailleBoisson () {
                tailleBoisson = null;
                const overlay = document.getElementById('contenu-overlay');
                overlay.innerHTML = '';
                const titreModal = document.createElement('h2');
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
                imgElement1.src = boissonEnCours.image;
                imgElement1.alt = '';
                spanElement1.textContent = '30Cl';
                element1.appendChild(imgElement1);
                element1.appendChild(spanElement1);
                conteneurChoix.appendChild(element1);
                rendreAccessible(element1, 'Taille 30 centilitres');
                const element2 = document.createElement('div');
                element2.classList.add('choix-menu');
                const imgElement2 = document.createElement('img');
                const spanElement2 = document.createElement('span');
                imgElement2.src = boissonEnCours.image;
                imgElement2.alt = '';
                spanElement2.textContent = '50Cl';
                element2.appendChild(imgElement2);
                element2.appendChild(spanElement2);
                conteneurChoix.appendChild(element2);
                rendreAccessible(element2, 'Taille 50 centilitres');
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
                btnMoins.classList.add('btn-moins-plus');
                btnPlus.classList.add('btn-moins-plus');
                btnMoins.setAttribute('aria-label', 'Diminuer la quantité');
                btnPlus.setAttribute('aria-label', 'Augmenter la quantité');
                
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
                    fermerOverlaySelection();
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

                ajouterAuPanier({
                    nom: boissonEnCours.nom + ' ' + tailleBoisson,
                    taille: tailleBoisson,
                    prix: tailleBoisson === '50Cl'
                    ? boissonEnCours.prix + 0.50
                    : boissonEnCours.prix,
                    quantite: quantiteBoisson
                });
                fermerOverlaySelection();
        });
    }
        const boutonPayer = document.getElementById('button-payer');
        boutonPayer.addEventListener('click', () => {

        const total = panier.reduce((acc, article) => acc + article.prix * article.quantite, 0).toFixed(2);

        const recapCommande = {
            numeroCommande: numeroCommande,
            numeroChevalet: null,
            date: new Date().toISOString(),
            produits: panier,
            total: total
        };

        localStorage.setItem('panier', JSON.stringify(panier));
        localStorage.setItem('numeroCommande', numeroCommande);
        localStorage.setItem('recapCommande', JSON.stringify(recapCommande));

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