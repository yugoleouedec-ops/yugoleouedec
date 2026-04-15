# Guide des m&eacute;dias — Yugo Le Ouedec

## Structure des dossiers

```
public/
├── images/
│   ├── hero/          ← Section Hero (page d'accueil)
│   ├── hairscan/      ← Section HairScan (mockup iPhone)
│   ├── about/         ← Section "Mon histoire"
│   └── avis/          ← Avatars t&eacute;moignages (optionnel)
└── videos/            ← Vid&eacute;os (optionnel, pour le hero vid&eacute;o)
```

---

## Fichiers &agrave; ajouter

### 1. HERO — `public/images/hero/`

| Fichier | Utilis&eacute; comme | Dimensions recommand&eacute;es | Format |
|---------|----------------------|-------------------------------|--------|
| `yugo.jpg` | Photo principale qui s'agrandit au scroll | 1280 x 1600 px (portrait 4:5) | JPG, qualit&eacute; 80-90% |

> C'est l'image centrale du hero. Elle appara&icirc;t petite au centre
> puis s'&eacute;tend en plein &eacute;cran quand l'utilisateur scrolle.
> Privil&eacute;gie une photo portrait, bien &eacute;clair&eacute;e, fond neutre.

### 2. HAIRSCAN — `public/images/hairscan/`

| Fichier | Utilis&eacute; comme | Dimensions recommand&eacute;es | Format |
|---------|----------------------|-------------------------------|--------|
| `mockup.png` | Mockup iPhone montrant l'app | 520 x 1040 px (ratio 9:18) | PNG transparent |

> Screenshot de l'app HairScan dans un cadre iPhone.
> Le fond est transparent (PNG) pour s'int&eacute;grer au design.

### 3. ABOUT — `public/images/about/`

| Fichier | Utilis&eacute; comme | Dimensions recommand&eacute;es | Format |
|---------|----------------------|-------------------------------|--------|
| `yugo.jpg` | Photo section "Mon histoire" | 1200 x 1500 px (portrait 4:5) | JPG, qualit&eacute; 80-90% |

> Photo de toi en situation (salon, en train de coiffer, lifestyle).
> Format portrait, elle occupe la moiti&eacute; gauche sur desktop.

### 4. AVIS — `public/images/avis/` (optionnel)

> Les avatars des t&eacute;moignages utilisent actuellement randomuser.me.
> Si tu veux les remplacer par de vraies photos :

| Fichier | Dimensions | Format |
|---------|-----------|--------|
| `thomas.jpg` | 200 x 200 px | JPG |
| `mehdi.jpg` | 200 x 200 px | JPG |
| `lucas.jpg` | 200 x 200 px | JPG |
| `antoine.jpg` | 200 x 200 px | JPG |
| `romain.jpg` | 200 x 200 px | JPG |
| `karim.jpg` | 200 x 200 px | JPG |
| `hugo.jpg` | 200 x 200 px | JPG |
| `nassim.jpg` | 200 x 200 px | JPG |
| `julien.jpg` | 200 x 200 px | JPG |

### 5. VIDEOS — `public/videos/` (optionnel)

| Fichier | Utilis&eacute; comme | Format |
|---------|----------------------|--------|
| `hero.mp4` | Vid&eacute;o hero (alternative &agrave; l'image) | MP4, H.264, max 10 Mo |

> Si tu veux un hero vid&eacute;o au lieu d'une image,
> il suffit de changer `mediaType="video"` et `mediaSrc="/videos/hero.mp4"`
> dans app/page.tsx.

---

## Comment remplacer les m&eacute;dias

1. Glisse tes fichiers dans les bons dossiers
2. Respecte les noms de fichiers ci-dessus
3. C'est tout — le site les prend automatiquement

Les chemins sont d&eacute;j&agrave; configur&eacute;s dans le code.
