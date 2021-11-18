<template>
  <div class="x-collapse">
    <div class="x-collapse__header" @click="toggle">
      <span>
        {{ title }}
      </span>
      <chevronDown size="14" v-if="!computedVisible" />
      <chevronUp size="14" v-else />
    </div>
    <div ref="collapseContent" :class="['x-collapse__content', { close: !computedVisible }]" :style="{ height }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUpdated, ref } from 'vue';

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

    const contentHeight = ref(0);
    onMounted(() => {
      contentHeight.value = collapseContent.value?.scrollHeight ?? 0;
    });
    onUpdated(() => {
      contentHeight.value = collapseContent.value?.scrollHeight ?? 0;
    });
    const height = computed(() => {
      return computedVisible.value ? contentHeight.value + 'px' : '0px';
    });

    return { computedVisible, toggle, height, collapseContent };
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
    border-bottom: 1px solid var(--accents-2);
    overflow: hidden;
    transition: height 0.3s;

    &.close {
      padding: 0;
      border-bottom: 0;
      transition: height 0.3s, padding 0s 0.2s;
    }
  }
}
</style>
