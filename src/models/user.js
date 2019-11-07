const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
}, {
  timestamps: true,
});

schema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  next();
});

schema.methods.checkPassword = async function (hash) {
  return bcrypt.compare(hash, this.password);
};

module.exports = mongoose.model('User', schema);
