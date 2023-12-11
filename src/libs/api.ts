/* eslint-disable dot-notation */
import axios from 'axios';
import {io} from 'socket.io-client';

export const API = axios.create({
  baseURL: 'http://192.168.18.14:3000/api',
  // baseURL: 'http://192.168.100.7:3000/api',
});

export const API_GOLANG = axios.create({
  baseURL: 'http://192.168.18.14:8083/api/',
});

export const socket = io('http://192.168.18.14:5000');

export function setAuthToken(token: string) {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
}
