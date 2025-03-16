import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

export default function SearchBar() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'center', // Center the Paper horizontally
        bgcolor: '#f5f5f5', // Light background for visibility
        p: 1, // Add some padding around the Paper
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: { xs: '100%', sm: '75%', md: '50%' }, // Responsive width
          maxWidth: '600px', // Maximum width to avoid stretching too wide
          p: 1,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)', // Softer shadow for depth
          borderRadius: '8px', // Rounded corners
          bgcolor: 'white', // White background for the Paper
        }}
        elevation={3}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <IconButton sx={{ p: '8px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              bgcolor: '#fafafa',
              borderRadius: '4px',
              px: 1,
              py: 0.5,
              '& .MuiInputBase-input': {
                padding: '4px 0',
              },
            }}
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
