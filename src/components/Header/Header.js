import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Link to="/">Digital Journal</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
