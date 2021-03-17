const express = require('express');
const router = express.Router();

const machinePeeringCtrl = require('../controllers/machinePeering');

router.get('/', machinePeeringCtrl.getAllMachinePeerings);
router.post('/', machinePeeringCtrl.createMachinePeering);
router.get('/:id', machinePeeringCtrl.getOneMachinePeering);
router.put('/:id', machinePeeringCtrl.modifyMachinePeering);
router.delete('/:id', machinePeeringCtrl.deleteMachinePeering);

module.exports = router;
