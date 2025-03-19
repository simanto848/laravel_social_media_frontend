import React from 'react';
import { Box } from '@mui/material';
import ProfileNameForm from './ProfileNameForm';
import OthersForm from './OthersForm';

export default function AboutMe({ profile, onUpdate }) {
  // Pass the updated data to the parent
  const handleUpdate = (updatedData) => {
    if (onUpdate) {
      onUpdate(updatedData);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <ProfileNameForm data={profile} onSubmit={handleUpdate} />
      <OthersForm data={profile} onSubmit={handleUpdate} />
    </Box>
  );
}
