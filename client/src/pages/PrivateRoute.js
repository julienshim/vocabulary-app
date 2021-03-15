import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { key, path, exact, render, isAuthenticated } = props;
  const location = useLocation();

  if (isAuthenticated) {
    return <Route key={key} path={path} exact={exact} render={render} />;
  }
  // eslint-disable-next-line no-console
  return (
    <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
  );
};

export default PrivateRoute;
