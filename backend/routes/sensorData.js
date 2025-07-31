const express = require('express');
const router = express.Router();
const sensorDataController = require('../controllers/sensorDataController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { hasPermission } = require('../middlewares/permissionMiddleware');

// Secure POST
router.post('/', authMiddleware, hasPermission('add_sensor_data'), sensorDataController.createSensorData);

// ✅ Public POST route for ESP (no auth)
router.post('/esp', sensorDataController.createSensorData);

// GET realtime data
router.get('/realtime', authMiddleware, hasPermission('view_real_time_data'), sensorDataController.getRealtimeData);

// GET historical data
router.get('/history', authMiddleware, hasPermission('view_historical_data'), sensorDataController.getHistoricalData);

module.exports = router;
