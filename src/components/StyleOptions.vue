<template>
  <div class="options">
    <div v-for="(item, i) in options" :key="i">
      <option-item v-if="!item.children" :item="item" />
      <div v-else>
        <div class="options-subtitle">
          <span class="divider--x"></span>
          <span class="text">
            {{ item.label }}
          </span>
          <span class="divider--x"></span>
        </div>
        <option-item v-for="(subItem, subIdx) in item.children" :key="subIdx" :item="subItem" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { StyleDto } from '@/types/dto';
import { defineComponent, PropType } from 'vue';

import OptionItem from './OptionItem.vue';

export default defineComponent({
  components: { OptionItem },
  props: { options: Array as PropType<Array<StyleDto>> },
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
    display: flex;
    align-items: center;
    & .text {
      flex: 1;
      text-align: center;
    }
    & .divider--x {
      width: 60px;
    }
  }
}
</style>
