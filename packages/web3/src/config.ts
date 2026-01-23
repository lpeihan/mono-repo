import UsdtAbi from './abi/usdt.json';

export type ConfigMode = 'production' | 'lab';

interface Web3Config {
  UsdtAbi: typeof UsdtAbi;
  UsdtAddress: string;
  UsdtDecimals: number;
}

const configs: Record<ConfigMode, Web3Config> = {
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
