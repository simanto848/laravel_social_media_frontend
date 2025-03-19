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
import profileService from '../services/profileServices';
import { AppContext } from '../Context/AppContext';
import avtarPic from '../assets/male_4.png';
import postPic from '../assets/female_avatar_2.png';
import AboutMe from '../components/profile/AboutMe';
import PostForm from '../components/post/PostForm';
import PostCard from '../components/post/PostCard';
import Photos from '../components/profile/Photos';
import Friends from '../components/profile/Friends';

const staticPosts = [
  {
    id: 1,
    author: { username: 'john_doe', avatar: avtarPic },
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
    author: { username: 'jane_smith', avatar: avtarPic },
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
  const { user } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

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

  // Handle profile picture upload
  // const handleImageUpload = (file) => {
  //   console.log('Profile picture uploaded:', file);
  // };

  const tabs = [
    {
      label: 'About Me',
      component: () => <AboutMe profile={profileData} />,
    },
    {
      label: 'Timeline',
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Profile
      </Typography>
      {error && toast.error(error)}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ProfileCard user={user} />
        {/* Desktop Tabs - Hidden on mobile */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Tabs
            sx={{ display: { xs: 'none', md: 'flex' } }}
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            aria-label="profile tabs"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Box>
        {renderTabContent()}
        {/* <ProfileImageUpload onUpload={handleImageUpload} /> */}
      </Box>
    </Container>
  );
}
