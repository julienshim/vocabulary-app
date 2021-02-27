import React, { Fragment } from 'react';

const Login = (props) => {
  const { setAuth } = props;
  return (
    <Fragment>
      <h1>Login</h1>
      <button type="button" onClick={() => setAuth(true)}>
        Login
      </button>
    </Fragment>
  );
};

export default Login;
