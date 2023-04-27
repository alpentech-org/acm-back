/**
 * @file user.js
 * @description Ce fichier contient les routes de l'API pour les utilisateurs
 *  
 */


const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

const USER_CONTROLLER = require('../controllers/user');
const AUTH_CONFIG = require('../middleware/configAuth');

ROUTER.post('/signup', USER_CONTROLLER.signup);
ROUTER.post('/login', USER_CONTROLLER.login);
ROUTER.put('/users/setrights/:id', AUTH_CONFIG, USER_CONTROLLER.setRights)
ROUTER.delete('/users/:id', AUTH_CONFIG, USER_CONTROLLER.deleteUser)
ROUTER.get('/users/:id', AUTH_CONFIG, USER_CONTROLLER.getUserById)
ROUTER.get('/users', AUTH_CONFIG, USER_CONTROLLER.getAllUsers)

module.exports = ROUTER;
