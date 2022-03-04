<template>
  <a class="yu-banner" @click.prevent="to">
    <img :src="obj.src" style="display: block; width: 100%" alt="图片" />
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
  methods: {
    to() {
      if (this.$env === 'publish') {
        open(this.obj.link);
      }
    },
  },
};
</script>

<style>
.yu-banner {
  display: block;
}
</style>
