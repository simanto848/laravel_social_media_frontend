const profileService = {
  async getProfile(userId) {
    try {
      const response = await fetch(`/api/profile/${userId}`);
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async getProfileByUsername(username) {
    try {
      const response = await fetch(`/api/profile/username/${username}`);
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updateNames(payloads) {
    try {
      const response = await fetch(`/api/profile/names`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payloads),
      });
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updateOthers(payloads) {
    try {
      const response = await fetch(`/api/profile/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payloads),
      });
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updateProfile(payloads) {
    try {
      const response = await fetch(`/api/profile/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payloads),
      });
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updateUserInfo(payloads) {
    try {
      const response = await fetch(`/api/profile/user-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payloads),
      });
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updatePassword(payloads) {
    try {
      const response = await fetch(`/api/profile/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(payloads),
      });
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  // Not implemented in the backend
  async deactivateAccount() {
    try {
      const response = await fetch(`/api/profile/deactivate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      return response.ok
        ? { status: true, data: result }
        : { status: false, message: result.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async deleteAccount() {
    try {
      const response = await fetch(`api/profile/user`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      return response.ok && data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },
};

export default profileService;
