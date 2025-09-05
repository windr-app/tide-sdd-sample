# Documentation Visualiseur de Marées

Ce répertoire contient une documentation complète pour l'application Visualiseur de Marées, incluant des guides utilisateur, de la documentation technique et des exemples visuels.

## Fichiers de Documentation

### 📖 [Guide Utilisateur](guide-utilisateur.md)
Documentation complète pour l'utilisateur final couvrant :
- Aperçu de l'application et fonctionnalités
- Instructions d'utilisation étape par étape
- Explications des éléments interactifs
- Guide de dépannage

### 🔧 [Aperçu Technique](apercu-technique.md)
Documentation technique pour les développeurs incluant :
- Architecture de l'application
- Structure des composants
- Gestion d'état
- Outils de développement et tests

### 🌍 Documentation en Anglais
- **[User Guide](user-guide.md)** - Guide utilisateur en anglais
- **[Technical Overview](technical-overview.md)** - Aperçu technique en anglais
- **[Documentation Index](README.md)** - Index de documentation en anglais

## Ressources Visuelles

Le répertoire `assets/` contient des captures d'écran annotées démontrant :

1. **01-main-page.png** - Vue générale de l'application
2. **02-format-button-highlighted.png** - Bascule de format d'heure
3. **03-12h-format-active.png** - Affichage format 12 heures
4. **04-unit-button-highlighted.png** - Bascule d'unité de mesure
5. **05-feet-units-active.png** - Affichage unités impériales
6. **06-hide-types-button-highlighted.png** - Bascule de type de marée
7. **07-types-hidden.png** - Mode d'affichage simplifié
8. **08-day-card-highlighted.png** - Sélection de jour interactive
9. **09-day-card-selected.png** - État de jour sélectionné

## Fonctionnalités Clés Documentées

### Contrôles Interactifs
- **Bascule Format d'Heure** : Basculer entre formats 24h et 12h
- **Bascule d'Unité** : Convertir entre mètres et pieds
- **Bascule d'Affichage Type** : Afficher/masquer les étiquettes de type de marée

### Interface Utilisateur
- **Calendrier de Marées** : Vue en grille mensuelle des jours de marée
- **Cartes de Jour** : Cartes interactives avec informations de marée
- **Légende** : Informations explicatives pour les types et coefficients de marée

### Retour Visuel
- **Mise en Évidence des Boutons** : Contours rouges montrent les éléments interactifs
- **Indicateurs d'État** : Les boutons reflètent les paramètres actuels
- **Retour de Sélection** : Les éléments sélectionnés maintiennent un état actif

## Fonctionnalités de l'Application

Le Visualiseur de Marées fournit :
- 📅 Calendrier mensuel de marées pour La Rochelle, France
- 🌊 Heures et hauteurs de marée détaillées
- 📊 Coefficients et indicateurs de force de marée
- ⚙️ Préférences d'affichage personnalisables
- 🎯 Sélection de jour interactive
- 📱 Design réactif pour tous les appareils

## Pile Technologique

- **Next.js 15** avec App Router
- **TypeScript** pour la sécurité de type
- **ShadCN UI** pour des composants modernes
- **Tailwind CSS** pour le style
- **Playwright** pour les tests et l'automatisation

## Comment Utiliser Cette Documentation

1. **Pour les Utilisateurs Finaux** : Commencez par le [Guide Utilisateur](guide-utilisateur.md)
2. **Pour les Développeurs** : Consultez l'[Aperçu Technique](apercu-technique.md)
3. **Pour Référence Visuelle** : Parcourez les captures d'écran annotées dans `assets/`
4. **For English Documentation** : Check the English versions linked above

## Vocabulaire Maritime Français

### Types de Marées
- **Morte-eau** : Marées de faible amplitude (coefficients faibles)
- **Vive-eau** : Marées de forte amplitude (coefficients élevés)
- **Marées moyennes** : Marées d'amplitude modérée

### Éléments de Marée
- **Haute mer / Marée haute** : Niveau maximal de la marée
- **Basse mer / Marée basse** : Niveau minimal de la marée
- **Coefficient** : Valeur indiquant la force de la marée (20-120)
- **Marnage** : Différence entre haute et basse mer

### Navigation et Sécurité
- **Zéro hydrographique** : Référence pour les hauteurs d'eau
- **Hauteur d'eau** : Niveau au-dessus du zéro hydrographique
- **Horaire de marée** : Planning des heures de marée

---

*Dernière mise à jour : 5 septembre 2025*
