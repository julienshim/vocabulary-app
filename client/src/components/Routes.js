/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VocabularyList from '../pages/VocabularyList';
import PrivateRoute from '../pages/PrivateRoute';
import UserContext from '../context/user-context';
import useGetUser from '../hooks/useGetUser';

const Routes = () => {
  const { isLoading, user } = useGetUser();

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
    {
      path: '/cards',
      exact: true,
      isPrivate: true,
      render: () => <VocabularyList />,
    },
  ];

  if (isLoading) {
    return <div>Loading Routes...</div>;
  }

  return (
    <Fragment>
      <Router>
        <div className="container">
          <UserContext.Provider value={{ user }}>
            <Navigation />
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
          </UserContext.Provider>
        </div>
      </Router>
    </Fragment>
  );
};

export default Routes;
