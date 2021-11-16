import { filter, map } from 'lodash';
import { cloneStyles, RawStyle, StyleKey, useCommonStyle as _useCommonStyle } from './useCommonStyles';
import useStore, { Schema } from './useStore';

export function useEditorComponents() {
  const { componentList, activeId } = useStore();

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

  const setComponentProp = (schemaId: string, props: Record<string, RawStyle>) => {
    componentList.value = map(componentList.value, (component) =>
      component.id === schemaId ? { ...component, props } : component
    );
  };

  return {
    componentList,
    addComponent,
    getComponent,
    removeComponent,
    setComponentStyle,
    setComponentProp,
  };
}
