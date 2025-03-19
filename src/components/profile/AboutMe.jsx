// components/profile/AboutMe.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import ProfileNameForm from './ProfileNameForm';

export default function AboutMe({ profile }) {
  return (
    <Box sx={{ p: 2 }}>
      <ProfileNameForm data={profile} />
    </Box>
  );
}
