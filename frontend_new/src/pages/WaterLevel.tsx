import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BoreholeVisualization } from "@/components/dashboard/BoreholeVisualization";

const WaterLevel = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoreholeData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        setError(null);
        // Replace 'default' with actual boreholeId as needed
        const response = await axios.get("/api/sensor-data/realtime", {
          params: { boreholeId: "default" },
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch borehole data");
      } finally {
        setLoading(false);
      }
    };

    fetchBoreholeData();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-foreground">Water Level Monitoring</h1>
          <p className="text-muted-foreground">Real-time water depth tracking and historical analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BoreholeVisualization data={data} loading={loading} error={error} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WaterLevel;
