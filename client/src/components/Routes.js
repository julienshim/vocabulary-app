/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from '../pages/PrivateRoute';

const Routes = (props) => {
  // eslint-disable-next-line no-console
  const routes = [
    {
      path: '/login',
      exact: true,
      isPrivate: false,
      render: () => <Login />,
    },
    {
      path: '/register',
      exact: true,
      isPrivate: false,
      render: () => <Register />,
    },
    {
      path: '/dashboard',
      exact: true,
      isPrivate: true,
      render: () => <Dashboard />,
    },
  ];

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            {routes.map((route, index) => {
              return route.isPrivate ? (
                <PrivateRoute
                  key={`route-${index * Date.now()}`}
                  path={route.path}
                  exact={route.exact}
                  render={route.render}
                />
              ) : (
                <Route
                  key={`route-${index * Date.now()}`}
                  path={route.path}
                  exact={route.exact}
                  render={route.render}
                />
              );
            })}
            ;
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
};

export default Routes;
