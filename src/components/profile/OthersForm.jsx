import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
  CircularProgress,
} from '@mui/material';
import profileService from '../../services/profileServices';
import { toast } from 'react-hot-toast';

export default function OthersForm({ data, onSubmit }) {
  const [formData, setFormData] = useState({
    bio: data?.bio || '',
    phone_number: data?.phone_number || '',
    gender: data?.gender || 'other',
    dob: data?.dob || '',
  });
  const [loading, setLoading] = useState(false);

  // Update form data when the data prop changes
  useEffect(() => {
    setFormData({
      bio: data?.bio || '',
      phone_number: data?.phone_number || '',
      gender: data?.gender || 'other',
      dob: data?.dob || '',
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await profileService.updateOthers(formData);

      if (response.status) {
        onSubmit(formData);
        toast.success('Profile details updated successfully');
      } else {
        toast.error(response.message || 'Failed to update profile details');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Additional Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            placeholder="+123456789"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Save Changes'}
      </Button>
    </Box>
  );
}
