// components/profile/ProfileContent.jsx
import React from 'react';
import { Box, Paper } from '@mui/material';
import PostForm from '../post/PostForm';
import PostCard from '../post/PostCard';
import AboutMe from './AboutMe';
import Photos from './Photos';
import Friends from './Friends';

const ProfileContent = ({
  activeTab,
  isOwnProfile,
  profileData,
  handleProfileUpdate,
  handleProfileImageChange,
  staticPosts,
}) => {
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
    <Paper sx={{ p: 3, borderRadius: '8px', boxShadow: 1, mb: 3 }}>
      {renderTabContent()}
    </Paper>
  );
};

export default ProfileContent;
