import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true,
    },
    component: () => import('../views/home/Home.vue'),
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      auth: true,
    },
    component: () => import('../views/user/User.vue'),
  },
  {
    path: '/features/list',
    name: 'featuresList',
    meta: {
      auth: true,
      keepAlive: true,
    },
    component: () => import('../views/features/List.vue'),
  },
  {
    path: '/features/list/:id',
    name: 'featuresListDetails',
    meta: {
      auth: true,
    },
    component: () => import('../views/features/ListDetails.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      auth: true,
    },
    component: () => import('../views/login/Login.vue'),
  },
];

export default routes;
