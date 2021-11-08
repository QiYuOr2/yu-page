<template>
  <div class="x-collapse">
    <div class="x-collapse__header" @click="toggle">
      <span>
        {{ title }}
      </span>
      <chevronDown size="14" v-if="!computedVisible" />
      <chevronUp size="14" v-else />
    </div>
    <div ref="collapseContent" :class="['x-collapse__content', { close: !computedVisible }]">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    title: String,
    visible: { type: Boolean, default: undefined },
  },
  setup(props, { emit }) {
    const collapseContent = ref<InstanceType<typeof Element> | null>(null);
    const innerVisible = ref(true);
    const computedVisible = computed({
      get: () => {
        if (typeof props.visible !== 'undefined') {
          return props.visible;
        }
        return innerVisible.value;
      },
      set: (val) => {
        innerVisible.value = val;
        emit('update:visible', val);
      },
    });

    const toggle = () => {
      computedVisible.value = !computedVisible.value;
    };

    return { computedVisible, toggle };
  },
});
</script>

<style lang="less" scoped>
.x-collapse {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 8px 10px;
    border-bottom: 1px solid var(--accents-2);

    cursor: pointer;
  }
  &__content {
    padding: 16px 14px;
    border-bottom: 1px solid var(--accents-2);
    transition: all 0.3s;
    overflow: hidden;

    &.close {
      padding: 0;
      border-bottom: 0;
      transform-origin: top 0 left 50%;
      transform: scaleY(0);
      transition: all 0.3s;
    }
  }
}
</style>
