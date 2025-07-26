const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { hasPermission } = require('../middlewares/permissionMiddleware');

// GET /api/alerts
router.get('/', authMiddleware, hasPermission('view_resolve_alerts'), alertController.getAlerts);

// GET /api/alerts/summary
router.get('/summary', authMiddleware, hasPermission('view_resolve_alerts'), alertController.getAlertSummary);

// POST /api/alerts
router.post('/', authMiddleware, hasPermission('add_alerts'), alertController.createAlert);

module.exports = router;
