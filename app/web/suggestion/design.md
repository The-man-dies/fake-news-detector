# Design & Identité Visuelle

## 🎨 Principes Appliqués

### 1. Utilisation des Couleurs (OKLCH)
Nous avons utilisé vos variables de couleur `oklch` pour garantir une harmonie visuelle.
- **Primary :** Utilisé pour les actions principales (bouton Poster, liens actifs).
- **Muted/Accent :** Utilisé pour les arrière-plans de cartes et les états de survol (hover).
- **Destructive/Success :** Utilisé pour indiquer immédiatement la fiabilité d'une information.

### 2. Typographie
- **Hiérarchie :** Utilisation de graisses `font-extrabold` pour les titres et `font-medium` pour le texte secondaire.
- **Clarté :** Espacement des lignes (leading) optimisé pour la lecture de descriptions de nouvelles.

## 💡 Recommandations Design

- **Icônes Personnalisées :** Bien que `lucide-react` soit excellent, créer des icônes spécifiques pour les types de "Fake News" (ex: icône de tampon "Vérifié" vs "Satire") renforcerait l'utilité de l'app.
- **Bordures et Rayons :** Conserver un `radius` cohérent (utilisé `rounded-2xl` pour les sections) pour un aspect doux et moderne.
- **Images :** Utiliser des `aspect-ratio` fixes pour les images de nouvelles afin d'éviter les sauts de mise en page lors du chargement.
