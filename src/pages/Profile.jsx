import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Menu,
  MenuItem,
  Tab,
  Tabs,
} from '@mui/material';
import { toast } from 'react-hot-toast';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileImageUpload from '../components/profile/ProfileImageUpload';
import PasswordForm from '../components/profile/PasswordForm';
import ProfileNameForm from '../components/profile/ProfileNameForm';
import profileService from '../services/profileServices';
import { AppContext } from '../Context/AppContext';

export default function Profile() {
  const [profileData, setProfileData] = useState({});
  const { user } = useContext(AppContext);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    const userProfileData = await profileService.getProfile();
    if (userProfileData.status) {
      console.log('USER DATA => ', userProfileData.data.data);

      setProfileData(userProfileData.data.data);
    } else {
      setError(userProfileData.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle profile updates
  const handleProfileUpdate = (updatedData) => {
    setProfileData({ ...profileData, ...updatedData });
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
      {error && toast.error(error)}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ProfileCard user={user} />
        {/* Desktop Tabs - Hidden on mobile */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Tabs sx={{ display: { xs: 'none', md: 'flex' } }} value={1}>
            <Tab label="About Me" />
            <Tab label="Timeline" href="/profile/posts" />
            <Tab label="Photos" />
            <Tab label="Friends" />
          </Tabs>
        </Box>
        <ProfileNameForm data={profileData} />
        <ProfileForm user={profileData} onUpdate={handleProfileUpdate} />
        <PasswordForm />
        <ProfileImageUpload onUpload={handleImageUpload} />
      </Box>
    </Container>
  );
}
