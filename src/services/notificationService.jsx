const notificationService = {
  getUnreadNotifications: async () => {
    try {
      const response = await fetch('/api/notifications/unread-count', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return {
          status: false,
          message: data.message || 'Failed to fetch notifications',
        };
      }
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  getRecentNotifications: async () => {
    try {
      const response = await fetch('/api/notifications/recent', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return {
          status: false,
          message: data.message || 'Failed to fetch notifications',
        };
      }
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },
  markNotificationAsRead: async () => {
    try {
      const response = await fetch('/api/notifications/mark-as-read', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return {
          status: false,
          message: data.message || 'Failed to mark notification as read',
        };
      }
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },
  deleteNotification: async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return { status: true, data };
      } else {
        return {
          status: false,
          message: data.message || 'Failed to delete notification',
        };
      }
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },
};

export default notificationService;
