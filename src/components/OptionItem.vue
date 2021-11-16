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
      <div class="custom-option-wrapper" v-else-if="item.type === 'color'">
        <div class="custom-option-label">{{ item.label }}</div>
        <input class="field" type="color" :value="item.val" @change="changeHandler($event, item.name, item.from)" />
      </div>
      <div class="custom-option-wrapper" v-else>
        <div class="custom-option-label">{{ item.label }}</div>
        <fe-select size="small" :value="String(item.val)" @change="changeHandler($event, item.name, item.from)">
          <fe-option v-for="(p, pIdx) in item.preset" :key="pIdx" :label="p" :value="String(p)"></fe-option>
        </fe-select>
      </div>
    </fe-col>
    <fe-col v-if="item.unit" span="8" style="text-align: right">
      <fe-select size="small" style="min-width: 60px" :value="String(item.selectUnitIdx)" @change="selectUnit($event, item.name)">
        <fe-option v-for="(u, uIdx) in item.unit" :key="uIdx" :label="u" :value="String(uIdx)"></fe-option>
      </fe-select>
    </fe-col>
  </fe-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { RawStyle, useCommonStyle } from '@/hooks/useCommonStyles';
import { useEditorComponents } from '@/hooks/useEditorComponents';
import useStore from '@/hooks/useStore';

export default defineComponent({
  props: {
    item: { type: Object as PropType<RawStyle>, required: true },
  },
  setup() {
    const { activeId } = useStore();
    const { getComponent, setComponentStyle, setComponentProp } = useEditorComponents();

    const selectUnit = (val: string, name: string) => {
      const { styles, setUnit } = useCommonStyle(getComponent(activeId.value).styles);
      setUnit(name, Number(val));
      setComponentStyle(activeId.value, styles);
    };

    const changeStyle = (val: string | any, name: string) => {
      const { styles, setStyle } = useCommonStyle(getComponent(activeId.value).styles);
      if (typeof val === 'string') {
        setStyle(name, val);
        setComponentStyle(activeId.value, styles);
        return;
      }
      setStyle(name, val.target.value);
      setComponentStyle(activeId.value, styles);
    };

    const changeProp = (val: string, name: string) => {
      const { styles, setStyle } = useCommonStyle(getComponent(activeId.value).props);
      setStyle(name, val);
      setComponentProp(activeId.value, styles);
    };

    const changeHandler = (val: string | any, name: string, from: string = 'style') => {
      if (from === 'style') return changeStyle(val, name);
      return changeProp(val, name);
    };

    return {
      selectUnit,
      changeHandler,
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
