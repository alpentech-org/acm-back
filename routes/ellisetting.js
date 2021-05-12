const express = require('express');
const router = express.Router();

const ellisettingCtrl = require('../controllers/ellisetting');

router.get('/machines', ellisettingCtrl.getMachines);
router.get('/machines/:id', ellisettingCtrl.getMachineById);
router.get('/parts', ellisettingCtrl.getParts);
router.get('/measures', ellisettingCtrl.getMeasures);
router.get('/measuresByTimeAndPart', ellisettingCtrl.getMeasuresByTimeAndPart);
router.get('/measuresByTimeAndMachine', ellisettingCtrl.getMeasuresByTimeAndMachine);
router.get('/contexts', ellisettingCtrl.getContexts);
router.get('/dimensions', ellisettingCtrl.getDimensions);

module.exports = router;
