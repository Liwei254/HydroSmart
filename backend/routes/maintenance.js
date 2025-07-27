const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

router.get('/last', authMiddleware, async (req, res) => {
  try {
    // Simulate fetching from DB. Replace with actual DB logic
    const lastMaintenanceDate = new Date("stats.lastMaintainance.daySince").toLocaleDateString();
    res.json({ date: lastMaintenanceDate });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch maintenance date' });
  }
});

module.exports = router;
