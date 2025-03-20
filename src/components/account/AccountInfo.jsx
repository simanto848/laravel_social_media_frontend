// AccountInfo.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import profileService from '../../services/profileServices';
import {
  Paper,
  Typography,
  Box,
  Divider,
  TextField,
  Button,
  Grid,
} from '@mui/material';

const AccountInfo = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  // Sync local state with user from context
  useEffect(() => {
    if (user) {
      setUserInfo({
        username: user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await profileService.updateUserInfo(userInfo);
      if (response.status) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile');
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Account Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userInfo.email}
              onChange={handleChange}
              margin="normal"
              required
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AccountInfo;
