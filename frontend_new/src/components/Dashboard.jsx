import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    {
      path: '/dashboard',
      label: 'Dashboard Overview',
      description: 'Main monitoring hub',
      roles: ['admin', 'technician', 'viewer'],
    },
    {
      path: '/water-level',
      label: 'Water Level',
      description: 'Water depth & quality',
      roles: ['admin', 'technician'],
    },
    {
      path: '/pump-status',
      label: 'Pump Status',
      description: 'Motor & vibration',
      roles: ['admin', 'technician'],
    },
    {
      path: '/usage-trends',
      label: 'Usage & Trends',
      description: 'Consumption analytics',
      roles: ['admin', 'technician'],
    },
    {
      path: '/alerts',
      label: 'Alerts',
      description: 'Notifications center',
      roles: ['admin', 'technician'],
    },
    {
      path: '/ai-forecast',
      label: 'AI Forecast',
      description: 'Predictive insights',
      roles: ['admin'],
    },
    {
      path: '/maintenance',
      label: 'Maintenance',
      description: 'Service logs',
      roles: ['admin', 'technician'],
    },
    {
      path: '/admin-settings',
      label: 'Admin Settings',
      description: 'System configuration',
      roles: ['admin'],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
              <a
                key={idx}
                href={link.path}
                className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {link.label}
                <div className="text-xs text-gray-500 dark:text-gray-400">{link.description}</div>
              </a>
            ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Logout
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">System Online</p>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Smart Borehole Monitoring System</h1>
          <p className="text-gray-600 dark:text-gray-400">Real-time water monitoring and analytics</p>
        </header>

        {/* Dashboard content and cards here */}

      </main>
    </div>
  );
};

export default Dashboard;
