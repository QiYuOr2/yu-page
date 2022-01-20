import { createApp } from 'vue';
import { createPinia } from 'pinia';
import FectUI from '@fect-ui/vue';
import FectIcon from '@fect-ui/vue-icons';

import App from './App.vue';
import router from './router';

import '@fect-ui/vue/lib/main.css';
import './common/style/theme.css';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(FectUI)
  .use(FectIcon)
  .mount('#app');
