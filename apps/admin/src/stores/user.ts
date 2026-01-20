import { defineStore } from 'pinia';

import * as api from '../api';
import { RoleName } from '../enums';
import { useStorage } from '../hooks';
import { router } from '../router';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: useStorage('token', ''),
      userInfo: null,
    };
  },
  actions: {
    async fetchUserInfo() {
      const res = await api.mockFetchUserInfo();

      this.userInfo = res.data;
    },
    async login(data) {
      const res = await api.mockLogin(data);

      this.token = res.data.token;
      await this.fetchUserInfo();
    },
    logout() {
      this.token = '';
      this.userInfo = null;

      router.push('/auth/login');
    },
    hasRole(roles: RoleName[] = []) {
      if (!this.token) {
        return false;
      }

      return this.userInfo.roles.some((role) => roles.includes(role));
    },
  },
});
