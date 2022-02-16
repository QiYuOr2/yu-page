<template>
  <fe-form-item :label="attributes.title">
    <fe-input v-model="data" :placeholder="attributes.description" :type="attributes.type" />
  </fe-form-item>
</template>

<script lang="ts">
import { SET_FORM_DATA_KEY } from '@/common/constants';
import { defineComponent, inject, ref, watch } from 'vue';

export default defineComponent({
  name: 'r-input',
  props: {
    attributes: Object,
  },
  setup(props) {
    const data = ref(props.attributes?.type === 'number' ? 0 : '');

    const setFormData = inject<(key: string, value: any) => void>(SET_FORM_DATA_KEY);

    watch(data, (value) => {
      setFormData?.(props.attributes?.key, value);
    });

    return { data };
  },
});
</script>

<style lang="less" scoped>
.t {
  color: red;
}
</style>
