<template>
  <div id="app">
    <div id="editorContent">
      <div
        v-for="(component, $i) in components"
        :key="$i"
        :data-layout="component?.props?._layout"
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
import { onMounted, ref, toRaw } from 'vue';
import { MESSAGE_TYPE } from './common/constants';
import { fork, getComponents } from './common/utils';
import { useFrame } from './hooks';

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
  setup() {
    const { postMessage } = useFrame();

    const components = ref(fork(window.__yu_config__.components));
    const componentsConfig = ref(getComponents());
    const currentIndex = ref(0);

    const actions = {
      // setConfig
      [MESSAGE_TYPE.SET_CONFIG](config) {
        components.value = config.userSelectComponents;
        actions[MESSAGE_TYPE.GET_CONFIG]();
      },
      // getConfig
      [MESSAGE_TYPE.GET_CONFIG]() {
        postMessage({
          type: MESSAGE_TYPE.RETURN_CONFIG,
          data: {
            currentIndex: currentIndex.value,
            components: toRaw(componentsConfig.value),
            userSelectComponents: toRaw(components.value),
          },
        });
      },
      // changeIndex
      [MESSAGE_TYPE.CHANGE_INDEX](index) {
        currentIndex.value = index;
        actions[MESSAGE_TYPE.GET_CONFIG]();
      },
      // sortComponent
      [MESSAGE_TYPE.SORT_COMPONENT]({ action, index }) {
        const source = fork(components.value);
        const nextIndex = index + action;

        const temp = source[index];
        source[index] = source[nextIndex];
        source[nextIndex] = temp;

        components.value = source;
        actions[MESSAGE_TYPE.CHANGE_INDEX](nextIndex);
      },
      // addComponent
      [MESSAGE_TYPE.ADD_COMPONENT]({ data, index }) {
        currentIndex.value = index ? index + 1 : index;
        components.value = [
          ...components.value.slice(0, currentIndex.value),
          { name: data.name, props: data.data },
          ...components.value.slice(currentIndex.value),
        ];
        actions[MESSAGE_TYPE.GET_CONFIG]();
      },
    };

    onMounted(() => {
      actions[MESSAGE_TYPE.GET_CONFIG]();
    });

    window.addEventListener('message', (e) => {
      // 不接受消息源来自于当前窗口的消息
      if (e.source === window || e.data === 'loaded') {
        return;
      }

      actions[e.data.type]?.(e.data.data);
    });

    return {
      remoteComponentLoad() {},
      components,
      currentIndex,
    };
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
