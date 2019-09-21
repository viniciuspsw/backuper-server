const mongoose = require('mongoose');

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
      .then(() => resolve())
      .catch(err => reject(err));
  });
};

module.exports = {
  connect,
};
