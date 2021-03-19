const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    minLentgh: [3, "Le login doit faire au moins 3 caractères"],
    maxLentgh: [50, "Le login doit faire au plus 50 caractères"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  coscomAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  qualityAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  configAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
});

userSchema.path('email').validate(function (email) {
   var alpenEmailRegex = /^[a-zA-Z0-9-\.]*@alpen-tech.com$/;
   return alpenEmailRegex.test(email); // Assuming email has a text attribute
}, 'L\'email doit être valide');

userSchema.plugin(uniqueValidator, { message: 'La propriété {PATH} doit être unique'});

module.exports = mongoose.model('User', userSchema);
