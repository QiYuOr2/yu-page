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
          <fe-grid-group justify="space-between" :gap="1" :col="2" :count="parent.children">
            <template #grid="component">
              <shortcut :title="component.label" :icon="component.icon" />
            </template>
          </fe-grid-group>
        </collapse>
      </div>
      <div class="main">
        <div class="workbench"></div>
      </div>
      <div class="aside__right">
        <div class="settings">
          <collapse v-for="item in optionsList" :key="item.name" :title="item.label">
            <style-options :options="item.options" />
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
import { computed, defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useCommonStyle } from '@/hooks/useCommonStyles';
import Collapse from '@/components/Collapse.vue';
import Shortcut from '@/components/Shortcut.vue';
import StyleOptions from '@/components/StyleOptions.vue';

// TODO 组件设置和commonStyle设置合并后展示，需要有一个组件ID区分各个组件
export default defineComponent({
  components: { Shortcut, Collapse, StyleOptions },
  setup() {
    const r = useRouter();

    const backToHome = () => {
      r.push('/');
    };

    const componentList = reactive([
      {
        name: 'common',
        label: '通用组件',
        children: [
          { name: 'text', label: '文本', icon: 'alignJustify' },
          { name: 'button', label: '按钮', icon: 'triangle' },
          { name: 'image', label: '图片', icon: 'map' },
        ],
      },
      {
        name: 'business',
        label: '业务组件',
        children: [
          { name: 'button', label: '按钮', icon: 'triangle' },
          { name: 'slide', label: '轮播图', icon: 'layers' },
        ],
      },
    ]);

    const { styles } = useCommonStyle();
    const commonStyleList = computed(() => {
      return Object.entries(styles).map((item) => item[1]);
    });
    const optionsList = reactive([
      {
        name: 'base',
        label: '通用样式',
        options: commonStyleList.value,
      },
      {
        name: 'props',
        label: '属性设置',
        options: [
          // { name: 'size', label: '大小', preset: ['mini', 'small', 'medium', 'large'], defaultVal: 'medium' },
          { name: 'type', label: '类型', preset: ['default', 'success', 'error', 'warn'], defaultVal: 'default' },
        ],
      },
    ]);

    return { backToHome, componentList, optionsList };
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
