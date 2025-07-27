import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { BoreholeVisualization } from "@/components/dashboard/BoreholeVisualization";
import { QuickAlerts } from "@/components/dashboard/QuickAlerts";
import { MiniCharts } from "@/components/dashboard/MiniCharts";
import { Droplets, Activity, Wifi, Wrench, TrendingUp } from "lucide-react";

const Index = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/sensor-data/realtime');
        const maintenanceRes = await axios.get('/api/maintainance/last'); // new endpoint
        setStats({ ...res.data, lastMaintenance: maintenanceRes.data });
      } catch (err: any) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCardsData = stats ? [
    {
      title: "Water Level",
      value: stats.waterLevel.toFixed(1),
      unit: "m",
      icon: Droplets,
      status: "safe" as const,
      timestamp: stats.timestamp,
      trend: "stable" as const
    },
    {
      title: "Pump Status",
      value: stats.pumpStatus,
      icon: Activity,
      status: stats.pumpStatus === "running" ? "safe" : "warning",
      timestamp: stats.timestamp,
      trend: "stable" as const
    },
    {
      title: "Connectivity",
      value: stats.connectivity || "Strong",
      icon: Wifi,
      status: "safe" as const,
      timestamp: "1 min ago"
    },
    {
      title: "Last Maintenance",
      value: stats.lastMaintenance.daysSince,
      unit: "days ago",
      icon: Wrench,
      status: stats.lastMaintenance.daysSince > 30 ? "warning" : "safe",
      timestamp: stats.lastMaintenance.updated
    },
    {
      title: "Daily Usage",
      value: stats.dailyUsage.toFixed(0),
      unit: "Litres",
      icon: TrendingUp,
      status: "info" as const,
      timestamp: "Real-time",
      trend: "up" as const
    }
  ] : [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {loading || error
            ? Array(5).fill(0).map((_, i) => (
                <StatCard
                  key={i}
                  title="Loading..."
                  value="--"
                  icon={Droplets}
                  status="info"
                  timestamp=""
                  loading={loading}
                  error={error}
                />
              ))
            : statCardsData.map((stat, index) => (
                <StatCard key={index} {...stat} loading={false} error={null} />
              ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BoreholeVisualization
              data={stats}
              loading={loading}
              error={error}
            />
          </div>
          <div>
            <QuickAlerts
              alerts={stats?.alerts || []}
              loading={loading}
              error={error}
            />
          </div>
        </div>

        <MiniCharts
          waterLevelData={stats?.waterLevelTrend || []}
          usageData={stats?.usageTrend || []}
          vibrationData={stats?.vibrationTrend || []}
          loading={loading}
          error={error}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
