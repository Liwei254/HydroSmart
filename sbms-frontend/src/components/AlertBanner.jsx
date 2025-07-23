const AlertBanner = ({ alerts }) => {
  return (
    <div className="mb-4">
      {alerts.map((alert, index) => (
        <div key={index} className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
          <strong className="font-bold">{alert.type}: </strong>
          <span className="block sm:inline">{alert.message}</span>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;
