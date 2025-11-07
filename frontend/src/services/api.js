import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://localhost/api',  // must match backend route
  //withCredentials: true,             // optional
});
