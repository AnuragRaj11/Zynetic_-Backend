import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px" }}>
      <h1>📚 BookStore</h1>
      <div>
        {!user ? (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/books" style={{ marginRight: "10px" }}>Books</Link>
            <Link to="/dashboard" style={{ marginRight: "10px" }}>Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
