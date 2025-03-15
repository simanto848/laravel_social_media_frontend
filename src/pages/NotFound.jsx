import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <Box
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        sx={{ textAlign: 'center', maxWidth: 500 }}
      >
        <Typography variant="h1" className="text-gray-800 font-bold">
          404
        </Typography>
        <Typography variant="h5" className="text-gray-600 mt-2">
          Page Not Found
        </Typography>
        <Typography variant="body1" className="text-gray-500 mt-2">
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="mt-6"
          onClick={() => navigate(-1)}
          sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
          }}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
}
