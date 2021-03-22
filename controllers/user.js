const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        login: req.body.login,
        email: req.body.email,
        password: hash,
        rights: {
          coscomAdmin: false,
          qualityAdmin: false,
          configAdmin: false,
        },
      });
      user.save()
        .then(() => res.status(201).json({
          message: 'Utilisateur créé'
        }))
        .catch(error => res.status(400).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};

exports.login = (req, res, next) => {
  User.findOne({
      login: req.body.login
    })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Utilisateur non trouvé'
        });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Mot de passe incorrect'
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({
                userId: user._id
              },
              'RANDOM_TOKEN_SECRET', {
                expiresIn: '24h'
              }
            ),
            expiresIn: '24h',
          });
        })
        .catch(error => res.status(500).json({
          error
        }));
    })
    .catch(error => res.status(500).json({
      error
    }));
};

exports.setRights = (req, res, next) => {
  User.findOne({
      _id: req.params.id
    }).then(
      (user) => {
        if (req.body.rights) {
          user.rights.coscomAdmin = req.body.rights.coscomAdmin ? true : false;
          user.rights.qualityAdmin = req.body.rights.qualityAdmin ? true : false;
          if (req.body.rights.configAdmin) {
            user.rights.configAdmin = true;
          }
        }
        user.save()
          .then(
            () => res.status(201).json({
              message: 'Droits modifiés'
            })
          )
          .catch(
            (error) => {
              res.status(400).json({
                error: {message: `Échec de l'update du user ${req.params.id}`}
              })
            }
          )
      }
    )
    .catch(
      (error) => {
        res.status(404).json({
          error: {message: `Utilisateur ${req.params.id} non trouvé`},
        })
      }
    );
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({
    _id: req.params.id
  }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
