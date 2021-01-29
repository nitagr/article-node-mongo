const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model('User', UserSchema);
