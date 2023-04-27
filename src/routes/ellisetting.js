
/** Express router providing user related routes
 * @module routers/users
 * @requires express
 */

/**
 * express module
 * @const
 */

const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace usersRouter
 * 
 */
const router = express.Router();


const ellisettingCtrl = require('../controllers/ellisetting');

/**
 * Route serving login form.
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner 
 * @route {GET} /login
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/machines', ellisettingCtrl.getMachines); // Cette route est utilisée pour récupérer la liste des machines

/**
 * Health check
 * @memberof module:routers/users~usersRouter   
 * @function
 * @name happy
 */
router.get('/machines/:id', ellisettingCtrl.getMachineById); // Cette route est utilisée pour récupérer les infos d'une machine
router.get('/parts/:id', ellisettingCtrl.getPartById);  // Cette route est utilisée pour récupérer les infos d'une pièce
router.get('/parts', ellisettingCtrl.getParts); // Cette route est utilisée pour récupérer la liste des pièces
router.get('/measures', ellisettingCtrl.getMeasures);   // Cette route est utilisée pour récupérer la liste des mesures
router.get('/measuresByTimeAndPart', ellisettingCtrl.getMeasuresByTimeAndPart); // Cette route est utilisée pour récupérer les mesures d'une pièce
router.get('/measuresByTimeAndMachine', ellisettingCtrl.getMeasuresByTimeAndMachine);   // Cette route est utilisée pour récupérer les mesures d'une machine
router.get('/contexts', ellisettingCtrl.getContexts);   // Cette route est utilisée pour récupérer la liste des contextes
router.get('/dimensions', ellisettingCtrl.getDimensions);   // Cette route est utilisée pour récupérer la liste des dimensions

module.exports = router;
