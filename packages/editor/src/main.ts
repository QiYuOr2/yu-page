import { createApp } from 'vue';
import { createPinia } from 'pinia';
import FectUI from '@fect-ui/vue';
import FectIcon from '@fect-ui/vue-icons';

import App from './App.vue';
import router from './router';

// @ts-ignore
import FormRender from '@yu-page/form-render';
import '@yu-page/form-render/lib/form-render.css';

import '@fect-ui/vue/lib/main.css';
import './common/style/theme.css';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(FectUI)
  .use(FectIcon)
  .use(FormRender)
  .mount('#app');
