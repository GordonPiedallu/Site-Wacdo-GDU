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
                produits: panierStockage,
                total: panierStockage.reduce((acc, article) => acc + article.prix * article.quantite, 0).toFixed(2)
                };

                fetch('https://exemple-api/commande', {
                method: 'POST',
                headers: {
                 'Content-Type': 'application/json'
                },
                body: JSON.stringify(commande)
                })
                    .then(() => {
                    localStorage.removeItem("panier");
                    window.location.href = 'fin-commande.html';
                })
               .catch((error) => {
                    console.error(error);
                    const recapCommande = {
                        numeroCommande: numeroCommande,
                        numeroChevalet: numeroChevalet,
                        date: new Date().toISOString(),
                        produits: panierStockage,
                        total: panierStockage.reduce(
                            (acc, article) => acc + article.prix * article.quantite,0).toFixed(2)
                            };
                        console.log("Récapitulatif créé :", recapCommande);

                            localStorage.setItem(
                                "recapCommande",
                            JSON.stringify(recapCommande)
                        );

                        console.log(
                        "Stockage local :",
                        localStorage.getItem("recapCommande")
                        );
                            //localStorage.setItem("recapCommande",JSON.stringify(recapCommande)

                    localStorage.removeItem("panier");
                    alert("Votre commande a bien été prise en compte !");
                    window.location.href = "fin-commande.html";
                });
                });
            

            const inputs = document.querySelectorAll('.chiffre');

                inputs.forEach((input, index) => {
                input.addEventListener('input', () => {
                input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);

                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });
                input.addEventListener('keydown', (event) => {
                    if (event.key === "Backspace" && input.value === "" && index > 0) {
                    inputs[index - 1].focus();
                }
            });
});