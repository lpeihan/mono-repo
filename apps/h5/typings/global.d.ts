import type { SvgIconProps } from '@packages/components';

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: import('vue').DefineComponent<SvgIconProps>;
  }
}

declare module 'axios' {
  interface AxiosRequestConfig {
    showError?: boolean;
  }
}

export {};
