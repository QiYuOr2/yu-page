<template>
  <div class="page-card">
    <div v-if="qrCodeLink" class="page-card__header">
      <X class="close" @click="clearQrCode" />
      <qr-code :value="qrCodeLink" :size="160"></qr-code>
      <p>扫描二维码打开页面</p>
    </div>
    <fe-card>
      <div class="page-card__content">
        <fe-img v-if="page.thumb" :src="page.thumb"></fe-img>
        <fe-skeleton v-else :animated="false">
          <template #skeleton>
            <fe-skeleton-item variable="image" style="min-height: 210px" />
          </template>
        </fe-skeleton>
      </div>
    </fe-card>
    <div class="page-card__footer">
      <div class="info">
        <div class="info__title">{{ page.name }}</div>
        <div class="info__desc">{{ page.description }}</div>
        <div class="info__time">最后编辑时间: {{ timeFormatter(page.updatedAt) }}</div>
      </div>

      <div class="actions">
        <fe-button type="success" @click="toEditor">编辑页面</fe-button>
        <fe-button class="share-btn" @click="genQrCode">
          <share class="share-btn__icon" />
        </fe-button>
        <fe-button class="share-btn" @click="removeHandler">
          <trash2 class="share-btn__icon" color="red" />
        </fe-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Image } from '@fect-ui/vue';
import QrCode from 'qrcode.vue';
import { Page } from '@/api';
import { timeFormatter } from '@/common/utils';
import { useNav } from '@/hooks';
import { config } from '@/common/config';
import { ROUTER } from '@/common/constants';

export default defineComponent({
  components: {
    'fe-img': Image,
    QrCode,
  },
  props: {
    page: { type: Object as PropType<Page> },
  },
  emits: ['remove'],
  setup(props, { emit }) {
    const { to } = useNav();

    const toEditor = () => {
      to(ROUTER.WORKBANCH, { query: { pageId: props.page?.id } });
    };

    const qrCodeLink = ref('');
    const genQrCode = () => {
      qrCodeLink.value = `${config.IFRAME_HOST}:3090/editor#/p?pageId=${props.page?.id}`;
    };
    const clearQrCode = () => {
      qrCodeLink.value = '';
    };

    const removeHandler = () => {
      emit('remove', props.page);
    };

    return {
      toEditor,
      timeFormatter,
      qrCodeLink,
      genQrCode,
      clearQrCode,
      removeHandler,
    };
  },
});
</script>

<style lang="less" scoped>
.page-card {
  position: relative;
  transition: box-shadow 0.3s;
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: #fff;
    border-radius: 5px 5px 0 0;
    padding: 2.5rem 0 2rem;

    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    z-index: 20;

    // opacity: 0;
    transition: opacity 0.3s;

    .close {
      position: absolute;
      top: 0;
      right: 0;
      padding: 1rem;
      cursor: pointer;
    }
  }

  &__content {
    min-height: 375px;
  }

  &__footer {
    position: absolute;
    bottom: 1px;
    left: 1px;
    right: 1px;
    z-index: 20;

    border-radius: 0 0 5px 5px;
    box-shadow: 0 -1px 1px 0px rgba(0, 0, 0, 0.12);

    .info {
      padding: 0.7rem;
      padding-bottom: 0;
      &__title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 4px;
      }
      &__desc {
        color: #8b8b8b;
      }

      &__time {
        margin-top: 1rem;
        font-size: 0.8rem;
        color: #8b8b8b;
      }
    }

    .actions {
      --button-medium-width: 150px;

      display: flex;
      justify-content: space-between;

      background: #fff;
      padding: 0.7rem;
      border-radius: 0 0 5px 5px;

      // opacity: 0;
      transition: opacity 0.3s;

      .share-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 20px;
        padding: 0 13px;

        &__icon {
          width: 16px;
        }
      }
    }
  }

  &:hover &__header {
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:hover &__footer {
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:hover {
    box-shadow: var(--x-shadow-medium);
    transition: box-shadow 0.3s;
  }
}
</style>
