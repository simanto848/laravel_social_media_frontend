import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  Avatar,
  Divider,
  Dialog,
  DialogContent,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import profileService from '../services/profileServices';
import { AppContext } from '../Context/AppContext';
import { getRandomCoverGradient } from '../assets/cover_photo.js';
import postPic from '../assets/female_avatar_2.png';
import AboutMe from '../components/profile/AboutMe';
import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';
import Photos from '../components/profile/Photos';
import Friends from '../components/profile/Friends';
import ProfileEditModal from '../components/profile/ProfileEditModal';
import ProfileImageUpload from '../components/profile/ProfileImageUpload.jsx';

const staticPosts = [
  {
    id: 1,
    author: { username: 'john_doe' },
    content: 'Having a great day at the beach! 🌊',
    image: postPic,
    createdAt: '2025-03-18T10:00:00Z',
    likes: 12,
    likedByUser: false,
    comments: [
      {
        id: 1,
        author: 'jane_smith',
        content: 'Looks amazing!',
        createdAt: '2025-03-18T10:05:00Z',
      },
      {
        id: 2,
        author: 'bob_jones',
        content: 'Wish I was there!',
        createdAt: '2025-03-18T10:10:00Z',
      },
    ],
  },
  {
    id: 2,
    author: { username: 'jane_smith' },
    content: 'Just finished a new painting! 🎨',
    createdAt: '2025-03-18T12:00:00Z',
    likes: 8,
    likedByUser: true,
    comments: [
      {
        id: 3,
        author: 'john_doe',
        content: 'Beautiful work!',
        createdAt: '2025-03-18T12:05:00Z',
      },
    ],
  },
];

export default function Profile() {
  const { username: visitedUsername } = useParams();
  const [profileData, setProfileData] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(0);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openImageUpload, setOpenImageUpload] = useState(false);
  const [profileImageUpdated, setProfileImageUpdated] = useState(false);

  const isOwnProfile = user.username === visitedUsername;

  const fetchProfile = async () => {
    const userProfileData = await profileService.getProfileByUsername(
      visitedUsername
    );
    if (userProfileData.status) {
      const userData = userProfileData.data.data;
      setProfileData(userData);
      if (
        userData.profile &&
        userData.profile.image &&
        userData.profile.image.path
      ) {
        const imageUrl = `http://localhost:8000/storage/${userData.profile.image.path}`;
        setProfilePicUrl(imageUrl);
      }
    } else {
      toast.error(userProfileData.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [visitedUsername, profileImageUpdated]);

  const handleProfileUpdate = async (updatedData) => {
    try {
      // Update nested profile data
      setProfileData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          ...updatedData,
        },
      }));
      if (updatedData.first_name || updatedData.last_name) {
        setUser((prev) => ({
          ...prev,
          first_name: updatedData.first_name || prev.first_name,
          last_name: updatedData.last_name || prev.last_name,
        }));
      }
      toast.success('Profile updated successfully');
      setOpenEditModal(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleProfileImageChange = () => {
    setProfileImageUpdated((prev) => !prev); // Toggle to trigger useEffect
  };

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditProfileClick = () => {
    fetchProfile();
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenImageUpload = () => {
    setOpenImageUpload(true);
  };

  const handleCloseImageUpload = () => {
    setOpenImageUpload(false);
    fetchProfile();
  };

  const tabs = [
    {
      label: 'Posts',
      component: () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {isOwnProfile && <PostForm />}
          {staticPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      ),
    },
    {
      label: 'About',
      component: () => (
        <AboutMe
          profile={profileData.profile || {}}
          onUpdate={handleProfileUpdate}
        />
      ),
    },
    {
      label: 'Photos',
      component: () => (
        <Photos profileImageUpdated={handleProfileImageChange} />
      ),
    },
    {
      label: 'Friends',
      component: () => <Friends />,
    },
  ];

  const renderTabContent = () => tabs[activeTab].component() || null;

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', pt: 2 }}>
      <Container maxWidth="md" disableGutters>
        <Paper
          sx={{
            position: 'relative',
            mb: 7,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: 1,
          }}
        >
          <Box
            sx={{
              height: 250,
              background: getRandomCoverGradient(),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            {isOwnProfile && (
              <Button
                variant="contained"
                size="small"
                startIcon={<CameraAltIcon />}
                sx={{
                  position: 'absolute',
                  bottom: 15,
                  right: 15,
                  bgcolor: 'rgba(255,255,255,0.8)',
                  color: '#000',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
              >
                Add Cover Photo
              </Button>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-end' },
              px: 3,
              pb: 2,
              position: 'relative',
              mt: { xs: -8, sm: -5 },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profilePicUrl}
                alt={profileData.username || 'User'}
                sx={{
                  width: { xs: 120, sm: 168 },
                  height: { xs: 120, sm: 168 },
                  border: '4px solid white',
                  boxShadow: 1,
                }}
              />
              {isOwnProfile && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleOpenImageUpload}
                  sx={{
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                    minWidth: 'auto',
                    borderRadius: '50%',
                    bgcolor: '#e4e6eb',
                    color: '#050505',
                    p: 1,
                    '&:hover': { bgcolor: '#d8dadf' },
                  }}
                >
                  <CameraAltIcon fontSize="small" />
                </Button>
              )}
            </Box>

            <Box
              sx={{
                ml: { xs: 0, sm: 3 },
                mt: { xs: 2, sm: 0 },
                mb: { xs: 2, sm: 1 },
                textAlign: { xs: 'center', sm: 'left' },
                flexGrow: 1,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {profileData.profile?.first_name || ''}{' '}
                {profileData.profile?.last_name || ''}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {profileData.profile?.bio || 'No bio available'}
              </Typography>
            </Box>

            {isOwnProfile && (
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEditProfileClick}
                sx={{
                  alignSelf: { xs: 'center', sm: 'flex-end' },
                  bgcolor: '#e4e6eb',
                  color: '#050505',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#d8dadf' },
                }}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          <Divider />

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="profile tabs"
            sx={{
              px: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 80,
                fontWeight: 'bold',
                mx: 1,
                fontSize: '0.95rem',
                color: '#65676b',
              },
              '& .Mui-selected': {
                color: '#1877f2',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1877f2',
                height: 3,
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: 1, mb: 3 }}>
          {renderTabContent()}
        </Paper>
      </Container>

      {isOwnProfile && (
        <>
          <ProfileEditModal
            open={openEditModal}
            onClose={handleCloseEditModal}
            profileData={profileData.profile || {}}
            userData={user}
            onUpdate={handleProfileUpdate}
          />
          <Dialog
            open={openImageUpload}
            onClose={handleCloseImageUpload}
            maxWidth="sm"
            fullWidth
          >
            <DialogContent>
              <ProfileImageUpload currentImage={profilePicUrl} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </Box>
  );
}
