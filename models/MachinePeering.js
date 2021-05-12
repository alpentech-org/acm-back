const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const machinePeeringSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Le nom est obligatoire"],
    minLength: [3, "Le nom doit faire au moins 3 caractères"],
    maxLength: [50, "Le nom fait au maximum 50 caractères"],
    unique: [true, "Le nom doit être unique"],
  },
  ellisettingId: {
    type: String,
    unique: true,
    required: [true, "L'id ellisetting est obligatoire"],
  },
  coscomId: {
    type: String,
  },
  coscomAutoMode: {
    type: Boolean,
    required: [true, "Le mode auto coscom est obligatoire"],
  },
});

machinePeeringSchema.index({
  coscomId: 1
}, {
  unique: true,
  partialFilterExpression: {
    'coscomId': {
      $type: "string"
    }
  }
});

machinePeeringSchema.plugin(uniqueValidator, {
  message: 'La propriété {PATH} doit être unique'
});

module.exports = mongoose.model('MachinePeering', machinePeeringSchema);
