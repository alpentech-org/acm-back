let config = {
    port: process.env.ENV === 'PROD' ? process.env.PROD_PORT : (process.env.ENV === 'DEV' ? process.env.DEV_PORT : false),
    dbName: process.env.ENV === 'PROD' ? process.env.PROD_DB : (process.env.ENV === 'DEV' ? process.env.DEV_DB : false),
}

module.exports = config;
