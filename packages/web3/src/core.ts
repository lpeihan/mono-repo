import Web3 from 'web3';

import UsdtAbi from './abi/usdt.json';

const configs = {
  production: {
    UsdtAbi,
    UsdtAddress: '0x55d398326f99059fF775485246999027B3197955',
    UsdtDecimals: 18,
  },
  lab: {
    UsdtAbi,
    UsdtAddress: '0x6Dd88E5e3CcC83Ca71A17A77aC552b447481504e',
    UsdtDecimals: 6,
  },
};

// @ts-ignore
export const config = configs[import.meta?.env?.MODE || 'lab'];
export let walletAddress: string | undefined;
export let web3: Web3 | undefined;

export async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      walletAddress = accounts[0];
      console.log('🚀 ~ connectWallet ~ walletAddress:', walletAddress);

      web3 = new Web3(window.ethereum);

      return walletAddress;
    } catch (error) {
      console.error('🚀 ~ connectWallet ~ error:', error);
      throw error;
    }
  } else {
    const errorMessage = 'Ethereum wallet is not installed';

    throw new Error(errorMessage);
  }
}

export async function disconnectWallet() {
  if (window.ethereum && window.ethereum.request) {
    try {
      await window.ethereum.request({
        method: 'wallet_revokePermissions',
        params: [{ eth_accounts: {} }],
      });
    } catch (error) {
      console.log('wallet does not support revoking permissions, only clearing local state', error);
    }
  }

  walletAddress = undefined;
  web3 = undefined;
  console.log('🚀 ~ disconnectWallet ~ wallet disconnected');
}

