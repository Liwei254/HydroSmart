import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-700 text-white p-4 flex justify-between">
    <h1 className="text-xl font-bold">SBMS Dashboard</h1>
    <div>
      <Link to="/" className="mr-4">Dashboard</Link>
      <Link to="/alerts">Alerts</Link>
    </div>
  </nav>
);
export default Navbar;
