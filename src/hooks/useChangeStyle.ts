import useStore from '@/store';
import { useCommonStyle } from './useCommonStyles';
import { useEditorComponents } from './useEditorComponents';

export function useChangeStyle() {
  const { activeId } = useStore();
  const { getComponent, setComponentProp, setComponentStyle } = useEditorComponents();

  const selectUnit = (val: string, name: string) => {
    const { styles, setUnit } = useCommonStyle(getComponent(activeId.value).styles);
    setUnit(name, val);
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

  return { selectUnit, changeStyle, changeProp };
}
