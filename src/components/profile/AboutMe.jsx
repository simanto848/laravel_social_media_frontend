import React, { useContext } from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import OthersForm from './OthersForm';
import { AppContext } from '../../Context/AppContext';
import { useParams } from 'react-router-dom';

export default function AboutMe({ profile, onUpdate }) {
  const { user } = useContext(AppContext);
  const { username: visitedUsername } = useParams();

  const isOwnProfile = user.username === visitedUsername;

  // Handle profile updates
  const handleOthersUpdate = async (updatedData) => {
    if (onUpdate) {
      onUpdate(updatedData);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          Basic Information
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Name
            </Typography>
            <Typography variant="body1">
              {profile.first_name || ''} {profile.last_name || ''}
            </Typography>
          </Box>

          {isOwnProfile && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Username
              </Typography>
              <Typography variant="body1">
                {user.username || 'No username provided'}
              </Typography>
            </Box>
          )}

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Gender
            </Typography>
            <Typography variant="body1" textTransform="capitalize">
              {profile.gender || 'Not specified'}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Date of Birth
            </Typography>
            <Typography variant="body1">
              {profile.dob
                ? new Date(profile.dob).toLocaleDateString()
                : 'Not specified'}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Phone Number
            </Typography>
            <Typography variant="body1">
              {profile.phone_number || 'No phone number provided'}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
        <Typography variant="h6" fontWeight="medium" gutterBottom>
          About Me
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1">
          {profile.bio || 'No bio available'}
        </Typography>
      </Paper>

      {isOwnProfile && (
        <Paper sx={{ p: 3, borderRadius: '8px' }}>
          <Typography
            variant="h6"
            fontWeight="medium"
            color="primary"
            gutterBottom
          >
            Edit Profile Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <OthersForm
            data={{
              bio: profile?.bio || '',
              phone_number: profile?.phone_number || '',
              gender: profile?.gender || 'other',
              dob: profile?.dob || '',
            }}
            onSubmit={handleOthersUpdate}
          />
        </Paper>
      )}
    </Box>
  );
}
