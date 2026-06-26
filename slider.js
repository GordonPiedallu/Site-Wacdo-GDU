fetch('categories.json',)
.then(data => data.json())
.then (data =>  {
    data.forEach(categorie => {
        const categorieElement = document.createElement('div');
            categorieElement.classList.add('produit-slider');
        const imgElement = document.createElement('img');
            imgElement.classList.add('image-slider');
            imgElement.src = categorie.image;
            categorieElement.appendChild(imgElement);
            
        const typeElement = document.createElement('span');
            typeElement.classList.add('text-slider');
            typeElement.textContent = categorie.title;
            categorieElement.appendChild(typeElement);
        const sliderContainer = document.getElementById('slider');
            sliderContainer.appendChild(categorieElement);

        categorieElement.addEventListener('click', () => {
            const produitsContainer = document.getElementById('zone-produit');
            produitsContainer.innerHTML = '';
            chargerProduits(categorie.title);
        });
    })});

    
