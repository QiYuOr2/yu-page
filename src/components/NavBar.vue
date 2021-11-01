<template>
  <fe-row class="navbar" align="middle">
    <fe-col class="navbar__logo" :span="4">
      <fe-link to="/">
        <h1>Yu Page</h1>
      </fe-link>
    </fe-col>
    <fe-col class="navbar__links" :span="20">
      <nav>
        <fe-link v-for="(r, $i) in routes" :key="$i" :class="isActive(r.to.name)" :to="r.to">{{ r.label }}</fe-link>
      </nav>
    </fe-col>
  </fe-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

const routes = [
  { label: '我的页面', to: { name: 'mine-page' } },
  { label: '模板中心', to: { name: 'template-center' } },
  { label: '关于', to: { name: 'about' } },
];

export default defineComponent({
  setup() {
    const r = useRouter();

    const isActive = (name: string) => {
      return r.currentRoute.value.name === name ? 'active' : '';
    };

    return { routes, isActive };
  },
});
</script>

<style lang="less" scoped>
.navbar {
  box-sizing: border-box;
  display: flex;
  padding: 0 1rem;
  height: 64px;
  box-shadow: var(--x-shadow-small);

  &__logo {
    h1 {
      padding-left: 1.2rem;
      text-align: left;
      color: var(--x-color-primary-black)
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
          color: var(--x-color-primary)
        }
      }
    }
  }
}
</style>
