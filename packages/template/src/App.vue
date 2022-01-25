<template>
  <div id="app">
    <div id="editorContent">
      <div
        v-for="(component, $i) in components"
        :key="$i"
        :data-layout="component.props && component.props._layout"
        :id="`yu-render-id_component_${$i}`"
      >
        <component
          :is="component.name"
          :key="`component${$i}`"
          :obj="component.props || {}"
          :config="component.config"
          @onRemoteComponentLoad="remoteComponentLoad"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import YuBanner from './components/yu-banner/index.vue';
import YuForm from './components/yu-form/index.vue';

window.__yu_config__ = {
  components: [
    {
      name: 'yu-banner',
      description: 'banner 组件',
      snapshot:
        'https://cdn.jsdelivr.net/gh/xmy6364/blog-image/img/evening.JPG',
      schema: {
        type: 'object',
        properties: {
          src: {
            title: '图片地址',
            type: 'string',
            format: 'image',
          },
          link: {
            title: '跳转链接',
            type: 'string',
            format: 'url',
          },
        },
        required: ['src'],
      },
      props: {
        src: 'https://cdn.jsdelivr.net/gh/xmy6364/blog-image/img/evening.JPG',
      },
    },
    {
      name: 'yu-form',
      description: 'form 组件',
      snapshot:
        'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c69eef4e997843ea84929b1c0e2a2fdf~tplv-k3u1fbpfcp-watermark.image',
      schema: {
        type: 'object',
        properties: {
          btnText: {
            title: '按钮文案',
            type: 'string',
          },
          action: {
            title: '提交接口地址',
            type: 'string',
            format: 'url',
          },
        },
        required: ['btnText'],
      },
      props: {
        btnText: '提交',
      },
    },
  ],
};

export default {
  components: { YuBanner, YuForm },
  data() {
    return {
      components: window.__yu_config__.components,
    };
  },
  created() {
    window.addEventListener('message', (e) => {
      // 不接受消息源来自于当前窗口的消息
      if (e.source === window || e.data === 'loaded') {
        return;
      }
    });
  },
  methods: {
    remoteComponentLoad() {},
  },
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
