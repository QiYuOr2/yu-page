import { App } from 'vue';
import Render from './index.vue';

export default {
  install(app: App) {
    app.component(Render.name, Render);
  },
};
