import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { toast } from 'react-hot-toast';
import FriendCard from '../components/Friend/FriendCard';
import friendService from '../services/friendService';
import { AppContext } from '../Context/AppContext';

export default function FindFriend() {
  const [SuggestFriends, setSuggestFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    if (user.id) {
      fetchSuggestFriends();
      fetchFriendRequests();
    }
  }, [user.id]);

  const fetchSuggestFriends = async () => {
    try {
      const response = await friendService.getSuggestedFriends();
      if (response.status) {
        setSuggestFriends(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await friendService.getFriendRequests();
      if (response.status) {
        setFriendRequests(response.data);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch friend requests');
    }
  };

  const onFriendRequestSent = () => {
    fetchSuggestFriends();
  };

  const onFriendRequestAction = () => {
    fetchFriendRequests(); // Refresh friend requests after accepting/rejecting
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" color="#1877f2" sx={{ mb: 2 }}>
        Friend Requests
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {friendRequests.length > 0 ? (
          <FriendCard
            userList={friendRequests.map((request) => ({
              ...request.user.profile,
              user_id: request.user.id,
              friendShipId: request.id,
            }))}
            isFriendRequest={true}
            onFriendRequestAction={onFriendRequestAction}
          />
        ) : (
          <Typography variant="body1" color="text.secondary">
            No friend requests at this time.
          </Typography>
        )}
      </Box>
      <Typography variant="h4" fontWeight="bold" color="#1877f2" sx={{ mb: 2 }}>
        People You May Know
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <FriendCard
          userList={SuggestFriends}
          onFriendRequestSent={onFriendRequestSent}
        />
      </Box>
    </Container>
  );
}
