import React, { Fragment, useState } from 'react';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser, setError, error } = useAuth();

  // eslint-disable-next-line no-unused-vars
  const onSubmitForm = async (e) => {
    e.preventDefault();
    setError('null');
    const body = { email, name, username, password };
    registerUser(body);
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <div className="invalid-feedback">{error && error.message}</div>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control my-3"
        />
        {(error === '2' || error === '0') && <span>Email is taken.</span>}
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          className="form-control my-3"
        />
        {(error === '2' || error === '1') && <span>Username is taken.</span>}
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control my-3"
        />
        <button type="submit" className="btn btn-success btn-block">
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default Register;
