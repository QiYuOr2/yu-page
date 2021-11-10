<template>
  <div class="options">
    <div v-for="(item, i) in options" :key="i">
      <option-item v-if="!item.children" :item="item" />
      <div v-else>
        <div class="options-subtitle">{{ item.label }}</div>
        <option-item v-for="(subItem, subIdx) in item.children" :key="subIdx" :item="subItem" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RawStyle } from '@/hooks/useCommonStyles';
import { defineComponent, PropType } from 'vue';

import OptionItem from './OptionItem.vue';

export default defineComponent({
  components: { OptionItem },
  props: { options: Array as PropType<Array<RawStyle>> },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.options {
  &-subtitle {
    margin: 0.5em 0;
    font-size: 14px;
    color: var(--accents-6);
  }
}
</style>
