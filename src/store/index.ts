// Requests
import { fetchCommonStyles } from '@/api';

// Types
import { Schema } from '@/types';
import { StyleDto } from '@/types/dto';

// Utils
import { ref, reactive, computed } from 'vue';
import { reduce } from 'lodash';

function createContext() {
  const activeId = ref('');
  const setActiveId = (val: string) => {
    activeId.value = val;
  };

  //#region workbench内活动的组件
  const componentList = reactive<{ value: Schema[] }>({ value: [] });
  const setComponentList = (val: Schema | Schema[] | (() => Schema[])) => {
    if (Array.isArray(val)) {
      componentList.value = val;
      return;
    }
    if (typeof val === 'function') {
      componentList.value = val();
      return;
    }
    componentList.value.push(val);
  };
  const insertComponentList = (val: Schema, index: number) => {
    componentList.value.splice(index, 0, val);
  };
  //#endregion

  const commonStyles = reactive<{ value: Record<string, StyleDto> }>({ value: {} });

  const setCommonStyles = (styles: Record<string, StyleDto>) => {
    commonStyles.value = styles;
  };

  const setCommonStylesAction = async () => {
    const { status, result } = await fetchCommonStyles();
    if (status.code === 0) {
      const resultStyles = reduce<StyleDto, Record<string, StyleDto>>(
        result.data,
        (total, curr) => {
          total[curr.name] = curr;
          return total;
        },
        {}
      );
      setCommonStyles(resultStyles);
    }
  };

  return () => ({
    activeId: computed(() => activeId.value),
    setActiveId,
    componentList: computed(() => componentList.value),
    setComponentList,
    insertComponentList,
    commonStyles: computed(() => commonStyles.value),
    setCommonStylesAction,
  });
}

export default createContext();
