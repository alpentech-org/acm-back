/**
 * @module app
 * @description Ce fichier permet de créer l'application Express et de la configurer,
 *  ainsi que de gérer les routes de l'API en fonction des fichiers de routes présents dans le dossier ./routes
 * @version 1.0.0
 * @module app
 * @requires Express 
 * @see {@link https://expressjs.com/fr/|Express}
 * @requires body-parser
 * @see {@link https://www.npmjs.com/package/body-parser|body-parser}
 * @requires mongoose
 * @see {@link https://mongoosejs.com/|mongoose}
 * @requires paths
 * @see {@link https://nodejs.org/api/path.html|path}
 * 
 * 
*/

const EXPRESS = require('express');
const BODYPARSER = require('body-parser');
const MONGOOSE = require('mongoose');
const PATH = require('path');

/** 
 * - Fichier de configuration de l'application
 * @const {{}}
 * @property {number} port - Le port sur lequel le serveur doit écouter
 * @property {string} dbName - Le nom de la base de données
 * @property {string} dbPort - Le port sur lequel la base de données écoute
 * @property {string} dbUrl - L'adresse de la base de données
 * @property {string} ellisettingUrl - L'adresse de l'API ellisetting
 * @property {string} ellisettingApiKey - La clé d'API de l'API ellisetting
 * @property {string} ellisettingUsername - Le nom d'utilisateur de l'API ellisetting
 */
const CONFIG = require('./config/config');

/** 
 * - Middleware d'authentification
 * @const {}
*/
const AUTH_MIDDLEWARE = require('./src/middleware/auth')

// Fichiers de gestion des routes de l'API 
/**
 * - Routes de l'API relatives à la gestion des paires de machines
 * @const {}
 */
const MACHINE_PEERING_ROUTES = require('./src/routes/machinePeering');

/**
 * - Routes de l'API relatives à la gestion des utilisateurs
 * @const {} 
 */
const USER_ROUTES = require('./src/routes/user');

/**
 * - Routes de l'API relatives à l'API ElliStat
 * @const {}
 */
const ELLISETTING_ROUTES = require('./src/routes/ellisetting');

/**
 * - Routes de l'API relatives à l'API Coscom pour la gestion des machines du côté de Coscom
 * @const {}
*/

const COSCOM_ROUTES = require('./src/routes/coscom');

/**
 * - Routes de l'API relatives à la gestion des contextes
 * @const {}
*/
const CONTEXTS_ROUTES = require('./src/routes/contexts');

/**
 * Applicatin express
 * @type {Express}
 * @const
 * @namespace app
 */
const APP = EXPRESS();


const DB_CONNECTION_STRING = CONFIG.dbUrl + ':' + CONFIG.dbPort + '/' + CONFIG.dbName;

// Connexion à la base de données MongoDB
MONGOOSE.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`Connexion à MongoDB/${CONFIG.dbName} réussie !`))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

APP.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  if ('OPTIONS' == req.method) {
    res.sendStatus(204);
  } else {
    next();
  }
});

// Ici on indique à Express qu'il faut utiliser le dossier dist/alpen-front pour les ressources statiques
// On va utiliser le dossier comme front-end
APP.use(EXPRESS.static(PATH.join(__dirname, 'dist/alpen-front')));

// On indique à Express qu'il faut gérer la requête en json
APP.use(BODYPARSER.json());


/**
 * Routes de l'API
 * /api:
 * - /auth: Routes de l'API relatives à l'authentification des utilisateurs
 *    -> /signup : [POST] Route pour l'inscription d'un utilisateur
 *    -> /login : [POST] Route pour la connexion d'un utilisateur
 *    -> /users : [GET] Route pour récupérer tous les utilisateurs
 *       => /setrights/:id : [PUT] Route pour modifier les droits d'un utilisateur avec son id
 *       => /:id : [DELETE] Route pour supprimer un utilisateur avec son id
 *       => /:id : [GET] Route pour récupérer un utilisateur avec son id
 * 
 * - /ellisetting: Routes de l'API relatives à ElliSetting 
 *    -> /machines/:id : [GET] Route pour récupérer les informations d'une machine avec son id
 *    -> /parts/:id : [GET] Route pour récupérer les informations d'une pièce avec son id
 *    -> /parts : [GET] Route pour récupérer les informations de toutes les pièces
 *    -> /measures : [GET] Route pour récupérer les informations de toutes les mesures
 *    -> /measuresByTimeAndPart: [GET] Route pour récupérer les informations d'une mesure en funtion du temps et de la pièce
 *    -> /measuresByTimeAndMachine : [GET] Route pour récupérer les informations d'une mesure en fonction du temps et de la machine
 *    -> /contexts : [GET] Route pour récupérer les contextes
 *    -> /dimensions : [GET] Cette route est utilisée pour récupérer la liste des dimensions
 *
 * 
 * - /coscom: Routes de l'API relatives à Coscom
 *    -> /machines : [GET] Route pour récupérer les informations de toutes les machines
 *    -> /machines/:id : [GET] Route pour récupérer les informations d'une machine avec son id
 *    -> /statuslist : [GET] Route pour récupérer la liste des status
 * 
 * - /machinePeering: Routes de l'API relatives à la gestion des paires de machines
 *    -> / : [GET] Route pour récupérer toutes les paires de machines
 *    -> / : [POST] Route pour ajouter une paire de machines
 *    -> /:id : [GET] Route pour récupérer une paire de machines avec son id 
 *    -> /:id : [PUT] Route pour modifier une paire de machines avec son id
 *    -> /:id : [DELETE] Route pour supprimer une paire de machines avec son id
 * 
 *  - /contexts: Routes de l'API relatives à la gestion des contextes
 *    -> /adjustments : [GET] Route pour récupérer les ajustements 
 */

APP.use('/api/auth', USER_ROUTES);

APP.use('/api/ellisetting', AUTH_MIDDLEWARE, ELLISETTING_ROUTES);

APP.use('/api/coscom', AUTH_MIDDLEWARE, COSCOM_ROUTES);

APP.use('/api/machinePeering', AUTH_MIDDLEWARE, MACHINE_PEERING_ROUTES);

APP.use('/api/contexts', AUTH_MIDDLEWARE, CONTEXTS_ROUTES);

// Catch all other routes and return the index file
if (CONFIG.env === 'PROD') {
  APP.get('*', (req, res) => {
    res.sendFile(PATH.join(__dirname, 'dist/alpen-front/index.html'));
  });
}

APP.use((req, res) => {
  res.json({
    message: 'Réponse Serveur !'
  });
});

module.exports = APP;
