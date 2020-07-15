<template>
    <div @click="hideMenu">
        <div class="navi-bar">
            <button class="btn-back" @click="goBack">
                <i class="iconfont iconarrow-right-copy"></i>
            </button>
            <button class="btn-more" @click.stop="showMenu">
                <i class="iconfont iconsangeyuandian"></i>
            </button>

            <div class="navi-menu" v-show="menuShow">
                <nuxt-link to="/">
                    <i class="iconfont icontubiao-06"></i>首页
                </nuxt-link>
                <nuxt-link to="/product">
                    <i class="iconfont icontubiao_huaban1"></i>搜索
                </nuxt-link>
                <nuxt-link to="/my">
                    <i class="iconfont icontubiao-08"></i>我的
                </nuxt-link>
            </div>
        </div>

        <div class="product-info">
            <swipe :thumb="thumb"></swipe>

            <div class="p-info">
                <div class="p-price">
                    <strong>{{ dhjf }}</strong>积分+
                    <strong>{{ dhjg }}</strong>元
                </div>
                <p class="p-name">{{ mc }}</p>
                <div class="p-tags">
                    标签：
                    <span v-for="(tag, idx) in spbq" :key="idx">{{ tag }}</span>
                </div>
                <div class="p-sx" v-if="sx.name">
                    {{ sx.name }}：
                    <span
                        v-for="(item, idx) in sx.value"
                        :key="idx"
                        @click="clickSx(idx, item)"
                        :class="idx == sxIndex ? 'cur' : ''"
                    >{{ item.name }}</span>
                </div>
                <div class="p-other-info">
                    <span>已兑换{{ dhrs }}人</span>
                    <span>{{ parseInt(snum) > 0 ? '库存充足' : '暂无' }}</span>
                </div>
            </div>
        </div>

        <div class="special-notice">
            <strong>
                <i class="iconfont iconSJtubiao-15"></i>特别注意：
            </strong>
            部分商品属于本站采购商品，如遇商品质量问题可联系本站，再向相关商家反馈情况进行维权处理，最终解释权归本站所有。
        </div>

        <div class="related-recommend">
            <h2>相关推荐</h2>
            <swipe-items :tjsp="tjsp"></swipe-items>
        </div>

        <van-tabs v-model="activeName" class="product-particulars" sticky>
            <van-tab title="礼品介绍" name="礼品介绍">
                <div class="particulars1" v-html="nr"></div>
            </van-tab>
            <van-tab title="规格参数" name="规格参数">
                <div class="particulars2" v-html="ggcs"></div>
            </van-tab>
            <van-tab title="注意事项" name="注意事项">
                <p class="particulars3" v-html="zysx"></p>
            </van-tab>
        </van-tabs>

        <van-goods-action class="goods-action">
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车" badge />

            <template v-if="tzurl">
                <van-goods-action-button color="#FF4C4B" type="danger" text="立即兑换" :url="tzurl" />
            </template>
            <template v-if="!tzurl">
                <van-goods-action-button
                    color="#FFEDED"
                    type="warning"
                    text="加入购物车"
                    @click="addShopCart"
                    v-if="id !=65 && id != 142"
                />
                <van-goods-action-button
                    color="#FF4C4B"
                    type="danger"
                    text="立即兑换"
                    @click="immeChange"
                />
            </template>
        </van-goods-action>
    </div>
</template>

<script>
import Swipe from "@/components/detail/swipe";
import SwipeItems from "@/components/detail/swipeItems";
export default {
    layout: "detail",
    data() {
        return {
            menuShow: false,
            activeName: "礼品介绍",
            sxIndex: 0,
            sxmc: ""
        };
    },
    components: {
        Swipe,
        SwipeItems
    },
    methods: {
        goBack: function() {
            window.history.go(-1);
        },
        showMenu: function() {
            this.menuShow = true;
        },
        hideMenu: function(e) {
            if (e.target.className != "btn-more") {
            }
            this.menuShow = false;
        },
        //商品规格选择
        clickSx(i, item) {
            this.sxIndex = i;
            this.dhjf = item.dhjf;
            this.dhjg = item.dhjg;
            this.sxmc = item.name;
        },
        //加入购物车
        addShopCart() {
            this.$toast("添加成功");
        },
        //立即兑换
        immeChange() {
            if (this.xdsl > 0) {
                this.$dialog
                    .confirm({
                        message:
                            "亲爱的活动特权用户您好，您已满足本次活动的资格，可享用免积分兑换本次活动商品“" +
                            this.mc +
                            "x" +
                            this.xdsl +
                            "”个，点击确定可直接兑换哦！"
                    })
                    .then(() => {
                        this.$router.push({
                            name: "exchange",
                            params: {
                                ids: this.id,
                                num: this.xdsl,
                                free: 1,
                                sxmc: this.sxmc
                            }
                        });
                    })
                    .catch(() => {});
            } else {
                this.$router.push({
                    name: "exchange",
                    params: {
                        ids: this.id,
                        num: 1,
                        free: 0,
                        sxmc: this.sxmc
                    }
                });
            }
        }
    },

    async asyncData(ctx) {
        let {
            status,
            data: {
                code,
                data: { goodsinfo, tequansl, tjsp }
            }
        } = await ctx.$axios.get(process.env.baseUrl + "main/detail", {
            params: { id: ctx.query.id }
        });

        //console.log(goodsinfo);

        return {
            id: goodsinfo.id,
            thumb: goodsinfo.thumb.split(","),
            dhjf: goodsinfo.dhjf,
            dhjg: goodsinfo.dhjg,
            mc: goodsinfo.mc,
            spbq: goodsinfo.spbq.split(" "),
            sx: goodsinfo.sx,
            dhrs: goodsinfo.dhrs,
            snum: goodsinfo.snum,
            tjsp,
            nr: goodsinfo.nr
                .replace(goodsinfo.nr ? /&(?!#?\w+;)/g : /&/g, "&amp;")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;nbsp;/g, " ")
                .replace(/&amp;ldquo;/g, "“")
                .replace(/&amp;rdquo;/g, "”"),
            ggcs: goodsinfo.ggcs
                .replace(goodsinfo.ggcs ? /&(?!#?\w+;)/g : /&/g, "&amp;")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;nbsp;/g, " ")
                .replace(/&amp;ldquo;/g, "“")
                .replace(/&amp;rdquo;/g, "”"),
            zysx: goodsinfo.zysx,
            tzurl: goodsinfo.tzurl,
            xdsl: tequansl
        };
    }
};
</script>

<style lang="less">
@import "../assets/css/detail/index.less";
</style>
