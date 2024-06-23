import axios from 'axios';

const API_URL = 'http://localhost:4500'; 

const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password }).then(response => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const register = async (user) => {
  const response = await axios.post(`${API_URL}/register`, user);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const isLoggedIn = () => {
  const user = getCurrentUser();
  return user && user.token;
};

export default {
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  register,
};
