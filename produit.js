const produitsContainer = document.getElementById('zone-produit');
let panier =[]


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
                    }
                    else {
                    panier.push ({
                        nom : produit.nom,
                        prix : produit.prix,
                        type : categories
                    })};
afficherPanier()
calculerTotal()                    
                })
            })})};

chargerProduits('Menus');

            function  afficherPanier () {
                    const listePanier = document.querySelector('#liste-articles');
                    listePanier.innerHTML = '';
                    panier.forEach ((article, index)  => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('ligne-panier');
                    const textElement = document.createElement('span');
                    textElement.textContent = article.nom + ' - ' + article.prix.toFixed(2) + '€';
                    const boutonSupprimer = document.createElement('img');
                    boutonSupprimer.src = 'images/trash.png'
                    boutonSupprimer.addEventListener('click', () => {
                        panier.splice(index, 1);
                        afficherPanier();
                        calculerTotal(); 
                    })
                    articleElement.appendChild(textElement);
                    articleElement.appendChild(boutonSupprimer);
                    listePanier.appendChild(articleElement);
             })};

                function calculerTotal () {
                    let total = 0;
                    panier.forEach (article => {
                    total += article.prix;
                    });
                    const prixTotal = document.getElementById('total-prix');
                    prixTotal.textContent = total.toFixed(2) +'€';
                    }
                // function pour fermer l'overlay
                const overlay = document.getElementById('overlay-selection');
                const fermerOverlay = document.getElementById('imgfermer');
                const annulerOverlay = document.getElementById('btn-annuler');
                fermerOverlay.addEventListener('click', () => {
                    overlay.style.display = 'none';
                });
                annulerOverlay.addEventListener ('click' , () => {
                    overlay.style.display = 'none';
                })

                