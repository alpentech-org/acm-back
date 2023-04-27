# 🎓 Documentation ATIS API v1

## 🚀 **Introduction**
ATIS API est un outil complet qui permet aux utilisateurs de récupérer les données relatives aux machines disponibles sur Coscom, et les performances des machines et les opérations en cours sur ElliSetting afin de créer une expérience utilisateur plus complète et plus utile.

En effet, est une solution complète pour gérer les données de Coscom et les liens entre différentes sources de données présentes dans ElliSetting. Cette API offre cinq principales fonctionnalités pour la gestion des utilisateurs, les informations d'ElliSetting, les données liées à Coscom, les paires de machines et les contextes.


## 🤔 **Pourquoi ?**

### Liaison entre données Coscom et ElliSetting grâce à l'API ATIS

D'un côté, nous avons les données Coscom qui incluent les événements tels que la mise en marche ou l'arrêt des machines, les temps d'arrêt de production, les maintenances, etc. De l'autre côté, nous avons les résultats de contrôle qualité obtenus via les données d'ElliSetting. L'API ATIS permet de mettre en corrélation ces événements et ces résultats pour obtenir une vue globale de la production.

À ce jour, il n'existe pas d'outil permettant de lier ces deux types de données. L'API ATIS résout ce problème en proposant des fonctionnalités telles que :

- La récupération des informations des machines et des pièces grâce aux routes dédiées à ElliSetting.
- La récupération des informations des machines et la liste des status grâce aux routes dédiées à Coscom.
- La gestion des paires de machines avec les routes dédiées à la gestion des paires de machines.
- La récupération des contextes grâce à la route dédiée à la gestion des contextes.

Deux cas d'utilisation de l'API ATIS sont possibles :

1. Un chef d'atelier peut, le matin, souhaiter savoir ce qu'il s'est passé dans la nuit, connaître les événements passés pour son suivi de production. Cette API lui permettra de connaître ce suivi de production avec des graphiques et d'obtenir des rapports en quelques secondes.

2. Un responsable qualité peut avoir besoin d'analyser les résultats de contrôle qualité en relation avec les événements survenus sur la chaîne de production. L'API ATIS permet de lier ces deux types de données pour une analyse plus complète et approfondie.


## 🛠️ **Fonctionnalités clés de l'API**


### 1. Gestion des comptes utilisateur :

En utilisant cette API, vous pouvez créer, supprimer et modifier des comptes utilisateur. De plus, vous pouvez gérer l'authentification de manière sécurisée et personnalisée en utilisant des protocoles d'authentification tels que OAuth ou OpenID Connect.

### 2. Configuration de votre application :

Cette fonctionnalité vous permet de récupérer des données importantes relatives à la configuration de votre application ou de votre système. Vous pouvez récupérer des paramètres de configuration, des préférences utilisateur ou des valeurs de seuil pour la surveillance des performances.

### 3. Données de Coscom :

Cette fonctionnalité vous permet de récupérer des données liées à Coscom, telles que des informations sur les machines disponibles, les performances des machines et les opérations en cours.

### 4. Liens entre différentes sources de données :

Afin de combiner les données provenant de différentes sources, il est possible de créer un lien entre cette API et d'autres sources de données. Par exemple, vous pouvez lier les données disponibles sur Coscom et Ellisetting pour obtenir des informations plus complètes et plus utiles.

### 5. Contextes :

Cette fonctionnalité vous permet de récupérer les contextes, tels que des informations sur l'utilisateur, le système ou l'emplacement géographique. Vous pouvez utiliser ces informations pour personnaliser et adapter votre application ou votre système en fonction des besoins de l'utilisateur.




## 📝 **Versions**
**Dernière version :** 1.0.0

Liste des versions : [Cliquer pour afficher](https://github.com/alpentech-org/acm-back/tags)

## 👨‍💻 **Auteurs**

**Théo GUILHIN** _alias_ [@alpentech](https://github.com/alpentech)

**Samuel LIEVRE** _alias_ [@slievre](https://github.com/slievreATI)

## 🔒 **License**


