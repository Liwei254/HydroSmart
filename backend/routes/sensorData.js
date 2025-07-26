const express = require('express');
const router = express.Router();
const sensorDataController = require('../controllers/sensorDataController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { hasPermission } = require('../middlewares/permissionMiddleware');

// POST /api/sensor-data
router.post('/', authMiddleware, hasPermission('add_sensor_data'), sensorDataController.createSensorData);

// GET /api/sensor-data/realtime
router.get('/realtime', authMiddleware, hasPermission('view_real_time_data'), sensorDataController.getRealtimeData);

// GET /api/sensor-data/history
router.get('/history', authMiddleware, hasPermission('view_historical_data'), sensorDataController.getHistoricalData);

module.exports = router;
