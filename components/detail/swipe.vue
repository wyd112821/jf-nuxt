<template>
  <div class="swipe-wrap">
    <van-swipe @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }}/{{ images.length }}</div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      images: [
        "http://jfimg.juming.com/upload/img/0925445f03cf18574b6pPkdFd.jpg",
        "http://jfimg.juming.com/upload/img/0925515f03cf1f19856QRGqv0.jpg",
        "http://jfimg.juming.com/upload/img/0925575f03cf2544822eHOsU3.jpg"
      ]
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less" scope>
.swipe-wrap {
  width: 100%;
  .van-swipe-item {
    font-size: 0;
    img {
      width: 100%;
      height: auto;
    }
  }
  .custom-indicator {
    position: absolute;
    right: 30px;
    bottom: 30px;
    padding: 7px 24px;
    font-size: 24px;
    background: rgba(0, 0, 0, 0.3);
    border-radius:19px;
    color: #fff;
  }
}
</style>
