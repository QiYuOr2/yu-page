// TODO 如何区分是哪个组件的样式，这个玩意可能没用

import { reactive } from 'vue';
import { cloneDeep, reduce, includes } from 'lodash';

const linkPxUnitList = ['px', 'em'];

const commonStyle = {
  width: { name: 'width', label: '宽', val: 40, unit: linkPxUnitList, selectUnitIdx: 0 },
  height: { name: 'height', label: '高', val: 40, unit: linkPxUnitList, selectUnitIdx: 0 },
  color: { name: 'color', label: '字体颜色', val: '#000000', type: 'color' },
  background: {
    name: 'background',
    label: '背景',
    children: {
      color: { name: 'background-color', label: '颜色', val: '#ffffff', type: 'color' },
    },
  },
  padding: {
    name: 'padding',
    label: '内边距',
    children: {
      top: { name: 'padding-top', label: '上', val: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      bottom: { name: 'padding-bottom', label: '下', val: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      left: { name: 'padding-left', label: '左', val: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      right: { name: 'padding-right', label: '右', val: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
    },
  },
  margin: {
    name: 'margin',
    label: '外边距',
    children: {
      top: { name: 'margin-top', label: '上', val: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      bottom: { name: 'margin-bottom', label: '下', val: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      left: { name: 'margin-left', label: '左', val: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      right: { name: 'margin-right', label: '右', val: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
    },
  },
  border: {
    name: 'border',
    label: '边框',
    children: {
      top: { name: 'border-top', label: '上', val: 1, unit: linkPxUnitList, selectUnitIdx: 0 },
      bottom: { name: 'border-bottom', label: '下', val: 1, unit: linkPxUnitList, selectUnitIdx: 0 },
      left: { name: 'border-left', label: '左', val: 1, unit: linkPxUnitList, selectUnitIdx: 0 },
      right: { name: 'border-right', label: '右', val: 1, unit: linkPxUnitList, selectUnitIdx: 0 },
      color: { name: 'border-color', label: '颜色', val: '#999999', type: 'color' },
      style: { name: 'border-style', label: '样式', preset: ['solid'], val: 'solid' },
    },
  },
};

//#region 屁用都没的类型体操
export type RawStyle = {
  name: string;
  label: string;
  preset?: Array<string | number | boolean>;
  val?: string | number | boolean;
  finialType?: string | number | boolean;
  unit?: Array<string>;
  selectUnitIdx?: number | string;
  type?: string;
  from?: string;
  children?: {
    [K: string]: RawStyle;
  };
};

type Style = typeof commonStyle;
export type StyleKey = keyof Style;
//#endregion

export function useCommonStyle(incomeStyles: Record<string, RawStyle>) {
  const styles = reactive(incomeStyles);
  const setStyle = (name: string, value: string | number | boolean) => {
    if (name.indexOf('-') !== -1) {
      const [mainKey, subKey] = name.split('-');
      (styles as any)[mainKey].children[subKey].val = value;
      return;
    }
    (styles as any)[name].val = value;
  };

  const setUnit = (name: string, value: number) => {
    if (name.indexOf('-') !== -1) {
      const [mainKey, subKey] = name.split('-');
      (styles as any)[mainKey].children[subKey].selectUnitIdx = value;
      return;
    }
    (styles as any)[name].selectUnitIdx = value;
  };

  return {
    styles,
    setStyle,
    setUnit,
  };
}

export function transferStyle(styles: Record<string, RawStyle>) {
  const getUnit = (style: RawStyle) => style.unit?.[Number(style.selectUnitIdx)];
  if (!styles) {
    return '';
  }
  return Object.keys(styles)
    .map((styleKey) => {
      const style = styles[styleKey];
      if (!style) {
        return '';
      }
      if (!style.children) {
        const unit = getUnit(style);
        return `${style.name}: ${style.val}${unit ?? ''}`;
      }
      return Object.keys(style.children).map((childStyleKey) => {
        const currentStyle = style.children?.[childStyleKey];
        if (!currentStyle) {
          return '';
        }
        const unit = getUnit(currentStyle);
        return `${currentStyle.name}: ${currentStyle.val}${unit ?? ''}`;
      });
    })
    .flat()
    .join(';');
}

/**
 * 拷贝一份通用样式
 * @param keys 要获取的样式
 * @returns
 */
export function cloneStyles(keys?: StyleKey[]): Partial<Style> {
  return cloneDeep(
    keys
      ? reduce(
          Object.keys(commonStyle) as StyleKey[],
          (result, curr) => {
            if (includes(keys, curr)) {
              (result as any)[curr] = commonStyle[curr];
            }
            return result;
          },
          {}
        )
      : commonStyle
  );
}
