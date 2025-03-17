import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

export default function ProfileImageUpload({ onUpload }) {
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
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Update Profile Picture
      </Typography>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="profile-image-upload"
      />
      <label htmlFor="profile-image-upload">
        <Button variant="outlined" component="span">
          Choose Image
        </Button>
      </label>
      {preview && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Preview:</Typography>
          <img
            src={preview}
            alt="Preview"
            style={{ width: 100, height: 100, borderRadius: '50%' }}
          />
        </Box>
      )}
    </Box>
  );
}
