import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user-context';
import { setAccessToken, getAccessToken } from '../accessToken';

const useAuth = () => {
  const navigate = useNavigate();
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
      navigate.push('/');
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
        // eslint-disable-next-line no-console
        if (parseRes.errorMessage) {
          setError(parseRes.errorMessage);
        } else if (parseRes.accessToken) {
          setError(null);
          setAccessToken(parseRes.accessToken);
          await setUserContext();
        }
      }
      // eslint-disable-next-line no-console
      console.log(error);
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
        return true;
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'DELETE',
        credentials: 'include',
      });
      const parseRes = await response.json();
      setAccessToken(parseRes.accessToken);
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return { registerUser, loginUser, logoutUser, setError, error };
};

export default useAuth;
