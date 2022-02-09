import { createApp } from 'vue';
import App from './App.vue';
import Placeholder from './_components/placeholder.vue';

const app = createApp(App);

// 自动注册组件
const requireComponent = require.context(
  './components',
  // 是否查询其子目录
  true,
  /\.vue$/
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const upperFirst = (str) => {
    return str.replace(str[0], str[0].toUpperCase());
  };

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    fileName
      .split('/')[1]
      .replace(/\.\w+$/, '')
      .replace(/-\w/g, (val) => val.slice(1).toUpperCase())
  );

  // 注册组件
  app.component(componentName, componentConfig.default || componentConfig);
});

app.component('private-placeholder', Placeholder);

app.mount('#app');
