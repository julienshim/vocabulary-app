import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/user-context';
import { setAccessToken, getAccessToken } from '../accessToken';

const useAuth = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const setUserContext = async () => {
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
      history.push('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      setError(err.message);
    }
  };

  const registerUser = async (body) => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes) {
        setAccessToken(parseRes.accessToken);
        await setUserContext();
      }
      // eslint-disable-next-line no-console
    } catch (err) {
      // eslint-disable-next-line no-console
      setError(err.message);
    }
  };

  const loginUser = async (body) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      // eslint-disable-next-line no-console
      if (parseRes) {
        setAccessToken(parseRes.accessToken);
        await setUserContext();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      setError(err.message);
    }
  };

  return { registerUser, loginUser, error };
};

export default useAuth;
