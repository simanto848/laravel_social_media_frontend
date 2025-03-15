import React, { useState } from 'react';
import {
  Box,
  TextField,
  Container,
  Button,
  InputAdornment,
  Typography,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          bgcolor: 'white',
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot Password Section - Right Aligned */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color="primary"
              href="/forgot-password"
              sx={{ textTransform: 'none', fontSize: '0.85rem' }}
            >
              Forgot Password?
            </Button>
          </Box>

          <Button variant="contained" color="primary" type="submit">
            Sign in
          </Button>

          {/* Register Section */}
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{' '}
            <Button
              color="primary"
              href="/register"
              sx={{ textTransform: 'none', fontSize: '0.85rem' }}
            >
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
