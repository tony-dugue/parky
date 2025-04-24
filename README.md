# Parky

## Table des matières

- [🚗 Présentation du projet](#présentation-du-projet)
- [✅ Prérequis](#prérequis)
- [🚀 Installation du projet](#installation-du-projet)
  - [1. Cloner le dépôt](#1-cloner-le-dépôt)
  - [2. Installer les dépendances](#2-installer-les-dépendances)
  - [3. Configurer les variables d’environnement](#3-configurer-les-variables-denvironnement)
  - [4. Démarrer la base de données avec Docker Compose](#4-démarrer-la-base-de-données-avec-docker-compose)
  - [5. Appliquer les migrations Prisma](#5-appliquer-les-migrations-prisma)
  - [6. Exécuter les données de seed](#6-exécuter-les-données-de-seed)
  - [7. Démarrer les applications](#7-démarrer-les-applications)
    - [API](#api)
    - [Web (interface client)](#web-interface-client)
    - [Web Manager](#web-manager)
    - [Web Valet](#web-valet)
    - [Web Admin](#web-admin)
- [🛠 Autres commandes utiles](#autres-commandes-utiles)
- [📚 Ressources utilisées](#ressources-utilisées)
  - [Librairies et outils principaux](#librairies-et-outils-principaux)

## 🚗 Présentation du projet

Parky est une application de gestion et de réservation de parkings, avec une option de service voiturier.
Ce monorepo inclut plusieurs applications (API, interfaces web) et bibliothèques partagées.
Tech stack : NestJS, Next.js, GraphQL, REST, Prisma, MUI, TailwindCSS

Ce guide vous aidera à configurer le projet localement et à exécuter les différentes applications.

## Prérequis

Avant de commencer, assurez-vous que les éléments suivants sont installés sur votre système :

- Node.js (>= 14.x)
- Yarn (>= 1.22.x)
- Docker
- Git

## 🚀 Installation du projet

<br>
> ⚠️  Le gestionnaire de paquets utilisé est Yarn !


<br>

### 1.  Cloner le dépôt

Clonez le repository sur votre machine locale :

```bash
git clone https://github.com/tony-dugue/parky.git
cd parky
```

### 2. Installer les dépendances

Installer les dépendances du projet en utilisant Yarn.

```
yarn install
```

### 3. Configurer les variables d'environnement

Créez un fichier .env à la racine du projet et ajoutez-y les variables d’environnement nécessaires.
Vous pouvez vous baser sur le fichier .env.example.

### 4. Démarrer la base de données avec Docker Compose

Démarrer la base de données PostgreSQL :

```
docker-compose up -d
```

### 5. Appliquer les migrations Prisma

Une fois la base de données en cours d’exécution, appliquez les migrations Prisma :

```
yarn prisma migrate dev
```

### 6. Exécuter les données de seed

Des données de test sont disponibles dans l'application API :

```
cd apps/api
npm run db:reset
```

### 7. Démarrer les Applications

Vous pouvez lancer chaque application séparément :

#### API Application

Accédez au répertoire apps/api et démarrez le serveur API.

```
cd apps/api
yarn dev
```

Le projet sera visible dans le navigateur à l'adresse (en mode développeur) :
[http://localhost:3000](http://localhost:3000)

#### WEB Application

Accédez au répertoire apps/web et démarrez le serveur.

```
cd apps/web
yarn dev
```

Le projet sera visible dans le navigateur à l'adresse (en mode développeur) :
[http://localhost:3001](http://localhost:3001)

#### WEB MANAGER Application

Accédez au répertoire apps/web-manager et démarrez le serveur.

```
cd apps/web-manager
yarn dev
```

Le projet sera visible dans le navigateur à l'adresse (en mode développeur) :
[http://localhost:3002](http://localhost:3002)

#### WEB VALET Application

Accédez au répertoire apps/web-valet et démarrez le serveur WEB.

```
cd apps/web-valet
yarn dev
```

Le projet sera visible dans le navigateur à l'adresse (en mode développeur) :
[http://localhost:3003](http://localhost:3003)

#### WEB ADMIN Application

Accédez au répertoire apps/web-admin et démarrez le serveur WEB.

```
cd apps/web-admin
yarn dev
```

Le projet sera visible dans le navigateur à l'adresse (en mode développeur) :
[http://localhost:3004](http://localhost:3004)

### 8. Autres commandes

Vérification des erreurs et du formattage:

```bash
yarn validate
```

## Ressources utilisées

### Librairies et outils principaux

Framework react : [NextJS](https://nextjs.org/)<br />
Langage : [TypeScript](https://www.typescriptlang.org/)<br />
CSS Utility Framework  : [TailwindCss](https://tailwindcss.com/)<br />
Librairie de composants UI : [@mui/material](https://mui.com/material-ui/)<br />
Linter : [EsLint](https://eslint.org/)<br />
Formateur de code : [Prettier](https://prettier.io/)<br />
Git Hooks : [Husky](https://typicode.github.io/husky/)<br />
Gestionnaire de paquets : [Yarn](https://yarnpkg.com/)<br />
Gestionnaire de paiement en ligne : [Stripe](https://www.stripe.com/)<br />
Cartographie : [mapLibre-gl](https://maplibre.org/maplibre-gl-js/docs/)<br />
Notifications toast : [react-toastify](https://github.com/fkhadra/react-toastify)<br />
