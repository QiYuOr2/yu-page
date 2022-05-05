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

type UIConfig = {
  dragStart: boolean;
};

type StoreState = {
  pageConfig: PageConfig;
  editConfig: EditConfig;
  uiConfig: UIConfig;
  isFromPreview: boolean;
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

      uiConfig: {
        dragStart: false,
      },

      isFromPreview: false,
    } as StoreState),

  actions: {
    updatePageConfig({ userSelectComponents, components, config }: PageConfig) {
      this.pageConfig = { userSelectComponents, components, config };
    },
    updateEditConfig({ currentIndex }: EditConfig) {
      this.editConfig = { currentIndex };
    },
    updateDragStart(event: DragEvent, value: boolean, data?: any) {
      this.uiConfig.dragStart = value;
      data && event.dataTransfer?.setData('text/plain', JSON.stringify(data));
    },

    setIsFromPreview(value: boolean) {
      this.isFromPreview = value;
    },
  },
});
