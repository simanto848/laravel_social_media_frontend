import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { Toaster } from 'react-hot-toast';
import BottomNav from './components/common/BottomNav';
import SearchBar from './components/common/SearchBar';
import { AppContext } from './Context/AppContext';

export default function CustomLayout({ children }) {
  const { user } = useContext(AppContext);

  const isLoggedIn = !!user;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isLoggedIn && <SearchBar />}
      <Toaster position="top-right" />
      <Box component="main" sx={{ flexGrow: 1, pt: 9 }}>
        {children}
      </Box>
      {isLoggedIn && <BottomNav />}
    </Box>
  );
}
