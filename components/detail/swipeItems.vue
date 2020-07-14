<template>
    <van-swipe :loop="false" :width="width" :show-indicators="false" class="swipe-items">
        <van-swipe-item v-for="product in tjsp" :key="product.id">
            <a :href="'/detail?id=' + product.id">
                <div class="img">
                    <img v-lazy="product.img" style="width:100%" />
                </div>
                <h3 class="name text-ellipsis">{{ product.dbt }}</h3>
                <p class="desc">
                    <strong>{{ product.dhjf }}</strong>积分
                </p>
            </a>
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
    props: {
        tjsp: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            width: 0
        };
    },
    mounted() {
        let w =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth; //浏览器宽度
        this.width = w / 3.7;
    }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/public/header/index.less";
.swipe-items {
    width: 100%;
    overflow: hidden;

    .img {
        width: 90%;
        border: 1px solid #e6e6e6;
        border-radius: 10px;
        box-sizing: border-box;
        overflow: hidden;
        font-size: 0;

        img {
            width: 100%;
            height: auto;
        }
    }

    .name {
        text-align: center;
        width: 90%;
        margin: 18px 0;
        overflow: hidden;
        font-size: 24px;
        font-weight: normal;
        color: #222;
    }
    .desc {
        width: 90%;
        margin: 0;
        text-align: center;
        font-size: 18px;
        color: #ff4c4b;

        strong {
            padding-right: 6px;
            font-size: 30px;
            font-weight: normal;
        }
    }
}
</style>
