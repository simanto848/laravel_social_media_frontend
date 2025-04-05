const profileService = {
  async getProfile(userId) {
    try {
      const response = await fetch(`/api/profile/${userId}`);
      const data = await response.json();
      return response.ok
        ? { status: true, data }
        : { status: false, message: data.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async getProfileByUsername(username) {
    try {
      const response = await fetch(`/api/profile/username/${username}`);
      const data = await response.json();
      return response.ok
        ? { status: true, data }
        : { status: false, message: data.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updateNames(data) {
    try {
      const response = await fetch(`/api/profile/names`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return response.ok
        ? { status: true, data: result }
        : { status: false, message: result.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updateOthers(data) {
    try {
      const response = await fetch(`/api/profile/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return response.ok
        ? { status: true, data: result }
        : { status: false, message: result.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updateProfile(data) {
    try {
      const response = await fetch(`/api/profile/details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return response.ok
        ? { status: true, data: result }
        : { status: false, message: result.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updateUserInfo(data) {
    try {
      const response = await fetch(`/api/profile/user-info`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return response.ok
        ? { status: true, data: result }
        : { status: false, message: result.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updatePassword(data) {
    try {
      const response = await fetch(`/api/profile/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return response.ok
        ? { status: true, data: result }
        : { status: false, message: result.message };
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
      const result = await response.json();
      return response.ok
        ? { status: true, data: result }
        : { status: false, message: result.message };
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },
};

export default profileService;
