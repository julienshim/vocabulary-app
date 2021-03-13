/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';

function App() {
  // eslint-disable-next-line no-unused-vars

  const routes = [
    {
      path: '/login',
      exact: true,
      render: () => <Login />,
    },
    {
      path: '/register',
      exact: true,
      render: () => <Register />,
    },
    {
      path: '/dashboard',
      exact: true,
      render: () => <Dashboard />,
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
