import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import avatarImage from '../../assets/male_4.png';

export default function ProfileCard({ user }) {
  return (
    <Card sx={{ mb: 3, boxShadow: 3 }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          src={avatarImage}
          alt={user.username}
          sx={{ width: 100, height: 100 }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" color="textSecondary">
            {user.username}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
