/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USDT_ADDRESS: string;
  readonly VITE_USDT_DECIMALS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'axios' {
  interface AxiosRequestConfig {
    showError?: boolean;
  }
}
