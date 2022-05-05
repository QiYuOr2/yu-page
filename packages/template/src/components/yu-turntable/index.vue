<template>
  <div :class="['yu-turntable']">
    <template v-if="items.length">
      <div v-if="!finish" class="container">
        <div :class="['yu-turntable__item']">
          <div :class="['item', { active: current === 0 }]">
            <img v-if="items[0].img" :src="items[0].img" alt="" />
            <span>{{ items[0].label }}</span>
          </div>
        </div>
        <div :class="['yu-turntable__item']">
          <div :class="['item', , { active: current === 1 }]">
            <img v-if="items[1].img" :src="items[1].img" alt="" />
            <span>{{ items[1].label }}</span>
          </div>
        </div>
        <div :class="['yu-turntable__item']">
          <div :class="['item', , { active: current === 2 }]">
            <img v-if="items[2].img" :src="items[2].img" alt="" />
            <span>{{ items[2].label }}</span>
          </div>
        </div>

        <div :class="['yu-turntable__item']">
          <div :class="['item', , { active: current === 7 }]">
            <img v-if="items[7].img" :src="items[7].img" alt="" />
            <span>{{ items[7].label }}</span>
          </div>
        </div>

        <div
          :class="['yu-turntable__item', 'btn', { disabled: current !== -1 }]"
          @click="start"
        >
          <span v-if="current === -1">开始</span>
          <span v-else>抽奖中</span>
        </div>

        <div :class="['yu-turntable__item']">
          <div :class="['item', , { active: current === 3 }]">
            <img v-if="items[3].img" :src="items[3].img" alt="" />
            <span>{{ items[3].label }}</span>
          </div>
        </div>

        <div :class="['yu-turntable__item']">
          <div :class="['item', , { active: current === 6 }]">
            <img v-if="items[6].img" :src="items[6].img" alt="" />
            <span>{{ items[6].label }}</span>
          </div>
        </div>

        <div :class="['yu-turntable__item']">
          <div :class="['item', , { active: current === 5 }]">
            <img v-if="items[5].img" :src="items[5].img" alt="" />
            <span>{{ items[5].label }}</span>
          </div>
        </div>

        <div :class="['yu-turntable__item']">
          <div :class="['item', , { active: current === 4 }]">
            <img v-if="items[4].img" :src="items[4].img" alt="" />
            <span>{{ items[4].label }}</span>
          </div>
        </div>
      </div>
      <div v-else class="container--finish">{{ items[this.end].text }}</div>
    </template>
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
  data() {
    return {
      current: -1,
      end: -1,
      finish: false,
      items: [],
    };
  },
  created() {
    this.getData();
    this.getEnd();
  },
  methods: {
    start() {
      if (this.current === -1) {
        let count = 0;
        this.current = 0;
        const timeout = () => {
          console.log(this.current);
          setTimeout(() => {
            this.current++;

            if (this.current > 7) {
              count++;
              this.current = 0;
            }

            if (!(this.end === this.current && count > 3)) {
              timeout();
            } else {
              this.finish = true;
            }
          }, 100);
        };
        timeout();
      }
    },
    getData() {
      this.obj.dataUrl &&
        fetch(this.obj.dataUrl).then((response) => {
          response.json().then((result) => {
            if (result.status.code === 0) {
              this.items = result.data;
            }
          });
        });
    },
    getEnd() {
      this.obj.url &&
        fetch(this.obj.url).then((response) => {
          response.json().then((result) => {
            if (result.status.code === 0) {
              this.end = result.data;
            }
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.yu-turntable {
  max-width: 360px;
  min-height: 300px;
  margin: auto;
  padding: 1rem;
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 4px solid sandybrown;
    border-radius: 7px;

    &--finish {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 280px;
      border: 4px solid sandybrown;
      border-radius: 7px;
    }
  }

  &__item {
    width: 100%;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    &.btn {
      color: #fff;
      cursor: pointer;
      span {
        width: 100%;
        height: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f4a460;
        border-radius: 7px;
        margin: 1rem;
      }

      &.disabled {
        span {
          background: #f6b882;
        }
      }
    }

    & .item {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100%;
      min-height: 70%;
      border: 1px solid sandybrown;
      border-radius: 7px;
      margin: 1rem;

      &.active {
        border-color: #369;
        box-shadow: 0 0 4px #369;
      }

      img {
        margin-top: 10px;
        width: 40px;
        height: 40px;
      }
      span {
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
}
</style>
