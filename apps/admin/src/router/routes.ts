import { LayoutDashboardIcon, SettingsIcon, UserIcon } from 'lucide-vue-next';
import { RouteRecordRaw, RouterView } from 'vue-router';

import { RoleName } from '../enums';
import AuthLayout from '../layouts/AuthLayout.vue';
import BasicLayout from '../layouts/BasicLayout.vue';
import { i18n } from '../locales';

export const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    hideInMenu: true,
    children: [
      {
        path: '/auth/login',
        name: 'login',
        component: () => import('../views/login/Login.vue'),
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    meta: { roles: [RoleName.Admin, RoleName.User] },
    children: [
      {
        path: '/',
        redirect: '/dashboard/overview',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          icon: LayoutDashboardIcon,
          get title() {
            return i18n.global.t('dashboard.title');
          },
        },
        component: RouterView,
        children: [
          {
            path: '/dashboard/overview',
            name: 'overview',
            meta: { title: '概览' },
            component: () => import('../views/dashboard/Overview.vue'),
          },
        ],
      },
      {
        path: '/users',
        name: 'users',
        meta: { icon: UserIcon, title: '用户管理' },
        component: RouterView,
        children: [
          {
            path: '/users/list',
            name: 'usersList',
            meta: { title: '用户列表' },
            component: () => import('../views/users/Users.vue'),
          },
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        meta: {
          icon: SettingsIcon,
          get title() {
            return i18n.global.t('profile.title');
          },
        },
        component: () => import('../views/profile/Profile.vue'),
        hideInMenu: true,
      },
      {
        path: '/404',
        name: '404',
        hideInMenu: true,
        component: () => import('../views/404.vue'),
      },
      {
        path: ':pathMatch(.*)',
        redirect: '/404',
      },
    ],
  },
] as RouteRecordRaw[];
