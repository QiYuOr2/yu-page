<template>
  <div>
    <div></div>
    <fe-radio />
  </div>
</template>

<script lang="ts">
import { PresetType } from '@/types/dto';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    presetStyles: { type: [] as PropType<PresetType[]> },
  },
  setup(props) {},
});
</script>

<style lang="less" scoped></style>
