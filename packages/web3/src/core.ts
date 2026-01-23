import Decimal from 'decimal.js';
import Web3 from 'web3';

import { config } from './config';

Decimal.set({ toExpNeg: -100, toExpPos: 100 });

export const movePointRight = (value, point) => {
  return new Decimal(value).times(new Decimal(10).pow(point)).toString();
};

export const movePointLeft = (value, point) => {
  return new Decimal(value).div(new Decimal(10).pow(point)).toString();
};

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
      throw new Error(error);
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

export async function getUsdtBalance() {
  const contract = new web3.eth.Contract(config.UsdtAbi, config.UsdtAddress, {
    from: walletAddress,
  });
  const balance = await contract.methods.balanceOf(walletAddress).call({ from: walletAddress });

  return balance;
}
