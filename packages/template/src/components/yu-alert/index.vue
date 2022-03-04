<template>
  <div :class="['yu-alert', `yu-alert--${obj.color}`]">
    <volume2 class="icon" size="14" />
    {{ obj.text }}
  </div>
</template>

<script>
import { Volume2 } from '@fect-ui/vue-icons';
export default {
  components: { Volume2 },
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
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 0 10px 0 28px;
  line-height: 32px;
  font-size: 0.5rem;

  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  .icon {
    position: absolute;
    left: 10px;
    top: 8px;
  }

  &--yellow {
    background: #fffbe7;
    border: 1px solid #f49c27;
    color: #f49c27;
  }

  &--red {
    background: #fef0f0;
    border: 1px solid #f47476;
    color: #f47476;
  }

  &--green {
    background: #f0f9ec;
    border: 1px solid #71c44d;
    color: #71c44d;
  }
}
</style>
