const produitsContainer = document.getElementById('zone-produit');

fetch('produits.json', {
    headers: {
        'Authorization': 'Bearer '
    }
})
.then(data => data.json())
.then (data =>  {
    console.log(data.desserts);
            
    data.desserts.forEach(produit => {
        const produitElement = document.createElement('div');
            produitElement.classList.add('produit');
        const imgElement = document.createElement('img');
            imgElement.classList.add('imgproduit');
            imgElement.src = produit.image;
            produitElement.appendChild(imgElement);

        const typeElement = document.createElement('p');
            typeElement.classList.add('type-produit');
            typeElement.textContent = produit.nom;
            produitElement.appendChild(typeElement);

        const prixElement = document.createElement('p');
            prixElement.classList.add('prix-produit');
            prixElement.textContent = `${produit.prix.toFixed(2)}€`;
            produitElement.appendChild(prixElement);

            produitsContainer.appendChild(produitElement);
    })});