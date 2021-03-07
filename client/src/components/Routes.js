/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const routes = [
    {
      path: '/login',
      exact: true,
      render: (props) =>
        !isAuthenticated ? (
          <Login {...props} setAuth={setAuth} />
        ) : (
          <Redirect to="/" />
        ),
    },
    {
      path: '/register',
      exact: true,
      render: (props) =>
        !isAuthenticated ? (
          <Register {...props} setAuth={setAuth} />
        ) : (
          <Redirect to="/login" />
        ),
    },
    {
      path: '/',
      exact: true,
      render: (props) =>
        isAuthenticated ? (
          <Dashboard {...props} setAuth={setAuth} />
        ) : (
          <Redirect to="/login" />
        ),
    },
  ];

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={`route-${index * Date.now()}`}
                path={route.path}
                exact={route.exact}
                render={route.render}
              />
            ))}
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
