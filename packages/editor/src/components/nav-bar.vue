<template>
  <fe-row class="navbar" align="middle" v-if="isNavShow">
    <fe-col class="navbar__logo" :span="4">
      <fe-link to="/">
        <h1>Yu Page</h1>
      </fe-link>
    </fe-col>
    <fe-col class="navbar__links" :span="20">
      <nav>
        <fe-link
          v-for="(r, $i) in routes"
          :key="$i"
          :class="isActive(r.to.name)"
          :to="r.to"
        >
          {{ r.label }}
        </fe-link>
        <fe-link @click="logout">退出登录</fe-link>
      </nav>
    </fe-col>
  </fe-row>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTER } from '@/common/constants';
import { cookie } from '@/common/utils';
import { user } from '@/api';

const routes = [
  { label: '我的页面', to: { name: ROUTER.HOME } },
  { label: '模板市场', to: { name: ROUTER.TEMPLATE } },
  // { label: '关于', to: { name: 'about' } },
];

export default defineComponent({
  setup() {
    const r = useRouter();

    const isActive = (name: string) => {
      return r.currentRoute.value.name === name ? 'active' : '';
    };

    const isNavShow = computed(() => {
      return routes
        .map((item) => item.to.name)
        .includes(r.currentRoute.value.name as string);
    });

    const logout = async () => {
      await user.logout();

      r.push({ name: ROUTER.LOGIN });
    };

    return { routes, isActive, isNavShow, logout };
  },
});
</script>

<style lang="less" scoped>
.navbar {
  box-sizing: border-box;
  padding: 0 1rem;
  height: 64px;
  box-shadow: var(--x-shadow-small);
  background: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  &__logo {
    h1 {
      margin: 0;
      padding-left: 1.2rem;
      text-align: left;
      color: var(--x-color-primary-black);
      font-size: 1.2rem;
      line-height: 64px;
    }
  }

  &__links {
    display: flex;
    align-items: center;
    height: 100%;
    > nav {
      font-size: 14px;
      text-align: center;
      height: inherit;
      margin-left: auto;
      line-height: 64px;
      > .fect-link {
        padding: 0 1.2rem;
        height: 100%;

        color: var(--x-color-primary-black);

        &.active {
          color: var(--x-color-primary);
        }
      }
    }
  }
}
</style>
