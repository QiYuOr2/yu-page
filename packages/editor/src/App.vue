<template>
  <div>
    <nav-bar v-if="isShowNav" />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import NavBar from '@/components/nav-bar.vue';
import { useNav } from './hooks';
import { ROUTER, COOKIE } from './common/constants';
import { cookie } from './common/utils';

export default defineComponent({
  components: { NavBar },
  setup() {
    const { getRouteName, to } = useNav();

    const isShowNav = computed(() => {
      return getRouteName() !== ROUTER.LOGIN;
    });

    onMounted(() => {
      const token = cookie.get(COOKIE.TOKEN);

      console.log(cookie.get(COOKIE.TOKEN));

      if (!token && getRouteName() !== 'p') {
        to('LOGIN');
      }
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
