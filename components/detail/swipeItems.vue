<template>
  <van-swipe :loop="false" :width="width" :show-indicators="false" class="swipe-items">
    <van-swipe-item v-for="product in products" :key="product.id">
        <nuxt-link :to="product.id">
            <div class="img">
                <img v-lazy="product.img" style="width:100%" />
            </div>
            <h3 class="name text-ellipsis">{{ product.mc }}</h3>
            <p class="desc"><strong>{{ product.jf }}</strong>积分</p>
        </nuxt-link>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
    data() {
        return {
            width: 0,
            products: [
                {
                    id: '1',
                    img: 'http://jfimg.juming.com/upload/img/1611005e201a949434crbMAGo.jpg',
                    mc: '聚查1000点卡',
                    jf: 10
                },
                {
                    id: '2',
                    img: 'http://jfimg.juming.com/upload/img/1735165e202e543c183cPvNhe.png',
                    mc: '肯德基10元券',
                    jf: 1000
                },
                {
                    id: '3',
                    img: 'http://jfimg.juming.com/upload/img/1602305e69ec96e3a526q3QbT.png',
                    mc: '会员1个月体验券',
                    jf: 1000
                },
                {
                    id: '4',
                    img: 'http://jfimg.juming.com/upload/img/1611005e201a949434crbMAGo.jpg',
                    mc: '聚查1000点卡',
                    jf: 10
                },
                {
                    id: '5',
                    img: 'http://jfimg.juming.com/upload/img/1735165e202e543c183cPvNhe.png',
                    mc: '肯德基10元券',
                    jf: 1000
                },
                {
                    id: '6',
                    img: 'http://jfimg.juming.com/upload/img/1602305e69ec96e3a526q3QbT.png',
                    mc: '会员1个月体验券',
                    jf: 1000
                }
            ]
        }
    },
    mounted() {
        let w =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth; //浏览器宽度
        this.width = w / 3.7
    }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/public/header/index.less";
.swipe-items{
    width: 100%;
    overflow: hidden;

    .img{
        width: 90%;
        border: 1px solid #E6E6E6;
        border-radius:10px;
        box-sizing: border-box;
        overflow: hidden;
        font-size: 0;

        img{
            width: 100%;
            height: auto;
        }
    }

    .name{
        text-align: center;
        width: 90%;
        margin: 18px 0;
        overflow: hidden;
        font-size: 24px;
        font-weight: normal;
        color: #222;
    }
    .desc{
        width: 90%;
        margin: 0;
        text-align: center;
        font-size: 18px;
        color: #FF4C4B;

        strong{
            padding-right: 6px;
            font-size: 30px;
            font-weight: normal;
        }
    }
}
</style>
