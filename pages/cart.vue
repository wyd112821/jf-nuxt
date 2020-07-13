<template>
  <div>
    <nav-bar :title="title" ref="navBar"></nav-bar>

    <div class="cart-list">
      <h2 class="title">
        <i class="iconfont iconSJtubiao-11"></i>礼品清单
      </h2>

      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-cell-group>
          <van-cell
            class="cart-item"
            v-for="item in list"
            :key="item.id"
            @touchstart="start"
            @touchend="end"
          >
            <template #title>
              <van-checkbox
                :name="item.id"
                v-model="item.isChecked"
                @click="chooseChange(item.id, item)"
              />
            </template>
            <template #default>
              <div class="cart-info">
                <div class="img">
                  <img :src="item.img" />
                </div>
                <div class="info">
                  <h3>{{ item.mc }}</h3>
                  <div class="jf-wrap">
                    <span class="jf">{{ item.dhjf }}积分+0元</span>
                    <van-stepper
                      v-model="item.znum"
                      @change="onChange(item)"
                      input-width="0.58rem"
                      button-size="0.44rem"
                    />
                  </div>
                </div>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </div>

    <van-submit-bar button-text="提交订单" @submit="onSubmit" class="submit-bar-wrap">
      <template #default>
        <van-checkbox v-model="allchecked" @click="checkAll">全选</van-checkbox>
        <span class="total">
          合计：
          <strong>{{ totalJf }}积分+0元</strong>
        </span>
      </template>
    </van-submit-bar>
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
      title: "购物车",
      list: [
        {
          id: "1",
          mc: "聚查点兑换(1积分=1000聚查点)",
          img:
            "http://jfimg.juming.com/upload/img/1611005e201a949434crbMAGo.jpg",
          dhjf: "1",
          znum: "1"
        },
        {
          id: "2",
          mc: "飞利浦剃须刀电动充电式全身水洗官方旗舰店",
          img:
            "http://jfimg.juming.com/upload/img/1128255e1fd859bd132mNr8r0.jpg",
          dhjf: "19900",
          znum: "1"
        }
      ],
      result: [],
      num: 0,
      allchecked: false,
      selectedData: [],
      totalJf: 0
    };
  },
  methods: {
    start() {
      clearTimeout(this.loop); //再次清空定时器，防止重复注册定时器
      this.loop = setTimeout(() => {
        this.$toast("长按了");
      }, 1000);
    },
    end() {
      clearTimeout(this.loop); //清空定时器，防止重复注册定时器
    },
    // 单选的change事件
    chooseChange(i, item) {
      if (this.selectedData.indexOf(i) > -1) {
        var arrs = this.selectedData.filter(function(item) {
          return item != i;
        });
        this.selectedData = arrs;
        item.isChecked = false;
        this.count();
      } else {
        this.selectedData.push(i);
        item.isChecked = true;
        this.count();
      }

      if (this.selectedData.length < this.list.length) {
        this.allchecked = false;
      } else {
        this.allchecked = true;
      }
      this.count();
    },
    // 商品数量
    onChange(item) {
      this.count();
    },
    // 计算积分
    count() {
      let totalJf = 0;
      this.list.forEach(function(val) {
        if (val.isChecked) {
          totalJf += parseInt(val.dhjf) * parseInt(val.znum); //累计积分
        }
      });
      this.totalJf = totalJf;
    },
    // 全选
    checkAll() {
      let list = this.list;
      if (this.allchecked) {
        this.$refs.checkboxGroup.toggleAll(true);
        list.forEach(element => {
          element.isChecked = true;
          if (this.selectedData.indexOf(element.id) < 0) {
            this.selectedData.push(element.id);
          }
        });
        this.count();
      } else {
        this.$refs.checkboxGroup.toggleAll();
        list.forEach(element => {
          element.isChecked = false;
        });
        this.selectedData = [];
        this.count();
      }
    },
    // 去结算
    onSubmit() {
      // 选择购买的商品
      var cartLists = [];
      this.list.forEach(function(item) {
        if (item.isChecked) {
          cartLists.push({ id: item.id, num: item.num });
        }
      });
      if (cartLists.length === 0) {
        this.$toast("请选择商品购买");
      } else {
        this.$router.push("exchange");
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/css/cart/index.less";
</style>
