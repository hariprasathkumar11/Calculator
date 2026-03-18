// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png'; // Make sure this path is correct
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Turf Town Logo" />
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/venues">Venues</Link>
      </div>
    </nav>
  );
};

export default Navbar;