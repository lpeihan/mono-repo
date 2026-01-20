import { message } from 'ant-design-vue';
import axios from 'axios';

import { HttpCode } from '../enums';
import { useUserStore } from '../stores';

export const request = axios.create({
  timeout: 20000,
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
      message.error(data.message);
    }

    return Promise.reject(data);
  },
  (err) => {
    message.error(err.message);

    return Promise.reject(err);
  },
);
