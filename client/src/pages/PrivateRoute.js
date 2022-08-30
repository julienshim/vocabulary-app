import React, { useContext } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import UserContext from '../context/user-context';
import Loader from '../components/Loader';

const PrivateRoute = (props) => {
  // const { key, path, exact, render } = props;
  const { user, isLoading } = useContext(UserContext);
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    <Outlet />;
    // return <Route key={key} path={path} exact={exact} render={render} />;
  }

  return (
    <Navigate
      replace
      to={{ pathname: '/login', state: { from: location.pathname } }}
    />
  );
};

export default PrivateRoute;
