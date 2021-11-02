<template>
  <div class="mine-page">
    <fe-grid class="mine-page__list" container>
      <fe-card class="page" v-for="i in 10" :key="i" hoverable>
        <fe-image :src="require('../assets/f6-bg4.png')"></fe-image>
      </fe-card>
    </fe-grid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.mine-page {
  &__list {
    padding: 2rem 3rem;
    .page {
      width: 280px;
      margin-bottom: 2rem;
      margin-right: calc((100% - 280px * 4) / 3);

      &:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
}
</style>
