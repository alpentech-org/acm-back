const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const machinePeeringCtrl = require('../controllers/machinePeering');

router.get('/', machinePeeringCtrl.getAllMachinePeerings);
router.post('/', auth, machinePeeringCtrl.createMachinePeering);
router.get('/:id', machinePeeringCtrl.getOneMachinePeering);
router.put('/:id', auth, machinePeeringCtrl.modifyMachinePeering);
router.delete('/:id', auth, machinePeeringCtrl.deleteMachinePeering);

module.exports = router;
