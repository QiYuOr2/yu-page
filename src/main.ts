import { createApp } from 'vue';
import FectUI from '@fect-ui/vue';
import FectIcon from '@fect-ui/vue-icons';

import App from './App.vue';
import router from './router';

import '@fect-ui/vue/lib/main.css';
import '@/common/theme.css';

createApp(App).use(FectUI).use(FectIcon).use(router).mount('#app');
