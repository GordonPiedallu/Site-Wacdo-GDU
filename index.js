localStorage.removeItem('panier');
localStorage.removeItem('numeroCommande');
localStorage.removeItem('lieuCommande');



document.querySelectorAll('.choix-lieu').forEach(lien => {
    lien.addEventListener('click', (e) => {
        e.preventDefault();
        const type = lien.href.includes('sur-place') ? 'sur-place' : 'emporter';
        localStorage.setItem('lieuCommande', type);
        window.location.href = 'main-menu.html';
    });
});