<template>
  <fe-row class="option" gutter="8" justify="space-between" v-if="!item.children">
    <fe-col :span="item.unit ? 16 : 24">
      <fe-input
        v-if="!Array.isArray(item.preset) && item.type !== 'color'"
        style="width: 100%"
        size="mini"
        :prefix="item.label"
        :value="item.defaultVal"
      />
      <div class="custom-option-wrapper" v-else-if="item.type === 'color'">
        <div class="custom-option-label">{{ item.label }}</div>
        <input class="field" type="color" :value="item.defaultVal" />
      </div>
      <div class="custom-option-wrapper" v-else>
        <div class="custom-option-label">{{ item.label }}</div>
        <fe-select size="small" :value="String(item.defaultVal)">
          <fe-option v-for="(p, pIdx) in item.preset" :key="pIdx" :label="p" :value="String(p)"></fe-option>
        </fe-select>
      </div>
    </fe-col>
    <fe-col v-if="item.unit" span="8" style="text-align: right">
      <fe-select size="small" style="min-width: 60px" :value="String(item.selectUnitIdx)">
        <fe-option v-for="(u, uIdx) in item.unit" :key="uIdx" :label="u" :value="String(uIdx)"></fe-option>
      </fe-select>
    </fe-col>
  </fe-row>
</template>

<script lang="ts">
import { RawStyle } from '@/hooks/useCommonStyles';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    item: { type: Object as PropType<RawStyle>, required: true },
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.option {
  margin-bottom: 5px;
  .custom-option {
    &-wrapper {
      display: flex;
      align-items: center;

      /deep/ .fect-select,
      .field {
        flex: 1;
      }
    }
    &-label {
      font-size: 14px;
      color: var(--accents-6);
      margin-right: 0.5rem;
    }
  }
}
</style>
