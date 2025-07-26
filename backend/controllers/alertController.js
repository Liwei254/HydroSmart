exports.getAlerts = async (req, res) => {
  try {
    // TODO: Replace with real database query to fetch alerts
    const alerts = [
      { id: 1, message: "Water level low", status: "active" },
      { id: 2, message: "Pump malfunction", status: "resolved" }
    ];
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAlertSummary = async (req, res) => {
  try {
    // For demonstration, using static values.
    // Replace with real database queries as needed.
    const activeAlerts = 2;
    const resolvedToday = 3;
    const systemStatus = "All Systems Online";

    res.json({
      activeAlerts,
      resolvedToday,
      systemStatus
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAlert = async (req, res) => {
  try {
    const { message, status } = req.body;
    if (!message || !status) {
      return res.status(400).json({ message: "Message and status are required" });
    }
    // TODO: Save alert to database
    const newAlert = {
      id: Date.now(), // temporary id
      message,
      status
    };
    // For now, just return the new alert
    res.status(201).json(newAlert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
