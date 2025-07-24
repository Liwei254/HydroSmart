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
