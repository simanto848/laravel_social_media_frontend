import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Card,
  CardContent,
  Grid,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import friendService from '../../services/friendService';
import { Link } from 'react-router-dom';

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    console.log('Friends: ', friends);
  }, [friends]);

  const fetchFriends = async () => {
    try {
      setLoading(true);
      const response = await friendService.getFriendList();
      if (response.status) {
        setFriends(response.data.data || []);
      } else {
        toast.error(response.message || 'Error fetching friends');
      }
    } catch (error) {
      toast.error(`Failed to fetch friends: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event, friendId) => {
    setAnchorEl(event.currentTarget);
    setSelectedFriendId(friendId); // friendId is the user_id of the friend
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFriendId(null);
  };

  const handleUnfriend = async () => {
    if (!selectedFriendId) return;

    try {
      const response = await friendService.unFriend(selectedFriendId);
      if (response.status) {
        setFriends(
          friends.filter((friend) => friend.user_id !== selectedFriendId)
        );
        toast.success(response.message || 'Unfriended successfully');
      } else {
        toast.error(response.message || 'Failed to unfriend');
      }
    } catch (error) {
      toast.error(`Error unfriending: ${error.message}`);
    } finally {
      handleMenuClose();
    }
  };

  const handleBlock = async () => {
    toast.error('Block feature not implemented yet');
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          background: 'linear-gradient(45deg, #f5f7fa 0%, #e4e7eb 100%)',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: '#1976d2',
          }}
        >
          My Friends
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {friends.length > 0 ? (
              friends.map((friend) => (
                <Grid item xs={12} sm={6} md={4} key={friend.id}>
                  {/* Not implement yet of Link to the friend profile */}
                  <Link
                    to={`/profile/${friend.user_id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        },
                        borderRadius: 2,
                        position: 'relative',
                      }}
                    >
                      <CardContent
                        sx={{ display: 'flex', alignItems: 'center', p: 2 }}
                      >
                        <Box sx={{ position: 'relative', mr: 2 }}>
                          <Avatar
                            src={
                              friend.image?.path
                                ? `http://localhost:8000/storage/${friend.image.path}`
                                : undefined
                            }
                            alt={`${friend.first_name} ${friend.last_name}`}
                            sx={{
                              width: 56,
                              height: 56,
                              border: '2px solid #1976d2',
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              width: 14,
                              height: 14,
                              bgcolor: 'success.main',
                              borderRadius: '50%',
                              border: '2px solid white',
                              zIndex: 1,
                            }}
                          />
                        </Box>
                        <Box flexGrow={1}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 500,
                              color: '#333',
                            }}
                          >
                            {friend.first_name} {friend.last_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Friend
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            handleMenuOpen(e, friend.user_id);
                          }}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Card sx={{ textAlign: 'center', py: 4 }}>
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      No friends found
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        )}
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleUnfriend}>Unfriend</MenuItem>
        <MenuItem onClick={handleBlock}>Block</MenuItem>
      </Menu>
    </Box>
  );
}
