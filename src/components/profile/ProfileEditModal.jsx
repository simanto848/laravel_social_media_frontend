import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  IconButton,
  Divider,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileNameForm from './ProfileNameForm';
import ProfileForm from './ProfileForm';
import profileService from '../../services/profileServices';
import { toast } from 'react-hot-toast';

export default function ProfileEditModal({
  open,
  onClose,
  profileData,
  userData,
  onUpdate,
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    first_name: userData?.first_name || '',
    last_name: userData?.last_name || '',
    bio: profileData?.bio || '',
    email: userData?.email || '',
    phone_number: profileData?.phone_number || '',
    gender: profileData?.gender || 'other',
    dob: profileData?.dob || '',
  });

  // Update form state when modal opens or profileData/userData changes
  useEffect(() => {
    if (open) {
      setFormState({
        first_name: userData?.first_name || '',
        last_name: userData?.last_name || '',
        bio: profileData?.bio || '',
        email: userData?.email || '',
        phone_number: profileData?.phone_number || '',
        gender: profileData?.gender || 'other',
        dob: profileData?.dob || '',
      });
    }
  }, [open, profileData, userData]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const nameData = {
        first_name: formState.first_name,
        last_name: formState.last_name,
      };

      const response = await profileService.updateNames(nameData);

      if (response.status) {
        onUpdate(nameData);
        toast.success('Name updated successfully');
      } else {
        toast.error(response.message || 'Failed to update name');
      }
    } catch (error) {
      toast.error('An error occurred while updating name');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profileData = {
        bio: formState.bio,
        phone_number: formState.phone_number,
        gender: formState.gender,
        dob: formState.dob,
      };

      const response = await profileService.updateOthers(profileData);

      if (response.status) {
        onUpdate(profileData);
        toast.success('Profile updated successfully');
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred while updating profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e0e0e0',
          pb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Edit Profile
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 'medium',
          },
        }}
      >
        <Tab label="Basic Info" />
        <Tab label="Profile Picture" />
        <Tab label="About" />
      </Tabs>

      <DialogContent sx={{ mt: 2 }}>
        {activeTab === 0 && (
          <Box component="form" onSubmit={handleNameUpdate}>
            <ProfileNameForm
              data={formState}
              onChange={handleChange}
              isLoading={loading}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  bgcolor: '#1877f2',
                  '&:hover': { bgcolor: '#166fe5' },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <ProfileImageUpload currentImage={userData?.profile_pic} />
        )}

        {activeTab === 2 && (
          <Box component="form" onSubmit={handleProfileUpdate}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Bio
            </Typography>
            <ProfileForm
              user={formState}
              onChange={handleChange}
              isLoading={loading}
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  bgcolor: '#1877f2',
                  '&:hover': { bgcolor: '#166fe5' },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
