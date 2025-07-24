const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  boreholeId: {
    type: String,
    required: true
  },
  alertType: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  resolved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Alert', AlertSchema);
