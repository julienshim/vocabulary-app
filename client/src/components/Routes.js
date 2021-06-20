import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';

// Pages
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import VocabularyList from '../pages/VocabularyList';
import PrivateRoute from '../pages/PrivateRoute';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Hanja from '../pages/Hanja';

import UserContext from '../context/user-context';
import useFindUser from '../hooks/useFindUser';

const Routes = () => {
  const { user, setUser, isLoading } = useFindUser();
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
      path: '/',
      exact: true,
      isPrivate: true,
      render: () => <Dashboard />,
    },
    {
      path: '/vocabulary-list',
      exact: true,
      isPrivate: true,
      render: () => <VocabularyList />,
    },
    {
      path: '/hanja',
      exact: true,
      isPrivate: true,
      render: () => <Hanja />,
    },
    {
      path: '/profile',
      exact: true,
      isPrivate: true,
      render: () => <Profile />,
    },
    {
      path: '/settings',
      exact: true,
      isPrivate: true,
      render: () => <Settings />,
    },
  ];

  return (
    <Fragment>
      <Router>
        <div className="container">
          <UserContext.Provider value={{ user, setUser, isLoading }}>
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
