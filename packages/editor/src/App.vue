<template>
  <div>
    <nav-bar v-if="isShowNav" />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import NavBar from '@/components/nav-bar.vue';
import { useNav } from './hooks';
import { ROUTER } from './common/constants';

export default defineComponent({
  components: { NavBar },
  setup() {
    const { getRouteName } = useNav();

    const isShowNav = computed(() => {
      return getRouteName() !== ROUTER.LOGIN;
    });

    return {
      isShowNav,
    };
  },
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
