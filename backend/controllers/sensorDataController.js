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
    console.error("Create Sensor Data Error:", error);
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

    // Map pumpStatus
    const pumpStatusMapped = latestData.pumpStatus === 'ON' ? 'running' : 'stopped';

    // Map vibration level
    let vibrationLevel = 'normal';
    if (latestData.pumpVibration < 10) vibrationLevel = 'low';
    else if (latestData.pumpVibration > 30) vibrationLevel = 'high';

    // Simulated or fixed values
    const maxDepth = 50; // meters
    const flowRate = 145; // liters/min
    const dailyUsage = Math.floor(Math.random() * (600 - 400 + 1)) + 400; // Simulated value 400-600
    const connectivity = 'Strong';
    const timestampFormatted = latestData.timestamp.toISOString();

    // Optional trend data placeholders
    const waterLevelTrend = []; // TODO: Populate with real data
    const usageTrend = [];
    const vibrationTrend = [];

    res.json({
      waterLevel: latestData.waterLevel,
      maxDepth,
      pumpStatus: pumpStatusMapped,
      vibrationLevel,
      flowRate,
      dailyUsage,
      connectivity,
      timestamp: timestampFormatted,
      waterLevelTrend,
      usageTrend,
      vibrationTrend,
      alerts: [] // Placeholder for alert data
    });

  } catch (error) {
    console.error("Realtime Data Error:", error);
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
    console.error("Historical Data Error:", error);
    res.status(500).json({ message: error.message });
  }
};
