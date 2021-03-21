import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/user-context';

const Navigation = () => {
  const { user } = useContext(UserContext);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleIsCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vocabulary App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span
          className="navbar-toggler-icon"
          onClick={() => handleToggleIsCollapse()}
          onKeyUp={() => handleToggleIsCollapse()}
          role="button"
          aria-label="button"
          tabIndex={0}
        />
      </button>
      <div
        className={`${isCollapsed ? 'collapse' : ''} navbar-collapse`}
        id="navbarText"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cards">
              Cards
            </Link>
          </li>
        </ul>
        <span className="navbar-text">Hey {user.user_name}</span>
      </div>
    </nav>
  );
};

export default Navigation;
