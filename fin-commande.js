document.getElementById('btn-neworder').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});
const panier = JSON.parse(localStorage.getItem('panier'));
const numeroCommande = localStorage.getItem('numeroCommande');

const recapCommande = JSON.parse(
    localStorage.getItem("recapCommande")
);

const recap = document.getElementById("recap");

if (recapCommande) {

    document.getElementById("message-confirmation").textContent =
        "Votre commande a bien été prise en compte !";

    recap.innerHTML = `
        <p>Numéro de commande : ${recapCommande.numeroCommande}</p>
        <p>Chevalet : ${recapCommande.numeroChevalet}</p>
        <p>Date : ${recapCommande.date}</p>
        <h3>Produits :</h3>
        <ul>
            ${recapCommande.produits.map(article => `
                <li>
                    ${article.nom} x ${article.quantite}
                    - ${(article.prix * article.quantite).toFixed(2)} €
                </li>
            `).join("")}
        </ul>
        <strong>Total : ${recapCommande.total} €</strong>
    `;
}
document.getElementById("btn-imprim").addEventListener("click", () => {

    const contenu = document.getElementById("recap").innerHTML;

    const fenetre = window.open("", "", "width=800,height=600");

    fenetre.document.write(`
        <html>
        <head>
            <title>Récapitulatif commande</title>
            <style>
                body {
                    font-family: Arial;
                    padding: 20px;
                }
            </style>
        </head>
        <body>
            <h1>Votre commande</h1>
            ${contenu}
        </body>
        </html>
    `);

    fenetre.document.close();
    fenetre.print();
});