import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import WaterLevel from "./pages/WaterLevel";
import PumpStatus from "./pages/PumpStatus";
import UsageTrends from "./pages/UsageTrends";
import Alerts from "./pages/Alerts";
import Forecast from "./pages/Forecast";
import Maintenance from "./pages/Maintenance";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute"; // Corrected import path for ProtectedRoute component
import { AuthProvider } from "./contexts/AuthContext"; // Wrap app with AuthProvider

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Default redirect to /login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/water-level"
              element={
                <ProtectedRoute>
                  <WaterLevel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pump-status"
              element={
                <ProtectedRoute>
                  <PumpStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/usage-trends"
              element={
                <ProtectedRoute>
                  <UsageTrends />
                </ProtectedRoute>
              }
            />
            <Route
              path="/alerts"
              element={
                <ProtectedRoute>
                  <Alerts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forecast"
              element={
                <ProtectedRoute>
                  <Forecast />
                </ProtectedRoute>
              }
            />
            <Route
              path="/maintenance"
              element={
                <ProtectedRoute>
                  <Maintenance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
