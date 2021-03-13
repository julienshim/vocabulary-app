import React, { Fragment, useState, useContext } from 'react';
import UserContext from '../context/user-context';
import { setAccessToken } from '../accessToken';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  // eslint-disable-next-line no-unused-vars
  const { setUser } = useContext(UserContext);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      setAccessToken(parseRes.accessToken);
      // eslint-disable-next-line no-console
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
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
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
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
