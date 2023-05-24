const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const config = require('../../config/config');

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
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(500).json(error));
};

exports.login = (req, res, next) => {
  User.findOne({
    login: req.body.login
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          error: 'Login / Mot de passe incorrect'
        });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({
              error: 'Login / Mot de passe incorrect'
            });
          }
          let expiresIn = 3600; // Expiration en secondes
          res.status(200).json({
            token: jwt.sign({
              userId: user._id,
              rights: user.rights,
              login: user.login,
            },
              config.jwt_secret, {
              expiresIn: expiresIn
            }
            ),
            expiresIn: expiresIn,
          });
        })
        .catch(error => {
          res.status(500).json(error)
        });
    })
    .catch(error => res.status(500).json(error));
};

exports.setRights = (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    res.status(404).json({
      message: `Champ id manquant ou mal défini`
    });
  }
  User.findOne({
    _id: id
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
            status: "done"
          })
        )
        .catch(
          (error) => {
            res.status(400).json({
              error: {
                message: `Échec de l'update du user ${id}`
              }
            })
          }
        )
    }
  )
    .catch(
      (error) => {
        res.status(404).json({
          error: {
            message: `Utilisateur ${id} non trouvé`
          },
        })
      }
    );
};

exports.deleteUser = (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    res.status(404).json({
      message: `Champ id manquant ou mal défini`
    });
  }
  User.deleteOne({
    _id: id
  }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json(error);
    }
  );
};

exports.getAllUsers = (req, res, next) => {
  User.find({}).then(
    (users) => {
      res.status(200).json(users.map(user => {
        const { password, ...newUsers } = user;
        return newUsers;
      }));
    }
  ).catch(
    (error) => {
      res.status(400).json(error);
    }
  );
};

exports.getUserById = (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    res.status(404).json({
      message: `Champ id manquant ou mal défini`
    });
  }
  User.findOne({
    _id: id
  }).then(
    (user) => {
      res.status(200).json(Object.fromEntries(Object.entries(user).filter(e => e[0] != 'password')));
    }
  ).catch(
    (error) => {
      res.status(400).json(error);
    }
  );
}
