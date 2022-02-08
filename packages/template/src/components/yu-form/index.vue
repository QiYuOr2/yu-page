<template>
  <form @submit.prevent="onSubmit">
    <input
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
    />
    <input
      v-model="phone"
      type="phone"
      name="手机号"
      label="手机号"
      placeholder="手机号"
    />
    <input
      v-model="address"
      type="address"
      name="地址"
      label="地址"
      placeholder="地址"
    />
    <div style="margin: 0">
      <button round block type="info" native-type="submit">
        {{ obj.btnText }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      username: '',
      address: '',
      phone: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
  },
};
</script>

<style scoped></style>
