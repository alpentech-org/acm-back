const MachinePeering = require('../models/MachinePeering');

exports.createMachinePeering = (req, res, next) => {
  const machinePeering = new MachinePeering({
    name: req.body.name,
    ellisettingId: req.body.ellisettingId,
    coscomId: req.body.coscomId,
    coscomAutoMode: req.body.coscomAutoMode,
  });
  machinePeering.save().then(
    () => {
      res.status(201).json({
        message: 'MachinePeering saved successfully!'
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

exports.getOneMachinePeering = (req, res, next) => {
  MachinePeering.findOne({
    _id: req.params.id
  }).then(
    (machinePeering) => {
      res.status(200).json(machinePeering);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyMachinePeering = (req, res, next) => {
  const machinePeering = new MachinePeering({
    _id: req.params.id,
    name: req.body.name,
    ellisettingId: req.body.ellisettingId,
    coscomId: req.body.coscomId,
    coscomAutoMode: req.body.coscomAutoMode,
  });
  MachinePeering.updateOne({
    _id: req.params.id
  }, machinePeering).then(
    () => {
      res.status(201).json({
        message: 'MachinePeering updated successfully!'
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

exports.deleteMachinePeering = (req, res, next) => {
  MachinePeering.deleteOne({
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

exports.getAllMachinePeerings = (req, res, next) => {
  MachinePeering.find().then(
    (machinePeerings) => {
      res.status(200).json(machinePeerings);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};
