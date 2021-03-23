const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Token utilisateur invalide';
    } else {
      authService.getRights(req, res, next, userId, 'coscom');
    }
  } catch {
    res.status(401).json({
      error: 'Requête invalide',
    });
  }
};
