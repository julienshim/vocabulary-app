import { useState, useEffect } from 'react';
import { getAccessToken } from '../accessToken';

const useGetUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');
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

  return { isLoading, user };
};

export default useGetUser;
