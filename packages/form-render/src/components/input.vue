<template>
  <fe-form-item :label="attributes.title">
    <fe-input
      :value="data"
      @change="handler"
      :placeholder="attributes.description"
      :type="attributes.type"
    />
  </fe-form-item>
</template>

<script lang="ts">
import { FORM_DATA_KEY, SET_FORM_DATA_KEY } from '@/common/constants';
import { computed, defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'r-input',
  props: {
    attributes: Object,
  },
  setup(props) {
    const formData = inject<Record<string, any>>(FORM_DATA_KEY);
    const setFormData = inject<(key: string, value: any) => void>(SET_FORM_DATA_KEY);
    const data = computed(() => formData?.[props.attributes?.key]);

    const handler = (event: any) => {
      setFormData?.(props.attributes?.key, event.target.value);
    };

    return { data, handler };
  },
});
</script>

<style lang="less" scoped>
.t {
  color: red;
}
</style>
