import React from 'react';
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

export default function FriendCard({ userList }) {
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
          key={user.username || user.name}
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
                src={user.profilePic}
                alt={user.name}
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
                {user.name}
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
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              fullWidth
              sx={{
                bgcolor: '#1877f2',
                '&:hover': { bgcolor: '#166fe5' },
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 'bold',
                py: 1,
              }}
            >
              Add Friend
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
