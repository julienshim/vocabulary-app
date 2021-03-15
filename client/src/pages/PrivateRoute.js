import React, { useState, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { getAccessToken } from '../accessToken';

const PrivateRoute = (props) => {
  const { key, path, exact, render } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const isVerified = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch('http://localhost:5000/auth/is-verified', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      });
      const parseRes = await response.json();
      if (parseRes) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isVerified();
  }, []);

  if (isLoading) {
    return <div>Loading... </div>;
  }

  if (isAuthenticated) {
    return <Route key={key} path={path} exact={exact} render={render} />;
  }
  // eslint-disable-next-line no-console
  return (
    <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
  );
};

export default PrivateRoute;
