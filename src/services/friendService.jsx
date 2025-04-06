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

  async acceptFriendRequest(friendShipId) {
    try {
      const response = await fetch(
        `/api/friends/accept-request/${friendShipId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      return response.ok
        ? { status: true, data }
        : { status: false, message: data.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async rejectFriendRequest(friendShipId) {
    try {
      const response = await fetch(
        `/api/friends/reject-request/${friendShipId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      return response.ok
        ? { status: true, data }
        : { status: false, message: data.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async getFriendship(requesterId) {
    try {
      const response = await fetch(`/api/friends/friendship/${requesterId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      return response.ok
        ? { status: true, data }
        : { status: false, message: data.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async getFriendList() {
    try {
      const response = await fetch('/api/friends/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      return response.ok
        ? { status: true, data }
        : { status: false, message: data.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async unFriend(friendId) {
    try {
      const response = await fetch(`/api/friends/unfriend/${friendId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log('From FriendService: ', data);

      return response.ok && data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },
};

export default friendService;
