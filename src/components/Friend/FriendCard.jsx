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
import friendService from '../../services/friendService';

export default function FriendCard({ userList, onFriendRequestSent }) {
  const [isLoading, setIsLoading] = useState(false);
  const hadnleAddFriend = async (friendId) => {
    setIsLoading(true);
    try {
      const response = await friendService.sendFriendRequest(friendId);
      if (response.status) {
        toast.success(response.message);
        onFriendRequestSent();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
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
          key={user.id}
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
                alt={user.first_name + ' ' + user.last_name}
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

              {/* Will be working on this part later */}
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
            <Button
              variant="contained"
              disabled={isLoading}
              startIcon={<PersonAddIcon />}
              fullWidth
              onClick={() => hadnleAddFriend(user.user_id)}
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
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
