import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

export default function ProfileNameForm({ data }) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Update Profile Name
      </Typography>
      <TextField
        name="first_name"
        label="First Name"
        value={data.first_name || ''}
        sx={{ mb: 2 }}
        rows={3}
        fullWidth
      />
      <TextField
        name="last_name"
        label="Last Name"
        value={data.last_name || ''}
        sx={{ mb: 2 }}
        rows={3}
        fullWidth
      />
      <Button type="submit" variant="outlined" color="primary">
        Change Name
      </Button>
    </Box>
  );
}
