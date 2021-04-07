const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const machinePeeringSchema = mongoose.Schema({
  name: {
    type: String,
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
    unique: true,
  },
  coscomAutoMode: {
    type: Boolean,
  },
});

machinePeeringSchema.plugin(uniqueValidator, { message: 'La propriété {PATH} doit être unique'});

module.exports = mongoose.model('MachinePeering', machinePeeringSchema);
