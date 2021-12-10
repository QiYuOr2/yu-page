// TODO 如何区分是哪个组件的样式，这个玩意可能没用

import { reactive } from 'vue';
import { cloneDeep, reduce, includes } from 'lodash';
import { StyleDto } from '@/types/dto';

type CommonStyle = Record<string, StyleDto>;

export function useCommonStyle(incomeStyles: CommonStyle) {
  const styles = reactive(incomeStyles);
  const setStyle = (name: string, value: string | number | boolean) => {
    if ((styles as any)[name]) {
      (styles as any)[name].val = value;
      return;
    }
    if (name.indexOf('-') !== -1) {
      const [mainKey, subKey] = name.split('-');
      (styles as any)[mainKey].children[subKey].val = value;
      return;
    }
    (styles as any)[name].val = value;
  };

  const setUnit = (name: string, value: string) => {
    if ((styles as any)[name]) {
      (styles as any)[name].selectUnit = value;
      return;
    }
    if (name.indexOf('-') !== -1) {
      const [mainKey, subKey] = name.split('-');
      (styles as any)[mainKey].children[subKey].selectUnit = value;
      return;
    }
    (styles as any)[name].selectUnit = value;
  };

  return {
    styles,
    setStyle,
    setUnit,
  };
}

export function transferStyle(styles: CommonStyle) {
  const getUnit = (style: StyleDto) => style.selectUnit;
  if (!styles) {
    return {};
  }
  return reduce<string, Record<string, string>>(
    Object.keys(styles),
    (total, styleKey) => {
      const style = styles[styleKey];
      if (!style) {
        return total;
      }
      if (!style.children) {
        const unit = getUnit(style);
        if (style.val) {
          total[style.name] = `${style.val}${unit ?? ''}`;
        }
        return total;
      }
      Object.keys(style.children).forEach((childStyleKey) => {
        const currentStyle = style.children?.[childStyleKey];
        if (currentStyle && currentStyle.val) {
          const unit = getUnit(currentStyle);
          total[currentStyle.name] = `${currentStyle.val}${unit ?? ''}`;
        }
      });
      return total;
    },
    {}
  );
}

/**
 * 拷贝一份通用样式
 * @param keys 要获取的样式
 * @returns
 */
export function cloneStyles(source: CommonStyle, keys?: string[]): CommonStyle {
  return cloneDeep(
    keys
      ? reduce<string, CommonStyle>(
          Object.keys(source),
          (result, curr) => {
            if (includes(keys, curr)) {
              result[curr] = source[curr];
            }
            return result;
          },
          {}
        )
      : source
  );
}
