import { Schema } from '@/types';
import { StyleDto } from '@/types/dto';
import { cloneDeep, filter, map } from 'lodash';
import { cloneStyles, useCommonStyle as _useCommonStyle } from './useCommonStyles';
import useStore from './useStore';

export function useEditorComponents() {
  const { componentList, commonStyles } = useStore();

  const addComponent = (schema: Omit<Schema, 'id'>) => {
    const openSchema = (schema as any).value ? (schema as any).value : schema;
    schema.styles = cloneStyles(commonStyles.value, openSchema.commonStyleKeys) as Record<string, StyleDto>;
    componentList.value.push(cloneDeep({ id: String(Date.now()), ...openSchema }));
  };

  const removeComponent = (schemaId: string) => {
    componentList.value = filter(componentList.value, (component) => component.id !== schemaId);
  };

  const getComponent = (schemaId: string) => {
    return filter(componentList.value, (component) => component.id === schemaId)[0];
  };

  const setComponentStyle = (schemaId: string, styles: Record<string, StyleDto>) => {
    componentList.value = map(componentList.value, (component) =>
      component.id === schemaId ? { ...component, styles } : component
    );
  };

  const setComponentProp = (schemaId: string, props: Record<string, StyleDto>) => {
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
