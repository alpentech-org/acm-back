const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const configAuth = require('../middleware/configAuth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/users/setrights/:id', configAuth, userCtrl.setRights)
router.delete('users/:id', configAuth, userCtrl.deleteUser)
router.get('/users/:id', configAuth, userCtrl.getUserById)
router.get('/users', configAuth, userCtrl.getAllUsers)

module.exports = router;
