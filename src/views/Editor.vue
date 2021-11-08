<template>
  <div class="editor">
    <div class="editor__header">
      <chevronLeft class="back" @click="backToHome" />
      <fe-button type="success" size="mini">保存</fe-button>
    </div>
    <div class="editor__container">
      <div class="aside__left">
        <collapse :title="'通用组件'">
          <fe-grid container justify="space-between">
            <shortcut />
            <shortcut />
          </fe-grid>
        </collapse>
        <collapse :title="'业务组件'">
          <fe-grid container justify="space-between">
            <shortcut />
            <shortcut />
          </fe-grid>
        </collapse>
      </div>
      <div class="main">
        <div class="workbench"></div>
      </div>
      <div class="aside__right">属性调整器</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import Collapse from '@/components/Collapse.vue';
import Shortcut from '@/components/Shortcut.vue';

export default defineComponent({
  components: { Shortcut, Collapse },
  setup() {
    const r = useRouter();

    const backToHome = () => {
      r.push('/');
    };

    return { backToHome };
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
    }
    .main {
      overflow: scroll;
      flex: 1;
      background: rgba(0, 0, 0, 0.05);
      .workbench {
        height: 1000px;
      }
    }
  }
}
</style>
