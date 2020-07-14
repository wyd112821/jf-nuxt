<template>
  <div>
    <nav-bar :title="title" ref="navBar"></nav-bar>

    <van-tabs v-model="active" sticky>
      <van-tab title="全部订单">
        <div class="order-list">
          <van-list
            v-model="list[0].loading"
            :finished="list[0].finished"
            finished-text="没有更多了"
            @load="onLoad(0)"
            v-if="!this.list[0].empty"
          >
            <div class="order-item" v-for="(item, idx) in list[0].items" :key="idx">
              <div class="order-top">
                <span class="dhh">订单编号：20200305154326</span>
                <span class="state">未处理</span>
              </div>
              <div class="order-middle">
                <p>商品名称：荣耀手环5 NFC版 智能运动 幻彩屏触控 表盘市场...</p>
                <p>创建时间：2020-07-08 14:32:03</p>
                <p>处理时间：2020-07-08 14:32:03</p>
                <p>订单类型：商品百货</p>
                <p>快递信息：圆通快递 6250022523200</p>
              </div>
              <div class="order-bottom">消耗积分：250000积分</div>
            </div>
          </van-list>
          <van-empty description="暂无订单~" v-if="this.list[0].empty" />
        </div>
      </van-tab>

      <van-tab title="未处理">
        <div class="order-list">
          <van-list
            v-model="list[1].loading"
            :finished="list[1].finished"
            finished-text="没有更多了"
            @load="onLoad(1)"
            v-if="!this.list[1].empty"
          >
            <div class="order-item" v-for="(item, idx) in list[1].items" :key="idx">
              <div class="order-top">
                <span class="dhh">订单编号：20200305154326</span>
                <span class="state">未处理</span>
              </div>
              <div class="order-middle">
                <p>商品名称：荣耀手环5 NFC版 智能运动 幻彩屏触控 表盘市场...</p>
                <p>创建时间：2020-07-08 14:32:03</p>
                <p>处理时间：2020-07-08 14:32:03</p>
                <p>订单类型：商品百货</p>
                <p>快递信息：圆通快递 6250022523200</p>
              </div>
              <div class="order-bottom">消耗积分：250000积分</div>
            </div>
          </van-list>
          <van-empty description="暂无订单~" v-if="this.list[1].empty" />
        </div>
      </van-tab>

      <van-tab title="已处理">
        <div class="order-list">
          <van-list
            v-model="list[2].loading"
            :finished="list[2].finished"
            finished-text="没有更多了"
            @load="onLoad(2)"
            v-if="!this.list[2].empty"
          >
            <div class="order-item" v-for="(item, idx) in list[2].items" :key="idx">
              <div class="order-top">
                <span class="dhh">订单编号：20200305154326</span>
                <span class="state">未处理</span>
              </div>
              <div class="order-middle">
                <p>商品名称：荣耀手环5 NFC版 智能运动 幻彩屏触控 表盘市场...</p>
                <p>创建时间：2020-07-08 14:32:03</p>
                <p>处理时间：2020-07-08 14:32:03</p>
                <p>订单类型：商品百货</p>
                <p>快递信息：圆通快递 6250022523200</p>
              </div>
              <div class="order-bottom">消耗积分：250000积分</div>
            </div>
          </van-list>
          <van-empty description="暂无订单~" v-if="this.list[2].empty" />
        </div>
      </van-tab>
    </van-tabs>
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
      title: "我的订单",
      active: 0,
      list: [
        {
          items: [],
          loading: false,
          finished: false,
          empty: false,
          data: {
            lx: 0, //全部消息
            page: 1,
            limit: 9
          }
        },
        {
          items: [],
          loading: false,
          finished: false,
          empty: false,
          data: {
            lx: 2, //系统通知
            page: 1,
            limit: 9
          }
        },
        {
          items: [],
          loading: false,
          finished: false,
          empty: false,
          data: {
            lx: 1, //话题通知
            page: 1,
            limit: 9
          }
        }
      ]
    };
  },
  methods: {
    onLoad(index) {
      var self = this;
      const list = self.list[index];
      list.loading = true;
      // 异步更新数据
    //   $.post("/qtmessage/p_message_list", list.data, function(response) {
    //     if (response.login_url) {
    //       self.timeoutMsg(response);
    //     }

    //     let dataLength = response.count;
    //     let dataInfo = response.data;
    //     if (dataInfo.length === 0) {
    //       list.empty = true;
    //     }
    //     for (let i = 0; i < dataInfo.length; i++) {
    //       list.items.push(dataInfo[i]);
    //     }
    //     // 加载状态结束
    //     list.loading = false;
    //     list.data.page++;
    //     // 数据全部加载完成
    //     if (list.items.length >= dataLength) {
    //       list.finished = true;
    //     }
    //   });
    }
  }
};
</script>

<style lang="less">
@import "../assets/css/order/index.less";
</style>
