import React from 'react';
import Box from '@mui/material/Box';
import BottomNav from './components/BottomNav';

export default function CustomLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <BottomNav />
    </Box>
  );
}
