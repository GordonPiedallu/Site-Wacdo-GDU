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
                    panier.push ({
                        nom : produit.nom,
                        prix : produit.prix,
                        type : categories
                    });
afficherPanier()
calculerTotal()                    
                })
            })})};

chargerProduits('Menus');

                function afficherPanier () {
                    const listePanier = document.querySelector('#liste-articles');
                    listePanier.innerHTML = '';
                    panier.forEach (article => {
                    const articleElement = document.createElement('div');
                    articleElement.textContent = article.nom + ' - ' + article.prix.toFixed(2) + '€';
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
                  
                
    