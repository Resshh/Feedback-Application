import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>Feedback Application</h2>

      <div>

        <Link to="/add">Add Feedback</Link>

      </div>

    </nav>
  );
}

export default Navbar;