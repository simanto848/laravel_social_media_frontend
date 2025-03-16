import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Custom Hook
import { useSettingsMenu } from '../../hooks/useSettingsMenu';

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const { anchorEl, openMenu, closeMenu } = useSettingsMenu();
  const navigate = useNavigate();

  const handleNavigation = (newValue, path) => {
    setValue(newValue);
    navigate(path);
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
            label="Profile"
            icon={<AccountCircleIcon />}
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
      </Menu>
    </>
  );
}
