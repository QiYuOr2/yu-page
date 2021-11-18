<template>
  <div class="editor">
    <div class="editor__header">
      <chevronLeft class="back" @click="backToHome" />
      <div>
        <fe-button size="mini" style="margin-right: 0.5rem">预览</fe-button>
        <fe-button type="success" size="mini">保存</fe-button>
      </div>
    </div>
    <div class="editor__container">
      <div class="aside__left">
        <collapse v-for="parent in componentList" :key="parent.name" :title="parent.label">
          <div style="padding: 16px 14px">
            <fe-grid-group justify="space-between" :gap="1" :col="2" :count="parent.children">
              <template #grid="component">
                <shortcut :title="component.label" :icon="component.icon" @click="addComponent(component)" />
              </template>
            </fe-grid-group>
          </div>
        </collapse>
      </div>
      <div class="main">
        <workbench :componentList="editorComponentList.value" />
      </div>
      <div class="aside__right">
        <div class="settings">
          <collapse v-for="item in optionsList" :key="item.name" :title="item.label" :empty="item.options.length === 0">
            <div style="padding: 16px 14px">
              <style-options :options="item.options" />
            </div>
          </collapse>
        </div>
        <div class="tabbar">
          <div class="tabbar-item active">组件设置</div>
          <div class="divider"></div>
          <div class="tabbar-item">页面设置</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, onMounted } from 'vue';

// Components
import Collapse from '@/components/Collapse.vue';
import Shortcut from '@/components/Shortcut.vue';
import StyleOptions from '@/components/StyleOptions.vue';
import Workbench from '@/components/Workbench.vue';

// Hooks
import { useRouter } from 'vue-router';
import { useEditorComponents } from '@/hooks/useEditorComponents';
import { RawStyle } from '@/hooks/useCommonStyles';
import useStore from '@/hooks/useStore';

// Requests
import { fetchComponents } from '@/api';

// Types
import { FormattedComponent } from '@/types';
import { componentsFormatter } from '@/common/utils';

// TODO merge 各个component的自定义样式或者减少可自定义程度
export default defineComponent({
  components: { Shortcut, Collapse, StyleOptions, Workbench },
  setup() {
    const r = useRouter();

    const backToHome = () => {
      r.push('/');
    };

    const componentList = reactive<FormattedComponent[]>([]);
    onMounted(async () => {
      const { status, result } = await fetchComponents();
      if (status.code === 0) {
        componentList.push(...componentsFormatter(result.data));
      }
    });

    //#region 组件编辑
    const { activeId } = useStore();

    const { componentList: editorComponentList, addComponent, removeComponent, getComponent } = useEditorComponents();

    const optionsList = reactive([
      {
        name: 'base',
        label: '通用样式',
        options: [],
      },
      {
        name: 'props',
        label: '属性设置',
        options: [],
      },
    ]);

    let commonStyleList: RawStyle[] = [];
    let propList: RawStyle[] = [];

    watch([() => activeId.value, editorComponentList], () => {
      const currentComponent = getComponent(activeId.value);
      commonStyleList = currentComponent
        ? Object.entries(currentComponent.styles).map((item) => ({ ...item[1], from: 'style' }))
        : [];
      propList = currentComponent ? Object.entries(currentComponent.props).map((item) => ({ ...item[1], from: 'prop' })) : [];
      (optionsList[0].options as any[]) = commonStyleList;
      (optionsList[1].options as any[]) = propList;
    });

    //#endregion

    return { backToHome, componentList, optionsList, addComponent, editorComponentList: editorComponentList };
  },
});
</script>

<style lang="less" scoped>
.editor {
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

  &__container {
    display: flex;
    height: calc(100vh - 44px);
    [class^='aside'] {
      box-sizing: border-box;
      width: 240px;
      height: 100%;
      // padding: 1rem 0;
      box-shadow: var(--x-shadow-small);
      overflow: scroll;

      &.aside__right {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .settings {
          flex: 1;
          overflow: scroll;
        }
        .tabbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.5rem;
          box-shadow: var(--x-shadow-small-reverse);
          position: relative;
          z-index: 100;
          &-item {
            padding: 0.8rem 1.2rem;
            cursor: pointer;
            &.active {
              color: var(--x-color-primary);
            }
          }
        }
      }
    }
    .main {
      display: flex;
      justify-content: center;

      overflow: scroll;
      flex: 1;
      background: rgba(0, 0, 0, 0.05);
      .workbench {
        --base-width: 30vw;
        margin: 1rem;
        width: calc(var(--base-width) * 1.2);
        min-height: calc(var(--base-width) * (16 / 9));
        background: #fff;
        box-shadow: var(--x-shadow-small);
      }
    }
  }
}
</style>
