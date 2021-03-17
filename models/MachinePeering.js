const mongoose = require('mongoose');

const machinePeeringSchema = mongoose.Schema({
  name: { type: String, required: true },
  ellisettingId: { type: String, required: true },
  coscomId: { type: String },
  coscomAutoMode: { type: Boolean },
});

module.exports = mongoose.model('MachinePeering', machinePeeringSchema);
