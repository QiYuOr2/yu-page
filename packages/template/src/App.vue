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
import { onMounted, ref } from 'vue';
import { MESSAGE_TYPE } from './common/constants';
import { fork, getComponents } from './common/utils';
import { useFrame } from './hooks';

window.__yu_config__ = {
  components: [
    {
      name: 'yu-banner',
      description: 'banner 组件',
      snapshot: 'https://cdn.jsdelivr.net/gh/xmy6364/blog-image/img/evening.JPG',
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
      //init
      [MESSAGE_TYPE.INIT](initData) {
        console.log('init page', initData);
        components.value = initData;
        actions[MESSAGE_TYPE.GET_CONFIG](MESSAGE_TYPE.INIT);
      },
      // setConfig
      [MESSAGE_TYPE.SET_CONFIG](config) {
        components.value = config.userSelectComponents;
        actions[MESSAGE_TYPE.GET_CONFIG](MESSAGE_TYPE.SET_CONFIG);
      },
      // getConfig
      [MESSAGE_TYPE.GET_CONFIG](source) {
        postMessage({
          type: MESSAGE_TYPE.RETURN_CONFIG,
          data: {
            source,
            currentIndex: currentIndex.value,
            components: componentsConfig.value,
            userSelectComponents: components.value,
          },
        });
      },
      // changeIndex
      [MESSAGE_TYPE.CHANGE_INDEX](index) {
        currentIndex.value = index;
        actions[MESSAGE_TYPE.GET_CONFIG](MESSAGE_TYPE.CHANGE_INDEX);
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
      // deleteComponent
      [MESSAGE_TYPE.DELETE_COMPONENT]({ index }) {
        components.value = [
          ...components.value.slice(0, index),
          ...components.value.slice(index + 1),
        ];
        actions[MESSAGE_TYPE.GET_CONFIG](MESSAGE_TYPE.DELETE_COMPONENT);
      },
      // addComponent
      [MESSAGE_TYPE.ADD_COMPONENT]({ data, index }) {
        // 清除占位用的预览组件
        // actions[MESSAGE_TYPE.AFTER_ADD_COMPONENT]();

        currentIndex.value = index + 1;
        components.value = [
          ...components.value.slice(0, currentIndex.value),
          { ...data, name: data.name, props: data.data },
          ...components.value.slice(currentIndex.value),
        ];

        actions[MESSAGE_TYPE.GET_CONFIG](MESSAGE_TYPE.ADD_COMPONENT);
      },
      // beforeAddComponent
      [MESSAGE_TYPE.BEFORE_ADD_COMPONENT]({ index }) {
        // if (
        //   !components.value[index] ||
        //   components.value[index].name === 'private-placeholder'
        // ) {
        //   actions[MESSAGE_TYPE.AFTER_ADD_COMPONENT]();
        //   return;
        // }
        // if (
        //   !components.value[index + 1] ||
        //   components.value[index + 1].name !== 'private-placeholder'
        // ) {
        //   currentIndex.value = index + 1;
        //   components.value = [
        //     ...components.value.slice(0, currentIndex.value),
        //     {
        //       name: 'private-placeholder',
        //     },
        //     ...components.value.slice(currentIndex.value),
        //   ];
        //   actions[MESSAGE_TYPE.GET_CONFIG]();
        // }
      },
      // afterAddComponent
      [MESSAGE_TYPE.AFTER_ADD_COMPONENT]() {
        // // 清除占位用的预览组件
        // components.value = components.value.filter(
        //   (c) => c.name !== 'private-placeholder'
        // );
      },
      [MESSAGE_TYPE.CHANGE_PROPS]({ index, props }) {
        console.log(index, props);
        const newComponent = components.value[index];
        newComponent.props = props;
        components.value = [
          ...components.value.slice(0, index),
          newComponent,
          ...components.value.slice(index + 1),
        ];

        actions[MESSAGE_TYPE.GET_CONFIG](MESSAGE_TYPE.CHANGE_PROPS);
      },
      [MESSAGE_TYPE.PREVIEW]() {
        components.value = [...JSON.parse(localStorage.getItem('preview::components'))];
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

      console.log(e.data.type, e.data.data);
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
</style>
