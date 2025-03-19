const profileService = {
  async getProfile() {
    try {
      const response = await fetch('/api/profile', {
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
};

export default profileService;
