<template>
  <div class="yu-img-text">
    <div class="content">
      <div>
        <img :src="obj.src" alt="" />
      </div>
      <div class="text">{{ obj.text }}</div>
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
.yu-img-text {
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem 0.6rem;
  background: #f5f5f5;
  font-size: 14px;
  .content {
    display: flex;
    padding: 10px;
    background: #fff;
    img {
      width: 100px;
      height: 96px;
      object-fit: cover;
      margin-right: 10px;
    }
    .text {
      height: 96px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
