const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/ellisetting');

router.get('/machines', userCtrl.getMachines);

module.exports = router;
