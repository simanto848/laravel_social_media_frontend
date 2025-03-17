import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-hot-toast';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Custom Hook
import { useSettingsMenu } from '../../hooks/useSettingsMenu';
import authService from '../../services/authService';
import { AppContext } from '../../Context/AppContext';

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const { anchorEl, openMenu, closeMenu } = useSettingsMenu();
  const { user, setUser, setToken, token } = useContext(AppContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (newValue, path) => {
    setValue(newValue);
    navigate(path);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await authService.logout(token);
      if (response.status) {
        toast.success(response.message || 'Logged out successfully!');
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
      } else {
        toast.error(response.message || 'Logout failed!');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Logout Error:', error);
    } finally {
      setIsLoggingOut(false);
      closeMenu();
    }
  };

  return (
    <>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            onClick={() => handleNavigation(0, '/')}
          />
          <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
          <BottomNavigationAction
            label="Notifications"
            icon={<NotificationsIcon />}
          />
          <BottomNavigationAction
            label={user?.username || 'Profile'}
            icon={<AccountCircleIcon />}
            onClick={() => handleNavigation(4, '/profile')}
          />
          <BottomNavigationAction
            label="More"
            icon={<SettingsIcon />}
            onClick={openMenu}
          />
        </BottomNavigation>
      </Paper>

      {/* Settings Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem onClick={closeMenu}>Account Settings</MenuItem>
        <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </MenuItem>
      </Menu>
    </>
  );
}
