import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import your dashboard UI components
import { StatCard } from '@/components/dashboard/StatCard';
import { BoreholeVisualization } from '@/components/dashboard/BoreholeVisualization';
import { MiniCharts } from '@/components/dashboard/MiniCharts';
import { QuickAlerts } from '@/components/dashboard/QuickAlerts';
import { Droplets, Power, Wifi, Wrench } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const [boreholeData, setBoreholeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real-time data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/sensorData/realtime'); // Adjust endpoint
        setBoreholeData(res.data);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard Overview', description: 'Main monitoring hub', roles: ['admin', 'technician', 'viewer'] },
    { path: '/water-level', label: 'Water Level', description: 'Water depth & quality', roles: ['admin', 'technician'] },
    { path: '/pump-status', label: 'Pump Status', description: 'Motor & vibration', roles: ['admin', 'technician'] },
    { path: '/usage-trends', label: 'Usage & Trends', description: 'Consumption analytics', roles: ['admin', 'technician'] },
    { path: '/alerts', label: 'Alerts', description: 'Notifications center', roles: ['admin', 'technician'] },
    { path: '/ai-forecast', label: 'AI Forecast', description: 'Predictive insights', roles: ['admin'] },
    { path: '/maintenance', label: 'Maintenance', description: 'Service logs', roles: ['admin', 'technician'] },
    { path: '/admin-settings', label: 'Admin Settings', description: 'System configuration', roles: ['admin'] },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold">{user?.username || 'User'}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{role} - Kitui Borehole 3</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 text-sm">
          {navLinks
            .filter(link => link.roles.includes(role))
            .map((link, idx) => (
              <a key={idx} href={link.path} className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                {link.label}
                <div className="text-xs text-gray-500 dark:text-gray-400">{link.description}</div>
              </a>
            ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-base font-semibold bg-red-600 hover:bg-red-700 text-white rounded shadow-md transition-colors duration-200"
          >
            Logout
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">System Online</p>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-6 overflow-y-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Smart Borehole Monitoring System</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time water monitoring and analytics</p>
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <StatCard
            title="Water Level"
            value={boreholeData?.waterLevel?.toFixed(1) || '0'}
            unit="m"
            icon={Droplets}
            status="safe"
            timestamp="2 min ago"
            trend="stable"
            loading={loading}
            error={error}
          />
          <StatCard
            title="Pump Status"
            value={boreholeData?.pumpStatus || 'Stopped'}
            icon={Power}
            status={boreholeData?.pumpStatus === 'running' ? 'safe' : 'warning'}
            timestamp="2 min ago"
            loading={loading}
            error={error}
          />
          <StatCard
            title="Connectivity"
            value="Strong"
            icon={Wifi}
            status="info"
            timestamp="1 min ago"
            loading={loading}
            error={error}
          />
          <StatCard
            title="Last Maintenance"
            value="12"
            unit="days ago"
            icon={Wrench}
            status="info"
            timestamp="Updated daily"
            loading={loading}
            error={error}
          />
        </div>

        {/* Borehole Visualization */}
        <BoreholeVisualization data={boreholeData} loading={loading} error={error} />

        {/* Mini Charts */}
        <div className="mt-6">
          <MiniCharts
            waterLevelData={boreholeData?.waterLevelTrend || []}
            usageData={boreholeData?.usageTrend || []}
            vibrationData={boreholeData?.vibrationTrend || []}
            loading={loading}
            error={error}
          />
        </div>

        {/* Alerts */}
        <div className="mt-6">
          <QuickAlerts
            alerts={boreholeData?.alerts || []}
            loading={loading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
