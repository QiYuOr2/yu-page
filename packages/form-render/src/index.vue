<template>
  <fe-form label-position="top">
    <r-input />
  </fe-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from './components/input.vue';

export default defineComponent({
  name: 'form-render',
  components: {
    [Input.name]: Input,
  },
  setup() {},
});
</script>

<style lang="less" scoped></style>
