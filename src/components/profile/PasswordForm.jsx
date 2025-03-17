import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

export default function PasswordForm() {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Change Password
      </Typography>
      <TextField sx={{ mb: 2 }} rows={3} label="Current Password" fullWidth />
      <TextField sx={{ mb: 2 }} rows={3} label="New Password" fullWidth />
      <TextField
        sx={{ mb: 2 }}
        rows={3}
        label="Confirm New Password"
        fullWidth
      />
      <Button type="submit" variant="outlined" color="primary">
        Change Password
      </Button>
    </Box>
  );
}
