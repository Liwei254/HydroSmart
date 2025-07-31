import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { QuickAlerts } from "@/components/dashboard/QuickAlerts";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/alerts/summary");
        setAlerts(response.data.alerts || []);
      } catch (err) {
        setError("Failed to fetch alerts data");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground">System alerts and notification center</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <QuickAlerts alerts={alerts} loading={loading} error={error} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
