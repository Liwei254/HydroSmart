const express = require('express');
const router = express.Router();
const sensorDataController = require('../controllers/sensorDataController');

// POST /api/sensor-data
router.post('/', sensorDataController.createSensorData);

// GET /api/sensor-data/realtime
router.get('/realtime', sensorDataController.getRealtimeData);

// GET /api/sensor-data/history
router.get('/history', sensorDataController.getHistoricalData);

module.exports = router;
