const express = require('express');
const router = express.Router();

const ellisettingCtrl = require('../controllers/ellisetting');

router.get('/machines', ellisettingCtrl.getMachines);

module.exports = router;
