import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/user-context';
import Loader from '../components/Loader';

const PrivateRoute = (props) => {
  // const { key, path, exact, render } = props;
  const { children } = props;
  const { user, isLoading } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return children;
    // return <Route key={key} path={path} exact={exact} render={render} />;
  }

  // const { from } = location.state};
  navigate('/login', {
    replace: true,
    state: {
      from: location.pathname,
    },
  });
  // return (
  //   <Navigate
  //     replace
  //     to={{ pathname: '/login', state: { from: location.pathname } }}
  //   />
  // );
};

export default PrivateRoute;
