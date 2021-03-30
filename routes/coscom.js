const express = require('express');
const router = express.Router();

const coscomCtrl = require('../controllers/coscom');

router.get('/machines', coscomCtrl.getMachines);

module.exports = router;
