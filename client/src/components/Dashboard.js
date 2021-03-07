import React, { Fragment, useState, useEffect } from 'react';
import { getAccessToken } from '../accessToken';

const Dashboard = (props) => {
  const [name, setName] = useState('');

  const getProfile = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch('http://localhost:5000/dashboard', {
        method: 'GET',
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h2>Welcome {name}</h2>
      {/* <button type="button" onClick={() => setAuth(false)}>
        Logout
      </button> */}
    </Fragment>
  );
};

export default Dashboard;
