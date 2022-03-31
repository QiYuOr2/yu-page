<template>
  <div :class="['yu-section']">
    <p :style="`font-size: ${obj.fontSize}`">
      {{ obj.text }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.yu-section {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.6rem;
  background: #f5f5f5;
  p {
    margin: 0;
    padding: 0.3rem 0.4rem;
    background: #fff;
    color: #666666;
  }
}
</style>
