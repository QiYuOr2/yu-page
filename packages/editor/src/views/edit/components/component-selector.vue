<template>
  <div class="component-selector">
    <section>
      <div class="component-selector__title">模板组件</div>
      <div class="component-selector__content">
        <div class="list">
          <fe-card
            v-for="(c, $i) in components"
            :key="$i"
            @dragstart="setDragStart($event, true, c)"
            @dragend="setDragStart($event, false)"
            :draggable="true"
          >
            <div class="snippet">
              <fe-img :src="c.snapshot" />
              <p>{{ c.description }}</p>
            </div>
          </fe-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useEditStore } from '@/store';
import { computed, defineComponent } from 'vue';
import { Image } from '@fect-ui/vue';

export default defineComponent({
  components: { 'fe-img': Image },
  setup() {
    const editStore = useEditStore();

    return {
      components: computed(() => editStore.pageConfig.components),
      setDragStart: editStore.updateDragStart,
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

      .fect-card {
        --fect-gap: 0;
        padding-bottom: 4px;
        border: 1px solid #eee;
        overflow: hidden;
      }

      .fect-image {
        border-top-left-radius: unset;
        border-top-right-radius: unset;
      }

      .snippet {
        pointer-events: none;
        
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        height: 120px;
        text-align: center;
        cursor: pointer;
        p {
          padding: 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
