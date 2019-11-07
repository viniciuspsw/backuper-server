const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  project: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Project',
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'error'],
    required: true,
  },
  errorDetails: {
    type: String,
  },
  name: {
    type: String,
  },
  url: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Backup', schema);
