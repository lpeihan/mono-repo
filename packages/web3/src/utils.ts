import Decimal from 'decimal.js';

Decimal.set({ toExpNeg: -100, toExpPos: 100 });

export const movePointRight = (value, point) => {
  return new Decimal(value).times(new Decimal(10).pow(point)).toString();
};

export const movePointLeft = (value, point) => {
  return new Decimal(value).div(new Decimal(10).pow(point)).toString();
};

export const formatAddress = (
  address,
  prefixLength: 6,
  suffixLength: 4
) => {
  if (isValidAddress(address)) {
    return address;
  }

  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`;
};

export const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
