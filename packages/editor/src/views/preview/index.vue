<template>
  <div class="preview-mobile">
    <iframe
      class="preview-mobile__core"
      src="http://localhost:3090/template"
      id="editorFrame"
      @load="onFrameLoaded"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { useFrameAction } from '@/hooks';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { postMessage } = useFrameAction('editorFrame');
    const onFrameLoaded = () => {
      postMessage({ type: 'preview' });
    };
    return { onFrameLoaded };
  },
});
</script>

<style lang="less" scoped>
.preview-mobile {
  background: #efeff1;
  height: 100vh;
  overflow: hidden;
  &__core {
    display: block;
    margin: 0 auto;
    background: #fff;
    height: 100vh;
    width: 100%;
    max-width: 640px;
    border-width: 0;
  }
}
</style>
