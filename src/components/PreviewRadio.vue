<template>
  <div>
    <div></div>
    <fe-radio />
  </div>
</template>

<script lang="ts">
import { PresetType, StyleDto } from '@/types/dto';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    presetStyles: { type: [] as PropType<(string | number | PresetType | StyleDto)[] | undefined> },
  },
  setup(props) {},
});
</script>

<style lang="less" scoped></style>
