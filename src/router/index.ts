import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import MinePage from '@/views/MinePage.vue';
import Editor from '@/views/Editor.vue';
import About from '@/views/About.vue';
import TemplateCenter from '@/views/TemplateCenter.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'mine-page',
    component: MinePage,
    meta: {
      title: 'Yu页面生成',
    },
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor,
    meta: {
      title: 'Yu页面生成',
    },
  },
  {
    path: '/template-center',
    name: 'template-center',
    component: TemplateCenter,
    meta: {
      title: 'Yu页面生成',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: 'Yu页面生成',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;
