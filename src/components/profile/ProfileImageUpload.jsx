import React, { useState } from 'react';
import { Box, Button, Typography, Avatar, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-hot-toast';
import avatarImage from '../../assets/male_4.png';
import profileImageService from '../../services/profileImageService';

export default function ProfileImageUpload({ currentImage }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please select an image to upload');
      return;
    }

    const formData = new FormData();

    if (image instanceof File) {
      formData.append('image', image);
    } else {
      toast.error('Invalid file');
      return;
    }

    setUploading(true);

    try {
      const response = await profileImageService.uploadProfileImage(formData);

      if (response.status) {
        toast.success(response.message || 'Image uploaded successfully');
        setImage(null);
        setPreview(null);
      } else {
        toast.error(response.message || 'Failed to upload image');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Update Profile Picture
      </Typography>

      {/* Current or Preview Profile Picture */}
      <Avatar
        src={preview || currentImage || avatarImage}
        alt="Profile"
        sx={{
          width: 150,
          height: 150,
          mb: 3,
          boxShadow: 2,
        }}
      />

      {/* Upload Controls */}
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          textAlign: 'center',
          borderRadius: 2,
          borderStyle: 'dashed',
          borderColor: '#1877f2',
          bgcolor: 'rgba(24, 119, 242, 0.05)',
          width: '100%',
        }}
      >
        <form onSubmit={handleUpload} encType="multipart/form-data">
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="profile-image-upload"
          />
          <label htmlFor="profile-image-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{
                bgcolor: '#1877f2',
                '&:hover': { bgcolor: '#166fe5' },
                px: 3,
              }}
              disabled={uploading}
            >
              Choose Image
            </Button>
          </label>
          <Button
            type="submit"
            variant="outlined"
            color="success"
            sx={{ marginLeft: 2 }}
            disabled={uploading || !image}
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </form>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Recommended size: 400x400 pixels
        </Typography>
      </Paper>
    </Box>
  );
}
