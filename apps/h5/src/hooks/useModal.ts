import { inject } from 'vue';
import type { Component } from 'vue';

export type ShowModalFn = (component: Component, props?) => void;

export const useModal = () => {
  const showModal = inject<ShowModalFn>('showModal')!;

  return {
    showModal,
  };
};
