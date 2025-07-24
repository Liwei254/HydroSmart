const SensorData = require('../models/SensorData');

// POST /api/sensor-data
exports.createSensorData = async (req, res) => {
  try {
    const { boreholeId, waterLevel, pumpVibration, pumpStatus, timestamp } = req.body;

    if (!boreholeId || waterLevel === undefined || pumpVibration === undefined || !pumpStatus) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const sensorData = new SensorData({
      boreholeId,
      waterLevel,
      pumpVibration,
      pumpStatus,
      timestamp: timestamp || Date.now()
    });

    await sensorData.save();

    res.status(201).json(sensorData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/sensor-data/realtime?boreholeId=...
exports.getRealtimeData = async (req, res) => {
  try {
    const { boreholeId } = req.query;
    if (!boreholeId) {
      return res.status(400).json({ message: 'boreholeId query parameter is required' });
    }

    const latestData = await SensorData.findOne({ boreholeId }).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ message: 'No data found for the specified borehole' });
    }

    // Map pumpStatus from 'ON'/'OFF' to 'running'/'stopped'
    let pumpStatusMapped = 'stopped';
    if (latestData.pumpStatus === 'ON') {
      pumpStatusMapped = 'running';
    }

    // Convert pumpVibration number to vibrationLevel category
    let vibrationLevel = 'normal';
    if (latestData.pumpVibration < 10) {
      vibrationLevel = 'low';
    } else if (latestData.pumpVibration > 30) {
      vibrationLevel = 'high';
    }

    // Add maxDepth and flowRate with default values
    const maxDepth = 50;
    const flowRate = 145;

    res.json({
      waterLevel: latestData.waterLevel,
      maxDepth,
      pumpStatus: pumpStatusMapped,
      vibrationLevel,
      flowRate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/sensor-data/history?boreholeId=...&start=...&end=...
exports.getHistoricalData = async (req, res) => {
  try {
    const { boreholeId, start, end } = req.query;
    if (!boreholeId) {
      return res.status(400).json({ message: 'boreholeId query parameter is required' });
    }

    const query = { boreholeId };
    if (start || end) {
      query.timestamp = {};
      if (start) query.timestamp.$gte = new Date(start);
      if (end) query.timestamp.$lte = new Date(end);
    }

    const data = await SensorData.find(query).sort({ timestamp: 1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
