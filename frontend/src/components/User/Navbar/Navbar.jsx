import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-logo">
        <img src="/images/logo.png" alt="Logo" />
        <span className="highlight-text">FileGuard</span>{" "}
        {/* Highlighted text */}
      </div>
      <div className="navbar-menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-signin">
        <Link to="/signin">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
