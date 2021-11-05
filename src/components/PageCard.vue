<template>
  <div class="page-card">
    <div class="page-card__header">
      <span>
        {{ title }}
      </span>
      <share class="share" />
    </div>
    <fe-card hoverable>
      <fe-img :src="require('../assets/f6-bg4.png')"></fe-img>
    </fe-card>
    <div class="page-card__footer">
      <fe-button type="success" @click="toEditor">编辑页面</fe-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Image } from '@fect-ui/vue';
import { share } from '@fect-ui/vue-icons';

export default defineComponent({
  components: {
    'fe-img': Image,
    share,
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
    .share {
      width: 14px;
      margin-left: auto;
      cursor: pointer;
      transition: stroke 0.3s;
      &:hover {
        stroke: var(--x-color-primary);
        transition: stroke 0.3s;
      }
    }
  }
  &__footer {
    display: flex;
    justify-content: center;

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
