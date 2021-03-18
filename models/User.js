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
});

userSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email.text); // Assuming email has a text attribute
}, 'L\'email doit être valide');

userSchema.plugin(uniqueValidator, { message: 'La propriété {PATH} doit être unique'});

module.exports = mongoose.model('User', userSchema);
