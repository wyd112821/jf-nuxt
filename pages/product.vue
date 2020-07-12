<template>
    <div>
        <div class="header-fixed">
            <van-nav-bar class="nav-bar-default" left-arrow @click-left="onClickLeft">
                <template #right>
                    <van-search
                        v-model="value"
                        shape="round"
                        placeholder="搜索商品名称"
                        class="nav-bar-search"
                    />
                </template>
            </van-nav-bar>

            <van-dropdown-menu class="dropdown-menu">
                <van-dropdown-item v-model="value1" :options="option1" />
                <van-dropdown-item v-model="value2" :options="option2" />
                <van-dropdown-item v-model="value3" :options="option3" />
                <van-dropdown-item title="筛选" ref="item">
                    <dl class="filtrate-wrap">
                        <dt>积分区间</dt>
                        <dd
                            v-for="(item, index) in jfqj"
                            :key="item.id"
                            :class="jfqjActive === index ? 'active': ''"
                            @click="setJfqj(index)"
                        >{{ item.name }}</dd>
                    </dl>

                    <dl class="filtrate-wrap">
                        <dt>兑换方式</dt>
                        <dd
                            v-for="(item, index) in dhfs"
                            :key="item.id"
                            :class="dhfsActive === index ? 'active': ''"
                            @click="setdhfs(index)"
                        >{{ item.name }}</dd>
                    </dl>
                    <div class="btns-bottom">
                        <van-button type="default" @click="onReset">重置</van-button>
                        <van-button type="info" @click="onConfirm">确认</van-button>
                    </div>
                </van-dropdown-item>
            </van-dropdown-menu>
        </div>

        <div class="list-wrapper">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <list :list="list"></list>
            </van-list>
        </div>
    </div>
</template>

<script>
import List from "@/components/index/list.vue";
export default {
    data() {
        return {
            value: "",
            value1: 0,
            value2: "a",
            value3: 0,
            option1: [
                { text: "时间排序", value: 0 },
                { text: "时间升序", value: 1 },
                { text: "时间降序", value: 2 }
            ],
            option2: [
                { text: "热度排序", value: "a" },
                { text: "热度升序", value: "b" },
                { text: "热度降序", value: "c" }
            ],
            option3: [
                { text: "积分排序", value: 0 },
                { text: "积分升序", value: 1 },
                { text: "积分降序", value: 2 }
            ],
            jfqj: [
                {
                    id: "",
                    name: "不限"
                },
                {
                    id: 1,
                    name: "0-1000"
                },
                {
                    id: 2,
                    name: "1001-2000"
                },
                {
                    id: 3,
                    name: "2001-5000"
                },
                {
                    id: 4,
                    name: "5001-10000"
                },
                {
                    id: 5,
                    name: "10001-20000"
                },
                {
                    id: 6,
                    name: "200001以上"
                }
            ],
            jfqjActive: 0,
            dhfs: [
                {
                    id: "",
                    name: "不限"
                },
                {
                    id: 1,
                    name: "全积分"
                },
                {
                    id: 2,
                    name: "积分+金额"
                }
            ],
            dhfsActive: 0,
            list: [],
            loading: false,
            finished: false
        };
    },
    components: {
        List
    },
    methods: {
        onClickLeft() {
            window.history.go(-1);
        },
        setJfqj: function(index) {
            this.jfqjActive = index;
        },
        setdhfs: function(index) {
            this.dhfsActive = index;
        },
        onConfirm() {
            this.$refs.item.toggle();
        },
        onReset() {
            this.$refs.item.toggle();
            this.jfqjActive = 0;
            this.dhfsActive = 0;
        },
        onLoad() {
            // let {
            //     status,
            //     data: {
            //         code,
            //         data: { fllist, flsp }
            //     }
            // } = await this.$axios.post("http://192.168.1.182/");
            // if (status === 200 && code === 1) {
            //     this.list = Object.values(fllist)
            //         .slice(0, 1)
            //         .map((item, index) => {
            //             return {
            //                 list: flsp[index + 1]
            //             };
            //         });
            // }
        }
    },
    async asyncData(ctx) {
        let {
            status,
            data: {
                code,
                data: datas
            }
        } = await ctx.$axios.post("https://b1be0a37-aa66-4dd6-b23b-a05c9af3775a.mock.pstmn.io/order/p_order_list");
        if (status === 200 && code === 1) {
            return {
                list: datas.data
            }
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/product/index.less";
</style>
