document.getElementById('btn-neworder').addEventListener('click', () => {
    localStorage.removeItem('lieuCommande');
    window.location.href = 'index.html';
});
const panier = JSON.parse(localStorage.getItem('panier'));
const numeroCommande = localStorage.getItem('numeroCommande');

const recapfinal = document.querySelector('#liste-articles');
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


document.getElementById('btn-neworder').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});
});