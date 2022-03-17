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
        :page="p"
        @remove="openRemoveDialog"
      ></page-card>
    </div>

    <fe-modal
      title="删除页面"
      v-model:visible="removeDialog.visible"
      cancel="取消"
      done="确定"
      @confirm="removePage"
    >
      <p>{{ removeDialog.content }}</p>
    </fe-modal>
    <fe-spacer />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { Page, page } from '@/api';
import { cookie } from '@/common/utils';
import { COOKIE } from '@/common/constants';
import { useNav } from '@/hooks';

import PageCard from './components/page-card.vue';

export default defineComponent({
  components: { PageCard },
  setup() {
    const { proxy } = getCurrentInstance()!;
    const { to } = useNav();

    const toEditor = () => {
      to('WORKBANCH');
    };

    const pages = ref<Page[]>([]);

    const getPages = async () => {
      const { status, data } = await page.list(cookie.get(COOKIE.UID));
      if (status.code === 0) {
        console.log(data);
        pages.value = data;
      }
    };

    onMounted(() => {
      getPages();
    });

    const removeDialog = reactive({
      id: '',
      visible: false,
      content: '',
    });
    const openRemoveDialog = (page: Page) => {
      removeDialog.id = page.id;
      removeDialog.visible = true;
      removeDialog.content = `确定要删除「${page.name}」吗？`;
    };

    const removePage = async () => {
      const { status } = await page.remove(removeDialog.id);
      if (status.code === 0) {
        (proxy as any).$toast({ text: '删除成功' });
        getPages();
      }
    };

    return { toEditor, pages, removeDialog, openRemoveDialog, removePage };
  },
});
</script>

<style lang="less" scoped>
.mine-page {
  &__list {
    display: flex;
    flex-wrap: wrap;
    width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
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
        min-height: 375px;

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
