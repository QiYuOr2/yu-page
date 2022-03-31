<template>
  <div class="workbanch">
    <header class="workbanch__header">
      <chevronLeft class="back" @click="backHome" />
      <div>
        <fe-button-group size="mini" style="margin-right: 0.5rem">
          <fe-button @click="preview">预览</fe-button>
          <fe-button @click="save">保存</fe-button>
        </fe-button-group>
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
            :src="`${iframeHost}:3090/template`"
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
              <div v-if="canRemoveComponent" class="tools__copy" @click="removeComponents">
                <trash2 />
              </div>
            </div>
          </div>
        </div>
      </main>
      <aside class="aside">
        <fe-tabs style="width: 100%" v-model:active="activeTab">
          <fe-tab title="组件编辑">
            <div class="aside__form">
              <form-render
                :itemData="currentComponentSchema"
                @change="formDataChangeHandler"
              ></form-render>
            </div>
          </fe-tab>
          <fe-tab title="页面设置">
            <!-- TODO 抽离组件 -->
            <div class="aside__form">
              <fe-form label-position="top">
                <fe-form-item label="页面标题">
                  <fe-input v-model="pageConfig.title" :placeholder="请输入页面标题" width="100%" />
                </fe-form-item>
                <fe-form-item label="页面描述">
                  <fe-textarea
                    v-model="pageConfig.description"
                    placeholder="请输入页面描述"
                    width="100%"
                    auto-height
                  />
                </fe-form-item>
              </fe-form>
            </div>
          </fe-tab>
        </fe-tabs>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue';
import { useFrameAction, useNav } from '@/hooks';
import { MESSAGE_TYPE, FRAME, COOKIE, ROUTER } from '@/common/constants';
import { config } from '@/common/config';

// Components
import { ArrowDown, ArrowUp, Clipboard, Copy } from '@fect-ui/vue-icons';
import ComponentSelector from './components/component-selector.vue';
import { cookie, fork, local } from '@/common/utils';
import { page } from '@/api';

export default defineComponent({
  components: { ComponentSelector, ArrowDown, ArrowUp, Clipboard, Copy },
  setup() {
    const { proxy } = getCurrentInstance()!;
    const activeTab = ref(0);
    const { backHome, to, getQuery } = useNav();

    const pageConfig = reactive({
      title: '',
      description: '默认页面描述',
    });

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

    onMounted(() => {
      injectIframeMessageListener();
    });

    watch([() => editStore.editConfig.currentIndex], (values) => {
      initState(values[0]);
    });

    const loadPage = async (pageId: string) => {
      const { status, data } = await page.get(pageId);
      if (status.code === 0) {
        pageConfig.title = data.name;
        pageConfig.description = data.description;

        postMessage({
          type: MESSAGE_TYPE.INIT,
          data: JSON.parse(data.schema),
        });
      }
    };

    const onFrameLoaded = () => {
      injectEventListener((event, index) => {
        editorState.current = index;
        event === 'click' && postMessage({ type: MESSAGE_TYPE.CHANGE_INDEX, data: index });
      });
      state.spinning = false;

      // iframe加载完成后读取数据
      const pageId = String(getQuery('pageId'));
      pageId && loadPage(pageId);
    };

    const moveComponent = (action: number) => {
      if ((editorState.isBottom && action === 1) || (editorState.isTop && action === -1)) return;

      postMessage({
        type: MESSAGE_TYPE.SORT_COMPONENT,
        data: { action, index: editorState.current },
      });
    };

    /**
     * 预览
     */
    const preview = () => {
      local.set('preview::components', editStore.pageConfig.userSelectComponents);
      local.set('preview::page', pageConfig);
      to(ROUTER.PREVIEW);
    };

    /**
     * 发布
     */
    const release = async () => {
      const pageId = String(getQuery('pageId'));

      const pageData = {
        schema: JSON.stringify(editStore.pageConfig.userSelectComponents),
        name: pageConfig.title,
        description: pageConfig.description,
        isPublish: true,
      };

      const { status } = !pageId
        ? // 如果原本没有该页面，创建
          await page.create(cookie.get(COOKIE.UID), pageData)
        : // 否则是编辑
          await page.modify(pageId, pageData);

      status.code !== 0
        ? proxy?.$toast({ type: 'error', text: status.message })
        : (proxy?.$toast({ text: '发布成功' }), /* 跳转首页 */ to(ROUTER.HOME));
    };

    /**
     * 保存
     */
    const save = async () => {
      const pageId = String(getQuery('pageId'));

      const pageData = {
        schema: JSON.stringify(editStore.pageConfig.userSelectComponents),
        name: pageConfig.title,
        description: pageConfig.description,
      };

      const { status } = !pageId
        ? // 如果原本没有该页面，创建
          await page.create(cookie.get(COOKIE.UID), { ...pageData, isPublish: false })
        : // 否则是编辑
          await page.modify(pageId, pageData);

      status.code !== 0
        ? proxy?.$toast({ type: 'error', text: status.message })
        : proxy?.$toast({ text: '保存成功' });
    };

    const addComponents = (data: string, index: number) => {
      postMessage({
        type: MESSAGE_TYPE.ADD_COMPONENT,
        data: { data: JSON.parse(data), index },
      });
    };

    const removeComponents = () => {
      postMessage({
        type: MESSAGE_TYPE.DELETE_COMPONENT,
        data: { index: editorState.current },
      });
    };

    //#region 拖拽事件

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

    //#endregion

    // 修改页面组件数据
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
      save,

      moveComponent,

      showDragMask: computed(() => editStore.uiConfig.dragStart),
      dragOverHandler,
      dragLeaveHandler,
      dropHandler,

      currentComponentSchema: computed(
        () => editStore.pageConfig.userSelectComponents[editStore.editConfig.currentIndex] ?? {}
      ),

      canRemoveComponent: computed(() => editStore.pageConfig.userSelectComponents.length > 1),

      toolId: FRAME.TOOL_ID,
      formDataChangeHandler,

      activeTab,
      pageConfig,

      iframeHost: config.IFRAME_HOST,

      removeComponents,
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

      &__form {
        padding: 0 10px;

        /deep/ .fect-input {
          width: 100%;
        }
      }
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
        border: 2px solid var(--x-color-primary);
        box-shadow: var(--x-shadow-small);
        position: absolute;
        // z-index: -1;
        left: -3px;
        right: 0;
        width: 100%;
        // border: 2px solid var(--x-color-primary);

        pointer-events: none;
      }
      .hover-heightlight {
        // background: #ededef;
        border: 2px dashed var(--x-color-primary);
        box-shadow: var(--x-shadow-small);
        border-radius: 1px;
        position: absolute;
        // z-index: -1;
        left: -3px;
        right: 0;
        width: 100%;

        pointer-events: none;
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
