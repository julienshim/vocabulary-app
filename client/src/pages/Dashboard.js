// import React, { Fragment, useEffect, useState } from 'react';
import React, { Fragment, useContext } from 'react';
import UserContext from '../context/user-context';
// import { getAccessToken } from '../accessToken';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <Fragment>
      <h1>Dashboard</h1>
      {/* <h2>Welcome {user.user_name}</h2> */}
      <h2>Welcome {user.user_name}</h2>
      {/* <button type="button" onClick={() => setAuth(false)}>
        Logout
      </button> */}
    </Fragment>
  );
};

export default Dashboard;
