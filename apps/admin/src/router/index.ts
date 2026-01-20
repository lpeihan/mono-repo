import NProgress from 'nprogress';
import { createRouter, createWebHashHistory } from 'vue-router';

import 'nprogress/nprogress.css';

import { RoleName } from '../enums';
import { useUserStore } from '../stores';

import { routes } from './routes';

export { routes };

NProgress.configure({ showSpinner: false });

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});

router.beforeEach(async (to, _from, next) => {
  NProgress.start();

  const userStore = useUserStore();

  if (userStore.token) {
    if (!userStore.userInfo) {
      await useUserStore().fetchUserInfo();
    }

    if (to.meta && to.meta.roles && !userStore.hasRole(to.meta.roles as RoleName[])) {
      next('/404');
      return;
    }

    next();
  } else {
    if (to.path !== '/auth/login') {
      next('/auth/login');
      return;
    }

    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
