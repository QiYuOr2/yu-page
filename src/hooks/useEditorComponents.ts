import { reactive } from 'vue';
import { RawStyle } from './useCommonStyles';

type Schema = {
  name: string;
  label: string;
  commonStyleKeys: string[];
  styles: Record<string, RawStyle>;
  props: Record<string, RawStyle>;
};

export function useEditorComponents() {
  const componentList = reactive<Schema[]>([]);

  const addComponent = (schema: Schema) => componentList.push(schema);

  return {
    componentList,
    addComponent,
  };
}
