import { defineStore } from 'pinia';

export const useCacheRouteStore = defineStore('cacheRoute', {
  state: () => ({
    cachedRoutes: [],
  }),

  actions: {
    addCachedRoute(name) {
      if (!name || this.cachedRoutes.includes(name)) {
        return;
      }
      this.cachedRoutes.push(name);
    },
    removeCachedRoute(name) {
      const index = this.cachedRoutes.indexOf(name);

      if (index > -1) {
        this.cachedRoutes.splice(index, 1);
      }
    },
    clearCachedRoutes() {
      this.cachedRoutes = [];
    },
    isCachedRoute(name): boolean {
      return this.cachedRoutes.includes(name);
    },
  },
});
