<template>
  <div :class="['yu-alert', `yu-alert--${obj.color}`]">{{ obj.text }}</div>
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
.yu-alert {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 0 10px;
  line-height: 32px;
  font-size: 0.5rem;

  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  &--yellow {
    background: #fffbe7;
    border: 1px solid #f49c27;
    color: #f49c27;
  }
}
</style>
