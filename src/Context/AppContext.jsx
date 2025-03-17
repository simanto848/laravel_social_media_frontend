import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  async function getUser() {
    if (!token) return;

    try {
      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`, // Fixed template literal syntax
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
    }
  }

  useEffect(() => {
    getUser();
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
