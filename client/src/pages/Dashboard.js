import React, { Fragment, useEffect, useState } from 'react';
import { getAccessToken } from '../accessToken';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const findUser = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await fetch('http://localhost:5000/dashboard', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      });
      const parseRes = await response.json();
      setUser(parseRes);
      setIsLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h2>Welcome {user.user_name}</h2>
      {/* <button type="button" onClick={() => setAuth(false)}>
        Logout
      </button> */}
    </Fragment>
  );
};

export default Dashboard;
