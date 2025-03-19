import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import profileService from '../../services/profileServices';
import toast from 'react-hot-toast';

export default function OthersForm({ data, onSubmit }) {
  const [formData, setFormData] = useState({
    phone_number: '',
    bio: '',
    dob: '',
    gender: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        phone_number: data.phone_number || '',
        bio: data.bio || '',
        dob: data.dob || '',
        gender: data.gender || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await profileService.updateOthers(formData);
      if (response.status) {
        toast.success(response.message || 'Details updated successfully!');
        setErrors({});
        // Pass the updated data to the parent
        if (onSubmit) {
          onSubmit(formData);
        }
      } else {
        // Handle field-specific errors if the backend returns them
        if (response.error && typeof response.error === 'object') {
          setErrors(response.error);
        } else {
          setErrors({
            general: response.message || 'Failed to update details.',
          });
        }
        toast.error(response.message || 'Failed to update details.');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Update Others Error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
        Update Others
      </Typography>
      <form onSubmit={handleSubmit}>
        {isLoading && <CircularProgress size={24} sx={{ mb: 2 }} />}
        {errors.general && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errors.general}
          </Typography>
        )}
        <TextField
          name="phone_number"
          label="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          sx={{ mb: 2 }}
          fullWidth
          variant="outlined"
          error={!!errors.phone_number}
          helperText={errors.phone_number}
        />
        <TextField
          name="bio"
          label="Bio"
          value={formData.bio}
          onChange={handleChange}
          sx={{ mb: 2 }}
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          error={!!errors.bio}
          helperText={errors.bio}
        />
        <TextField
          name="gender"
          label="Gender"
          variant="outlined"
          sx={{ mb: 2 }}
          fullWidth
          select
          value={formData.gender}
          onChange={handleChange}
          error={!!errors.gender}
          helperText={errors.gender}
        >
          <MenuItem value="">Select Gender</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          name="dob"
          label="Date of Birth"
          type="date"
          variant="outlined"
          value={formData.dob || ''}
          sx={{ mb: 2 }}
          fullWidth
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.dob}
          helperText={errors.dob}
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Updating' : 'Update'}
        </Button>
      </form>
    </Box>
  );
}
