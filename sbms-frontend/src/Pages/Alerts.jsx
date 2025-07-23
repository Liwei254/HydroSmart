import { useEffect, useState } from "react";
import axios from "../Services/api";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get("/alerts").then((res) => setAlerts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">System Alerts</h2>
      {alerts.map((alert, idx) => (
        <div key={idx} className="bg-red-100 p-3 rounded mb-2">
          <strong>{alert.type}:</strong> {alert.message}
        </div>
      ))}
    </div>
  );
};
export default Alerts;
