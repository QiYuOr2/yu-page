import { createApp } from 'vue';
import FectUI from '@fect-ui/vue';

import App from './App.vue';
import router from './router';

import '@fect-ui/vue/lib/main.css';
import '@/common/theme.css';

createApp(App).use(FectUI).use(router).mount('#app');
