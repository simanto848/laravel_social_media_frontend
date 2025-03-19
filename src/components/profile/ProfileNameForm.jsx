import { Box, TextField, Typography } from '@mui/material';
import React from 'react';

export default function ProfileNameForm({ data, onChange, isLoading }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Update Profile Name
      </Typography>
      <TextField
        name="first_name"
        label="First Name"
        value={data.first_name || ''}
        onChange={onChange}
        sx={{ mb: 2 }}
        fullWidth
        disabled={isLoading}
        required
      />
      <TextField
        name="last_name"
        label="Last Name"
        value={data.last_name || ''}
        onChange={onChange}
        sx={{ mb: 2 }}
        fullWidth
        disabled={isLoading}
        required
      />
    </Box>
  );
}
