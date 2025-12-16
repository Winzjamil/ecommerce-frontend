import { NavLink } from 'react-router-dom';
const API_URL = 'http://localhost:8080';
const SELLER_ACCESS = 'seller';
const ADMIN_ACCESS = 'admin';
const USER = 'user';
const tabHead = ['Region', 'Province', 'City', 'Barangay'];
const routes = {
  CART: '/cart',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  DASH_BOARD: '/dashboard',
  ADD_PRODUCT: '/productForm',
  REGISTER: '/register',
  USER_MANAGER: '/userManager',
  HOME: '/',
  ADDRESS_FORM: '/addressForm',
  REVIEW: '/review',
};
const USER_ADDRESS = {
  GET_REGION: 'region',
  GET_PROVINCE: 'province',
  GET_CITY: 'city',
  GET_BARANGAY: 'barangay',
};
export const setUser = (key = '', value) => {
  const user = localStorage.setItem(key, JSON.stringify(value));
  return user || null;
};
export const getAuthData = (type) => {
  if (type === 'user') return JSON.parse(localStorage.getItem('user')) || null;
  if (type === 'token')
    return JSON.parse(localStorage.getItem('token')) || null;
};
const options = {
  cat_Option: [
    { value: 'electronic', label: 'Electronic' },
    { value: 'forniture', label: 'Forniture' },
    { value: 'toys', label: 'Toys' },
    { value: 'clothing', label: 'Clothing' },
  ],
  price_Option: [
    { value: 'low', label: 'Low ' },
    { value: 'high', label: ' High' },
  ],
};

export {
  ADMIN_ACCESS,
  SELLER_ACCESS,
  API_URL,
  routes,
  tabHead,
  USER_ADDRESS,
  options,
  USER,
};
