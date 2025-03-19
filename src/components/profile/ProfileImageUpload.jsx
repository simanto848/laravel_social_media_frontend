import React, { useState } from 'react';
import { Box, Button, Typography, Avatar, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import avatarImage from '../../assets/male_4.png';

export default function ProfileImageUpload({ onUpload, currentImage }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onUpload(file); // Pass the file to the parent
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
        <input
          type="file"
          accept="image/*"
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
          >
            Choose Image
          </Button>
        </label>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Recommended size: 400x400 pixels
        </Typography>
      </Paper>
    </Box>
  );
}
