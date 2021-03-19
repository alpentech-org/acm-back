const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.getConfigRights = (req, res, next, id) => {
  User.findOne({
      _id: id
    }).then(
      (user) => {
        if (user.configAdmin) {
          next()
        } else {
          res.status(401).json({
            error: "Droits insuffisants",
          })
        }
      }
    )
    .catch(
      (error) => {
        res.status(404).json({
          error: `Utilisateur courant (${id}) non trouvé`,
        })
      }
    );
};
