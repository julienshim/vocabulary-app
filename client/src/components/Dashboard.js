import React, { Fragment } from 'react';

const Dashboard = (props) => {
  const { setAuth } = props;
  return (
    <Fragment>
      <h1>Dashboard</h1>
      <button type="button" onClick={() => setAuth(false)}>
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
