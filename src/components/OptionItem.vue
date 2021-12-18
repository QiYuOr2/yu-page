<template>
  <fe-row class="option" gutter="8" justify="space-between" v-if="!item.children">
    <fe-col :span="item.unit ? 16 : 24">
      <fe-input
        v-if="!Array.isArray(item.preset) && item.type !== 'color'"
        style="width: 100%"
        size="mini"
        :prefix="item.label"
        :value="item.val"
        @change="changeHandler($event.target.value, item.name, item.from)"
      />
      <div class="custom-option-wrapper" v-else-if="item.type?.includes('color')">
        <div class="custom-option-label">{{ item.label }}</div>
        <input class="field" type="color" :value="item.val" @change="changeHandler($event, item.name, item.from)" />
      </div>
      <div class="custom-option-wrapper" v-else>
        <div class="custom-option-label">{{ item.label }}</div>
        <fe-select
          v-if="!shouldPreview(item.preset)"
          size="small"
          :value="String(item.val)"
          @change="changeHandler($event, item.name, item.from)"
        >
          <fe-option v-for="(p, pIdx) in item.preset" :key="pIdx" :label="p" :value="String(p)"></fe-option>
        </fe-select>
        <preview-radio v-else :presetStyles="item.preset" />
      </div>
    </fe-col>
    <fe-col v-if="item.unit" span="8" style="text-align: right">
      <fe-select size="small" style="min-width: 60px" :value="item.selectUnit" @change="selectUnit($event, item.name)">
        <fe-option v-for="u in item.unit" :key="u" :label="u" :value="u"></fe-option>
      </fe-select>
    </fe-col>
  </fe-row>
</template>

<script lang="ts">
// Components
import PreviewRadio from './PreviewRadio.vue';

// Hooks
import { useChangeStyle } from '@/hooks/useChangeStyle';

// Types
import { PresetType, StyleDto } from '@/types/dto';

// Utils
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: { PreviewRadio },
  props: {
    item: { type: Object as PropType<StyleDto>, required: true },
  },
  setup() {
    const { selectUnit, changeProp, changeStyle } = useChangeStyle();

    const changeHandler = (val: string | any, name: string, from: string = 'style') => {
      if (from === 'style') return changeStyle(val, name);
      return changeProp(val, name);
    };

    const shouldPreview = (preset: (string | number | StyleDto | PresetType)[] | undefined) => typeof preset?.[0] === 'object';

    return {
      selectUnit,
      changeHandler,
      shouldPreview,
    };
  },
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
