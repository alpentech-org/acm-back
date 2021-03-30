const request = require('request');

const config = require('../config/config');

const ellisettingRequestHeaders = {
  apiKey: config.ellisettingApiKey,
  username: config.ellisettingUsername,
}

exports.getMachines = (req, res, next) => {
  return req.pipe(request({
    uri: config.ellisettingUrl + '/machines',
    headers: ellisettingRequestHeaders,
  })).pipe(res);
};
