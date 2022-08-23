const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const configAuth = require('../middleware/configAuth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/users/setrights/:id', configAuth, userCtrl.setRights)
router.put('/users/setfavorites/:id', userCtrl.setFavorites)
router.delete('/users/:id', configAuth, userCtrl.deleteUser)
//router.get('/users/:id', configAuth, userCtrl.getUserById)
router.get('/users/:id', userCtrl.getUserById) //Il faudra modifier cette route pour éviter que tout le monde puisse voir les droits de tout le monde.
//À terme, seul ""/users/getfavorites/:id" sera accessible sans droit d'admin
router.get('/users', configAuth, userCtrl.getAllUsers)

module.exports = router;
