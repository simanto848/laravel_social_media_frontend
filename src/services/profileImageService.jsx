const profileImageService = {
  async getAllImage() {
    try {
      const response = await fetch('/api/profile-image/all', {
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

  async getSingleImage(imageId) {
    try {
      const response = await fetch(`/api/profile-image/${imageId}`, {
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

  async getCurrentImage() {
    try {
      const response = await fetch('/api/profile-image/current', {
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

  async uploadProfileImage(payload) {
    try {
      const response = await fetch('/api/profile-image/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: payload,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async updateProfileImage(imageId, formData) {
    try {
      const response = await fetch(`/api/profile-image/${imageId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { status: false, message: 'Network error', error: error.message };
    }
  },

  async deleteProfileImage(imageId) {
    try {
      const response = await fetch(`/api/profile-image/${imageId}`, {
        method: 'DELETE',
        headers: {
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

export default profileImageService;
