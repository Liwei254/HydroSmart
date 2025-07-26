import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts'; // Assuming Alerts component exists or create a similar one
import Unauthorized from './components/Unauthorized'; // Assuming Unauthorized component exists or create a similar one

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLoginSuccess={() => window.location.replace('/dashboard')} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredPermission="view_real_time_data">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute requiredPermission="view_resolve_alerts">
                <Alerts />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
