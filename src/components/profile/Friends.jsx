// components/profile/Friends.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Friends() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Friends</Typography>
      <Typography variant="body1">No friends to display.</Typography>
    </Box>
  );
}
