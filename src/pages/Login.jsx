import React, { useContext, useState } from 'react';
import {
  Box,
  TextField,
  Container,
  Button,
  InputAdornment,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AppContext } from '../Context/AppContext';
import authService from '../services/authService';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AppContext); // Fixed context destructuring
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.username || !formData.password) {
      toast.error('All fields are required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login(formData);

      if (response.status) {
        toast.success(response.message || 'Login successful!');
        login(response.data.token, response.data.user);
        setFormData({
          username: '',
          password: '',
        });
        navigate('/');
      } else {
        toast.error(response.message || 'Login failed!');
        setErrors(response.error || {});
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
      console.error('Login Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      {isLoading && <CircularProgress color="success" />}
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
          onSubmit={handleSubmit}
        >
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
            disabled={isLoading}
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
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    disabled={isLoading}
                  >
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
              disabled={isLoading}
            >
              Forgot Password?
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          <Typography variant="body2" color="textSecondary">
            Don't have an account?{' '}
            <Button
              color="primary"
              href="/register"
              sx={{ textTransform: 'none', fontSize: '0.85rem' }}
              disabled={isLoading}
            >
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
