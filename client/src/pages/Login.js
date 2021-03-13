import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setAccessToken } from '../accessToken';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      // eslint-disable-next-line no-console
      if (parseRes) {
        setAccessToken(parseRes.accessToken);
      }
      history.push('/dashboard');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control my-3"
        />
        <button type="submit" className="btn btn-success btn-block">
          Login
        </button>
      </form>
      {/* <Link to="/register">Register</Link> */}
    </Fragment>
  );
};

export default Login;
