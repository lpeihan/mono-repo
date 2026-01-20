export { };

declare module 'axios' {
  interface AxiosRequestConfig {
    showError?: boolean;
  }
}
