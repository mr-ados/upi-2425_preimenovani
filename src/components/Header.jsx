import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Login.css'; // Import the CSS file

const Header = () => {
  const location = useLocation();

  return (
    <header className="header container">
      <h1>Dobrodošli u aplikaciju Menza</h1>
      {location.pathname !== '/login' && location.pathname !== '/admin' && (
        <Link to="/student-profile" className="profileButton">Student Profile</Link>
      )}
    </header>
  );
};

export default Header;