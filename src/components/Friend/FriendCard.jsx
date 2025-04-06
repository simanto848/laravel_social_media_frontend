import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import friendService from '../../services/friendService';

export default function FriendCard({
  userList,
  isFriendRequest = false,
  onFriendRequestSent,
  onFriendRequestAction,
}) {
  const [isLoading, setIsLoading] = useState(false);

  // Handle sending a friend request (for suggested friends)
  const handleAddFriend = async (friendId) => {
    setIsLoading(true);
    try {
      const response = await friendService.sendFriendRequest(friendId);
      if (response.status) {
        toast.success(response.message || 'Friend request sent!');
        if (onFriendRequestSent) onFriendRequestSent();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle accepting a friend request
  const handleAcceptFriendRequest = async (friendShipId) => {
    setIsLoading(true);
    try {
      const response = await friendService.acceptFriendRequest(friendShipId);
      if (response.status) {
        toast.success(response.message || 'Friend request accepted!');
        if (onFriendRequestAction) onFriendRequestAction();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to accept friend request');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle rejecting a friend request
  const handleRejectFriendRequest = async (friendShipId) => {
    setIsLoading(true);
    try {
      const response = await friendService.rejectFriendRequest(friendShipId);
      if (response.status) {
        toast.success(response.message || 'Friend request rejected!');
        if (onFriendRequestAction) onFriendRequestAction();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to reject friend request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
      }}
    >
      {userList.map((user) => (
        <Card
          key={user.user_id} // Use user_id as the key for consistency
          sx={{
            width: 250,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' },
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                right: 5,
                top: 5,
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <Box
              sx={{
                pt: 3,
                pb: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                src={
                  user.image?.path
                    ? `http://localhost:8000/storage/${user.image.path}`
                    : ''
                }
                alt={`${user.first_name} ${user.last_name}`}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  border: '4px solid #f0f2f5',
                  cursor: 'pointer',
                }}
              />
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
              >
                {user.first_name} {user.last_name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mt: 0.5, px: 2 }}
              >
                {user.mutualFriends
                  ? `${user.mutualFriends} mutual friends`
                  : 'Suggested for you'}
              </Typography>
            </Box>
          </Box>

          <CardActions
            sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'center' }}
          >
            {isFriendRequest ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  disabled={isLoading}
                  startIcon={<CheckIcon />}
                  onClick={() => handleAcceptFriendRequest(user.friendShipId)}
                  sx={{
                    bgcolor: '#1877f2',
                    '&:hover': { bgcolor: '#166fe5' },
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    py: 1,
                    px: 2,
                  }}
                >
                  {isLoading ? 'Processing...' : 'Accept'}
                </Button>
                <Button
                  variant="outlined"
                  disabled={isLoading}
                  onClick={() => handleRejectFriendRequest(user.friendShipId)}
                  sx={{
                    borderColor: '#d32f2f',
                    color: '#d32f2f',
                    '&:hover': { borderColor: '#b71c1c', color: '#b71c1c' },
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    py: 1,
                    px: 2,
                  }}
                >
                  {isLoading ? 'Processing...' : 'Reject'}
                </Button>
              </Box>
            ) : (
              <Button
                variant="contained"
                disabled={isLoading}
                startIcon={<PersonAddIcon />}
                fullWidth
                onClick={() => handleAddFriend(user.user_id)}
                sx={{
                  bgcolor: '#1877f2',
                  '&:hover': { bgcolor: '#166fe5' },
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  py: 1,
                }}
              >
                {isLoading ? 'Sending...' : 'Add Friend'}
              </Button>
            )}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
