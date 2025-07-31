// components/SensorDataDisplay.jsx
import React, { useEffect, useState } from 'react';

const SensorDataDisplay = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    fetch('http://192.168.116.44:5000/api/sensor-data/history')  // Adjust endpoint if needed
      .then(res => res.json())
      .then(data => setSensorData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sensor Data</h2>
      <ul className="list-disc pl-6">
        {sensorData.map((data, index) => (
          <li key={index}>
            <strong>Borehole:</strong> {data.boreholeId} | 
            <strong> Water Level:</strong> {data.waterLevel} |
            <strong> Pump:</strong> {data.pumpStatus ? 'On' : 'Off'} |
            <strong> Vibration:</strong> {data.vibration}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorDataDisplay;
