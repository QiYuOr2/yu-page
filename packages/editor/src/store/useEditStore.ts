import { STATE } from '@/common/constants';
import { defineStore } from 'pinia';

type EditConfig = {
  currentIndex: number;
};

export const useEditStore = defineStore(STATE.EDIT, {
  state: () => ({
    editConfig: {
      currentIndex: -1,
    },
  }),

  actions: {
    updateEditConfig(config: EditConfig) {
      this.editConfig = { ...config };
    },
  },
});
