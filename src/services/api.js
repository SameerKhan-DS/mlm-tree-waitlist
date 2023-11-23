// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API base URL
});

export default api;