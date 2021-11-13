<template>
  <div class="workbench">
    <div
      v-for="item in componentList"
      :class="['choose-wrapper', { active: activeId === item.id }]"
      :key="item.id"
      @click="choose($event, item.id)"
    >
      <component :is="item.name">
        {{ item?.props?.inner?.defaultVal || '' }}
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { Schema } from '@/hooks/useEditorComponents';
import { defineComponent, inject, PropType, ref } from 'vue';

export default defineComponent({
  props: {
    componentList: {
      type: Object as PropType<Schema[]>,
    },
  },
  setup() {
    const activeId = inject('activeId', '');
    const updateActiveId = inject<(id: string) => void>('updateActiveId');

    const choose = (e: MouseEvent, id: string) => {
      e.stopPropagation();
      updateActiveId?.(id);
    };

    return { choose, activeId };
  },
});
</script>

<style lang="less" scoped>
.choose-wrapper {
  position: relative;
  cursor: pointer;
  &.active {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border: 1px solid #369;
    }
  }
}
</style>
