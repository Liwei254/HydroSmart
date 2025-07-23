import BoreholeCard from "../components/BoreholeCard";
import AlertBanner from "../components/AlertBanner";
import { useEffect, useState } from "react";
import axios from "../Services/api";

const Dashboard = () => {
  const [boreholes, setBoreholes] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Polling interval in milliseconds
  const POLL_INTERVAL = 10000;

  const fetchBoreholes = () => {
    axios.get("/boreholes").then((res) => setBoreholes(res.data));
  };

  const fetchAlerts = () => {
    axios.get("/alerts").then((res) => setAlerts(res.data));
  };

  useEffect(() => {
    fetchBoreholes();
    fetchAlerts();
    const interval = setInterval(() => {
      fetchBoreholes();
      fetchAlerts();
    }, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      {alerts.length > 0 && <AlertBanner alerts={alerts} />}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-4">
        {boreholes.map((bh) => (
          <BoreholeCard key={bh.id} borehole={bh} />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
