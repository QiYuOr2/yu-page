<template>
  <div class="shortcut">
    <component :is="icon" size="16"></component>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: { title: String, icon: String },
  setup() {},
});
</script>

<style lang="less" scoped>
.shortcut {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 80px;
  border: 1px solid var(--accents-2);
  border-color: var(--accents-2);
  border-radius: 2px;

  cursor: pointer;
  transition: border-color 0.3s;
  .title {
    margin-top: 8px;
    font-size: 14px;
  }

  &:hover {
    border-color: var(--x-color-primary);
    transition: border-color 0.3s;
  }
}
</style>
