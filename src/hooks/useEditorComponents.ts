import { reactive, Ref } from 'vue';
import { filter, map } from 'lodash';
import { cloneStyles, RawStyle, StyleKey, useCommonStyle as _useCommonStyle } from './useCommonStyles';

export type Schema = {
  id: string;
  name: string;
  label: string;
  commonStyleKeys: StyleKey[];
  styles: Record<string, RawStyle>;
  props: Record<string, RawStyle>;
};

export function useEditorComponents() {
  const componentList = reactive<{ value: Schema[] }>({ value: [] });

  const addComponent = (schema: Omit<Schema, 'id'>) => {
    const openSchema = (schema as any).value ? (schema as any).value : schema;
    schema.styles = cloneStyles(openSchema.commonStyleKeys) as Record<string, RawStyle>;
    componentList.value.push({ id: String(Date.now()), ...openSchema });
  };

  const removeComponent = (schemaId: string) => {
    componentList.value = filter(componentList.value, (component) => component.id !== schemaId);
  };

  const getComponent = (schemaId: string) => {
    return filter(componentList.value, (component) => component.id === schemaId)[0];
  };

  const setComponentStyle = (schemaId: string, styles: Record<string, RawStyle>) => {
    componentList.value = map(componentList.value, (component) =>
      component.id === schemaId ? { ...component, styles } : component
    );
  };

  const useCommonStyle = (schemaId: string) => {
    const currComponent = getComponent(schemaId);
    const { styles, setStyle, setUnit } = _useCommonStyle(currComponent.styles);
    setComponentStyle(schemaId, styles);
    return { setStyle, setUnit };
  };

  return {
    componentList,
    addComponent,
    getComponent,
    removeComponent,
    useCommonStyle,
  };
}
