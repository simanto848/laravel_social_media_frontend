// components/profile/Photos.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Photos() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Photos</Typography>
      <Typography variant="body1">No photos available yet.</Typography>
    </Box>
  );
}
