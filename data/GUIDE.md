# Guide Base de Donnees HairScan

## Structure des dossiers

```
data/
├── GUIDE.md              ← Ce fichier
├── products/
│   ├── economique.json   ← Produits moins de 15€
│   ├── moyen.json        ← Produits 15€ - 30€
│   └── premium.json      ← Produits 30€+
├── routines/
│   ├── lisses.json       ← Routine cheveux lisses
│   ├── ondules.json      ← Routine cheveux ondules
│   ├── boucles.json      ← Routine cheveux boucles
│   ├── crepus.json       ← Routine cheveux crepus
│   └── semi-lisses.json  ← Routine cheveux semi-lisses
└── tips/
    ├── lisses.json       ← Astuces expert lisses
    ├── ondules.json      ← Astuces expert ondules
    ├── boucles.json      ← Astuces expert boucles
    ├── crepus.json       ← Astuces expert crepus
    └── semi-lisses.json  ← Astuces expert semi-lisses
```

---

## 1. PRODUITS (products/)

Chaque fichier contient une liste de produits pour une gamme de prix.

### Comment ajouter un produit

Copie ce modele et remplis les champs :

```json
{
  "id": "eco-008",
  "nom": "Nom du produit",
  "marque": "Nom de la marque",
  "categorie": "shampooing",
  "prix": 12.99,
  "devise": "EUR",
  "typesCheveux": ["boucles", "crepus"],
  "porosite": ["moyenne", "haute"],
  "problemes": ["secs"],
  "objectifs": ["definition", "brillance"],
  "ingredientsCles": ["ingredient 1", "ingredient 2"],
  "sans": ["sulfates", "parabenes"],
  "vegan": true,
  "bio": false,
  "noteUtilisateurs": 4.5,
  "nombreAvis": 500,
  "imageUrl": "",
  "descriptionCourte": "Description en 1 ligne",
  "lienAmazon": "https://www.amazon.fr/dp/XXXXXXXXXX?tag=yugohair-21",
  "active": true
}
```

### Valeurs possibles

- **categorie** : `shampooing`, `apres-shampooing`, `leave-in`, `gel`, `mousse`, `huile`, `masque`, `serum`
- **typesCheveux** : `lisses`, `ondules`, `boucles`, `crepus`, `semi-lisses`
- **porosite** : `faible`, `moyenne`, `haute`
- **problemes** : `secs`, `gras`, `pellicules`, `chute`, `volume`
- **objectifs** : `fortifier`, `brillance`, `definition`, `croissance`, `entretien`
- **id** : doit etre unique. Convention : `eco-XXX`, `moy-XXX`, `pre-XXX`
- **active** : `true` pour afficher, `false` pour masquer sans supprimer

### Comment le matching fonctionne

1. L'app filtre d'abord par **budget** de l'utilisateur :
   - "Moins de 20€" → pioche dans `economique.json`
   - "20€ - 50€" → pioche dans `economique.json` + `moyen.json`
   - "50€ - 100€" → pioche dans `moyen.json` + `premium.json`
   - "Plus de 100€" → pioche dans `premium.json`
   - "Pas de budget fixe" → pioche dans tout

2. Puis elle note chaque produit selon :
   - Est-ce qu'il correspond au **type de cheveux** ? (+30 pts)
   - Est-ce qu'il correspond a la **porosite** ? (+20 pts)
   - Est-ce qu'il correspond aux **problemes** ? (+25 pts)
   - Est-ce qu'il correspond a l'**objectif** ? (+15 pts)

3. Elle prend le meilleur produit par categorie :
   - 1 shampooing
   - 1 hydratation (leave-in, apres-shampooing, huile, serum)
   - 1 styling (gel, mousse, masque)

---

## 2. ROUTINES (routines/)

Chaque fichier = 1 type de cheveux avec sa routine de base + des variantes par probleme.

### Structure

```json
{
  "type": "boucles",
  "frequenceLavage": "2-3x par semaine",
  "conseils": ["conseil 1", "conseil 2", "conseil 3"],
  "gestes": ["geste 1", "geste 2", "geste 3"],
  "astuces": ["astuce generale 1"],
  "variantes": {
    "secs": {
      "conseilsSupp": ["conseil supplementaire pour boucles + secs"],
      "astucesSupp": ["astuce supplementaire pour boucles + secs"]
    },
    "gras": { ... },
    "pellicules": { ... },
    "chute": { ... },
    "volume": { ... }
  }
}
```

### Ce qui s'affiche a l'utilisateur

- Les **conseils** de base + les **conseilsSupp** de chaque probleme selectionne
- Les **gestes** de base (toujours affiches)
- Les **astuces** de base + les **astucesSupp** de chaque probleme selectionne

Exemple : si l'utilisateur a des cheveux boucles avec problemes "secs" + "pellicules",
il verra les conseils de base + les conseilsSupp de "secs" + les conseilsSupp de "pellicules".

---

## 3. ASTUCES EXPERT (tips/)

Des astuces tres specifiques par combinaison type + probleme + objectif.
Ces astuces sont affichees en bonus sur la page resultats.

### Structure

```json
[
  {
    "problemes": ["secs"],
    "objectifs": ["definition"],
    "astuce": "Ton astuce d'expert ici"
  }
]
```

### Comment ca matche

L'app cherche les astuces dont au moins 1 probleme ET 1 objectif correspondent
a ce que l'utilisateur a selectionne. Tu peux ajouter autant d'astuces que tu veux.

---

## Conseils pour remplir

1. **Remplace tous les "AJOUTE ICI"** par tes vrais conseils
2. **Ajoute autant de produits que tu veux** dans chaque fichier de prix
3. **Ajoute autant d'astuces que tu veux** dans les fichiers tips
4. **N'oublie pas la virgule** entre chaque element dans les listes JSON
5. Pour verifier que ton JSON est valide : copie-colle dans https://jsonlint.com
