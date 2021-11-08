<template>
  <div class="mine-page main-route">
    <div class="mine-page__list">
      <fe-card class="page" hoverable @click="toEditor">
        <div class="create">
          <plus />
          <span>创建新页面</span>
        </div>
      </fe-card>
      <page-card class="page" v-for="i in 10" :key="i" :title="'页面标题页面标题页面标题页面标题页面标题页面标题'"></page-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import PageCard from '@/components/PageCard.vue';

export default defineComponent({
  components: {
    PageCard,
  },
  setup() {
    const r = useRouter();

    const toEditor = () => {
      r.push({ name: 'editor' });
    };

    return { toEditor };
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
