import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import UserContext from '../context/user-context';

const PrivateRoute = (props) => {
  const { key, path, exact, render } = props;
  const { user, isLoading } = useContext(UserContext);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading... </div>;
  }

  if (user) {
    return <Route key={key} path={path} exact={exact} render={render} />;
  }

  return (
    <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
  );
};

export default PrivateRoute;
