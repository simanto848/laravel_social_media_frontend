import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';

export default function ProfileForm({ user, onChange, isLoading }) {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        label="Bio"
        name="bio"
        value={user.bio || ''}
        onChange={onChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
        disabled={isLoading}
      />
      <TextField
        label="Phone Number"
        name="phone_number"
        value={user.phone_number || ''}
        onChange={onChange}
        fullWidth
        sx={{ mb: 2 }}
        disabled={isLoading}
        placeholder="+123456789"
      />
      <TextField
        select
        label="Gender"
        name="gender"
        value={user.gender || 'other'}
        onChange={onChange}
        fullWidth
        sx={{ mb: 2 }}
        disabled={isLoading}
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>
      <TextField
        label="Date of Birth"
        name="dob"
        type="date"
        value={user.dob || ''}
        onChange={onChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
        disabled={isLoading}
      />
    </Box>
  );
}
