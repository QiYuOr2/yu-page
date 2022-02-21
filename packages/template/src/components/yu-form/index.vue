<template>
  <form class="yu-form" @submit.prevent="onSubmit">
    <label class="yu-form__input">
      <span class="label">用户名</span>
      <input
        class="core"
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
    </label>

    <label class="yu-form__input">
      <span class="label">手机号</span>
      <input
        class="core"
        v-model="phone"
        type="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
      />
    </label>

    <label class="yu-form__input">
      <span class="label">地址</span>
      <input
        class="core"
        v-model="address"
        type="address"
        name="地址"
        label="地址"
        placeholder="地址"
      />
    </label>

    <div style="margin: 0">
      <button class="yu-form__button" type="submit">
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

<style lang="less" scoped>
.yu-form {
  background: #f5f5f5;
  padding: 10px 0;
  &__input {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    .label {
      width: 64px;
      text-align: right;
    }
    .core {
      flex: 1;
      display: block;
      box-sizing: border-box;
      background: none;
      outline: none;
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      background-color: #fff;
      padding-left: 20px;
      border: 0;
    }
  }
  &__button {
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    height: 32px;
    margin: 10px auto 0;
    border: 0;
    border-radius: 16px;
    outline: none;
    background: #3d8af2;
    color: #fff;
    cursor: pointer;
  }
}
</style>
