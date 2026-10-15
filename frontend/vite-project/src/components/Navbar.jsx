import { Link } from "react-router-dom";

function Navbar1() {
  return (
    <nav className="navbar">

      <h2>Product Manager</h2>

      <div>

        <Link to="/">Home</Link>

        <Link to="/add">Add Product</Link>

      </div>

    </nav>
  );
}

export default Navbar1;