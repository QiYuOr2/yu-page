<template>
  <fe-form label-position="top">
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
import Input from './components/input.vue';
import { FORM_DATA_KEY, SET_FORM_DATA_KEY } from './common/constants';

const ComponentsName = {
  INPUT: 'r-input',
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
    [Input.name]: Input,
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
        if (FormItemType.INPUT.includes(currentItem.type)) {
          formData[key] = val || InitData[currentItem.type];
          return { ...currentItem, component: ComponentsName.INPUT, key, value: val };
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
