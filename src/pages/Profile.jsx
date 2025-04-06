import React, { useContext, useEffect, useState } from 'react';
import { Container, Box, Paper } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import profileService from '../services/profileServices';
import { AppContext } from '../Context/AppContext';
import postPic from '../assets/female_avatar_2.png';
import ProfileHeader from '../components/profile/ProfileHeader.jsx';
import ProfileTabs from '../components/profile/ProfileTabs.jsx';
import ProfileContent from '../components/profile/ProfileContent.jsx';
import ProfileModals from '../components/profile/ProfileModals.jsx';
import friendService from '../services/friendService.jsx';

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
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [isLoadingFriendship, setIsLoadingFriendship] = useState(false);
  const [isProcessingFriendAction, setIsProcessingFriendAction] =
    useState(false);
  const [currentFriendshipId, setCurrentFriendshipId] = useState(null);
  const navigate = useNavigate();

  const isOwnProfile = user?.username === visitedUsername;

  useEffect(() => {
    fetchProfile();
  }, [visitedUsername, profileImageUpdated]);

  const fetchProfile = async () => {
    const userProfileData = await profileService.getProfileByUsername(
      visitedUsername
    );

    if (userProfileData.status) {
      const userData = userProfileData.data;

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

  // Check friendship status when profile loads
  useEffect(() => {
    const checkFriendship = async () => {
      // Don't check for own profile or if user isn't logged in
      if (isOwnProfile || !user?.id || !profileData?.profile?.user_id) return;

      setIsLoadingFriendship(true);
      try {
        const response = await friendService.getFriendship(
          profileData.profile.user_id
        );
        console.log(response);

        if (response?.status) {
          const friendship = response?.data;

          if (!friendship) {
            setFriendshipStatus('none');
            return;
          }

          if (friendship.status === 'accepted') {
            setFriendshipStatus('friends');
          } else if (friendship.status === 'pending') {
            if (friendship.requested_by === user.id) {
              setFriendshipStatus('pending_sent');
            } else {
              setFriendshipStatus('pending_received');
            }
          } else {
            setFriendshipStatus('none');
          }

          // Store the friendship ID for later use in actions
          setCurrentFriendshipId(friendship.id);
        } else {
          setFriendshipStatus('none');
        }
      } catch (error) {
        console.error('Error checking friendship:', error);
        setFriendshipStatus('none');
      } finally {
        setIsLoadingFriendship(false);
      }
    };

    checkFriendship();
  }, [profileData, user, isOwnProfile]);

  // Handle friend actions
  const handleSendFriendRequest = async () => {
    setIsProcessingFriendAction(true);
    try {
      const response = await friendService.sendFriendRequest(
        profileData.user.id
      );
      if (response.status) {
        setFriendshipStatus('pending_sent');
        toast.success(response.message || 'Friend request sent!');
      } else {
        toast.error(response.message || 'Failed to send friend request');
      }
    } catch (error) {
      toast.error('Failed to send friend request');
      console.error(error);
    } finally {
      setIsProcessingFriendAction(false);
    }
  };

  const handleAcceptFriendRequest = async (friendshipId) => {
    setIsProcessingFriendAction(true);
    try {
      const response = await friendService.acceptFriendRequest(friendshipId);
      if (response.status) {
        setFriendshipStatus('friends');
        toast.success(response.message || 'Friend request accepted!');
      } else {
        toast.error(response.message || 'Failed to accept friend request');
      }
    } catch (error) {
      toast.error('Failed to accept friend request');
      console.error(error);
    } finally {
      setIsProcessingFriendAction(false);
    }
  };

  const handleRejectFriendRequest = async (friendshipId) => {
    setIsProcessingFriendAction(true);
    try {
      const response = await friendService.rejectFriendRequest(friendshipId);
      if (response.status) {
        setFriendshipStatus('none');
        toast.success(response.message || 'Friend request rejected');
      } else {
        toast.error(response.message || 'Failed to reject friend request');
      }
    } catch (error) {
      toast.error('Failed to reject friend request');
      console.error(error);
    } finally {
      setIsProcessingFriendAction(false);
    }
  };

  const handleUnsendFriendRequest = async (friendshipId) => {
    setIsProcessingFriendAction(true);
    try {
      const response = await friendService.rejectFriendRequest(friendshipId);
      if (response.status) {
        setFriendshipStatus('none');
        toast.success(response.message || 'Cancel Friend request');
      } else {
        toast.error(response.message || 'Failed to unsend friend request');
      }
    } catch (error) {
      toast.error('Failed to unsend friend request');
      console.error(error);
    } finally {
      setIsProcessingFriendAction(false);
    }
  };

  // Not implemented yet
  const handleMessageClick = () => {
    // Navigate to messages with this user
    navigate(`/messages/${profileData.user.id}`);
  };

  const handleProfileUpdate = async (updatedData) => {
    try {
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
    setProfileImageUpdated((prev) => !prev);
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
    { label: 'Posts' },
    { label: 'About' },
    { label: 'Photos' },
    { label: 'Friends' },
  ];

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
          <ProfileHeader
            profileData={profileData}
            isOwnProfile={isOwnProfile}
            profilePicUrl={profilePicUrl}
            handleEditProfileClick={handleEditProfileClick}
            handleOpenImageUpload={handleOpenImageUpload}
            friendshipStatus={friendshipStatus}
            handleSendFriendRequest={handleSendFriendRequest}
            handleAcceptFriendRequest={() =>
              handleAcceptFriendRequest(currentFriendshipId)
            }
            handleRejectFriendRequest={() =>
              handleRejectFriendRequest(currentFriendshipId)
            }
            handleUnsendFriendRequest={() =>
              handleUnsendFriendRequest(currentFriendshipId)
            }
            handleMessageClick={handleMessageClick}
            isLoadingFriendship={isLoadingFriendship}
            isProcessingFriendAction={isProcessingFriendAction}
          />

          <ProfileTabs
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            tabs={tabs}
          />
        </Paper>

        <ProfileContent
          activeTab={activeTab}
          isOwnProfile={isOwnProfile}
          profileData={profileData}
          handleProfileUpdate={handleProfileUpdate}
          handleProfileImageChange={handleProfileImageChange}
          staticPosts={staticPosts}
        />
      </Container>

      <ProfileModals
        isOwnProfile={isOwnProfile}
        openEditModal={openEditModal}
        handleCloseEditModal={handleCloseEditModal}
        profileData={profileData}
        user={user}
        handleProfileUpdate={handleProfileUpdate}
        openImageUpload={openImageUpload}
        handleCloseImageUpload={handleCloseImageUpload}
        profilePicUrl={profilePicUrl}
      />
    </Box>
  );
}
