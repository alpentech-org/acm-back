const axios = require('axios').default;

const config = require('../config/config');

const ellisettingRequestHeaders = {
  apiKey: config.ellisettingApiKey,
  username: config.ellisettingUsername,
}

exports.getMachines = (req, res, next) => {
  axios.get(config.ellisettingUrl + '/machines', {
      headers: ellisettingRequestHeaders
    })
    .then((elliRes) => {
      if (elliRes.status == 200) {
        res.status(200).json(elliRes.data);
      } else {
        res.json({
          error: 'Statut de la réponse d\'ellisetting != 200'
        });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

exports.getMachineById = (req, res, next) => {

  let id = req.params.id;

  axios.get(config.ellisettingUrl + '/machines?_id=' + id, {
      headers: ellisettingRequestHeaders
    })
    .then((elliRes) => {
      if (elliRes.status == 200) {
        if (elliRes.data.length) {
          res.status(200).json(elliRes.data[0]);
        } else {
          res.status(204).send();
        }
      } else {
        res.json({
          error: 'Statut de la réponse d\'ellisetting != 200'
        });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });

};
