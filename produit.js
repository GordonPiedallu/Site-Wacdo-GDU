const produitsContainer = document.getElementById('zone-produit');

function chargerProduits(categories) {
    fetch('produits.json')
        .then(data => data.json())
        .then(data => {
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
                prixElement.textContent = produit.prix + '€';
                produitElement.appendChild(prixElement);
            })})};

chargerProduits('menus');