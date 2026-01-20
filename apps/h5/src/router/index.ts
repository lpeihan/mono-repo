import NProgress from 'nprogress';
import { createRouter, createWebHashHistory } from 'vue-router';

import { useCacheRouteStore, useUserStore } from '../stores';

import routes from './routes';

import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false, parent: '#app' });

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  const userStore = useUserStore();
  const cacheRouteStore = useCacheRouteStore();

  if (to.path !== '/login' && !userStore.isLogin) {
    next('/login');
    return;
  }

  if (to.meta.keepAlive) {
    cacheRouteStore.addCachedRoute(to.name);
  }

  if (from.meta.keepAlive && from.path.split('/').length >= to.path.split('/').length) {
    cacheRouteStore.removeCachedRoute(from.name);
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
