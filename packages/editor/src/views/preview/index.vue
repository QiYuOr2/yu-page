<template>
  <div class="preview-mobile">
    <header class="preview-mobile__header">
      <chevronLeft class="back" @click="back" />
      <span>{{ title }}</span>
      <chevronLeft class="hidden" />
    </header>
    <iframe
      class="preview-mobile__core"
      :src="`${iframeHost}:3090/template`"
      id="editorFrame"
      @load="onFrameLoaded"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { useFrameAction, useNav } from '@/hooks';
import { defineComponent, onMounted, ref } from 'vue';
import { ChevronsLeft } from '@fect-ui/vue-icons';
import { local } from '@/common/utils';
import { config } from '@/common/config';

export default defineComponent({
  components: { ChevronsLeft },
  setup() {
    const { postMessage } = useFrameAction('editorFrame');
    const { back } = useNav();

    const onFrameLoaded = () => {
      postMessage({ type: 'preview' });
    };

    const title = ref('');

    onMounted(() => {
      title.value = local.get('preview::page').title || '默认标题';
    });

    return { onFrameLoaded, back, title, iframeHost: config.IFRAME_HOST };
  },
});
</script>

<style lang="less" scoped>
.preview-mobile {
  background: #efeff1;
  height: 100vh;
  overflow: hidden;

  &__header {
    box-sizing: border-box;
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    height: 48px;

    .back {
      cursor: pointer;
    }

    .hidden {
      opacity: 0;
    }
  }

  &__core {
    display: block;
    margin: 0 auto;
    background: #fff;
    height: calc(100vh - 48px);
    width: 100%;
    max-width: 640px;
    border-width: 0;
  }
}
</style>
