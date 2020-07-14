<template>
  <div>
    <nav-bar :title="title" ref="navBar"></nav-bar>

    <van-cell-group class="user-cell-group">
      <van-cell title="会员ID" value="137834" />
      <van-cell title="我的积分" value="405" />
      <van-cell title="地址管理" is-link to="/addressList" />
    </van-cell-group>

    <van-cell-group class="user-cell-group">
      <van-cell value="我的订单" label="描述信息" is-link to="/order" />
      <div class="order-wrap">
        <div class="order-item">
          <van-icon class-prefix="iconfont iconSJtubiao-22" name="unhandle" badge="9" />
          <span>未处理</span>
        </div>
        <div class="order-item">
          <van-icon class-prefix="iconfont iconSJtubiao-21" name="handled" />
          <span>已处理</span>
        </div>
        <div class="order-item">
          <van-icon class-prefix="iconfont iconSJtubiao-20" name="all" />
          <span>全部订单</span>
        </div>
      </div>
    </van-cell-group>

    <van-cell-group class="user-cell-group">
      <van-cell title="消息通知" is-link to="/" />
      <van-cell title="积分明细" is-link to="/" />
    </van-cell-group>
  </div>
</template>

<script>
import NavBar from "@/components/public/navBar/index";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      title: "个人中心"
    };
  }
};
</script>

<style lang="less">
@import "../assets/css/user/index.less";
</style>
