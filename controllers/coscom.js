const config = require('../config/config');
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

const sqlConfig = {
  server: 'srvsql3',
  authentication: {
    type: 'default',
    options: {
      userName: 'report',
      password: '',
    }
  },
  options: {
    trustServerCertificate: true,
  }
};

exports.getMachines = (req, res, next) => {

  var connection = new Connection(sqlConfig);
  // connection.on('debug', msg => {
  //   console.log('CONNECTION DEBUG : ' + msg);
  // });

  connection.on('connect', function(err) {
    let coscomRequest = new Request('\
      SELECT TRS_RES.RES_ID, TRS_RES.DISPLAYNAME_FR\
      FROM TRS_RES\
      WHERE (TRS_RES.RES_TYPE_ID=\'C_MACH\')\
      ORDER BY TRS_RES.DISPLAYNAME_FR;\
        ', function(err) {
      if (err) {
        res.json(err);
      }
    });
    var machineList = [];
    var machine = {};
    coscomRequest.on('row', function(columns) {
      let i = 0;
      columns.forEach(function(column) {
        if (i === 0) {
          machine.id = column.value;
        } else if (i === 1) {
          machine.name = column.value;
        }
        i++;
      });
      machineList.push(machine);
      machine = {};
    });

    coscomRequest.on('requestCompleted', function() {
      connection.close();
      res.json(machineList);
    });

    connection.execSql(coscomRequest);

  });

  connection.connect();

};

exports.getMachineById = (req, res, next) => {

  let id = req.params.id;

  var connection = new Connection(sqlConfig);
  // connection.on('debug', msg => {
  //   console.log('CONNECTION DEBUG : ' + msg);
  // });

  connection.on('connect', function(err) {
    let coscomRequest = new Request('\
      SELECT TRS_RES.RES_ID, TRS_RES.DISPLAYNAME_FR\
      FROM TRS_RES\
      WHERE (TRS_RES.RES_TYPE_ID=\'C_MACH\') AND (TRS_RES.RES_ID=\'' + id + '\')\
      ORDER BY TRS_RES.DISPLAYNAME_FR;\
        ', function(err) {
      if (err) {
        res.json(err);
      }
    });
    var machineList = [];
    var machine = {};
    coscomRequest.on('row', function(columns) {
      let i = 0;
      columns.forEach(function(column) {
        if (i === 0) {
          machine.id = column.value;
        } else if (i === 1) {
          machine.name = column.value;
        }
        i++;
      });
      machineList.push(machine);
      machine = {};
    });

    coscomRequest.on('requestCompleted', function() {
      connection.close();
      if (machineList.length) {
        res.status(200).json(machineList[0]);
      } else {
        res.status(204).send();
      }

    });

    connection.execSql(coscomRequest);

  });

  connection.connect();

};
