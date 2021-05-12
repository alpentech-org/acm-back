let config = {
    port: process.env.ENV === 'PROD' ? process.env.PROD_PORT : (process.env.ENV === 'DEV' ? process.env.DEV_PORT : false),
    dbName: process.env.ENV === 'PROD' ? process.env.PROD_DB : (process.env.ENV === 'DEV' ? process.env.DEV_DB : false),
    dbPort: process.env.DB_PORT,
    dbUrl: process.env.DB_URL,
    ellisettingUrl: process.env.ELLISETTING_URL,
    ellisettingApiKey: process.env.ELLISETTING_API_KEY,
    ellisettingUsername: process.env.ELLISETTING_USERNAME,
}

module.exports = config;
