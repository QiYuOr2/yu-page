<template>
  <div>
    <nav-bar />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/nav-bar.vue';

export default defineComponent({
  components: { NavBar },
  setup() {},
});
</script>

<style lang="less" scoped>
h1 {
  height: 100%;
  margin: 0;
  padding: 0;
  line-height: 64px;
  font-weight: 400;
  font-size: 1.35rem;
  text-align: center;
  color: var(--x-color-primary-black);
}
.main-route {
  margin-top: 64px;
}
</style>
