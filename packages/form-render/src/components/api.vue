<template>
  <fe-form-item :label="attributes.title">
    <fe-input
      :value="data"
      @change="handler"
      :placeholder="attributes.placeholder"
      :type="attributes.type"
      width="100%"
    />
    <div class="r-api__example">
      <div style="margin-top: 10px">响应示例</div>
      <code>
        <pre>{{ attributes.example }}</pre>
      </code>
    </div>
  </fe-form-item>
</template>

<script lang="ts">
import { FORM_DATA_KEY, SET_FORM_DATA_KEY } from '@/common/constants';
import { computed, defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'r-api',
  props: {
    attributes: Object,
  },
  setup(props) {
    const formData = inject<Record<string, any>>(FORM_DATA_KEY);
    const setFormData =
      inject<(key: string, value: any) => void>(SET_FORM_DATA_KEY);
    const data = computed(() => formData?.[props.attributes?.key]);

    const handler = (event: any) => {
      setFormData?.(props.attributes?.key, event.target.value);
    };

    return { data, handler };
  },
});
</script>

<style lang="less" scoped>
.r-api {
  &__example {
    code {
      pre {
        margin: 0;
        font-size: 10px;
        color: #222;
      }
    }
  }
}
</style>
