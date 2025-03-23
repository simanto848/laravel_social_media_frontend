import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';
import FriendCard from '../components/Friend/FriendCard';

export default function FindFriend() {
  const UsersInfo = [
    {
      name: 'Jane Doe',
      username: 'janedoe',
      profilePic:
        'http://localhost:8000/storage/profile_images/IrxVrn1ubE5GZycUAbo2Rk4TKtX0NMSaWOHlujUP.jpg',
      mutualFriends: 3,
    },
    {
      name: 'Alice Smith',
      username: 'alicesmith',
      profilePic:
        'http://localhost:8000/storage/profile_images/IrxVrn1ubE5GZycUAbo2Rk4TKtX0NMSaWOHlujUP.jpg',
      mutualFriends: 5,
    },
    {
      name: 'Bob Johnson',
      username: 'bobjohnson',
      profilePic:
        'http://localhost:8000/storage/profile_images/IrxVrn1ubE5GZycUAbo2Rk4TKtX0NMSaWOHlujUP.jpg',
      mutualFriends: 1,
    },
    {
      name: 'Sarah Williams',
      username: 'sarahw',
      profilePic:
        'http://localhost:8000/storage/profile_images/IrxVrn1ubE5GZycUAbo2Rk4TKtX0NMSaWOHlujUP.jpg',
    },
  ];

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
        {' '}
        <FriendCard userList={UsersInfo} />
      </Box>
    </Container>
  );
}
