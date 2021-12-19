<template>
  <div class="workbench">
    <div
      v-for="item in componentList"
      :class="['choose-wrapper', { active: activeId === item.id }]"
      :key="item.id"
      @click="choose($event, item.id)"
    >
      <div :style="`text-align: ${getAlign(item.id)}`">
        <component :is="item.name" v-bind="{ style: mergeStyle(transferStyle(item.styles), item.props.type) }">
          {{ item?.props?.inner?.val || '' }}
        </component>
      </div>
      <div v-if="activeId === item.id" class="operations">
        <div class="operations-item" @click="moveUpHandler">
          <chevronUp />
          <span>上移</span>
        </div>
        <div class="operations-item" @click="moveDownHandler">
          <chevronDown />
          <span>下移</span>
        </div>
        <div class="operations-item" @click="removeHandler">
          <trash2 style="transform: scale(0.8)" />
          <span>删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { transferStyle } from '@/hooks/useCommonStyles';
import { useEditorComponents } from '@/hooks/useEditorComponents';
import useStore from '@/store';
import { Schema } from '@/types';
import { reduce } from 'lodash';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    componentList: {
      type: Object as PropType<Schema[]>,
    },
  },
  setup() {
    const { activeId, setActiveId } = useStore();
    const { removeComponent, moveComponent, getComponent } = useEditorComponents();

    const choose = (e: MouseEvent, id: string) => {
      e.stopPropagation();
      setActiveId(id);
    };

    const removeHandler = () => {
      removeComponent(activeId.value);
    };

    const moveUpHandler = () => {
      moveComponent(activeId.value, 'up');
    };

    const moveDownHandler = () => {
      moveComponent(activeId.value, 'down');
    };

    // TODO 类型或许会完善
    const mergeStyle = (styles: Record<string, string>, type?: { preset: any[]; val: string }) => {
      if (type) {
        const presetStyles = type.preset.filter((p: { name: string }) => p.name === type.val)[0].styles;
        const formattedPresetStyles = reduce<string, Record<string, string>>(
          Object.keys(presetStyles),
          (total, styleKey) => {
            const v = presetStyles[styleKey];
            total[styleKey] = v.join('');
            return total;
          },
          {}
        );
        return { ...formattedPresetStyles, ...styles };
      }
      return styles;
    };

    const getAlign = (schemaId: string) => {
      const { props } = getComponent(schemaId);
      return props.align?.val || 'center';
    };

    return { choose, activeId, transferStyle, mergeStyle, removeHandler, moveUpHandler, moveDownHandler, getAlign };
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
      border: 1px solid var(--x-color-primary);
    }
  }
  .operations {
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.2);

    transform: translateX(calc(100% - 1px));
    transition: all 0.3s;
    &-item {
      display: flex;
      align-items: center;

      background: var(--x-color-primary);
      padding: 4px;

      color: #fff;
      transition: all 0.3s;
      > * {
        width: 20px;
        height: 20px;
        stroke: #fff;
      }
      > span {
        width: 0;
        overflow: hidden;
        font-size: 14px;
        text-align: center;
      }

      &:hover {
        transition: all 0.3s;
        background: var(--x-color-primary-opacity);
      }
    }
    &:hover span {
      transition: all 0.3s;
      width: 2.5rem;
    }
  }
}
</style>
