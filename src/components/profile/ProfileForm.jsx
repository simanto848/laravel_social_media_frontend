import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function ProfileForm({ user, onUpdate }) {
  const [formData, setFormData] = useState({
    bio: user.bio || '',
    email: user.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Pass the updated data to the parent
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Edit Profile
      </Typography>
      <TextField
        label="Bio"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="outlined" color="primary">
        Save Changes
      </Button>
    </Box>
  );
}
