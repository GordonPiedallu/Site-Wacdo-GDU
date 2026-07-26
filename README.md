# Borne Wacdo

## Description

Borne Wacdo est une application web de type borne de commande interactive, inspirée des bornes libre-service de restauration rapide (style McDonald's).

L'utilisateur peut :
- Choisir son mode de consommation (sur place ou à emporter)
- Parcourir les catégories de produits via un slider dynamique
- Composer sa commande (menus avec accompagnement, sauce et boisson, boissons à l'unité, produits simples)
- Consulter et modifier son panier en temps réel
- Valider sa commande et accéder au récapitulatif final

## Technologies utilisées

- **HTML5** — structure des pages
- **CSS3** — mise en page responsive (Flexbox, Grid, media queries, `clamp()`)
- **JavaScript (ES6+)** — logique applicative, manipulation du DOM, gestion du panier
- **JSON** — stockage des données produits et catégories
- **Fetch API (AJAX)** — chargement asynchrone des fichiers JSON
- **localStorage** — persistance de la commande entre les pages

## Structure du projet

```
Borne-Wacdo/
├── data/
│   ├── categories.json       # Catégories du slider
│   └── produits.json         # Catalogue complet des produits
├── images/                   # Visuels communs (logo, icônes, illustrations)
├── burgers/                  # Images des burgers
├── boissons/                 # Images des boissons
├── desserts/                 # Images des desserts
├── encas/                    # Images des encas
├── frites/                   # Images des frites
├── salades/                  # Images des salades
├── sauces/                   # Images des sauces
├── wraps/                    # Images des wraps
├── index.html                # Page d'accueil (choix sur place / à emporter)
├── main-menu.html            # Page principale de commande
├── numero-chevalet.html      # Saisie du numéro de table (sur place)
├── fin-commande.html         # Récapitulatif final de commande
├── index.js                  # Logique de la page d'accueil
├── produit.js                # Chargement produits, panier, overlays de personnalisation
├── slider.js                 # Chargement et interaction du slider de catégories
├── chevalet.js               # Gestion du numéro de table
├── fin-commande.js           # Affichage du récapitulatif de commande
├── stylev2.css               # Feuille de styles principale
└── README.md
```

## Installation et test en local

1. Cloner ou télécharger le projet
2. Ouvrir le dossier dans VS Code
3. Lancer avec l'extension **Live Server** (clic droit sur `index.html` → *Open with Live Server*)
4. Aucune dépendance ni installation supplémentaire requise

> Les données sont chargées via `fetch` depuis les fichiers JSON locaux (`./data/`). Aucun serveur backend n'est nécessaire.

## Version en ligne

[https://wacdogordon.alwaysdata.net]