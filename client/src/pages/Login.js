import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { email, password };
    const user = await loginUser(body);
    // eslint-disable-next-line no-console
    if (!user) {
      // eslint-disable-next-line no-console
      setError('Invalid email address or password. Please try again.');
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
          onChange={(e) => {
            if (error) {
              setError('');
            }
            setEmail(e.target.value);
          }}
          className="form-control my-3"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            if (error) {
              setError('');
            }
            setPassword(e.target.value);
          }}
          className="form-control my-3"
          required
        />
        <button type="submit" className="btn btn-success btn-block">
          Login
        </button>
      </form>
      <Link to="/register">Register</Link>
      <div>
        <span>{error}</span>
      </div>
    </Fragment>
  );
};

export default Login;
