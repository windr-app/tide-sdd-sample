# Visualiseur de Marées - Documentation Technique

## Architecture de l'Application

Le Visualiseur de Marées est une application Next.js 15 construite avec TypeScript et les composants ShadCN UI, fournissant une interface interactive pour visualiser les informations de marées pour La Rochelle, France.

## Fonctionnalités Clés Démontrées

### Composants d'Interface Utilisateur Interactifs

![Aperçu de l'application](assets/01-main-page.png)

L'application démontre plusieurs fonctionnalités interactives :

1. **Contrôles à Bascule** : Bascules de format, d'unité et de type d'affichage
2. **Cartes Cliquables** : Sélection de jour avec retour visuel
3. **Mises à Jour en Temps Réel** : Changements d'état instantanés sans rechargement de page
4. **Design Réactif** : Mise en page propre qui fonctionne sur tous les appareils

### Gestion d'État

L'application gère plusieurs états d'interface utilisateur :

- **Format d'Heure** : Affichage 24 heures vs 12 heures
- **Unités de Mesure** : Métrique (mètres) vs Impérial (pieds)
- **Affichage Type de Marée** : Afficher/masquer les étiquettes de type de marée
- **Sélection de Jour** : Suivre le jour de marée sélectionné

### Système de Retour Visuel

Chaque élément interactif fournit un retour visuel clair :

#### Mise en Évidence des Boutons
![Bouton Format Mis en Évidence](assets/02-format-button-highlighted.png)
*Le contour et l'arrière-plan rouges indiquent les éléments interactifs*

#### Changements d'État
![Format 12h Actif](assets/03-12h-format-active.png)
*Les étiquettes des boutons se mettent à jour pour refléter l'état actuel*

#### Conversion d'Unité
![Unités en Pieds Actives](assets/05-feet-units-active.png)
*Conversion en temps réel entre les systèmes de mesure*

#### Affichage Simplifié
![Types Masqués](assets/07-types-hidden.png)
*Basculer en vue simplifiée en masquant les étiquettes de type de marée*

#### Retour de Sélection
![Carte de Jour Sélectionnée](assets/09-day-card-selected.png)
*Les éléments sélectionnés maintiennent un état actif avec distinction visuelle*

## Structure des Composants

### TideViewer
Composant conteneur principal gérant l'état global de l'application et la mise en page.

### TideCalendar
Composant de mise en page en grille organisant les cartes de jour de marée dans un format calendrier.

### TideDayCard
Composant de jour individuel affichant :
- Informations de date et jour
- Coefficient de marée
- Événements de marée avec heures et hauteurs
- Capacité de sélection interactive

### TideEventDisplay
Composant pour les événements de marée individuels montrant l'heure, la hauteur et le type.

### Composants de Contrôle
- Bouton de bascule de format
- Bouton de bascule d'unité
- Bouton de bascule d'affichage de type

## Flux de Données

1. **Données de Marée** : Structure de données statique contenant les informations de marée
2. **Gestion d'État** : État React pour les préférences d'interface utilisateur et les sélections
3. **Gestion d'Événements** : Gestionnaires de clic pour les bascules et la sélection de jour
4. **Mises à Jour Temps Réel** : Mises à jour immédiates de l'interface utilisateur basées sur les interactions utilisateur

## Design d'Expérience Utilisateur

### Accessibilité
- Hiérarchie visuelle claire avec en-têtes et sections
- Éléments interactifs clairement marqués avec un style approprié
- Design réactif pour diverses tailles d'écran
- Icônes et étiquettes intuitives

### Utilisabilité
- Bascules en un clic pour les préférences communes
- Retour visuel pour toutes les interactions
- État persistant pendant la session
- Organisation et présentation claires des données

### Performance
- Mises à jour d'état rapides sans rechargement de page
- Rendu de composant efficace
- Dépendances externes minimales
- Actifs d'image optimisés

## Outils de Développement

- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Développement type-safe
- **ShadCN UI** : Bibliothèque de composants moderne
- **Tailwind CSS** : Style utility-first
- **Playwright** : Tests end-to-end et automatisation

## Approche de Test

La documentation inclut des tests visuels complets avec :

- Capture d'écran de tous les états d'interface utilisateur majeurs
- Mise en évidence d'éléments interactifs pour la clarté
- Documentation de flux utilisateur étape par étape
- Capacités de test de régression visuelle

## Compatibilité Navigateur

L'application fonctionne avec les navigateurs modernes supportant :
- Fonctionnalités JavaScript ES6+
- CSS Grid et Flexbox
- APIs DOM modernes
- Fonctionnalités de design réactif

## Améliorations Futures

Les améliorations potentielles pourraient inclure :
- Intégration de données de marée en temps réel
- Détection de localisation utilisateur
- Emplacements favoris
- Prédictions et graphiques de marée
- Version application mobile
- Fonctionnalité hors ligne

## Termes Techniques en Français

### Vocabulaire Maritime
- **Marée** : Tide
- **Coefficient** : Coefficient (force de la marée)
- **Morte-eau** : Neap tide (marées faibles)
- **Vive-eau** : Spring tide (marées fortes)
- **Haute mer** : High tide
- **Basse mer** : Low tide
- **Marnage** : Tidal range
- **Zéro hydrographique** : Chart datum

### Interface Utilisateur
- **Bouton** : Button
- **Bascule** : Toggle
- **Sélection** : Selection
- **Affichage** : Display
- **Mise en évidence** : Highlighting
- **État actif** : Active state

---

*Cette documentation technique fournit des perspectives sur l'architecture de l'application et le design d'expérience utilisateur du Visualiseur de Marées.*
