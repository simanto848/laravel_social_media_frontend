import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import React from 'react';
import avatarImage from '../../assets/male_4.png';

export default function ProfileCard({ user }) {
  return (
    <Card
      sx={{
        borderRadius: '8px',
        boxShadow: 1,
        overflow: 'visible',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          position: 'relative',
          px: 2,
          py: 1.5,
        }}
      >
        <Avatar
          src={user.profile_pic || avatarImage}
          alt={user.username}
          sx={{
            width: 40,
            height: 40,
            position: 'absolute',
            top: 12,
            left: 12,
          }}
        />
        <Box
          sx={{
            textAlign: 'left',
            width: '100%',
            pl: 6,
            '& .MuiTypography-root': {
              lineHeight: 1.3,
            },
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="text.primary">
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="0.8rem">
            {user.email}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
