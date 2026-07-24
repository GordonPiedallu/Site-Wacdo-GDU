const panierStockage = JSON.parse(localStorage.getItem('panier'));
const numeroCommande = localStorage.getItem('numeroCommande');


const btnChevalet = document.getElementById('btn-chevalet');
                btnChevalet.addEventListener('click', () => {
                const chiffre1 = document.getElementById('chiffre1').value;
                const chiffre2 = document.getElementById('chiffre2').value;
                const chiffre3 = document.getElementById('chiffre3').value;
    
                    if (chiffre1 === '' || chiffre2 === '' || chiffre3 === '') {
                        alert('Veuillez remplir tous les chiffres !');
                    return;
                    }
    
    
                numeroChevalet = chiffre1 + chiffre2 + chiffre3;
                const commande = {
                numeroCommande: numeroCommande,
                numeroChevalet: numeroChevalet,
                date: new Date().toISOString(),
                produits: panier,
                total: panier.reduce((acc, article) => acc + article.prix * article.quantite, 0).toFixed(2)
                };

                fetch('https://exemple-api/commande', {
                method: 'POST',
                headers: {
                 'Content-Type': 'application/json'
                },
                body: JSON.stringify(commande)
                })
                    .then(() => {
                    panier = [];
                    window.location.href = 'fin-commande.html';
                })
                .catch(() => {
                alert('Erreur lors de l\'envoi de la commande');        
                });
                })
