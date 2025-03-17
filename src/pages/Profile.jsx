import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileImageUpload from '../components/profile/ProfileImageUpload';
import PasswordForm from '../components/profile/PasswordForm';
import ProfileNameForm from '../components/profile/ProfileNameForm';

export default function Profile() {
  const [user, setUser] = useState({
    username: 'john_doe',
    email: 'john.doe@example.com',
    bio: 'A passionate developer and explorer!',
    profilePicture: 'https://via.placeholder.com/150',
    createdAt: '2023-01-15',
  });

  // Handle profile updates
  const handleProfileUpdate = (updatedData) => {
    setUser({ ...user, ...updatedData });
    console.log('Profile updated:', updatedData);
    // In a real app, this would make an API call to update the profile
  };

  // Handle profile picture upload
  const handleImageUpload = (file) => {
    console.log('Profile picture uploaded:', file);
    // In a real app, this would upload the file to a server and update the profile picture URL
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Profile
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ProfileCard user={user} />
        <ProfileNameForm />
        <ProfileForm user={user} onUpdate={handleProfileUpdate} />
        <PasswordForm />
        <ProfileImageUpload onUpload={handleImageUpload} />
      </Box>
    </Container>
  );
}
