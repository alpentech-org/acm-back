const config = require('../config/config');
const moment = require('moment');
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
      res.status(200).json(machineList);
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

exports.getStatusList = (req, res, next) => {

  if (!req.query || !req.query.start || !req.query.end || !req.query.machineId) {
    res.status(400).send({
      error: "Paramètre de requête manquant"
    });
  }

  let formattedStart = moment(req.query.start).format('YYYY-MM-DD HH:mm:ss.SSS');
  let formattedEnd = moment(req.query.end).format('YYYY-MM-DD HH:mm:ss.SSS');

  var connection = new Connection(sqlConfig);
  // connection.on('debug', msg => {
  //   console.log('CONNECTION DEBUG : ' + msg);
  // });

  connection.on('connect', function(err) {
    let coscomRequest = new Request('\
    SELECT TSF_RES_INTERVAL.RES_ID, TRS_RES.DISPLAYNAME_FR, TSF_RES_INTERVAL.BEGIN_TS, TSF_RES_INTERVAL.END_TS, TRS_RES_STATUS.RES_STATUS_ID, TRS_RES_STATUS.DISPLAYNAME_FR, TSF_RES_INTERVAL.KOMMENTAR\
    FROM (TSF_RES_INTERVAL INNER JOIN TRS_RES ON TSF_RES_INTERVAL.RES_ID = TRS_RES.RES_ID) INNER JOIN TRS_RES_STATUS ON TSF_RES_INTERVAL.RES_STATUS_ID = TRS_RES_STATUS.RES_STATUS_ID\
    WHERE (((TRS_RES.RES_ID)=\'' + req.query.machineId + '\') AND ((TSF_RES_INTERVAL.END_TS)>=\'' + formattedStart + '\') AND ((TSF_RES_INTERVAL.BEGIN_TS)<=\'' + formattedEnd + '\'))\
    ORDER BY TRS_RES.DISPLAYNAME_FR, TSF_RES_INTERVAL.CAL_DAY, TSF_RES_INTERVAL.BEGIN_TS;\
        ', function(err) {
      if (err) {
        res.json(err);
      }
    });
    var statusList = [];
    var status = {};
    coscomRequest.on('row', function(columns) {
      let i = 0;
      columns.forEach(function(column) {
        if (i === 0) {
          status.machineId = column.value;
        } else if (i === 1) {
          status.machineName = column.value;
        } else if (i === 2) {
          status.start = column.value;
        } else if (i === 3) {
          status.end = column.value;
        } else if (i === 4) {
          status.statusId = column.value;
        } else if (i === 5) {
          status.statusName = column.value;
        } else if (i === 6) {
          status.comment = column.value;
        }
        i++;
      });
      statusList.push(status);
      status = {};
    });

    coscomRequest.on('requestCompleted', function() {
      connection.close();
      if (statusList.length) {
        res.status(200).json(statusList);
      } else {
        res.status(204).send();
      }

    });

    connection.execSql(coscomRequest);

  });

  connection.connect();

};
