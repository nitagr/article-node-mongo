const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

  username: { type: String, required: true },
  password: { type: String, select: false },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
      return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
      done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);