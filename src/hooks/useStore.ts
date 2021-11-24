import { ref, reactive } from 'vue';
import { RawStyle } from './useCommonStyles';

export type Schema = {
  id: string;
  name: string;
  label: string;
  commonStyleKeys: string[];
  styles: Record<string, RawStyle>;
  props: Record<string, RawStyle>;
};

function createContext() {
  const activeId = ref('');
  const componentList = reactive<{ value: Schema[] }>({ value: [] });

  return () => ({ activeId, componentList });
}

export default createContext();
