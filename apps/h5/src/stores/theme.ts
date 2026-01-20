import { defineStore } from 'pinia';

import { AppTheme } from '../enums';
import { useStorage } from '../hooks';

const isDarkTheme = (theme) => theme === AppTheme.Dark;

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: useStorage('theme', AppTheme.Light),
    colorPrimary: useStorage('colorPrimary', '#1989fa'),
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme;

      document.documentElement.setAttribute('class', this.theme);
    },
    toggleTheme(isDark) {
      this.setTheme(isDark ? AppTheme.Dark : AppTheme.Light);
    },
    setColorPrimary(color) {
      this.colorPrimary = color;

      document.documentElement.style.setProperty('--van-primary-color', this.colorPrimary);
    },
    initTheme() {
      this.setTheme(this.theme);
    },
    initColorPrimary() {
      this.setColorPrimary(this.colorPrimary);
    },
  },
  getters: {
    isDarkTheme: (state) => isDarkTheme(state.theme),
  },
});
