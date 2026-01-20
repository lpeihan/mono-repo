import axios from 'axios';
import { showToast } from 'vant';

import { HttpCode } from '../enums';
import { useUserStore } from '../stores';

export const request = axios.create({
  timeout: 30000,
});

request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();

    if (config.url.includes('/mock')) {
      config.baseURL = '';
    }

    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`;
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  },
);

request.interceptors.response.use(
  (res) => {
    const { data, config } = res;

    if (data.code === HttpCode.Success) {
      return Promise.resolve(data);
    }

    if (config.showError !== false) {
      showToast(data.message);
    }

    return Promise.reject(data);
  },
  (err) => {
    showToast(err.message);

    return Promise.reject(err);
  },
);
