import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import { toast } from 'react-hot-toast';
import FriendCard from '../components/Friend/FriendCard';
import friendService from '../services/friendService';
import { AppContext } from '../Context/AppContext';

export default function FindFriend() {
  const [SuggestFriends, setSuggestFriends] = useState([]);
  const { user } = useContext(AppContext);

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

  const onFriendRequestSent = () => {
    fetchSuggestFriends();
  };

  useEffect(() => {
    fetchSuggestFriends();
  }, [user.id]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {' '}
      {/* Change back to md */}
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
