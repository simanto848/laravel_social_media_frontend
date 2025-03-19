import React, { useContext, useEffect, useState, useRef } from 'react';
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
import { toast } from 'react-hot-toast';
import profileService from '../services/profileServices';
import { AppContext } from '../Context/AppContext';
import avatarPic from '../assets/male_4.png';
import {
  coverPhotoGradient,
  getRandomCoverGradient,
} from '../assets/cover_photo.js';
import postPic from '../assets/female_avatar_2.png';
import AboutMe from '../components/profile/AboutMe';
import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';
import Photos from '../components/profile/Photos';
import Friends from '../components/profile/Friends';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import ProfileEditModal from '../components/profile/ProfileEditModal';

const staticPosts = [
  {
    id: 1,
    author: { username: 'john_doe', avatar: avatarPic },
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
    author: { username: 'jane_smith', avatar: avatarPic },
    content: 'Just finished a new painting! 🎨',
    image: postPic,
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
  const [profileData, setProfileData] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0); // Changed from 1 to 0 to default to Posts
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePic, setProfilePic] = useState(user?.profile_pic || avatarPic);
  const [openEditModal, setOpenEditModal] = useState(false);

  // References to file inputs
  const profilePicInputRef = useRef(null);
  const coverPhotoInputRef = useRef(null);

  const fetchProfile = async () => {
    const userProfileData = await profileService.getProfile();
    if (userProfileData.status) {
      setProfileData(userProfileData.data.data);
    } else {
      setError(userProfileData.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImageUpload = (file) => {
    console.log('Profile picture uploaded:', file);
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
      // Update the profile data in state and close the modal
      setProfileData({ ...profileData, ...updatedData });

      // If user data was updated (like name), update the user context
      if (updatedData.first_name || updatedData.last_name) {
        setUser((prev) => ({
          ...prev,
          first_name: updatedData.first_name || prev.first_name,
          last_name: updatedData.last_name || prev.last_name,
        }));
      }

      // Show success message
      toast.success('Profile updated successfully');
      setOpenEditModal(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);

      // Call your image upload service/API here
      handleImageUpload(file);

      // You might want to reset the input
      event.target.value = '';
    }
  };

  const handleCoverPhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverPhoto(imageUrl);

      // Call your image upload service/API here
      console.log('Cover photo uploaded:', file);

      // You might want to reset the input
      event.target.value = '';
    }
  };

  const handleEditProfileClick = () => {
    fetchProfile(); // Fetch fresh data before opening modal
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const tabs = [
    {
      label: 'Posts',
      component: () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <PostForm />
          {staticPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      ),
    },
    {
      label: 'About',
      component: () => (
        <AboutMe profile={profileData} onUpdate={handleProfileUpdate} />
      ),
    },
    {
      label: 'Photos',
      component: () => <Photos />,
    },
    {
      label: 'Friends',
      component: () => <Friends />,
    },
  ];

  const renderTabContent = () => tabs[activeTab].component() || null;

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', pt: 2 }}>
      {/* Hidden file inputs */}
      <input
        type="file"
        accept="image/*"
        ref={profilePicInputRef}
        style={{ display: 'none' }}
        onChange={handleProfilePicUpload}
      />
      <input
        type="file"
        accept="image/*"
        ref={coverPhotoInputRef}
        style={{ display: 'none' }}
        onChange={handleCoverPhotoUpload}
      />

      <Container maxWidth="md" disableGutters>
        {/* Cover Photo Section */}
        <Paper
          sx={{
            position: 'relative',
            mb: 7,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: 1,
          }}
        >
          {/* Cover Photo */}
          <Box
            sx={{
              height: 250,
              background: coverPhoto
                ? `url(${coverPhoto})`
                : getRandomCoverGradient(),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <Button
              variant="contained"
              size="small"
              startIcon={<CameraAltIcon />}
              onClick={() => coverPhotoInputRef.current.click()}
              sx={{
                position: 'absolute',
                bottom: 15,
                right: 15,
                bgcolor: 'rgba(255,255,255,0.8)',
                color: '#000',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              {coverPhoto ? 'Change Cover Photo' : 'Add Cover Photo'}
            </Button>
          </Box>

          {/* Profile Picture and Name Section */}
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
            {/* Profile Picture */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profilePic}
                alt={user.username}
                sx={{
                  width: { xs: 120, sm: 168 },
                  height: { xs: 120, sm: 168 },
                  border: '4px solid white',
                  boxShadow: 1,
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => profilePicInputRef.current.click()}
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
            </Box>

            {/* Name and Info */}
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
                {user.first_name} {user.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {profileData.bio || 'No bio available'}
              </Typography>
            </Box>

            {/* Edit Profile Button */}
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
          </Box>

          <Divider />

          {/* Navigation Tabs */}
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

        {/* Tab Content */}
        <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: 1, mb: 3 }}>
          {renderTabContent()}
        </Paper>
      </Container>

      {/* Edit Profile Modal */}
      <ProfileEditModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        profileData={profileData}
        userData={user}
        onUpdate={handleProfileUpdate}
      />
    </Box>
  );
}
