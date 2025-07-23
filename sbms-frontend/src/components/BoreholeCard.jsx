const BoreholeCard = ({ borehole }) => (
  <div className="border rounded-xl shadow p-4 bg-white">
    <h2 className="text-lg font-semibold">{borehole.name}</h2>
    <p>Water Level: {borehole.waterLevel}m</p>
    <p>Status: {borehole.status}</p>
    <p>Last Update: {borehole.last_updated}</p>
  </div>
);
export default BoreholeCard;
