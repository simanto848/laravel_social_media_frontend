import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import PeopleIcon from '@mui/icons-material/People';

// Custom Hook
import { useSettingsMenu } from '../../hooks/useSettingsMenu';
import authService from '../../services/authService';
import { AppContext } from '../../Context/AppContext';

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const { anchorEl, openMenu, closeMenu } = useSettingsMenu();
  const { user, logout, token } = useContext(AppContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Update the active tab based on current location
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setValue(0);
    else if (path === '/messages') setValue(1);
    else if (path === '/find-friends') setValue(2);
    else if (path === '/notifications') setValue(3);
    else if (path === '/profile') setValue(4);
    else if (path === '/account') setValue(5);
  }, [location]);

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
        logout();
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
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000, // Add high z-index
        }}
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
          <BottomNavigationAction
            label="Messages"
            icon={<MessageIcon />}
            onClick={() => handleNavigation(1, '/messages')}
          />
          <BottomNavigationAction
            label="Find Friends"
            icon={<PeopleIcon />}
            onClick={() => handleNavigation(2, '/find-friends')}
          />
          <BottomNavigationAction
            label="Notifications"
            icon={<NotificationsIcon />}
            onClick={() => handleNavigation(3, '/notifications')}
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
        <MenuItem
          onClick={() => {
            closeMenu();
            handleNavigation(5, '/account');
          }}
        >
          Account Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </MenuItem>
      </Menu>
    </>
  );
}
