// app.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import Unauthorized from './components/Unauthorized';
import { LandingPage } from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import SensorDataDisplay from './components/SensorDataDisplay'; // ✅ Import sensor data component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ Landing page route */}
          <Route path="/" element={<LandingPage />} />

          {/* ✅ Login page */}
          <Route path="/login" element={<Login onLoginSuccess={() => window.location.replace('/dashboard')} />} />

          {/* ✅ Dashboard (Protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredPermission="view_real_time_data">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ✅ Alerts page (Protected) */}
          <Route
            path="/alerts"
            element={
              <ProtectedRoute requiredPermission="view_resolve_alerts">
                <Alerts />
              </ProtectedRoute>
            }
          />

          {/* ✅ Sensor Data Display page (Protected) */}
          <Route
            path="/sensor-data"
            element={
              <ProtectedRoute requiredPermission="view_real_time_data">
                <SensorDataDisplay />
              </ProtectedRoute>
            }
          />

          {/* ✅ Unauthorized route */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* ✅ Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
