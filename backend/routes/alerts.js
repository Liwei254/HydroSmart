const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

// GET /api/alerts
router.get('/', alertController.getAlerts);

// GET /api/alerts/summary
router.get('/summary', alertController.getAlertSummary);

module.exports = router;
