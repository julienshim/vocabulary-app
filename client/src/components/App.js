import React, { useEffect } from 'react';
import Routes from './Routes';
import { setAccessToken } from '../accessToken';

const App = () => {
  const renewAccessToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/renewAccessToken', {
        method: 'POST',
        credentials: 'include',
      });
      const res = await response;
      setAccessToken(res.accessToken);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
  };

  useEffect(() => {
    renewAccessToken();
  }, []);

  return <Routes />;
};

export default App;
