const request = require('request');

const config = require('../config/config');

const ellisettingRequestHeader = {
  apikey: config.ellisettingApiKey,
  username: config.ellisettingUsername,
}

exports.getMachines = (req, res, next) => {
  return req.pipe(request({
    uri: config.ellisettingUrl + '/machines',
    headers: ellisettingRequestHeader,
  })).pipe(res);
};
