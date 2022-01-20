import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { ROUTER } from '@/common/constants';

import Home from '@/views/home/index.vue';
import Workbanch from '@/views/edit/workbanch.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: ROUTER.HOME,
    component: Home,
  },
  {
    path: '/workbanch',
    name: ROUTER.WORKBANCH,
    component: Workbanch,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
