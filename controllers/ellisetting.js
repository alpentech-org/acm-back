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

exports.getParts = (req, res, next) => {

  axios.get(config.ellisettingUrl + '/pieces', {
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

exports.getMeasuresByTimeAndPart = (req, res, next) => {

  if (!req.query || !req.query.start || !req.query.end || !req.query.partId) {
    res.status(400).send({error: "Paramètre de requête manquant"});
  }

  let uri = config.ellisettingUrl + '/mesureHistoriques?q={"$and" : [{"date": { "$gt" : "' + req.query.start +
    '"}},{"date": { "$lt" : "' + req.query.end + '"}},{"pieceId": { "$eq" : "' + req.query.partId + '"}}]}'
  axios.get(uri, {
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
}

exports.getMeasuresByTimeAndMachine = (req, res, next) => {

  if (!req.query || !req.query.start || !req.query.end || !req.query.machineId) {
    res.status(400).send({error: "Paramètre de requête manquant"});
  }

  let uri = config.ellisettingUrl + '/mesureHistoriques?q={"$and" : [{"date": { "$gt" : "' + req.query.start +
    '"}},{"date": { "$lt" : "' + req.query.end + '"}},{"machineId": { "$eq" : "' + req.query.machineId + '"}}]}'
  axios.get(uri, {
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
}

exports.getMeasures = (req, res, next) => {

  if (!req.query || !req.query.start || !req.query.end || !req.query.partId || !req.query.machineId) {
    res.status(400).send({error: "Paramètre de requête manquant"});
  }

  let uri = config.ellisettingUrl + '/mesureHistoriques?q={"$and" : [{"date": { "$gt" : "' + req.query.start +
    '"}},{"date": { "$lt" : "' + req.query.end + '"}},{"machineId": { "$eq" : "' + req.query.machineId + '"}},' +
    '{"pieceId": { "$eq" : "' + req.query.partId + '"}}]}'
  axios.get(uri, {
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
}

exports.getContexts = (req, res, next) => {
  axios.get(config.ellisettingUrl + '/contextes', {
    headers: ellisettingRequestHeaders
  }).then((elliRes) => {
    if (elliRes.status == 200) {
      res.status(200).json(elliRes.data);
    } else {
      res.json({
        error: 'Statut de la réponse d\'ellisetting != 200'
      });
    }
  })
}

exports.getDimensions = (req, res, next) => {

  if (!req.query || !req.query.partId) {
    res.status(400).send({error: "Paramètre de requête manquant"});
  }

  let queryParam = (req.query.partId === 'all') ? '' : ('?pieceId=' + req.query.partId);

  axios.get(config.ellisettingUrl + '/cotes' + queryParam, {
    headers: ellisettingRequestHeaders
  }).then((elliRes) => {
    if (elliRes.status == 200) {
      res.status(200).json(elliRes.data);
    } else {
      res.json({
        error: 'Statut de la réponse d\'ellisetting != 200'
      });
    }
  })
}
