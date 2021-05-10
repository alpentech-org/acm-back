const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const contextsCtrl = require('../controllers/contexts');

router.get('/adjustment', contextsCtrl.getAdjustmentContexts);

module.exports = router;
