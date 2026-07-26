fetch('categories.json',)
.then(data => data.json())
.then (data =>  {
    data.forEach(categorie => {
        const categorieElement = document.createElement('div');
            categorieElement.classList.add('produit-slider');
            categorieElement.setAttribute('role', 'button');
            categorieElement.setAttribute('tabindex', '0');
            categorieElement.setAttribute('aria-label', 'Catégorie ' + categorie.title);
        const imgElement = document.createElement('img');
            imgElement.classList.add('image-slider');
            imgElement.src = categorie.image;
            imgElement.alt = '';
            categorieElement.appendChild(imgElement);
            
        const typeElement = document.createElement('span');
            typeElement.classList.add('text-slider');
            typeElement.textContent = categorie.title;
            categorieElement.appendChild(typeElement);
        const sliderContainer = document.getElementById('slider');
            sliderContainer.appendChild(categorieElement);

        const activerCategorie = () => {
            const produitsContainer = document.getElementById('zone-produit');
            produitsContainer.innerHTML = '';
            chargerProduits(categorie.title);
        };
        categorieElement.addEventListener('click', activerCategorie);
        categorieElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                activerCategorie();
            }
        });
    })});

    
