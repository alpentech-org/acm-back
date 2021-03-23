const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const configAuth = require('../middleware/configAuth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/setrights/:id', configAuth, userCtrl.setRights)
router.delete('/delete/:id', configAuth, userCtrl.deleteUser)
router.get('/users', configAuth, userCtrl.getAllUsers)

module.exports = router;
