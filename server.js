
/**
 * On importe la librairie dotenv pour gérer les variables d'environnement
 */
require('dotenv').config();

// Le module http de Node.js permet de créer un serveur web
const http = require('http');

// On importe ./app.js qui est le fichier qui contient notre application Express

const app = require('./app');

// Le fichier config.js contient les paramètres de configuration de l'application
const config = require('./config/config');

/**
 * La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
 * @param {string} val - Le port à normaliser
 * @returns {number|string|boolean} - Le port normalisé
 * @throws {Error} - Si le port n'est pas valide
 * 
 */
const normalizePort = val => {
  const port = parseInt(val, 10);



  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(config.port);
app.set('port', port);

/**
 * la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
 * si l'erreur est différente de listen, elle est rejetée 
 * sinon, on récupère l'adresse du serveur et on la stocke dans la constante address
 * on vérifie ensuite si l'adresse est une chaîne de caractères ou un numéro de port
 * @param {Error} error - L'erreur à gérer
 * @returns {string} - Le message d'erreur
 * 
 * 
 */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
