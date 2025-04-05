// components/profile/ProfileHeader.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MessageIcon from '@mui/icons-material/Message';

const ProfileHeader = ({
  profileData,
  isOwnProfile,
  profilePicUrl,
  handleEditProfileClick,
  handleOpenImageUpload,
  friendshipStatus,
  handleSendFriendRequest,
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
  handleUnsendFriendRequest,
  handleMessageClick,
  isLoadingFriendship,
  isProcessingFriendAction,
}) => {
  const renderFriendActionButtons = () => {
    if (isOwnProfile) return null;

    if (isLoadingFriendship) {
      return (
        <Box sx={{ ml: 1 }}>
          <CircularProgress size={24} />
        </Box>
      );
    }

    switch (friendshipStatus) {
      case 'friends':
        return (
          <Button
            variant="contained"
            startIcon={<MessageIcon />}
            onClick={handleMessageClick}
            disabled={isProcessingFriendAction}
            sx={{
              ml: 1,
              bgcolor: '#1877f2',
              color: 'white',
              '&:hover': { bgcolor: '#166fe5' },
            }}
          >
            Message
          </Button>
        );

      case 'pending_received':
        return (
          <Box>
            <Button
              variant="contained"
              startIcon={
                isProcessingFriendAction ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <CheckIcon />
                )
              }
              onClick={handleAcceptFriendRequest}
              disabled={isProcessingFriendAction}
              sx={{
                ml: 1,
                bgcolor: '#42b72a',
                color: 'white',
                '&:hover': { bgcolor: '#36a420' },
              }}
            >
              {isProcessingFriendAction ? 'Accepting...' : 'Accept'}
            </Button>
            <Button
              variant="outlined"
              startIcon={
                isProcessingFriendAction ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <CloseIcon />
                )
              }
              onClick={handleRejectFriendRequest}
              disabled={isProcessingFriendAction}
              sx={{
                ml: 1,
                color: '#65676b',
                borderColor: '#65676b',
                '&:hover': { borderColor: '#65676b' },
              }}
            >
              {isProcessingFriendAction ? 'Rejecting...' : 'Reject'}
            </Button>
          </Box>
        );

      case 'pending_sent':
        return (
          <Button
            variant="outlined"
            onClick={handleUnsendFriendRequest}
            disabled={isProcessingFriendAction}
            startIcon={
              isProcessingFriendAction ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
            sx={{
              ml: 1,
              color: '#65676b',
              borderColor: '#65676b',
              '&:hover': { borderColor: '#65676b' },
            }}
          >
            {isProcessingFriendAction ? 'Unsending...' : 'Unsend Request'}
          </Button>
        );

      default:
        return (
          <Button
            variant="contained"
            onClick={handleSendFriendRequest}
            disabled={isProcessingFriendAction}
            startIcon={
              isProcessingFriendAction ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
            sx={{
              ml: 1,
              bgcolor: '#e4e6eb',
              color: '#050505',
              '&:hover': { bgcolor: '#d8dadf' },
            }}
          >
            {isProcessingFriendAction ? 'Sending...' : 'Add Friend'}
          </Button>
        );
    }
  };

  return (
    <>
      <Box
        sx={{
          height: 250,
          background: 'linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)',
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

        {isOwnProfile ? (
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
        ) : (
          renderFriendActionButtons()
        )}
      </Box>

      <Divider />
    </>
  );
};

export default ProfileHeader;
