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
  const componentList = reactive<{ value: Schema[] }>({ value: [] });

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
    activeId,
    componentList,
    commonStyles: computed(() => commonStyles.value),
    setCommonStylesAction,
  });
}

export default createContext();
