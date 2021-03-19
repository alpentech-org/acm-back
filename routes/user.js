const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const configAuth = require('../middleware/configAuth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/setrights/:id', configAuth, userCtrl.setRights)

module.exports = router;
