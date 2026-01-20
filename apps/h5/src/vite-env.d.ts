/// <reference types="vite/client" />

export {};

declare module 'axios' {
  interface AxiosRequestConfig {
    showError?: boolean;
  }
}
