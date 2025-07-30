//app.jsx//  
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './components/Dashboard';
import Alerts from './components/Alerts';
import Unauthorized from './components/Unauthorized';
import { LandingPage } from './components/LandingPage'; // ✅ Import LandingPage

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ✅ Landing page route */}
          <Route path="/" element={<LandingPage />} />

          {/* Login route */}
          <Route path="/login" element={<Login onLoginSuccess={() => window.location.replace('/dashboard')} />} />

          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredPermission="view_real_time_data">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected alerts route */}
          <Route
            path="/alerts"
            element={
              <ProtectedRoute requiredPermission="view_resolve_alerts">
                <Alerts />
              </ProtectedRoute>
            }
          />

          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Catch-all redirect to / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;