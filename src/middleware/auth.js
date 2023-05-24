const jwt = require('jsonwebtoken');
const config = require("../config/config")

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.jwt_secret);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Token utilisateur invalide';
    } else {
      next();
    }
  } catch {
    console.log('Échec Authentification');
    res.status(401).json({
      error: 'Requête invalide',
    });
  }
};
