<template>
  <div class="mine-page main-route">
    <div class="mine-page__list">
      <fe-card class="page" hoverable @click="toEditor">
        <div class="create">
          <plus />
          <span>创建新页面</span>
        </div>
      </fe-card>
      <page-card
        class="page"
        v-for="(p, i) in pages"
        :key="i"
        :title="p.title"
      ></page-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { useNav } from '@/hooks';

import PageCard from './components/page-card.vue';
import { Page, page } from '@/api';
import { cookie } from '@/common/utils';
import { COOKIE } from '@/common/constants';

export default defineComponent({
  components: { PageCard },
  setup() {
    const { to } = useNav();

    const toEditor = () => {
      to('WORKBANCH');
    };

    const pages = ref<Page[]>([]);

    const getPages = async () => {
      const { status, result } = await page.list(cookie.get(COOKIE.UID));
      if (status.code === 0) {
        pages.value = result;
      }
    };

    onMounted(() => {
      getPages();
    });

    return { toEditor, pages };
  },
});
</script>

<style lang="less" scoped>
.mine-page {
  &__list {
    display: flex;
    flex-wrap: wrap;
    padding: 2rem 3rem;
    .page {
      width: 280px;
      margin-bottom: 2rem;
      margin-right: calc((100% - 280px * 4) / 3);

      &:nth-child(4n) {
        margin-right: 0;
      }

      & .create {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        height: 100%;

        color: #8b8b8b;
        cursor: pointer;
        > span {
          margin-top: 1rem;
        }
      }

      /deep/ .fect-card__content {
        height: 100%;
      }
    }
  }
}
</style>
