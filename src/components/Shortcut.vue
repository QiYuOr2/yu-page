<template>
  <div class="shortcut">
    <component :is="iconName" size="16"></component>
    <div class="title">按钮</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const iconName = 'triangle';

    return { iconName };
  },
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
  border-radius: 2px;

  cursor: pointer;
  .title {
    margin-top: 8px;
    font-size: 14px;
  }
}
</style>
