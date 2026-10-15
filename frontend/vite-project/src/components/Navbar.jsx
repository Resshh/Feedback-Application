import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>⭐ Feedback Admin</h2>
      <div className="nav-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/add">Add Feedback</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
