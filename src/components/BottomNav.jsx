import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// Icons
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

// Custom Hook
import { useSettingsMenu } from '../hooks/useSettingsMenu';

export default function BottomNav() {
  const [value, setValue] = useState(0);
  const { anchorEl, openMenu, closeMenu } = useSettingsMenu();

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
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
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
        <MenuItem onClick={closeMenu}>Privacy</MenuItem>
        <MenuItem onClick={closeMenu}>Logout</MenuItem>
      </Menu>
    </>
  );
}
