const express = require('express');
const router = express.Router();

const ellisettingCtrl = require('../controllers/ellisetting');

router.get('/machines', ellisettingCtrl.getMachines);
router.get('/machines/:id', ellisettingCtrl.getMachineById);
router.get('/parts', ellisettingCtrl.getParts);
router.get('/measuresByTimeAndPart', ellisettingCtrl.getMeasuresByTimeAndPart);

module.exports = router;
