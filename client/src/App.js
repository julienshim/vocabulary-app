import React, { useEffect, useState } from 'react';
import Routing from './components/Routing';
import { setAccessToken } from './accessToken';
import Loader from './components/Loader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const renewAccessToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/renewAccessToken', {
        method: 'POST',
        credentials: 'include',
      });
      const parseRes = await response.json();
      if (parseRes) {
        setAccessToken(parseRes.accessToken);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // eslint-disable-next-line no-console
      console.error(error.message);
    }
  };

  useEffect(() => {
    renewAccessToken();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return <Routing />;
};

export default App;
