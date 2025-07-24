const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  boreholeId: {
    type: String,
    required: true
  },
  waterLevel: {
    type: Number,
    required: true
  },
  pumpVibration: {
    type: Number,
    required: true
  },
  pumpStatus: {
    type: String,
    enum: ['ON', 'OFF'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
