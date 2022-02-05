<template>
  <div class="component-selector">
    <section>
      <div class="component-selector__title">模板组件</div>
      <div class="component-selector__content">
        <div class="list">
          <fe-card class="snippet" v-for="(c, $i) in components" :key="$i">
            <fe-img :src="c.snapshot" />
            <p>{{ c.description }}</p>
          </fe-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useEditStore } from '@/store';
import { defineComponent } from 'vue';
import { Image } from '@fect-ui/vue';

export default defineComponent({
  components: { 'fe-img': Image },
  setup() {
    const editStore = useEditStore();

    return {
      components: editStore.pageConfig.components,
    };
  },
});
</script>

<style lang="less" scoped>
.component-selector {
  &__title {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    background: rgba(0, 0, 0, 0.04);
  }

  &__content {
    .list {
      margin: 10px;
      display: flex;
      gap: 10px;

      .snippet {
        width: 50%;
        --fect-gap: 10px;
        margin-bottom: 10px;
        border: 1px solid #eee;
        text-align: center;
        p {
          padding: 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
