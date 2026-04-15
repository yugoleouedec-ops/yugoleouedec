# PRODUCT SPEC — HairScan MVP v1.0

**Date :** Mars 2026  
**Version :** 1.0  
**Statut :** Spécifications initiales  
**Auteur :** Yugo Le Ouedec

---

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Problème & Solution](#problème--solution)
3. [User Stories](#user-stories)
4. [Flow utilisateur](#flow-utilisateur)
5. [Spécifications par écran](#spécifications-par-écran)
6. [Modèles de données](#modèles-de-données)
7. [Architecture technique](#architecture-technique)
8. [Logique de matching produits](#logique-de-matching-produits)
9. [Monétisation](#monétisation)
10. [Métriques de succès](#métriques-de-succès)
11. [Roadmap](#roadmap)

---

## 🎯 Vue d'ensemble

### Concept
**HairScan** est une Progressive Web App (PWA) d'analyse capillaire alimentée par IA, destinée aux hommes francophones. L'application analyse le type de cheveux via photo et génère des routines personnalisées avec recommandations de produits spécifiques achetables.

### Proposition de valeur unique
- **Analyse IA instantanée** : Résultats en 2 minutes via photo
- **Recommandations produits précises** : Pas de conseils génériques, des produits réels avec liens d'achat
- **Base de données curée** : 80-100 produits validés, pas de spam
- **Personnalisation poussée** : Prise en compte du type, de la porosité, des problèmes ET du budget

### Cible utilisateur principale
- **Démographie** : Hommes 18-45 ans, francophones (France, Belgique, Suisse, Canada, Afrique francophone)
- **Psychographie** : Intéressés par le grooming, cherchent des solutions concrètes, prêts à investir dans des produits de qualité
- **Comportement** : Consomment du contenu capillaire sur Instagram/TikTok/YouTube, suivent déjà Yugo Le Ouedec

---

## 🔍 Problème & Solution

### Le problème

**Les hommes aux cheveux lisses/ondulés/bouclés/crépus :**
1. Ne connaissent pas précisément leur type de cheveux
2. Ne savent pas quels produits acheter (trop de choix, marketing confus)
3. Reçoivent des conseils génériques ("utilise un shampooing hydratant") sans marques/références précises
4. Perdent du temps et de l'argent en essais-erreurs

**Le marché actuel :**
- Les apps existantes ciblent majoritairement les femmes
- Les conseils pour hommes sont éparpillés (Reddit, forums, YouTube)
- Aucune solution tout-en-un : diagnostic + routine + produits précis

### La solution

**HairScan résout ces 4 problèmes en 2 minutes :**
1. **Diagnostic précis** : IA analyse la photo → détermine type + porosité + état
2. **Routine personnalisée** : Basée sur type, problèmes, objectifs ET budget
3. **Produits précis** : "Achète le Shea Moisture Curl & Shine 15€ sur Amazon" (lien direct)
4. **Zéro friction** : Tout dans une app, pas besoin de chercher ailleurs

---

## 👤 User Stories

### Epic 1 : Découverte et diagnostic

**US 1.1 — Sélection du type de cheveux**
> En tant qu'utilisateur, je veux **sélectionner visuellement mon type de cheveux** parmi 5 options illustrées (lisses, ondulés, bouclés, crépus, semi-lisses), pour que l'app comprenne ma texture de base sans que j'aie besoin de connaître la terminologie technique.

**Critères d'acceptation :**
- [ ] Je vois 5 cartes visuelles avec illustrations 3D
- [ ] Chaque carte a une description courte (1 phrase)
- [ ] Je peux swiper horizontalement ou cliquer sur les flèches
- [ ] Le type sélectionné est mis en évidence (couleur vive)
- [ ] Je peux valider en cliquant sur "C'est mon type"

---

**US 1.2 — Prise de photo**
> En tant qu'utilisateur, je veux **prendre une photo de mes cheveux directement depuis l'app**, pour que l'IA puisse analyser ma texture réelle et affiner le diagnostic.

**Critères d'acceptation :**
- [ ] Je peux ouvrir la caméra native de mon téléphone
- [ ] Je peux choisir une photo depuis ma galerie
- [ ] Je vois des instructions visuelles (lumière, angle)
- [ ] Je peux prévisualiser la photo avant de la valider
- [ ] Je peux reprendre la photo si elle est floue
- [ ] Je peux passer cette étape (analyse moins précise)

---

**US 1.3 — Questions complémentaires**
> En tant qu'utilisateur, je veux **répondre à 3 questions rapides** (problème principal, objectif, budget), pour que la routine soit adaptée à ma situation spécifique.

**Critères d'acceptation :**
- [ ] Question 1 : Problème (cheveux secs, gras, pellicules, chute, manque volume, aucun)
- [ ] Question 2 : Objectif (fortifier, brillance, définir texture, croissance, entretien simple)
- [ ] Question 3 : Budget mensuel (<20€, 20-50€, 50-100€, 100€+, pas de budget fixe)
- [ ] Je peux sélectionner plusieurs problèmes
- [ ] Je vois une barre de progression (3/5, 4/5, 5/5)

---

### Epic 2 : Analyse et résultats

**US 2.1 — Analyse IA**
> En tant qu'utilisateur, je veux **voir une animation de chargement pendant que l'IA analyse ma photo**, pour comprendre que le système travaille et patienter sans anxiété.

**Critères d'acceptation :**
- [ ] Animation fluide (pas de page blanche)
- [ ] Messages qui défilent ("Analyse de la texture...", "Détection de la porosité...")
- [ ] Durée : 3-5 secondes maximum
- [ ] Indicateur de progression visuel

---

**US 2.2 — Résultats gratuits**
> En tant qu'utilisateur gratuit, je veux **voir mon profil capillaire complet** (type confirmé, porosité, état) et **recevoir une routine basique** avec 3 produits recommandés, pour commencer à améliorer mes cheveux sans payer.

**Critères d'acceptation :**
- [ ] Profil affiché : Type (ex: Bouclés 3B), Porosité (moyenne), État (sain)
- [ ] Routine gratuite : Fréquence de lavage, type de produits (générique), gestes à faire/éviter
- [ ] 3 produits recommandés : 1 shampooing, 1 hydratant, 1 styling
- [ ] Chaque produit affiche : nom, marque, prix, note, image, bouton "Voir produit" (lien Amazon)
- [ ] Coût total de la routine affiché
- [ ] Bouton "Télécharger ma routine (PDF)"
- [ ] Call-to-action Premium visible mais non intrusif

---

**US 2.3 — Upgrade Premium**
> En tant qu'utilisateur intéressé, je veux **voir clairement ce que je débloquerais avec Premium**, pour décider si ça vaut 9€/mois.

**Critères d'acceptation :**
- [ ] Liste des fonctionnalités Premium vs Gratuit (tableau comparatif)
- [ ] Preview de la routine avancée (plan hebdomadaire détaillé)
- [ ] Nombre de produits supplémentaires débloqués (10+ par catégorie)
- [ ] Bouton "Passer à Premium — 9€/mois ou 29€/an"
- [ ] Possibilité de tester 7 jours gratuits (optionnel MVP)

---

### Epic 3 : Monétisation et suivi

**US 3.1 — Paiement Stripe**
> En tant qu'utilisateur prêt à payer, je veux **un processus de paiement simple et sécurisé**, pour souscrire à Premium en 1 minute.

**Critères d'acceptation :**
- [ ] Redirection vers Stripe Checkout
- [ ] Options : 9€/mois ou 29€/an (économie affichée)
- [ ] Paiement par carte bancaire
- [ ] Email de confirmation après paiement
- [ ] Accès Premium activé immédiatement

---

**US 3.2 — Liens affiliés Amazon**
> En tant qu'utilisateur, je veux **cliquer sur un produit recommandé et être redirigé vers Amazon**, pour acheter facilement.

**Critères d'acceptation :**
- [ ] Chaque produit a un bouton "Voir produit" ou "Acheter"
- [ ] Redirection vers la page Amazon du produit
- [ ] Lien affilié Yugo inclus (tracking des commissions)
- [ ] Ouverture dans un nouvel onglet

---

## 🗺️ Flow utilisateur

### Vue d'ensemble (7 écrans)

```
┌─────────────────────────────────────────────┐
│  ÉCRAN 1 : Carrousel types de cheveux      │
│  → Sélection visuelle (lisses/ondulés/...)  │
└─────────────────┬───────────────────────────┘
                  ↓ Clic "C'est mon type"
┌─────────────────────────────────────────────┐
│  ÉCRAN 2 : Prise de photo                   │
│  → Caméra ou upload galerie                 │
└─────────────────┬───────────────────────────┘
                  ↓ Photo validée
┌─────────────────────────────────────────────┐
│  ÉCRAN 3 : Question 1 — Problème            │
│  → Sélection multiple (secs, gras, etc.)    │
└─────────────────┬───────────────────────────┘
                  ↓ Suivant
┌─────────────────────────────────────────────┐
│  ÉCRAN 4 : Question 2 — Objectif            │
│  → Sélection unique (fortifier, etc.)       │
└─────────────────┬───────────────────────────┘
                  ↓ Suivant
┌─────────────────────────────────────────────┐
│  ÉCRAN 5 : Question 3 — Budget              │
│  → Sélection unique (<20€, 20-50€, etc.)    │
└─────────────────┬───────────────────────────┘
                  ↓ "Voir mon analyse"
┌─────────────────────────────────────────────┐
│  ÉCRAN 6 : Loader — Analyse IA              │
│  → Animation + messages défilants            │
└─────────────────┬───────────────────────────┘
                  ↓ 3-5 secondes
┌─────────────────────────────────────────────┐
│  ÉCRAN 7 : Résultats + Produits             │
│  → Profil + Routine + 3 produits (gratuit)  │
│  → CTA Premium + Télécharger PDF            │
└─────────────────────────────────────────────┘
```

### Flow détaillé par action

**Action : Retour en arrière**
- Bouton "← Retour" visible sur tous les écrans (sauf écran 1)
- Retourne à l'écran précédent sans perdre les données

**Action : Passer une étape**
- Photo : "Passer cette étape" → Continue avec analyse basée uniquement sur le type déclaré
- Questions : Impossible de passer (obligatoires)

**Action : Erreur réseau pendant analyse**
- Message : "Connexion perdue. Réessayer ?"
- Bouton "Réessayer"
- Pas de perte de données (tout sauvegardé localement)

---

## 🖥️ Spécifications par écran

### ÉCRAN 1 : Carrousel types de cheveux

**Layout mobile (375x812px base)**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        HAIRSCAN
    Analyse IA • Routine sur-mesure
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "Quel est ton type de cheveux ?"

    ◀━━━━━━━━━━━━━━━━━━━▶
    
    ┏━━━━━━━━━━━━━━━━━━━┓
    ┃                   ┃
    ┃  [GRADIENT 3D]    ┃
    ┃     BOUCLÉS       ┃
    ┃                   ┃
    ┗━━━━━━━━━━━━━━━━━━━┛
    
    "Boucles bien définies,
     texture ressort naturelle"
    
    ━━━━━━━━━━━━━━━━━━━━━
    ● ○ ○ ○ ○  ← Indicateur
    
    [  👆 C'EST MON TYPE  ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Éléments UI :**
- **Header** : Logo "HairScan" + baseline
- **Titre** : "Quel est ton type de cheveux ?" (H1, 24px, bold)
- **Carrousel** : Carte centrale 280x320px, swipe horizontal
- **Illustration** : SVG ou PNG 3D avec gradient (généré ou illustré)
- **Description** : Texte court sous l'illustration (14px, gris clair)
- **Indicateurs** : 5 points (actif=plein, inactif=vide)
- **Bouton CTA** : "C'est mon type" (pleine largeur, couleur du type actif)

**Couleurs par type :**
- Lisses : Bleu (#3B82F6)
- Ondulés : Violet (#8B5CF6)
- Bouclés : Orange (#F97316)
- Crépus : Vert (#10B981)
- Semi-lisses : Cyan (#06B6D4)

**Interactions :**
- Swipe gauche/droite : Change de type
- Clic flèches : Change de type
- Clic sur bouton : Valide et passe à l'écran 2
- Animation : Transition fluide 300ms entre types

**Validations :**
- Aucune (tous les types sont valides)

**États :**
- Default : Type par défaut = Lisses (premier de la liste)
- Actif : Type sélectionné surligné

---

### ÉCRAN 2 : Prise de photo

**Layout mobile**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⟵ Retour    HAIRSCAN    [2/5]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "Parfait ! Maintenant,
   montre-moi tes cheveux 📸"

  "Pour une analyse précise :"

  ┌────┐  ┌────┐  ┌────┐
  │ 💡 │  │ 📐 │  │ 👤 │
  └────┘  └────┘  └────┘
  Lumière  Profil  Cheveux
  naturel  ou face visibles

  ┌─────────────────────┐
  │   [MINI GIF/VIDEO]  │
  │   démo photo        │
  └─────────────────────┘

  ┏━━━━━━━━━━━━━━━━━━━━┓
  ┃  📸 PRENDRE PHOTO  ┃
  ┗━━━━━━━━━━━━━━━━━━━━┛

  ┌──────────────────────┐
  │ 🖼️ Choisir galerie  │
  └──────────────────────┘

  Passer cette étape →
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Éléments UI :**
- **Header** : Bouton retour + Logo + Progression (2/5)
- **Titre** : "Parfait ! Maintenant, montre-moi tes cheveux"
- **Instructions visuelles** : 3 icônes + labels
- **Démo** : Mini animation (GIF 3 sec loop) montrant comment se prendre en photo
- **Bouton principal** : "Prendre photo" (gradient bleu)
- **Bouton secondaire** : "Choisir galerie" (outline blanc)
- **Skip** : Lien texte "Passer cette étape" (gris)

**Interactions :**
- Clic "Prendre photo" : Ouvre caméra native (API `navigator.mediaDevices.getUserMedia`)
- Clic "Choisir galerie" : Ouvre sélecteur fichiers (`<input type="file" accept="image/*">`)
- Après photo prise : Affiche preview + boutons "Reprendre" / "Valider"
- Clic "Passer" : Continue sans photo (flag `skipPhoto: true`)

**Validations :**
- Format accepté : JPEG, PNG, WEBP
- Taille max : 5 MB
- Résolution min : 640x480px
- Si fichier trop lourd : Compression côté client avant upload

**États :**
- Default : Pas de photo
- Photo prise : Preview affichée
- Erreur caméra : "Impossible d'accéder à la caméra. Utilise la galerie."

---

### ÉCRAN 3 : Question 1 — Problème

**Layout mobile**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⟵ Retour    HAIRSCAN    [3/5]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "Quel est ton problème
   capillaire principal ?"

  ┏━━━━━━━━━━━━━━━━━━━━┓
  ┃ 💧 Cheveux secs    ┃ ✓
  ┗━━━━━━━━━━━━━━━━━━━━┛

  ┏━━━━━━━━━━━━━━━━━━━━┓
  ┃ 🛢️ Cheveux gras    ┃
  ┗━━━━━━━━━━━━━━━━━━━━┛

  ┏━━━━━━━━━━━━━━━━━━━━┓
  ┃ ❄️ Pellicules      ┃
  ┗━━━━━━━━━━━━━━━━━━━━┛

  ┏━━━━━━━━━━━━━━━━━━━━┓
  ┃ 🍂 Chute/casse     ┃
  ┗━━━━━━━━━━━━━━━━━━━━┛

  ┏━━━━━━━━━━━━━━━━━━━━┓
  ┃ 📏 Manque de volume┃
  ┗━━━━━━━━━━━━━━━━━━━━┛

  ┌──────────────────────┐
  │ ✅ Aucun problème    │
  └──────────────────────┘

  [     SUIVANT ➜      ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Éléments UI :**
- **Options** : 6 cartes cliquables (5 problèmes + "Aucun")
- **Icônes** : Emoji ou SVG représentant chaque problème
- **Sélection multiple** : Cases à cocher (sauf "Aucun" qui désélectionne tout)
- **Bouton** : "Suivant" (actif si au moins 1 option sélectionnée)

**Interactions :**
- Clic sur carte : Toggle sélection (checkmark apparaît)
- Clic "Aucun" : Désélectionne tous les autres
- Clic autre option si "Aucun" sélectionné : Désélectionne "Aucun"
- Bouton "Suivant" : Désactivé si aucune sélection

**Validations :**
- Minimum : 1 sélection
- Maximum : 5 (tous sauf "Aucun")

---

### ÉCRAN 4 : Question 2 — Objectif

**Layout mobile** (identique à écran 3, options différentes)

```
  "Quel est ton objectif
   capillaire ?"

  Options :
  - 💪 Fortifier
  - ✨ Brillance
  - 🌊 Définir texture
  - 📈 Croissance
  - 🧘 Entretien simple
```

**Spécificités :**
- **Sélection unique** (radio buttons)
- Obligation de choisir 1 option (pas de "Aucun")

---

### ÉCRAN 5 : Question 3 — Budget

**Layout mobile** (identique à écran 3/4)

```
  "Budget mensuel pour
   tes produits capillaires ?"

  Options :
  - 💶 Moins de 20€
  - 💰 20€ - 50€
  - 💎 50€ - 100€
  - 👑 Plus de 100€
  - 🤷 Pas de budget fixe
```

**Spécificités :**
- **Sélection unique**
- Bouton final : "✨ VOIR MON ANALYSE" (au lieu de "Suivant")

---

### ÉCRAN 6 : Loader — Analyse IA

**Layout mobile**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         HAIRSCAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

      [ANIMATION 3D]
       DNA helix
    ou cheveux qui
      se forment

   🧠 Analyse en cours...

   "Je scanne ta photo et
    crée ta routine sur-mesure"

   ━━━━━━━━━━━━━━━━━━━
   ████████████░░░░░░░░ 65%
   ━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Éléments UI :**
- **Animation** : Lottie ou CSS animation (boucle infinie)
- **Messages défilants** :
  - "Analyse de la texture..." (1s)
  - "Détection de la porosité..." (1s)
  - "Identification des besoins..." (1s)
  - "Génération de ta routine..." (2s)
- **Barre de progression** : 0% → 100% en 5 secondes

**Backend (pendant ce temps) :**
1. Upload photo vers Firebase Storage (si photo fournie)
2. Appel API Claude avec :
   - Image (base64 ou URL)
   - Type de cheveux déclaré
   - Problèmes, objectif, budget
3. Claude analyse et retourne JSON :
   ```json
   {
     "typeConfirme": "boucles_3B",
     "porosite": "moyenne",
     "etat": "sain",
     "routine": {
       "frequenceLavage": "2-3x par semaine",
       "conseils": ["...", "..."],
       "gestes": ["...", "..."]
     }
   }
   ```
4. Logique de matching produits (voir section dédiée)
5. Sauvegarde dans Firestore
6. Redirection vers écran 7

**Durée totale : 3-5 secondes**

---

### ÉCRAN 7 : Résultats + Produits

**Layout mobile** (scrollable)

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ⟵ Retour    HAIRSCAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ Analyse terminée !

  ┏━━━━━━━━━━━━━━━━━━━━┓
  ┃ TON PROFIL         ┃
  ┃ Type : Bouclés 3B  ┃
  ┃ Porosité : Moyenne ┃
  ┃ État : Sain        ┃
  ┗━━━━━━━━━━━━━━━━━━━━┛

  ━━━━━━━━━━━━━━━━━━━━━

  📋 TA ROUTINE GRATUITE

  🧴 Shampooing (2-3x/sem)
  
  ┌───────────────────────┐
  │ [IMG] Shea Moisture   │
  │       Curl & Shine    │
  │ 15.99€  ⭐ 4.5/5     │
  │ Sans sulfates • Vegan │
  │ [ 🛒 Voir produit ]   │
  └───────────────────────┘

  💧 Hydratation (quotidien)
  
  ┌───────────────────────┐
  │ [IMG] Cantu Leave-In  │
  │ 8.99€   ⭐ 4.7/5      │
  │ [ 🛒 Voir produit ]   │
  └───────────────────────┘

  ✨ Styling
  
  ┌───────────────────────┐
  │ [IMG] Eco Styler Gel  │
  │ 6.50€   ⭐ 4.3/5      │
  │ [ 🛒 Voir produit ]   │
  └───────────────────────┘

  ━━━━━━━━━━━━━━━━━━━━━

  💰 COÛT TOTAL : ~31€
     (dans ton budget)

  ━━━━━━━━━━━━━━━━━━━━━

  🔓 VERSION GRATUITE
  ✓ 3 produits recommandés
  ✓ Routine basique
  ✓ Conseils généraux

  🔒 PASSE À PREMIUM
  ✓ 10+ produits/catégorie
  ✓ Routine hebdo détaillée
  ✓ Tutoriels vidéo
  ✓ Suivi mensuel

  [ ⚡ PREMIUM 9€/mois ]

  [ 📄 Télécharger PDF ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Éléments UI :**
- **Section Profil** : Encadré avec 3 lignes (Type, Porosité, État)
- **Section Routine** : Par catégorie (shampooing, hydratation, styling)
- **Cartes produits** : Image + Nom + Prix + Note + Tags + Bouton
- **Coût total** : Calculé dynamiquement
- **Comparatif Gratuit/Premium** : Liste à puces
- **CTA Premium** : Bouton principal (gradient)
- **CTA PDF** : Bouton secondaire (outline)

**Interactions :**
- Clic "Voir produit" : Ouvre lien Amazon (nouvel onglet)
- Clic "Premium" : Redirection Stripe Checkout
- Clic "Télécharger PDF" : Génère PDF (jsPDF) et télécharge

**Contenu PDF :**
- Page 1 : Profil + Routine texte
- Page 2 : Liste des 3 produits avec prix et où les acheter
- Footer : Logo HairScan + "Généré le [date]"

---

## 💾 Modèles de données

### Collection : `users`

```typescript
interface User {
  id: string;                    // UUID
  email: string;                 // Email utilisateur
  createdAt: Timestamp;          // Date de création
  
  // Données analyse
  typeCheveux: HairType;         // "lisses" | "ondules" | "boucles" | "crepus" | "semi-lisses"
  typeConfirme?: HairTypeDetailed; // "boucles_3A" | "boucles_3B" | etc. (si analyse photo)
  porosite: Porosity;            // "faible" | "moyenne" | "haute"
  etat: HairHealth;              // "sain" | "abime" | "tres-abime"
  
  problemes: Problem[];          // ["secs", "pellicules", ...]
  objectif: Goal;                // "fortifier" | "brillance" | "definition" | etc.
  budget: Budget;                // "moins-20" | "20-50" | "50-100" | "100-plus" | "variable"
  
  photoUrl?: string;             // URL Firebase Storage (si photo fournie)
  skipPhoto: boolean;            // true si utilisateur a passé l'étape photo
  
  // Résultats analyse IA
  analyseIA?: {
    timestamp: Timestamp;
    model: string;               // "claude-sonnet-4-20250514"
    raw: string;                 // Réponse brute Claude (JSON stringifié)
    routine: {
      frequenceLavage: string;
      conseils: string[];
      gestes: string[];
    };
  };
  
  // Monétisation
  isPremium: boolean;            // Abonnement actif
  premiumSince?: Timestamp;      // Date souscription
  stripeCustomerId?: string;     // ID Stripe
  stripeSubscriptionId?: string; // ID abonnement Stripe
  
  // Tracking
  lastLogin: Timestamp;
  analysisCount: number;         // Nombre d'analyses effectuées
}

type HairType = "lisses" | "ondules" | "boucles" | "crepus" | "semi-lisses";
type HairTypeDetailed = "lisses" | "ondules_2A" | "ondules_2B" | "ondules_2C" 
                      | "boucles_3A" | "boucles_3B" | "boucles_3C" 
                      | "crepus_4A" | "crepus_4B" | "crepus_4C" | "semi-lisses";
type Porosity = "faible" | "moyenne" | "haute";
type HairHealth = "sain" | "abime" | "tres-abime";
type Problem = "secs" | "gras" | "pellicules" | "chute" | "volume" | "aucun";
type Goal = "fortifier" | "brillance" | "definition" | "croissance" | "entretien";
type Budget = "moins-20" | "20-50" | "50-100" | "100-plus" | "variable";
```

---

### Collection : `products`

```typescript
interface Product {
  id: string;                    // UUID
  nom: string;                   // "Shea Moisture Curl & Shine Shampoo"
  marque: string;                // "Shea Moisture"
  categorie: ProductCategory;    // "shampooing" | "apres-shampooing" | etc.
  
  // Prix
  prix: number;                  // 15.99
  devise: string;                // "EUR"
  
  // Distribution
  disponibilite: string[];       // ["amazon", "pharmacie", "nocibe"]
  lienAmazon: string;            // URL affiliée Amazon
  lienAlternatif?: string;       // URL autre site (optionnel)
  
  // Critères de matching
  typesCheveux: HairType[];      // ["boucles", "crepus"]
  porosite: Porosity[];          // ["moyenne", "haute"]
  problemes: Problem[];          // ["secs", "frisottis"]
  objectifs: Goal[];             // ["definition", "hydratation"]
  budgetCategorie: BudgetCat;    // "economique" | "moyen" | "premium"
  
  // Informations produit
  ingredientsCles: string[];     // ["beurre de karité", "huile de coco"]
  sans: string[];                // ["sulfates", "parabens", "silicones"]
  vegan: boolean;
  bio: boolean;
  
  // Social proof
  noteUtilisateurs: number;      // 4.5 (sur 5)
  nombreAvis?: number;           // 632
  
  // Média
  imageUrl: string;              // URL image produit
  descriptionCourte: string;     // "Shampooing hydratant pour boucles définies"
  descriptionLongue?: string;    // Texte complet (optionnel)
  
  // Meta
  createdAt: Timestamp;
  updatedAt: Timestamp;
  active: boolean;               // Produit actif dans catalogue
}

type ProductCategory = "shampooing" | "apres-shampooing" | "leave-in" 
                     | "gel" | "mousse" | "huile" | "masque" | "serum";
type BudgetCat = "economique" | "moyen" | "premium";
```

---

### Collection : `analyses` (historique)

```typescript
interface Analysis {
  id: string;
  userId: string;                // Référence User
  timestamp: Timestamp;
  
  input: {
    typeCheveux: HairType;
    problemes: Problem[];
    objectif: Goal;
    budget: Budget;
    photoUrl?: string;
  };
  
  output: {
    typeConfirme: HairTypeDetailed;
    porosite: Porosity;
    etat: HairHealth;
    routine: object;
    produitsRecommandes: string[]; // Array de Product IDs
  };
  
  aiModel: string;               // "claude-sonnet-4-20250514"
  tokensUsed: number;            // Tracking coût API
}
```

---

## 🏗️ Architecture technique

### Stack complet

**Frontend**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icônes)

**Backend**
- Next.js API Routes (serverless)
- Firebase Admin SDK

**Base de données**
- Firebase Firestore (NoSQL)
- Firebase Storage (images)

**IA**
- Anthropic Claude API (claude-sonnet-4-20250514)
- Vision API pour analyse photo

**Paiements**
- Stripe Checkout
- Stripe Customer Portal

**Hébergement**
- Vercel (frontend + API routes)
- Firebase (database + storage)

**Analytics**
- Vercel Analytics (built-in)
- Posthog (optionnel — tracking comportement)

---

### Structure de dossiers

```
hairscan-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout global
│   ├── page.tsx                 # Écran 1 : Carrousel
│   ├── photo/
│   │   └── page.tsx             # Écran 2 : Photo
│   ├── questions/
│   │   └── page.tsx             # Écrans 3-5 : Questions
│   ├── analysis/
│   │   └── page.tsx             # Écran 6 : Loader
│   ├── results/
│   │   └── page.tsx             # Écran 7 : Résultats
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.ts         # POST /api/analyze (appel Claude)
│   │   ├── products/
│   │   │   └── route.ts         # GET /api/products (matching)
│   │   └── stripe/
│   │       ├── create-checkout/
│   │       │   └── route.ts     # POST /api/stripe/create-checkout
│   │       └── webhook/
│   │           └── route.ts     # POST /api/stripe/webhook
│   └── globals.css              # Tailwind global
├── components/
│   ├── Carousel.tsx             # Carrousel types cheveux
│   ├── HairTypeCard.tsx         # Carte type de cheveux
│   ├── CameraCapture.tsx        # Composant caméra
│   ├── QuestionCard.tsx         # Carte question
│   ├── Loader.tsx               # Animation loader
│   ├── ProductCard.tsx          # Carte produit
│   └── PremiumCTA.tsx           # Call-to-action Premium
├── lib/
│   ├── firebase.ts              # Config Firebase
│   ├── claude-api.ts            # Wrapper API Claude
│   ├── product-matcher.ts       # Logique matching produits
│   ├── stripe.ts                # Config Stripe
│   └── types.ts                 # Types TypeScript partagés
├── public/
│   ├── images/
│   │   ├── cheveux-lisses.svg
│   │   ├── cheveux-ondules.svg
│   │   ├── cheveux-boucles.svg
│   │   ├── cheveux-crepus.svg
│   │   └── cheveux-semi-lisses.svg
│   └── icons/
├── hooks/
│   ├── useAuth.ts               # Hook authentification
│   └── useAnalysis.ts           # Hook gestion analyse
├── .env.local                   # Variables d'environnement (local)
├── .env.production              # Variables d'environnement (prod)
├── next.config.js               # Config Next.js
├── tailwind.config.ts           # Config Tailwind
├── tsconfig.json                # Config TypeScript
└── package.json                 # Dépendances npm
```

---

### Variables d'environnement

**`.env.local` (développement)**

```bash
# Anthropic
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hairscan.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hairscan
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hairscan.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxx

# Firebase Admin (server-side)
FIREBASE_ADMIN_PROJECT_ID=hairscan
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxxxx\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@hairscan.iam.gserviceaccount.com

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Amazon Affiliates
AMAZON_AFFILIATE_TAG=yugohair-21

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**`.env.production` (production)**

Mêmes variables, mais avec clés de production (pk_live_, sk_live_, etc.)

---

### Sécurité

**API Routes protection**
- Toutes les routes `/api/*` nécessitent vérification côté serveur
- Rate limiting : 10 requêtes/minute par IP (via Vercel Edge Config)
- Validation Zod sur tous les inputs

**Firebase Rules**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users : lecture/écriture uniquement par l'utilisateur concerné
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products : lecture publique, écriture admin uniquement
    match /products/{productId} {
      allow read: if true;
      allow write: if false; // Admin via Firebase Console uniquement
    }
    
    // Analyses : lecture par utilisateur, écriture serveur uniquement
    match /analyses/{analysisId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow write: if false; // API routes only
    }
  }
}
```

**Stripe Webhook**
- Vérification signature webhook
- Traitement asynchrone des événements
- Idempotence (événements dédupliqués)

---

## 🧮 Logique de matching produits

### Algorithme de scoring

**Chaque produit reçoit un score de 0 à 100 basé sur 5 critères :**

```typescript
function calculateProductScore(
  product: Product,
  user: User
): number {
  let score = 0;
  
  // 1. Type de cheveux (30 points)
  if (product.typesCheveux.includes(user.typeCheveux)) {
    score += 30;
  }
  
  // 2. Porosité (20 points)
  if (product.porosite.includes(user.porosite)) {
    score += 20;
  }
  
  // 3. Problèmes (25 points)
  const problemMatches = user.problemes.filter(p => 
    product.problemes.includes(p)
  ).length;
  score += (problemMatches / user.problemes.length) * 25;
  
  // 4. Objectif (15 points)
  if (product.objectifs.includes(user.objectif)) {
    score += 15;
  }
  
  // 5. Budget (10 points)
  const budgetMatch = matchBudget(product.budgetCategorie, user.budget);
  score += budgetMatch ? 10 : 0;
  
  return score;
}

function matchBudget(productBudget: BudgetCat, userBudget: Budget): boolean {
  const budgetMap = {
    "moins-20": ["economique"],
    "20-50": ["economique", "moyen"],
    "50-100": ["moyen", "premium"],
    "100-plus": ["premium"],
    "variable": ["economique", "moyen", "premium"]
  };
  
  return budgetMap[userBudget].includes(productBudget);
}
```

---

### Sélection des produits recommandés

**Version gratuite (3 produits) :**

```typescript
async function getRecommendedProducts(userId: string): Promise<Product[]> {
  const user = await getUser(userId);
  const allProducts = await getAllActiveProducts();
  
  // Scorer tous les produits
  const scoredProducts = allProducts.map(product => ({
    product,
    score: calculateProductScore(product, user)
  }));
  
  // Trier par score décroissant
  scoredProducts.sort((a, b) => b.score - a.score);
  
  // Sélectionner top 3 PAR CATÉGORIE
  const recommendations = {
    shampooing: scoredProducts.filter(p => p.product.categorie === "shampooing")[0],
    hydratation: scoredProducts.filter(p => 
      ["leave-in", "apres-shampooing"].includes(p.product.categorie)
    )[0],
    styling: scoredProducts.filter(p => 
      ["gel", "mousse", "creme"].includes(p.product.categorie)
    )[0]
  };
  
  return [
    recommendations.shampooing.product,
    recommendations.hydratation.product,
    recommendations.styling.product
  ];
}
```

**Version Premium (10+ produits par catégorie) :**

Même logique, mais retourne top 10 par catégorie au lieu de top 1.

---

### Fallback si score trop faible

Si aucun produit ne dépasse 50 points de score :
1. Afficher les produits "best-sellers" (note > 4.5 + nombreAvis > 100)
2. Filtrer uniquement par type de cheveux (critère minimum)
3. Message : "Voici nos meilleures ventes pour cheveux [type]"

---

## 💰 Monétisation

### Modèle freemium

**Version GRATUITE**
- ✅ 1 analyse complète
- ✅ Profil capillaire (type confirmé, porosité, état)
- ✅ Routine basique (texte générique)
- ✅ 3 produits recommandés (1 par catégorie)
- ✅ Téléchargement PDF
- ❌ Pas de plan hebdomadaire détaillé
- ❌ Pas de catalogue complet (seulement 3 produits)
- ❌ Pas de suivi évolution
- ❌ Pas de tutoriels vidéo

**Version PREMIUM (9€/mois ou 29€/an)**
- ✅ Tout du gratuit +
- ✅ Routine hebdomadaire détaillée (jour par jour)
- ✅ 10+ produits par catégorie (alternatives budget/premium)
- ✅ Tutoriels vidéo (coiffage, application produits)
- ✅ Suivi mensuel (re-analyse photo pour voir évolution)
- ✅ Accès communauté (forum/Discord — post-MVP)
- ✅ Nouveaux produits ajoutés en priorité

**Pricing stratégique**
- Mensuel : 9€/mois (108€/an)
- Annuel : 29€/an (économie de 79€ = 73% de réduction)
- **Psychologie** : Prix annuel = 2.42€/mois (moins cher qu'un café)
- **Test gratuit** : 7 jours (optionnel — à tester en A/B)

---

### Liens affiliés Amazon

**Fonctionnement**
1. Inscription au programme Amazon Partenaires
2. Génération de liens affiliés pour chaque produit
3. Tag affilié : `yugohair-21` (exemple)
4. Commission : 3-5% du prix d'achat

**Tracking**
- Chaque clic sur "Voir produit" enregistré dans Analytics
- Conversion trackée via Amazon Associates Dashboard
- Revenus mensuels estimés (hypothèse) :
  - 1000 utilisateurs/mois
  - Taux de clic produit : 20% = 200 clics
  - Taux de conversion Amazon : 10% = 20 achats
  - Panier moyen : 30€
  - Commission 4% = 1.20€ par achat
  - **Revenus affiliés : 24€/mois** (base, scalable)

---

### Partenariats marques (post-MVP)

**Modèle "Featured Product"**
- Marques paient pour apparaître en priorité dans recommandations
- Tarif : 200-500€/mois par marque
- Maximum 3 marques partenaires simultanément (pour garder crédibilité)
- Badge "Partenaire" affiché clairement

**Exemple**
- Shea Moisture paie 300€/mois
- Leurs produits apparaissent en top 3 si score > 60
- Si score < 60, pas d'affichage (qualité garantie)

---

### Projections revenus (12 premiers mois)

**Hypothèses conservatrices**

| Mois | Utilisateurs | Premium (5%) | MRR Premium | Affiliés | Total MRR |
|------|-------------|--------------|-------------|----------|-----------|
| M1   | 100         | 5            | 45€         | 24€      | 69€       |
| M3   | 500         | 25           | 225€        | 120€     | 345€      |
| M6   | 1500        | 75           | 675€        | 360€     | 1035€     |
| M12  | 5000        | 250          | 2250€       | 1200€    | 3450€     |

**Avec partenariats marques (M6+) :**
- +900€/mois (3 marques × 300€)
- **Total M12 : 4350€ MRR**

**Coûts fixes mensuels**
- Hébergement Vercel : 0€ (gratuit jusqu'à 100K vues)
- Firebase : ~20€ (10K utilisateurs actifs)
- API Claude : ~50€ (basé sur 1000 analyses/mois)
- Stripe : 1.5% + 0.25€ par transaction
- **Total coûts : ~100€/mois**

**Marge nette M12 : ~4250€/mois**

---

## 📊 Métriques de succès

### KPIs primaires (MVP)

**Acquisition**
- Visiteurs uniques : 500/mois (M1) → 5000/mois (M12)
- Taux de conversion visiteur → analyse : 20%
- Source : Trafic Instagram/TikTok (contenu Yugo)

**Engagement**
- Taux de complétion du flow (écran 1 → 7) : >70%
- Temps moyen par session : 3-5 minutes
- Taux de rebond écran 1 : <30%

**Monétisation**
- Taux de conversion Gratuit → Premium : 5%
- Taux de clic produits : 15%
- MRR (Monthly Recurring Revenue) : 2250€ à M12

**Rétention**
- Utilisateurs actifs mensuels (MAU) : 60% des inscrits
- Churn Premium : <10%/mois
- NPS (Net Promoter Score) : >50

---

### Métriques secondaires

**Qualité analyse IA**
- Taux de satisfaction résultats : >80% (sondage post-analyse)
- Taux de re-analyse (insatisfaction) : <5%

**Performance technique**
- Temps chargement page : <2s (mobile 4G)
- Uptime : >99.5%
- Erreurs API : <1%

**SEO/Organique (post-MVP)**
- Positions Google : Top 10 pour "analyse cheveux homme", "type cheveux homme"
- Trafic organique : 30% du total à M12

---

### Outils de tracking

**Analytics**
- Vercel Analytics (vitesse, uptime)
- Google Analytics 4 (comportement utilisateur)
- Posthog (product analytics, funnels)

**Feedback utilisateur**
- Sondage post-analyse (1 question NPS)
- Bouton feedback dans app
- Reviews App Store/Play Store (post-MVP)

---

## 🗓️ Roadmap

### Phase 1 : MVP (Mois 1-3)

**M1 — Fondations**
- ✅ Setup Next.js + Firebase + Stripe
- ✅ Écrans 1-7 fonctionnels
- ✅ Intégration API Claude
- ✅ Base de données 80 produits
- ✅ Logique de matching basique
- ✅ Déploiement Vercel
- **Objectif M1 : 100 utilisateurs, 5 Premium**

**M2 — Optimisation**
- Amélioration UX basée sur feedback M1
- Ajout tracking Analytics complet
- A/B testing : Prix Premium (9€ vs 12€)
- Optimisation SEO (meta tags, sitemap)
- **Objectif M2 : 300 utilisateurs, 15 Premium**

**M3 — Contenu**
- Rédaction blog (5 articles SEO)
- Création tutoriels vidéo Premium
- Campagne Instagram/TikTok
- Partenariat 1ère marque
- **Objectif M3 : 500 utilisateurs, 25 Premium, 1 partenaire**

---

### Phase 2 : Croissance (Mois 4-6)

**M4-6 — Scale**
- App native iOS (React Native ou Flutter)
- App native Android
- Ajout 50 produits supplémentaires (total 130)
- Suivi évolution (re-scan mensuel)
- Programme de parrainage (5€ offerts)
- **Objectif M6 : 1500 utilisateurs, 75 Premium, 3 partenaires**

---

### Phase 3 : Écosystème (Mois 7-12)

**M7-9 — Communauté**
- Forum/Discord Premium
- Contenu exclusif (webinars, Q&A live)
- Marketplace (utilisateurs partagent leurs routines)

**M10-12 — Produit propre**
- Lancement marque HairScan (produits own-label)
- Premiers produits : Shampooing + Leave-in
- Vente directe dans l'app
- **Objectif M12 : 5000 utilisateurs, 250 Premium, MRR 4350€**

---

### Post-MVP (Année 2+)

**Expansion géographique**
- Version anglophone (UK, US, Canada anglophone)
- Version hispanophone (Espagne, Amérique Latine)

**Nouvelles fonctionnalités**
- IA vocale (assistant capillaire conversationnel)
- Collaboration barbers (annuaire spécialisés)
- Abonnement produits (box mensuelle)

**Levée de fonds**
- Seed round : 100-300K€
- Objectif : Accélérer croissance + embaucher équipe

---

## 📝 Notes finales

### Risques identifiés

**Technique**
- Dépendance API Claude (si prix augmentent ou service down)
  - **Mitigation** : Budget API plafonné, fallback vers analyse règle-based
  
**Business**
- Taux de conversion Premium trop faible (<5%)
  - **Mitigation** : A/B testing pricing, ajout features Premium

**Légal**
- RGPD (données personnelles, photos)
  - **Mitigation** : Consentement explicite, données anonymisées, droit à l'oubli

**Concurrence**
- Grandes marques (L'Oréal, etc.) lancent apps similaires
  - **Mitigation** : Niche hommes francophones, expertise Yugo (personal branding)

---

### Success criteria (Go/No-Go à M3)

**GO si :**
- ✅ 500+ utilisateurs
- ✅ Taux conversion Premium >3%
- ✅ NPS >40
- ✅ MRR >300€

**NO-GO si :**
- ❌ <200 utilisateurs
- ❌ Taux conversion Premium <1%
- ❌ Churn >20%
- ❌ Feedback majoritairement négatif

---

**Document vivant — Dernière mise à jour : Mars 2026**
