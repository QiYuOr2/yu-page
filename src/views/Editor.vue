<template>
  <div class="editor">
    <div class="editor__header">
      <chevronLeft class="back" @click="backToHome" />
      <fe-button type="success" size="mini">保存</fe-button>
    </div>
    <div class="editor__container">
      <div class="aside__left">
        <!-- <fe-collapse title="基础组件"></fe-collapse> -->
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
import { chevronLeft } from '@fect-ui/vue-icons';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { chevronLeft },
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
      padding: 1rem;
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
