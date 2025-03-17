import React, { useContext, useState } from 'react';
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
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { AppContext } from '../Context/AppContext';
import LoadingOverlay from '../components/common/LoadingOverlay';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { setToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  // Form Data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.password_confirmation
    ) {
      toast.error('All fields are required');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register(formData);

      if (response.status) {
        toast.success(response.message || 'Registration successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          password_confirmation: '',
        });
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        navigate('/');
      } else {
        toast.error(response.message || 'Registration failed!');
        setErrors(response.error || {});
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
      console.error('Registration Error:', error);
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
      <LoadingOverlay open={isLoading} />
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
          Register
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
            error={!!errors.username}
            helperText={errors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
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
          <TextField
            name="password_confirmation"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={formData.password_confirmation}
            onChange={handleChange}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>

          <Typography variant="body2" color="textSecondary">
            Already have an account?{' '}
            <Button
              color="primary"
              href="/login"
              sx={{ textTransform: 'none', fontSize: '0.85rem' }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
