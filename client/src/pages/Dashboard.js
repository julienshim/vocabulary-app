// import React, { Fragment, useEffect, useState } from 'react';
import React, { Fragment, useContext } from 'react';
import UserContext from '../context/user-context';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h2>Welcome {user && user.user_username}</h2>
    </Fragment>
  );
};

export default Dashboard;
