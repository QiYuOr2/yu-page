<template>
  <div class="preview-mobile">
    <header class="preview-mobile__header">
      <chevronLeft class="back" @click="back" />
    </header>
    <iframe
      class="preview-mobile__core"
      src="http://localhost:3090/template"
      id="editorFrame"
      @load="onFrameLoaded"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { useFrameAction, useNav } from '@/hooks';
import { defineComponent } from 'vue';
import { ChevronsLeft } from '@fect-ui/vue-icons';

export default defineComponent({
  components: { ChevronsLeft },
  setup() {
    const { resetFrameHeight, postMessage } = useFrameAction('editorFrame');
    const { back } = useNav();

    const onFrameLoaded = () => {
      postMessage({ type: 'preview' });
      setTimeout(() => {
        resetFrameHeight(10);
      }, 100);
    };
    return { onFrameLoaded, back };
  },
});
</script>

<style lang="less" scoped>
.preview-mobile {
  background: #efeff1;
  height: 100vh;
  overflow: hidden;

  &__header {
    width: 375px;
  }
  
  &__core {
    display: block;
    margin: 0 auto;
    background: #fff;
    height: 100vh;
    width: 375px;
    border-width: 0;
  }
}
</style>
