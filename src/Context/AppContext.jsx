import { CircularProgress } from '@mui/material';
import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUser() {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token'); // Clear invalid token
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, [token]);

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  if (loading) {
    return <CircularProgress color="success" />;
  }

  return (
    <AppContext.Provider
      value={{ token, setToken, user, setUser, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
}
