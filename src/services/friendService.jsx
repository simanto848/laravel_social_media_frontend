const friendService = {
  async getSuggestedFriends() {
    try {
      const response = await fetch('/api/friends/suggest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async sendFriendRequest($friendId) {
    try {
      const response = await fetch(`/api/friends/send-request/${$friendId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },
};

export default friendService;
