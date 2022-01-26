<template>
  <a class="yu-banner" :href="obj.link">
    <img :src="obj.src" style="width: 100%" alt="图片" />
  </a>
</template>

<script>
export default {
  name: 'banner',
  props: {
    obj: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
.yu-banner {
  display: inline-block;
}
</style>
