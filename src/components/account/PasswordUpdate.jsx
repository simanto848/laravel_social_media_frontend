/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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

const PasswordUpdate = () => {
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!passwordData.current_password) {
      newErrors.current_password = 'Current password is required';
    }
    if (!passwordData.new_password) {
      newErrors.new_password = 'New password is required';
    } else if (passwordData.new_password.length < 6) {
      newErrors.new_password = 'Password must be at least 6 characters';
    }
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      newErrors.new_password_confirmation = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await profileService.updatePassword(passwordData);

      if (response.status) {
        toast.success('Password updated successfully');
        setPasswordData({
          current_password: '',
          new_password: '',
          new_password_confirmation: '',
        });
      } else {
        toast.error(response.message || 'Failed to update password');
      }
    } catch (error) {
      toast.error('An error occurred while updating password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Current Password"
              name="current_password"
              type="password"
              value={passwordData.current_password}
              onChange={handleChange}
              margin="normal"
              required
              error={!!errors.current_password}
              helperText={errors.current_password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              name="new_password"
              type="password"
              value={passwordData.new_password}
              onChange={handleChange}
              margin="normal"
              required
              error={!!errors.new_password}
              helperText={errors.new_password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm New Password"
              name="new_password_confirmation"
              type="password"
              value={passwordData.new_password_confirmation}
              onChange={handleChange}
              margin="normal"
              required
              error={!!errors.new_password_confirmation}
              helperText={errors.new_password_confirmation}
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
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default PasswordUpdate;
