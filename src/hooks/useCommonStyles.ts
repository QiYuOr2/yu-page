// TODO 如何区分是哪个组件的样式，这个玩意可能没用

import { reactive } from 'vue';
import { cloneDeep, reduce, includes } from 'lodash';

const linkPxUnitList = ['px'];

const commonStyle = {
  width: { name: 'width', label: '宽', defaultVal: 40, unit: linkPxUnitList, selectUnitIdx: 0, finialType: '' },
  height: { name: 'height', label: '高', defaultVal: 40, unit: linkPxUnitList, selectUnitIdx: 0, finialType: '' },
  padding: {
    name: 'padding',
    label: '内边距',
    finialType: '',
    children: {
      top: { name: 'pt', label: '上', defaultVal: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      bottom: { name: 'pb', label: '下', defaultVal: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      left: { name: 'pl', label: '左', defaultVal: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      right: { name: 'pr', label: '右', defaultVal: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
    },
  },
  margin: {
    name: 'margin',
    label: '外边距',
    finialType: '',
    children: {
      top: { name: 'mt', label: '上', defaultVal: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      bottom: { name: 'mb', label: '下', defaultVal: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      left: { name: 'ml', label: '左', defaultVal: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      right: { name: 'mr', label: '右', defaultVal: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
    },
  },
  border: {
    name: 'border',
    label: '边框',
    finialType: '',
    children: {
      top: { name: 'bt', label: '上', defaultVal: 1, unit: linkPxUnitList, selectUnitIdx: 0 },
      bottom: { name: 'bb', label: '下', defaultVal: 1, unit: linkPxUnitList, selectUnitIdx: 0 },
      left: { name: 'bl', label: '左', defaultVal: 1, unit: linkPxUnitList, selectUnitIdx: 0 },
      right: { name: 'br', label: '右', defaultVal: 1, unit: linkPxUnitList, selectUnitIdx: 0 },
      color: { name: 'bc', label: '颜色', defaultVal: '#999999', type: 'color' },
    },
  },
};

//#region 屁用都没的类型体操
export type RawStyle = {
  name: string;
  label: string;
  preset?: Array<string | number | boolean>;
  defaultVal?: string | number | boolean;
  finialType?: string | number | boolean;
  unit?: Array<string>;
  selectUnitIdx?: number;
  type?: string;
  children?: {
    [K: string]: RawStyle;
  };
};

type Style = typeof commonStyle;
type StyleKey = keyof Style;
type ChildrenKey<T extends StyleKey> = 'children' extends keyof Style[T] ? keyof Style[T]['children'] : StyleKey;
type HasChildrenStyleKey = 'margin' | 'padding';

type SetStyleKey<T> = T extends HasChildrenStyleKey
  ? `${T}-${ChildrenKey<T> extends string ? ChildrenKey<T> : ''}`
  : keyof Omit<Style, HasChildrenStyleKey>;
//#endregion

export function useCommonStyle() {
  const styles = reactive(commonStyle);

  const setStyle = <K extends StyleKey>(name: SetStyleKey<K>, value: Style[K]['finialType']) => {
    if (name.indexOf('-') !== -1) {
      const [mainKey, subKey] = name.split('-');
      (styles as any)[mainKey].children[subKey].val = value;
      return;
    }
    (styles as any)[name].val = value;
  };

  const setUnit = <K extends StyleKey>(name: SetStyleKey<K>, value: number) => {
    if (name.indexOf('-') !== -1) {
      const [mainKey, subKey] = name.split('-');
      (styles as any)[mainKey].children[subKey].selectUnitIdx = value;
      return;
    }
    (styles as any)[name].selectUnitIdx = value;
  };

  const getStyles = (keys: StyleKey[]): Partial<Style> => {
    return cloneDeep(
      reduce(
        Object.keys(styles) as StyleKey[],
        (result, curr) => {
          if (includes(keys, curr)) {
            (result as any)[curr] = styles[curr];
          }
          return result;
        },
        {}
      )
    );
  };

  return {
    styles,
    getStyles,
    setStyle,
    setUnit,
  };
}
