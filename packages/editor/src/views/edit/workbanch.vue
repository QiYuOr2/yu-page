<template>
  <div class="workbanch">
    <header class="workbanch__header">
      <chevronLeft class="back" @click="backHome" />
      <div>
        <fe-button size="mini" style="margin-right: 0.5rem">预览</fe-button>
        <fe-button type="success" size="mini">保存</fe-button>
      </div>
    </header>
    <main>
      <iframe
        src="http://localhost:3090/template"
        id="editorFrame"
        @load="onFrameLoaded"
      ></iframe>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFrameAction, useNav } from '@/hooks';

const postMessage = <T>(msg: T) => {
  window.frames[0] && window.frames[0].postMessage(msg, '*');
};

export default defineComponent({
  setup() {
    const { injectEventListener } = useFrameAction('editorFrame');
    const { backHome } = useNav();

    const onFrameLoaded = () => {
      injectEventListener();
    };

    return {
      backHome,
      onFrameLoaded,
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
}
</style>
