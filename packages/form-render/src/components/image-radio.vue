<template>
  <fe-form-item :label="attributes.title">
    <fe-radio-group v-model="data">
      <fe-radio
        v-for="(item, $i) in attributes.enum"
        :key="$i"
        :value="item.value"
        @click="handler(item.value)"
      >
        <div class="r-image-radio__image">
          <fe-image :src="item.label" />
        </div>
      </fe-radio>
    </fe-radio-group>
  </fe-form-item>
</template>

<script lang="ts">
import { FORM_DATA_KEY, SET_FORM_DATA_KEY } from '@/common/constants';
import { computed, defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'r-image-radio',
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
.r-image-radio {
  &__image {
    max-width: 100px;
    /deep/ .fect-image {
      border-radius: 0;
    }
  }
}
</style>
