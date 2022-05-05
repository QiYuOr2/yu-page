<template>
  <fe-form label-position="top" @submit.prevent="">
    <component
      v-for="(item, $i) in formItemList"
      :is="item.component"
      :key="$i"
      :attributes="item"
    ></component>
  </fe-form>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive } from 'vue';
import RInput from './components/input.vue';
import RImageRadio from './components/image-radio.vue';
import RRadio from './components/radio.vue';
import RSelect from './components/select.vue';
import { FORM_DATA_KEY, SET_FORM_DATA_KEY } from './common/constants';

// ui -> component映射
const ComponentsName: Record<string, string> = {
  INPUT: 'r-input',
  IMAGE_RADIO: 'r-image-radio',
  'image-radio': 'r-image-radio',
  RADIO: 'r-radio',
  radio: 'r-radio',
  SELECT: 'r-select',
  select: 'r-select',
};

const FormItemType = {
  INPUT: ['string', 'number'],
};

const InitData: Record<string, any> = {
  string: '',
  number: 0,
};

export default defineComponent({
  name: 'form-render',
  components: {
    [RInput.name]: RInput,
    [RImageRadio.name]: RImageRadio,
    [RRadio.name]: RRadio,
    [RSelect.name]: RSelect,
  },
  props: {
    itemData: Object,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const formData = reactive<Record<string, any>>({});

    const setFormData = (key: string, value: any) => {
      formData[key] = value;
      emit('change', formData);
    };
    provide(FORM_DATA_KEY, formData);
    provide(SET_FORM_DATA_KEY, setFormData);

    const formItemList = computed(() => {
      const list = props?.itemData?.schema?.properties ?? [];

      return Object.keys(list).map((key) => {
        const currentItem = list[key];
        const val = props?.itemData?.props?.[key];

        // 特殊处理
        // enum -> radio / select 根据ui选择
        if (currentItem.enum) {
          formData[key] = val || InitData[currentItem.type];

          const currComponent = ComponentsName[currentItem.ui];

          return { ...currentItem, component: currComponent, key, value: val };
        }

        // 无特殊处理的 type=string,number 转化为input
        if (FormItemType.INPUT.includes(currentItem.type)) {
          formData[key] = val || InitData[currentItem.type];
          return {
            ...currentItem,
            component: ComponentsName.INPUT,
            key,
            value: val,
          };
        }
        return { ...currentItem, component: 'span', key, val };
      });
    });

    return {
      formItemList,
    };
  },
});
</script>

<style lang="less" scoped></style>
