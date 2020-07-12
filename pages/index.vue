<template>
    <div class="container">
        <my-header></my-header>

        <van-swipe class="swipe-section" :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
        </van-swipe>

        <van-grid class="navs-wrapper" square :border="false">
            <van-grid-item
                v-for="(item, idx) in navs"
                :key="idx"
                :icon="item.icon"
                :text="item.text"
                :to="item.path"
            />
        </van-grid>

        <van-notice-bar class="notice-wrapper" :left-icon="noticeTitle" :scrollable="false">
            <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                <van-swipe-item v-for="item in notices" :key="item.id">
                    <nuxt-link :to="item.id">{{ item.title }}</nuxt-link>
                </van-swipe-item>
            </van-swipe>
        </van-notice-bar>

        <div class="choiceness-commodity">
            <div class="commodity-panel">
                <div class="rqjx-panel panel">
                    <div class="title">
                        <h2>人气精选</h2>
                        <span class="subhead">品质好物</span>
                    </div>
                    <van-grid class="commodity-list" :border="false" :column-num="2">
                        <van-grid-item v-for="item in rqjxList" :key="item.id">
                            <nuxt-link :to="item.id">
                                <van-image lazy-load :src="item.img" />
                            </nuxt-link>
                        </van-grid-item>
                    </van-grid>
                </div>
                <div class="zxsj-panel panel">
                    <div class="title">
                        <h2>最新上架</h2>
                        <span class="subhead">NEW</span>
                    </div>
                    <van-grid class="commodity-list" :border="false" :column-num="2">
                        <van-grid-item v-for="item in zxsjList" :key="item.id">
                            <nuxt-link :to="item.id">
                                <van-image lazy-load :src="item.img" />
                            </nuxt-link>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>
            <div class="dfsp-panel panel">
                <div class="title">
                    <h2>低分商品</h2>
                    <span class="subhead">1积分抢1000聚查点</span>
                </div>
                <van-grid class="commodity-list" :border="false" :column-num="4">
                    <van-grid-item v-for="item in dfspList" :key="item.id">
                        <nuxt-link :to="item.id">
                            <van-image lazy-load :src="item.img" />
                        </nuxt-link>
                    </van-grid-item>
                </van-grid>
            </div>
            <van-notice-bar class="dhdt-panel" :left-icon="dhdtTitle" :scrollable="false">
                <van-swipe vertical class="dhdt-swipe" :autoplay="3000" :show-indicators="false">
                    <van-swipe-item v-for="item in dhdt" :key="item.id">
                        <nuxt-link :to="item.id">{{ item.mc }}</nuxt-link>
                    </van-swipe-item>
                </van-swipe>
            </van-notice-bar>
        </div>

        <van-tabs class="jftabs-wrapper" v-model="active" swipeable>
            <van-tab v-for="(item, idx) in flsp" :key="idx">
                <template #title>
                    <h3 class="m-tit">{{ item.name }}</h3>
                    <p class="m-desc">{{ item.desc }}</p>
                </template>

                <list :list="item.list"></list>
                <nuxt-link class="more-btn" :to="item.id" tag="p">点击查看更多</nuxt-link>
            </van-tab>
        </van-tabs>

        <footer class="index-footer">
            <div class="footer-nav">
                <nuxt-link to="/">积分问题</nuxt-link>
                <nuxt-link to="/">商品问题</nuxt-link>
                <nuxt-link to="/">关于集市</nuxt-link>
            </div>
            <p class="footer-copyright">Copyright © 2008-2028 [聚名网] Juming INC, All Rights Reserved</p>
        </footer>
    </div>
</template>

<script>
import MyHeader from "@/components/public/header/index";
import List from "@/components/index/list.vue";
export default {
    data() {
        return {
            images: [
                "http://5b0ac94f2e8b013556eeb5a93229e674.jfdl.juming.com:8668/jf/images/banner.png",
                "http://5b0ac94f2e8b013556eeb5a93229e674.jfdl.juming.com:8668/jf/images/banner.jpg"
            ],
            navs: [
                {
                    text: "本站产品",
                    icon: require("@/assets/image/bzcp-icon.png"),
                    path: "/classify?flid=1"
                },
                {
                    text: "虚拟卡币",
                    icon: require("@/assets/image/xnkb-icon.png"),
                    path: "/classify?flid=2"
                },
                {
                    text: "商品百货",
                    icon: require("@/assets/image/spbh-icon.png"),
                    path: "/classify?flid=3"
                },
                {
                    text: "吃喝玩乐",
                    icon: require("@/assets/image/chwl-icon.png"),
                    path: "/classify?flid=4"
                },
                {
                    text: "商品分类",
                    icon: require("@/assets/image/spfl-icon.png"),
                    path: "/classify"
                },
                {
                    text: "我能兑换",
                    icon: require("@/assets/image/wndh-icon.png"),
                    path: "/classify"
                },
                {
                    text: "热门商品",
                    icon: require("@/assets/image/rmsp-icon.png"),
                    path: "/classify"
                },
                {
                    text: "低分商品",
                    icon: require("@/assets/image/dfsp-icon.png"),
                    path: ""
                }
            ],
            noticeTitle: require("@/assets/image/notice-title.png"),
            dhdtTitle: require("@/assets/image/dhdt-title.png"),
            active: 0
        };
    },
    components: {
        List,
        MyHeader
    },
    async mounted() {},
    async asyncData(ctx) {
        let {
            status,
            data: {
                code,
                data: { news, rqsp, zxsp, dfsp, dhdt, fllist, flsp }
            }
        } = await ctx.$axios.post("http://192.168.1.182/");
        if (status === 200 && code === 1) {
            return {
                notices: news,
                rqjxList: rqsp.slice(0, 2),
                zxsjList: zxsp.slice(0, 2),
                dfspList: dfsp.slice(0, 5),
                dhdt,
                flsp: Object.values(fllist)
                    .slice(0, 4)
                    .map((item, index) => {
                        return {
                            id: item.id,
                            name: item.mc.substr(0, 4),
                            desc: item.ms,
                            list: flsp[index + 1]
                        };
                    })
            };
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/index/index.less";
</style>

