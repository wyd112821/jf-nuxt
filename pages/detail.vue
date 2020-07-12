<template>
  <div @click="hideMenu">
    <div class="navi-bar">
      <button class="btn-back" @click="goBack">
        <i class="iconfont iconarrow-right-copy"></i>
      </button>
      <button class="btn-more" @click.stop="showMenu">
        <i class="iconfont iconsangeyuandian"></i>
      </button>

      <div class="navi-menu" v-show="menuShow">
        <nuxt-link to="/">
          <i class="iconfont icontubiao-06"></i>首页
        </nuxt-link>
        <nuxt-link to="/">
          <i class="iconfont icontubiao_huaban1"></i>搜索
        </nuxt-link>
        <nuxt-link to="/">
          <i class="iconfont icontubiao-08"></i>我的
        </nuxt-link>
      </div>
    </div>

    <div class="product-info">
      <swipe></swipe>

      <div class="p-info">
        <div class="p-price">
          <strong>9950</strong>积分+
          <strong>0</strong>元
        </div>
        <p class="p-name">小米卧室办公室加湿器 银离子抗菌 4L大容量</p>
        <div class="p-tags">
          标签：
          <span>加湿器</span>
          <span>家具</span>
          <span>小米</span>
        </div>
        <div class="p-other-info">
          <span>已兑换6人</span>
          <span>库存充足</span>
        </div>
      </div>
    </div>

    <div class="special-notice">
      <strong>
        <i class="iconfont iconSJtubiao-15"></i>特别注意：
      </strong>
      部分商品属于本站采购商品，如遇商品质量问题可联系本站，再向相关商家反馈情况进行维权处理，最终解释权归本站所有。
    </div>

    <div class="related-recommend">
      <h2>相关推荐</h2>
      <swipe-items></swipe-items>
    </div>

    <van-tabs v-model="activeName" class="product-particulars" sticky>
      <van-tab title="礼品介绍" name="礼品介绍">
        <div class="particulars1">
          <van-image
            width="100%"
            lazy-load
            src="http://jfimg.juming.com/upload/img/0928105f03cfaa49932ZeTA7e.jpg"
          />
          <van-image
            width="100%"
            lazy-load
            src="http://jfimg.juming.com/upload/img/0928105f03cfaa5c472Go38Gm.jpg"
          />
          <van-image
            width="100%"
            lazy-load
            src="http://jfimg.juming.com/upload/img/0928105f03cfaa65195TjP0QI.jpg"
          />
          <van-image
            width="100%"
            lazy-load
            src="http://jfimg.juming.com/upload/img/0928105f03cfaa60c3f3dgASn.jpg"
          />
        </div>
      </van-tab>
      <van-tab title="规格参数" name="规格参数">
        <ul class="particulars2">
          <li>商品名称：米家加湿器</li>
          <li>商品编号：100012013848</li>
          <li>商品毛重：1.82kg</li>
          <li>商品产地：中国大陆</li>
          <li>水箱容积：3L-4L</li>
          <li>类型：净化型</li>
          <li>加水方式：便捷上加水</li>
          <li>适用场景：家用，办公室</li>
        </ul>
      </van-tab>
      <van-tab title="注意事项" name="注意事项">
        <p
          class="particulars3"
        >该商品第三方实物合作实物商品，兑换后我们将发送单号至您的账户和邮箱，如有快递问题可以咨询快递公司，如有商品问题可以拨打商品上的联系电话，感谢您的配合！</p>
      </van-tab>
    </van-tabs>

    <van-goods-action class="goods-action">
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="" />
      <van-goods-action-button color="#FFEDED" type="warning" text="加入购物车" @click="addShopCart" />
      <van-goods-action-button color="#FF4C4B" type="danger" text="立即兑换" @click="immeChange" />
    </van-goods-action>
  </div>
</template>

<script>
import Swipe from "@/components/detail/swipe";
import SwipeItems from "@/components/detail/swipeItems";
export default {
  layout: "detail",
  data() {
    return {
      menuShow: false,
      activeName: "礼品介绍"
    };
  },
  components: {
    Swipe,
    SwipeItems
  },
  methods: {
    goBack: function() {
      window.history.go(-1);
    },
    showMenu: function() {
      this.menuShow = true;
    },
    hideMenu: function(e) {
      if (e.target.className != "btn-more") {
      }
      this.menuShow = false;
    },
    //加入购物车
    addShopCart() {
      this.$toast('添加成功');
    },
    //立即兑换
    immeChange() {
      this.$router.push({name:'exchange',query: {id:'1'}})
    }
  }
};
</script>

<style lang="less">
@import "../assets/css/detail/index.less";
</style>
