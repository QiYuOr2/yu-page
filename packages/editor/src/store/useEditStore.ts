import { STATE } from '@/common/constants';
import { defineStore } from 'pinia';

type EditConfig = {
  currentIndex: number;
};

type PageConfig = {
  userSelectComponents: any[];
  components: any[];
  config: any;
};

type StoreState = {
  pageConfig: PageConfig;
  editConfig: EditConfig;
};

export const useEditStore = defineStore(STATE.EDIT, {
  state: () =>
    ({
      pageConfig: {
        userSelectComponents: [],
        components: [],
        config: {},
      },
      editConfig: {
        currentIndex: -1,
      },
    } as StoreState),

  actions: {
    updatePageConfig({ userSelectComponents, components, config }: PageConfig) {
      this.pageConfig = { userSelectComponents, components, config };
    },
    updateEditConfig({ currentIndex }: EditConfig) {
      this.editConfig = { currentIndex };
    },
  },
});
