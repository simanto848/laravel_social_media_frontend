import React from 'react';
import Box from '@mui/material/Box';
import BottomNav from './components/common/BottomNav';
import SearchBar from './components/common/SearchBar';

export default function CustomLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SearchBar />
      <Box sx={{ flexGrow: 1, pt: 9 }}>{children}</Box>
      <BottomNav />
    </Box>
  );
}
