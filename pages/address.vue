<template>
  <div>
    <nav-bar :title="title" ref="navBar"></nav-bar>

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-delete
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import NavBar from "@/components/public/navBar/index";
import areaList from "@/static/js/area";
export default {
  layout: "detail",
  components: {
    NavBar
  },
  data() {
    return {
      title: "添加地址",
      areaList: areaList
    };
  },
  methods: {
    onSave() {}
  }
};
</script>

<style lang="less">
@import "../assets/css/address/index.less";
</style>
