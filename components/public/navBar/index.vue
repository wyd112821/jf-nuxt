<template>
  <van-nav-bar class="nav-bar-default" :title="title" left-arrow @click-left="onClickLeft" />
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
  methods: {
    onClickLeft() {
      window.history.go(-1);
    }
  }
};
</script>

<style lang="less">
.nav-bar-default{
    height: 104px;
    .van-nav-bar__arrow{
        font-size: 38px;
        color: #222;
    }
    .van-nav-bar__title{
        font-size: 32px;
        color: #000;
    }
}
</style>
