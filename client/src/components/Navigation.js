/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/user-context';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const { user } = useContext(UserContext);
  const { logoutUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isShown, setIsShown] = useState(false);

  const handleToggleIsCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const logout = async () => {
    setIsShown(false);
    await logoutUser();
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
      {user && (
        <div
          className={`${isCollapsed ? 'collapse' : ''} navbar-collapse`}
          id="navbarText"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/vocabulary">
                Vocabulary
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/hanja">
                Hanja
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reference">
                Reference
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className={`nav-link dropdown-toggle${isShown ? ' show' : ''}`}
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={isShown}
                style={{ display: 'flex' }}
                onClick={() => setIsShown(!isShown)}
                onKeyUp={() => setIsShown(!isShown)}
                tabIndex={0}
              >
                <div
                  style={{
                    backgroundColor: '#ccc',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {user?.user_name
                    .split(' ')
                    .map((x) => x.slice(0, 1).toUpperCase())
                    .join('')}
                </div>
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-right${
                  isShown ? ' show' : ''
                }`}
                aria-labelledby="navbarDropdown"
                data-bs-popper={isShown ? 'none' : ''}
              >
                <li>
                  <a className="dropdown-item" href="/profile">
                    My Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/settings">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    role="button"
                    tabIndex={0}
                    onClick={logout}
                    onKeyUp={logout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
