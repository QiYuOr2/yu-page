<template>
  <div class="workbanch">
    <header class="workbanch__header">
      <chevronLeft class="back" @click="backHome" />
      <div>
        <fe-button size="mini" style="margin-right: 0.5rem" @click="preview">预览</fe-button>
        <fe-button type="success" size="mini" @click="release">发布</fe-button>
      </div>
    </header>
    <div class="workbanch__main">
      <aside class="aside">
        <component-selector />
      </aside>
      <main>
        <!-- 预览窗口 -->
        <div class="preview">
          <iframe
            class="preview__core"
            src="http://localhost:3090/template"
            id="editorFrame"
            @load="onFrameLoaded"
          ></iframe>
          <!-- 戳拽事件响应蒙层 -->
          <div
            v-show="showDragMask"
            class="drag-mask"
            @dragover.prevent="dragOverHandler"
            @dragleave.prevent="dragLeaveHandler"
            @drop.prevent="dropHandler"
          ></div>
          <!-- 悬浮工具组 -->
          <div>
            <!-- 点击高亮 -->
            <div :style="activeStyle" class="active-heightlight"></div>
            <!-- 悬浮高亮 -->
            <div :style="hoverStyle" class="hover-heightlight"></div>
            <!-- 悬浮工具 -->
            <div v-show="toolStyle.top" :style="{ top: toolStyle.top }" class="tools" :id="toolId">
              <div class="tools__move">
                <span @click="moveComponent(-1)"><arrow-up /></span>
                <span @click="moveComponent(1)"><arrow-down /></span>
              </div>
              <div class="tools__copy">
                <copy />
              </div>
              <div class="tools__copy">
                <clipboard />
              </div>
            </div>
          </div>
        </div>
      </main>
      <aside class="aside">
        <form-render :schema="currentComponentSchema" @change="formDataChangeHandler"></form-render>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue';
import { useFrameAction, useNav } from '@/hooks';
import { MESSAGE_TYPE, FRAME } from '@/common/constants';

// Components
import { ArrowDown, ArrowUp, Clipboard, Copy } from '@fect-ui/vue-icons';
import ComponentSelector from './components/component-selector.vue';
import { fork } from '@/common/utils';

export default defineComponent({
  components: { ComponentSelector, ArrowDown, ArrowUp, Clipboard, Copy },
  setup() {
    const state = reactive({
      data: {},
      name: '',
      url: '',
      showUrl: '',
      visible: true,
      spinning: true,
    });

    const {
      injectEventListener,
      initState,
      editorState,
      postMessage,
      injectIframeMessageListener,
      editStore,
      getIndex,
      resetFrameHeight,
    } = useFrameAction('editorFrame');
    const { backHome } = useNav();

    onMounted(() => {
      injectIframeMessageListener();
    });

    watch([() => editStore.editConfig.currentIndex], (values) => {
      initState(values[0]);
    });

    const onFrameLoaded = () => {
      injectEventListener((index) => {
        editorState.current = index;
        postMessage({ type: MESSAGE_TYPE.CHANGE_INDEX, data: index });
      });
      state.spinning = false;
    };

    const moveComponent = (action: number) => {
      if ((editorState.isBottom && action === 1) || (editorState.isTop && action === -1)) return;

      postMessage({
        type: MESSAGE_TYPE.SORT_COMPONENT,
        data: { action, index: editorState.current },
      });
    };
    const preview = () => {};
    const release = () => {};

    const addComponents = (data: string, index: number) => {
      postMessage({
        type: MESSAGE_TYPE.ADD_COMPONENT,
        data: { data: JSON.parse(data), index },
      });
    };

    // dragover触发 预计用来预览组件位置 - 暂时搁置
    const beforeAddComponents = (index: number) => {
      // postMessage({
      //   type: MESSAGE_TYPE.BEFORE_ADD_COMPONENT,
      //   data: { index },
      // });
    };

    // dragleave触发 预计用来清空预览 - 暂时搁置
    const dragLeaveHandler = () => {
      // postMessage({
      //   type: MESSAGE_TYPE.AFTER_ADD_COMPONENT,
      // });
    };

    const dragOverHandler = (event: DragEvent) => {
      const { layerY } = event as any;
      const index = getIndex(layerY);
      beforeAddComponents(index);
    };

    const dropHandler = (event: DragEvent) => {
      setTimeout(() => {
        resetFrameHeight();
      }, 100);
      const data = event.dataTransfer?.getData('text/plain')!;
      const { layerY } = event as any;
      const index = getIndex(layerY);
      addComponents(data, index);
    };

    const formDataChangeHandler = (value: any) => {
      postMessage({
        type: MESSAGE_TYPE.CHANGE_PROPS,
        data: fork({ index: editStore.editConfig.currentIndex, props: value }),
      });
    };

    return {
      ...toRefs(editorState),

      backHome,
      onFrameLoaded,
      preview,
      release,

      moveComponent,

      showDragMask: computed(() => editStore.uiConfig.dragStart),
      dragOverHandler,
      dragLeaveHandler,
      dropHandler,

      currentComponentSchema: computed(
        () =>
          editStore.pageConfig.userSelectComponents[editStore.editConfig.currentIndex]?.schema ?? {}
      ),

      toolId: FRAME.TOOL_ID,
      formDataChangeHandler,
    };
  },
});
</script>

<style lang="less" scoped>
.workbanch {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 1.2rem;
    box-shadow: var(--x-shadow-small);
    position: relative;
    z-index: 1000;
    .back {
      cursor: pointer;
    }
  }

  &__main {
    display: flex;
    justify-content: space-between;

    height: calc(100vh - 44px);
    .aside {
      box-sizing: border-box;
      width: 300px;
      height: 100%;
      box-shadow: var(--x-shadow-small);
      overflow-y: scroll;
    }

    main {
      flex: 1;
      text-align: center;
      overflow-y: scroll;

      .preview {
        display: inline-block;
        // min-height: 667px;
        // width: 375px;
        transform: scale(0.95);
        position: relative;

        &__core {
          overflow: hidden;
          min-height: 667px;
          width: 375px;
          border-width: 0;
          box-shadow: var(--x-shadow-small);
        }

        .drag-mask {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2000;
        }
      }
      .active-heightlight {
        // background: #ddd;
        // border: 3px solid red;
        position: absolute;
        // z-index: -1;
        left: -3px;
        right: 0;
        width: 100%;
        // border: 2px solid var(--x-color-primary);
      }
      .hover-heightlight {
        // background: #ededef;
        border: 3px solid var(--x-color-primary);
        box-shadow: var(--x-shadow-small);
        border-radius: 1px;
        position: absolute;
        // z-index: -1;
        left: -3px;
        right: 0;
        width: 100%;
      }

      .tools {
        position: absolute;
        right: -2.6rem;
        &__move {
          display: flex;
          flex-direction: column;

          margin-bottom: 1rem;
          background: #fff;
          box-shadow: var(--x-shadow-small);
          border-radius: 2rem;

          > span {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 2rem;
            height: 2rem;

            cursor: pointer;
          }
        }

        &__copy {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          margin-bottom: 0.5rem;
          background: #fff;
          box-shadow: var(--x-shadow-small);
          border-radius: 2rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
