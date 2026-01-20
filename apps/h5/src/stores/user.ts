import { defineStore } from 'pinia';

import { useStorage } from '../hooks';
import router from '../router';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: useStorage('token', ''),
    walletAddress: 'wallet_address',
  }),
  actions: {
    async login() {
      // const walletAddress = await web3.connectWallet();
      // this.walletAddress = walletAddress;
    },
    setWalletAddress(walletAddress) {
      this.walletAddress = walletAddress;
    },
    logout() {
      this.walletAddress = '';
      this.token = '';
      router.push('/login');
    },
  },
  getters: {
    isLogin: (state) => !!state.walletAddress,
  },
});
