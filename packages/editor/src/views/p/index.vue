<template>
  <div class="preview-mobile">
    <iframe
      class="preview-mobile__core"
      :src="`${iframeHost}:3090/template`"
      id="editorFrame"
      @load="onFrameLoaded"
    ></iframe>
    <!-- <div v-show="!isPublish">当前页面暂未发布</div> -->
  </div>
</template>

<script lang="ts">
import { useFrameAction, useNav } from '@/hooks';
import { defineComponent, getCurrentInstance, ref } from 'vue';
import { config } from '@/common/config';
import { page } from '@/api';
import { MESSAGE_TYPE } from '@/common/constants';

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance()!;
    const { postMessage } = useFrameAction('editorFrame');
    const { getQuery } = useNav();

    const isPublish = ref(true);

    const loadPage = async () => {
      console.log(String(getQuery('pageId')));
      const { status, data } = await page.get(String(getQuery('pageId')));
      if (status.code !== 0) {
        proxy?.$toast({ type: 'error', text: status.message });
        return;
      }
      document.title = data.name;
      postMessage({
        type: MESSAGE_TYPE.INIT,
        data: JSON.parse(data.schema),
      });
      isPublish.value =/*  data.isPublish */ true;
    };

    const onFrameLoaded = () => {
      loadPage();
    };

    return { onFrameLoaded, iframeHost: config.IFRAME_HOST };
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
    height: calc(100vh - 48px);
    width: 100%;
    max-width: 640px;
    border-width: 0;
  }
}
</style>
