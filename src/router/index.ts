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
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor,
  },
  {
    path: '/template-center',
    name: 'template-center',
    component: TemplateCenter,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
