<template>
  <div class="options">
    <div v-for="(item, i) in options" :key="i">
      <fe-row gutter="10" v-if="!item.children">
        <fe-col span="16">
          <fe-input style="width: 100%" size="mini" :prefix="item.label" :value="item.preset" />
        </fe-col>
        <fe-col span="8">
          <fe-select size="small" style="min-width: 60px" :value="String(item.selectUnitIdx)">
            <fe-option v-for="(u, uIdx) in item.unit" :key="uIdx" :label="u" :value="String(uIdx)"></fe-option>
          </fe-select>
        </fe-col>
      </fe-row>
      <div v-else>
        <div class="options-subtitle">{{ item.label }}</div>
        <fe-row gutter="10" v-for="(subItem, subIdx) in item.children" :key="subIdx">
          <fe-col span="16">
            <fe-input style="width: 100%" size="mini" :prefix="subItem.label" :value="subItem.preset" />
          </fe-col>
          <fe-col span="8">
            <fe-select size="small" style="min-width: 60px" :value="String(item.selectUnitIdx)">
              <fe-option v-for="(u, uIdx) in item.unit" :key="uIdx" :label="u" :value="String(uIdx)"></fe-option>
            </fe-select>
          </fe-col>
        </fe-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RawStyle } from '@/hooks/useCommonStyles';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: { options: Array as PropType<Array<RawStyle<any>>> },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.options {
  &-subtitle {
    margin: 1rem 0 0.5rem 0;
    font-size: 14px;
    color: var(--accents-6);
  }
}
</style>
