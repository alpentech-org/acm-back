
/**
 * la variable config est un objet qui contient les variables d'environnement
 * @typedef {{}} Config 
 * @property {number} port - Le port sur lequel le serveur doit écouter
 * @property {string} dbName - Le nom de la base de données
 * @property {string} dbPort - Le port sur lequel la base de données écoute
 * @property {string} dbUrl - L'adresse de la base de données
 * @property {string} ellisettingUrl - L'adresse de l'API ellisetting
 * @property {string} ellisettingApiKey - La clé d'API de l'API ellisetting
 * @property {string} ellisettingUsername - Le nom d'utilisateur de l'API ellisetting
 * 
 */
let config = {
    port: process.env.ENV === 'PROD' ? 3000 : (process.env.ENV === 'DEV' ? 3099 : false),
    dbName: process.env.ENV === 'PROD' ? process.env.PROD_DB : (process.env.ENV === 'DEV' ? process.env.DEV_DB : false),
    dbPort: process.env.DB_PORT,
    dbUrl: process.env.DB_URL,
    ellisettingUrl: process.env.ELLISETTING_URL,
    ellisettingApiKey: process.env.ELLISETTING_API_KEY,
    ellisettingUsername: process.env.ELLISETTING_USERNAME,
}

// module.exports permet de rendre l'objet config accessible depuis d'autres fichiers en utilisant require()
/**
 * @return {Config}
 */
module.exports = config;
