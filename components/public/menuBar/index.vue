<template>
    <van-tabbar v-model="active" class="menu-bar" ref="menuBar">
        <van-tabbar-item name="index" to="/">
            <span>首页</span>
            <template #icon="props">
                <i class="iconfont icontubiao-06"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item name="classify" to="/classify">
            <span>分类</span>
            <template #icon="props">
                <i class="iconfont icontubiao-05"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item name="cart" to="/cart">
            <span>购物车</span>
            <template #icon="props">
                <i class="iconfont icontubiao-07"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item class="my" to="/my">
            <span>我的</span>
            <template #icon="props">
                <i class="iconfont icontubiao-08"></i>
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    data() {
        return {
            active: "index",
            h: 0
        };
    },
    watch: {
        $route(to, from) {
            //监听路由变化
            this.active = to.name;
        }
    },
    mounted() {
        //页面加载获取路由名称
        this.active = $nuxt.$route.name;

        // this.h = this.$refs["menuBar"].$el.offsetHeight;
        // this.$store.commit("menuBar/setHeight", this.h);
        // let h1 = this.$store.state.menuBar.height;
        // console.log(h1);
    }
};
</script>

<style lang="less">
@import "../../../assets/css/public/menuBar/index.less";
</style>
