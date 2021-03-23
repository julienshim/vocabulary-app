import { useState, useEffect } from 'react';
import { getAccessToken } from '../accessToken';

const useFindUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
};

export default useFindUser;
