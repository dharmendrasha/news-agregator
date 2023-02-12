import axios from 'axios'
import {
    getToken
} from '../components/AuthUser';

export const api = () =>
  axios.create({
    baseURL: "/api/v1",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

