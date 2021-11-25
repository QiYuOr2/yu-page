import { Schema } from '@/types';
import { StyleDto } from '@/types/dto';
import { cloneDeep, filter, find, indexOf, map } from 'lodash';
import { cloneStyles, useCommonStyle as _useCommonStyle } from './useCommonStyles';
import useStore from '@/store';

export function useEditorComponents() {
  const { componentList, setComponentList, insertComponentList, commonStyles } = useStore();

  const addComponent = (schema: Omit<Schema, 'id'>) => {
    const openSchema = (schema as any).value ? (schema as any).value : schema;
    schema.styles = cloneStyles(commonStyles.value, openSchema.commonStyleKeys) as Record<string, StyleDto>;
    setComponentList(cloneDeep({ id: String(Date.now()), ...openSchema }) as Schema);
  };

  const removeComponent = (schemaId: string): [number, Schema | undefined] => {
    let index = -1;
    let removedComponent;
    setComponentList(
      filter(componentList.value, (component, i) => {
        if (component.id === schemaId) {
          index = i;
          removedComponent = component;
        }
        return component.id !== schemaId;
      })
    );
    return [index, removedComponent];
  };

  const getComponent = (schemaId: string) => {
    return filter(componentList.value, (component) => component.id === schemaId)[0];
  };

  const moveComponent = (schemaId: string, direction: 'up' | 'down') => {
    const [index, component] = removeComponent(schemaId);
    component && insertComponentList(component, direction === 'up' ? index - 1 : index + 1);
  };

  const setComponentStyle = (schemaId: string, styles: Record<string, StyleDto>) => {
    setComponentList(map(componentList.value, (component) => (component.id === schemaId ? { ...component, styles } : component)));
  };

  const setComponentProp = (schemaId: string, props: Record<string, StyleDto>) => {
    setComponentList(map(componentList.value, (component) => (component.id === schemaId ? { ...component, props } : component)));
  };

  return {
    componentList,
    addComponent,
    getComponent,
    removeComponent,
    moveComponent,
    setComponentStyle,
    setComponentProp,
  };
}
