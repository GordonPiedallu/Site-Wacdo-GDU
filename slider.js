//const arrowLeft = document.GetElmentById('arrow-left');
//const arrowRight = document.getElementById('arrow-right');
//const categories = 

fetch('categories.json', {
    headers: {
        'Authorization': 'Bearer '
    }
})
.then(data => data.json())
.then (data =>  {
    console.log(data);
})
//<a class="produit-slider" href="main-menu.html"><img src="categories/menus.png" class="image-slider" alt="Menu"><span class="text-slider">Menus</span></a>