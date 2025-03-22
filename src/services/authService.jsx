const register = async (formData) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return { status: false, message: 'Network error', error: error.message };
  }
};

const login = async (formData) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: false, message: 'Network error', error: error.message };
  }
};

const logout = async (token) => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { status: false, message: 'Network error', error: error.message };
  }
};

export default { register, login, logout };
