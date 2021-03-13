import React, { useEffect, useState } from 'react';
import Routes from './Routes';
import { setAccessToken } from '../accessToken';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const renewAccessToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/renewAccessToken', {
        method: 'POST',
        credentials: 'include',
      });
      const parseRes = await response.json();
      setAccessToken(parseRes.accessToken);
      setIsLoading(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    renewAccessToken();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Routes />;
};

export default App;
