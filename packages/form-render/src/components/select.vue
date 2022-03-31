<template>
  <fe-form-item :label="attributes.title">
    <fe-select v-model="data">
      <fe-option
        v-for="(item, $i) in attributes.enum"
        :key="$i"
        :label="item.label"
        :value="item.value"
        @click="handler(item.value)"
      />
    </fe-select>
  </fe-form-item>
</template>

<script lang="ts">
import { FORM_DATA_KEY, SET_FORM_DATA_KEY } from '@/common/constants';
import { computed, defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'r-select',
  props: {
    attributes: Object,
  },
  setup(props) {
    const formData = inject<Record<string, any>>(FORM_DATA_KEY);
    const setFormData = inject<(key: string, value: any) => void>(SET_FORM_DATA_KEY);
    const data = computed(() => formData?.[props.attributes?.key]);

    const handler = (val: string) => {
      setFormData?.(props.attributes?.key, val);
    };

    return { data, handler };
  },
});
</script>

<style lang="less" scoped>
.r-select {
}
</style>
