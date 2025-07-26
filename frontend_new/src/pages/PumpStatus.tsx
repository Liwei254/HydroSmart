import { useState, useEffect } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Power, Activity } from "lucide-react";

const PumpStatus = () => {
  const [pumpStatus, setPumpStatus] = useState<string | null>(null);
  const [vibrationLevel, setVibrationLevel] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPumpStatus = async () => {
      try {
        setLoading(true);
        setError(null);
        // Replace 'default' with actual boreholeId as needed
        const response = await axios.get("/api/sensor-data/realtime", {
          params: { boreholeId: "default" }
        });
        setPumpStatus(response.data.pumpStatus);
        setVibrationLevel(response.data.vibrationLevel);
      } catch (err) {
        setError("Failed to fetch pump status data");
      } finally {
        setLoading(false);
      }
    };

    fetchPumpStatus();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Activity className="w-8 h-8 text-secondary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Pump Status & Vibration</h1>
            <p className="text-muted-foreground">Motor performance and vibration analysis</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatCard
            title="Pump Motor Status"
            value={pumpStatus === 'running' ? 'Running Normally' : 'Stopped'}
            icon={Power}
            status={pumpStatus === 'running' ? 'safe' : 'warning'}
            timestamp="Operational for 12 hours today"
            loading={loading}
            error={error}
          />

          <StatCard
            title="Vibration Level"
            value={vibrationLevel ? vibrationLevel.toUpperCase() : ''}
            icon={Activity}
            status="info"
            timestamp="Current vibration level"
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PumpStatus;
