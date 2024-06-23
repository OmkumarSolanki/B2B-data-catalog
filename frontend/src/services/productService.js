import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:4500'; 

const getProducts = () => {
  // console.log("get products");
  const user = authService.getCurrentUser();
  // console.log(" user details : ", user.token);
  return axios.get(`${API_URL}/products`, {
    headers: { 'x-auth-token': user.token },
  });
};

const registerProduct = (product) => {
  // console.log(product);
  const user = authService.getCurrentUser();
  return axios.post(`${API_URL}/products`, product, {
    headers: { 'x-auth-token': user.token },
  });
};

const getProductById = (productId) => {
  //console.log(productId)
  const user = authService.getCurrentUser();
  return axios.get(`${API_URL}/products/${productId}`, {
    headers: { 'x-auth-token': user.token },
  });
};

export default {
  getProducts,
  registerProduct,
  getProductById,
};
