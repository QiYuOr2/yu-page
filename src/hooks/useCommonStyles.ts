import { reactive, provide, inject } from 'vue';

// const commonStylesSymbol = Symbol();

const linkPxUnitList = ['px'];

const commonStyle = {
  width: { name: 'width', label: '宽', preset: 40, unit: linkPxUnitList, selectUnitIdx: 0, finialType: '' },
  height: { name: 'height', label: '高', preset: 40, unit: linkPxUnitList, selectUnitIdx: 0, finialType: '' },
  padding: {
    name: 'padding',
    label: '内边距',
    finialType: '',
    children: {
      top: { name: 'pt', label: '上', preset: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      bottom: { name: 'pb', label: '下', preset: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      left: { name: 'pl', label: '左', preset: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      right: { name: 'pr', label: '右', preset: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
    },
  },
  margin: {
    name: 'margin',
    label: '外边距',
    finialType: '',
    children: {
      top: { name: 'mt', label: '上', preset: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      bottom: { name: 'mb', label: '下', preset: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      left: { name: 'ml', label: '左', preset: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
      right: { name: 'mr', label: '右', preset: 10, unit: linkPxUnitList, selectUnitIdx: 0 },
    },
  },
};

//#region 屁用都没的类型体操
export type RawStyle<T> = {
  name: string;
  label: string;
  preset?: string | number | boolean;
  finialType?: T;
  unit?: Array<string>;
  selectUnitIdx?: number;
  children?: {
    [K: string]: RawStyle<T>;
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

  return {
    styles,
    setStyle,
    setUnit,
  };
}
