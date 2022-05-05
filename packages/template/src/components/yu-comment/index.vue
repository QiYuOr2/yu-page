<template>
  <div class="yu-comment">
    <div>
      <img :src="obj.src" alt="" />
    </div>
    <div>
      <div class="name">{{ obj.name }}</div>
      <div>{{ obj.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.yu-comment {
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  font-size: 14px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 1rem;
  }
  .name {
    font-weight: bold;
    margin-bottom: 4px;
  }
}
</style>
