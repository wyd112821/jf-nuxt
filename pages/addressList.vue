<template>
  <div>
    <nav-bar :title="title" ref="navBar"></nav-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
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
      title: "我的地址",
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ]
    };
  },
  methods: {
    onAdd() {
      this.$router.push({ name: "address" });
    },
    onEdit(item) {
      this.$router.push({ name: "address", query: { id: item.id } });
    },
    onSelect(item) {
        this.$router.push({ name: "exchange", query: { id: item.id } });
    }
  }
};
</script>

<style lang="less">
@import "../assets/css/address/index.less";
</style>
