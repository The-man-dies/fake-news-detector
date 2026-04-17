# Navigation & Expérience Utilisateur (UX)

## 🗺️ Logique de Navigation

### Navigation Responsive
- **Mobile :** La `Navbar` reste en bas pour un accès facile au pouce.
- **Desktop :** La `Navbar` passe à gauche pour libérer de l'espace vertical pour le contenu.
- **Tablette :** Une version réduite (icônes uniquement) pourrait être envisagée pour optimiser l'espace.

## 💡 Recommandations UX

1.  **Recherche prédictive :** Dans `OffSide.tsx`, implémenter une liste déroulante de résultats dès que l'utilisateur commence à taper.
2.  **Navigation par onglets :** Sur la page Profil, les onglets (Posts, Réponses, J'aime) devraient être fonctionnels pour filtrer le contenu sans recharger la page.
3.  **Retour Haptique :** Pour la version mobile, s'assurer que les boutons ont une zone de clic (hitbox) d'au moins 44px.
4.  **Sticky Headers :** Maintenir les titres de page visibles lors du défilement pour que l'utilisateur sache toujours où il se trouve.
