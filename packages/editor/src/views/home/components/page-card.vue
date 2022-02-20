<template>
  <div class="page-card">
    <div class="page-card__header">
      <span>
        {{ title }}
      </span>
      <trash2 class="trash" />
    </div>
    <fe-card hoverable>
      <fe-img :src="require('../../../assets/f6-bg4.png')"></fe-img>
    </fe-card>
    <div class="page-card__footer">
      <fe-button type="success" @click="toEditor">编辑页面</fe-button>
      <fe-button class="share-btn">
        <share class="share-btn__icon" />
      </fe-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Image } from '@fect-ui/vue';

export default defineComponent({
  components: {
    'fe-img': Image,
  },
  props: {
    id: { type: String },
    title: { type: String },
  },
  setup(props) {
    const r = useRouter();

    const toEditor = () => {
      r.push({ name: 'editor' });
    };

    return {
      toEditor,
    };
  },
});
</script>

<style lang="less" scoped>
.page-card {
  position: relative;
  &__header {
    display: flex;

    background: #fff;
    border-radius: 5px 5px 0 0;
    padding: 0.8rem 1rem;
    box-shadow: 0 1px 1px 0px rgba(0, 0, 0, 0.12);

    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    z-index: 20;

    opacity: 0;
    transition: opacity 0.3s;
    > span {
      display: inline-block;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .trash {
      width: 16px;
      margin-left: auto;
      cursor: pointer;
      transition: stroke 0.3s;
      &:hover {
        stroke: var(--error-default);
        transition: stroke 0.3s;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: space-between;

    background: #fff;
    border-radius: 0 0 5px 5px;
    padding: 0.7rem;
    box-shadow: 0 -1px 1px 0px rgba(0, 0, 0, 0.12);

    position: absolute;
    bottom: 1px;
    left: 1px;
    right: 1px;
    z-index: 20;

    opacity: 0;
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

  &:hover &__header {
    opacity: 1;
    transition: opacity 0.3s;
  }

  &:hover &__footer {
    opacity: 1;
    transition: opacity 0.3s;
  }
}
</style>
