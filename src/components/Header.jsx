// src/components/Header.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <h1>Dobrodošli u aplikaciju Menza</h1>
      {location.pathname !== '/login' && location.pathname !== '/admin' && (
        <Link to="/student-profile" className="profileButton">Student Profile</Link>
      )}
    </header>
  );
};

export default Header;
