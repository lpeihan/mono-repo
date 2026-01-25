import { config, walletAddress, web3 } from './core';
import { movePointLeft, movePointRight } from './utils';

export function getUsdtContract() {
  return new web3.eth.Contract(config.UsdtAbi, config.UsdtAddress, {
    from: walletAddress,
  });
}

export async function getUsdtBalance() {
  const usdtContract = getUsdtContract();

  const balance = await usdtContract.methods.balanceOf(walletAddress).call({ from: walletAddress });

  return movePointLeft(balance, config.UsdtDecimals)
}

export async function transferUsdt(to: string, amount: string): Promise<any> {
  const usdtContract = getUsdtContract();

  const rawAmount = movePointRight(amount, config.UsdtDecimals);

  return usdtContract.methods.transfer(to, rawAmount).send({ from: walletAddress });
}
