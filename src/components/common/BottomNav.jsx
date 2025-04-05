import React, { useContext, useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { toast } from 'react-hot-toast';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import DeleteIcon from '@mui/icons-material/Delete';

// Custom Hooks and Services
import { useSettingsMenu } from '../../hooks/useSettingsMenu';
import authService from '../../services/authService';
import notificationService from '../../services/notificationService';
import { AppContext } from '../../Context/AppContext';

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const { anchorEl, openMenu, closeMenu } = useSettingsMenu();
  const { user, logout, token } = useContext(AppContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const profilePath = user?.username ? `/profile/${user.username}` : '/profile';

  const navItems = useMemo(
    () => [
      { label: 'Home', icon: <HomeIcon />, path: '/' },
      { label: 'Messages', icon: <MessageIcon />, path: '/messages' },
      { label: 'Find Friends', icon: <PeopleIcon />, path: '/find-friends' },
      {
        label: 'Notifications',
        icon: (
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        ),
      },
      {
        label: user?.username || 'Profile',
        icon: <AccountCircleIcon />,
        path: profilePath,
      },
      { label: 'More', icon: <SettingsIcon /> },
    ],
    [user?.username, unreadCount]
  );

  // Sync active tab with current location
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = navItems.findIndex((item) =>
      item.path ? currentPath === item.path : false
    );
    setActiveTab(activeIndex !== -1 ? activeIndex : 0);
  }, [location.pathname, navItems]);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;

      try {
        const unreadResponse =
          await notificationService.getUnreadNotifications();
        if (unreadResponse.status) {
          setUnreadCount(unreadResponse.data.data.unreadCount || 0);
        } else {
          console.error(
            'Failed to fetch unread count:',
            unreadResponse.message
          );
        }

        const recentResponse =
          await notificationService.getRecentNotifications();
        if (recentResponse.status) {
          setNotifications(recentResponse.data.data || []);
        } else {
          console.error(
            'Failed to fetch notifications:',
            recentResponse.message
          );
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    // Optional: Add polling for real-time updates
    const interval = setInterval(fetchNotifications, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, [token]);

  // Handle navigation
  const handleNavClick = (index, path) => {
    setActiveTab(index);
    if (path) {
      navigate(path);
    }
  };

  // Handle notification dropdown open
  const handleNotifOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
    setActiveTab(3); // Highlight Notifications tab
  };

  // Handle notification dropdown close and mark as read
  const handleNotifClose = async () => {
    setNotifAnchorEl(null);
    if (unreadCount > 0) {
      try {
        const response = await notificationService.markNotificationAsRead();
        if (response.status) {
          setUnreadCount(0);
          setNotifications((prev) =>
            prev.map((notif) => ({
              ...notif,
              read_at: new Date().toISOString(),
            }))
          );
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Failed to mark notifications as read');
        console.error(error);
      }
    }
  };

  // Handle notification deletion
  const handleDeleteNotif = async (notificationId) => {
    try {
      const response = await notificationService.deleteNotification(
        notificationId
      );
      if (response.status) {
        setNotifications((prev) =>
          prev.filter((notif) => notif.id !== notificationId)
        );
        setUnreadCount((prev) => Math.max(prev - 1, 0));
        toast.success(response.data.message || 'Notification deleted');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Failed to delete notification');
      console.error(error);
    }
  };

  // Handle logout
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
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            '& .Mui-selected': {
              color: location.pathname === profilePath ? '#1877f2' : '#65676b', // Highlight Profile tab when on own profile
            },
          }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              icon={item.icon}
              onClick={(e) =>
                index === 3
                  ? handleNotifOpen(e) // Notifications
                  : index === 5
                  ? openMenu(e) // More
                  : handleNavClick(index, item.path)
              }
              sx={{
                '&.Mui-selected': {
                  color:
                    index === 4 && location.pathname === profilePath
                      ? '#1877f2'
                      : undefined,
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>

      {/* Notifications Dropdown */}
      <Menu
        anchorEl={notifAnchorEl}
        open={Boolean(notifAnchorEl)}
        onClose={handleNotifClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{
          style: { maxHeight: 300, width: 350, overflowY: 'auto' },
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <MenuItem key={notif.id || notif.timestamp} dense>
              <ListItemText
                primary={notif.message}
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {new Date(notif.timestamp).toLocaleString()}
                  </Typography>
                }
                sx={{ flexGrow: 1 }}
              />
              {notif.id && (
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => handleDeleteNotif(notif.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <ListItemText primary="No new notifications" />
          </MenuItem>
        )}
      </Menu>

      {/* Settings Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem onClick={() => handleNavClick(4, '/account', closeMenu)}>
          Account Settings
        </MenuItem>
        <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </MenuItem>
      </Menu>
    </>
  );
}
