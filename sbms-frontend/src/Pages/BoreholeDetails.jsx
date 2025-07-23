import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../Services/api";
import ChartCard from "../components/ChartCard";

const BoreholeDetails = () => {
  const { id } = useParams();
  const [borehole, setBorehole] = useState(null);
  const [waterData, setWaterData] = useState([]);
  const [vibrationData, setVibrationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoreholeDetails = async () => {
      try {
        const res = await axios.get(`/boreholes/${id}`);
        setBorehole(res.data);

        const sensorRes = await axios.get(`/boreholes/${id}/data`);
        setWaterData(sensorRes.data.water_level || []);
        setVibrationData(sensorRes.data.pump_vibration || []);
      } catch (error) {
        console.error("Error fetching borehole details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoreholeDetails();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!borehole) return <div className="p-4">Borehole not found.</div>;

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-2">{borehole.name}</h2>
        <p><strong>Location:</strong> {borehole.location}</p>
        <p><strong>Status:</strong> {borehole.status}</p>
        <p><strong>Last Updated:</strong> {borehole.last_updated}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Water Level (m)</h3>
        <ChartCard data={waterData} />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Pump Vibration (Hz)</h3>
        <ChartCard data={vibrationData} />
      </div>
    </div>
  );
};

export default BoreholeDetails;
