<template>
  <fe-form-item label="测试">
    <fe-input placeholder="一个基础的示例" type="number" />
  </fe-form-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'r-input',
  setup() {},
});
</script>

<style lang="less" scoped>
.t {
  color: red;
}
</style>
