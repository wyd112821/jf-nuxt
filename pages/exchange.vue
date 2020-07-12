<template>
  <div>
    <nav-bar :title="title" ref="navBar"></nav-bar>

    <van-cell
      title="添加收货地址"
      icon="location-o"
      is-link
      class="exchange-cell"
      v-if="!address.length"
      to="/address"
    />
    <van-cell
      icon="location-o"
      is-link
      class="exchange-cell"
      label="安徽省 合肥市 蜀山区 龙图路666号 置地广场A座21层 聚名科技"
      to="/addressList"
      v-else
    >
      <template #title>
        <span class="exchange-name">小兜</span>
        <span class="exchange-tel">17775386326</span>
        <van-tag type="danger">默认</van-tag>
      </template>
    </van-cell>

    <div class="gift-list">
      <h2 class="title">
        <i class="iconfont iconSJtubiao-11"></i>礼品清单
      </h2>
      <div class="list-info">
        <div class="img">
          <img src="http://jfimg.juming.com/upload/img/1611005e201a949434crbMAGo.jpg" />
        </div>
        <div class="info">
          <h3>聚查点兑换(1积分=1000聚查点)</h3>
          <p>1积分+0元</p>
        </div>
      </div>

      <van-form class="list-form">
        <van-cell title="数量">
          <template #default>
            <van-stepper v-model="num" input-width="0.68rem" button-size="0.68rem" />
          </template>
        </van-cell>

        <van-cell title="总计">
          <template #default>
            <span class="total">9950积分+0元</span>
          </template>
        </van-cell>

        <van-field
          v-model="message"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          placeholder="选填，备注请说明商品颜色等"
          input-align="right"
          class="message-field"
        />
      </van-form>
    </div>

    <van-submit-bar button-text="提交订单" @submit="onSubmit" class="submit-bar-wrap">
      <template #default>
        <span class="total">合计：<strong>9950积分+0元</strong></span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import NavBar from "@/components/public/navBar/index";
export default {
  layout: "detail",
  components: {
    NavBar
  },
  data() {
    return {
      title: "订单确认",
      address: [''],
      num: 0,
      message: ""
    };
  },
  methods: {
      onSubmit() {
          
      }
  }
};
</script>

<style lang="less">
@import "../assets/css/exchange/index.less";
</style>
