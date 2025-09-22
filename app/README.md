# Tide Information Viewer

Une application Next.js moderne pour visualiser les horaires et coefficients de marées pour La Rochelle, France.

## Fonctionnalités

- 📅 **Affichage mensuel des marées** - Visualisation complète des marées de septembre 2025
- 🌊 **Données détaillées** - Horaires précis, hauteurs d'eau et coefficients de marée
- ⚙️ **Options d'affichage** - Format 24h/12h, unités métriques/impériales
- 📱 **Design responsive** - Interface adaptée mobile, tablette et desktop
- 🎯 **Navigation intuitive** - Sélection de jour avec état visuel
- ♿ **Accessibilité** - Support clavier et attributs ARIA

## Démarrage rapide

### Installation

```bash
# Installer les dépendances
npm install

# Installer les navigateurs Playwright (pour les tests e2e)
npx playwright install
```

### Développement

```bash
# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production

```bash
# Construire l'application
npm run build

# Lancer en mode production
npm start
```

## Tests

Cette application inclut une suite complète de tests unitaires et end-to-end.

### Tests unitaires (Jest)

```bash
# Lancer tous les tests unitaires
npm run test

# Mode watch pour le développement
npm run test:watch

# Tests avec coverage pour CI
npm run test:ci
```

### Tests End-to-End (Playwright)

Les tests e2e valident le comportement complet de l'application :

```bash
# Lancer tous les tests e2e
npm run test:e2e

# Interface graphique pour déboguer
npm run test:e2e:ui

# Mode avec navigateur visible
npm run test:e2e:headed
```

#### Suites de tests disponibles

- **`home-page-validation.spec.ts`** - Validation du chargement de la page d'accueil
  - Vérification du titre et éléments UI essentiels
  - Contrôles d'affichage (format, unités, types de marées)
  - Données complètes du mois et accessibilité

- **`day-navigation.spec.ts`** - Navigation entre les jours
  - Sélection des cartes de jour avec feedback visuel
  - Préservation des paramètres lors du changement de jour
  - Navigation clavier et cohérence des états

- **`control-interactions.spec.ts`** - Interactions avec les contrôles
  - Basculement format horaire (24h ↔ 12h)
  - Basculement unités (mètres ↔ pieds)
  - Affichage/masquage des types de marées
  - Design responsive sur tous les formats d'écran

### Documentation détaillée des tests

Voir [E2E_TESTING_SETUP.md](./E2E_TESTING_SETUP.md) pour :
- Instructions d'installation complètes
- Commandes de débogage avancées
- Configuration CI/CD
- Guide de résolution des problèmes

## Architecture

```
src/
├── app/                 # Pages Next.js App Router
├── components/          # Composants React réutilisables
│   ├── ui/             # Composants UI de base (Button, Card, Badge)
│   └── tide/           # Composants spécifiques aux marées
├── data/               # Données mockées des marées
├── lib/                # Utilitaires et helpers
└── types/              # Définitions TypeScript

tests/
├── components/         # Tests unitaires des composants
└── e2e/               # Tests end-to-end Playwright
```

## Technologies utilisées

- **[Next.js 15](https://nextjs.org)** - Framework React avec App Router
- **[TypeScript](https://www.typescriptlang.org)** - Typage statique
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utilitaire
- **[Radix UI](https://www.radix-ui.com)** - Composants accessibles
- **[Jest](https://jestjs.io)** - Tests unitaires
- **[Playwright](https://playwright.dev)** - Tests end-to-end
- **[ESLint](https://eslint.org)** - Linting du code

## Structure des données

L'application affiche les données de marées pour septembre 2025 à La Rochelle, incluant :

- **Événements de marée** - 2 à 4 événements par jour (marées hautes/basses)
- **Coefficients** - Échelle de 20 à 120 indiquant la force des marées
- **Hauteurs d'eau** - En mètres ou pieds selon les préférences
- **Classification** - Morte-eau (≤44), moyennes (45-69), vives-eaux (≥70)

## Contribuer

1. Suivre les conventions de nommage existantes
2. Ajouter des tests pour les nouvelles fonctionnalités
3. Vérifier que tous les tests passent avant de soumettre
4. Utiliser ESLint pour maintenir la qualité du code

## Ressources Next.js

- [Documentation Next.js](https://nextjs.org/docs)
- [Tutoriel interactif](https://nextjs.org/learn)
- [Repository GitHub](https://github.com/vercel/next.js)

## Déploiement

Le déploiement le plus simple se fait via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Voir la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.
