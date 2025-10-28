import axios from 'axios';

import { env } from '../config/env';
import { useAppStore } from '../store/useAppStore';

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = useAppStore.getState().auth.token;
  const countryCode = useAppStore.getState().tenant.countryCode;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (countryCode) {
    config.headers = config.headers ?? {};
    config.headers['X-Country-Code'] = countryCode;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAppStore.getState().auth.clearSession();
    }

    return Promise.reject(error);
  },
);
