import axios from 'axios';

export default () =>
  axios.create({
    baseURL: process.env.API_URL || '"http://localhost:3001/api/v1"',
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
