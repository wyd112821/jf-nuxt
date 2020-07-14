<template>
    <div>
        <div class="header-fixed">
            <van-nav-bar class="nav-bar-default" left-arrow @click-left="onClickLeft">
                <template #right>
                    <van-search
                        v-model="searchValue"
                        shape="round"
                        placeholder="搜索商品名称"
                        class="nav-bar-search"
                        @search="onSearch"
                        @clear="onClear"
                    />
                </template>
            </van-nav-bar>

            <van-dropdown-menu class="dropdown-menu">
                <van-dropdown-item v-model="value1" :options="option1" @change="changeDrop" />
                <van-dropdown-item v-model="value2" :options="option2" @change="changeDrop" />
                <van-dropdown-item v-model="value3" :options="option3" @change="changeDrop" />
                <van-dropdown-item title="筛选" ref="item">
                    <dl class="filtrate-wrap">
                        <dt>积分区间</dt>
                        <dd
                            v-for="item in jfqj"
                            :key="item.id"
                            :class="jfqjActive === item.id ? 'active': ''"
                            @click="setJfqj(item.id)"
                        >{{ item.name }}</dd>
                    </dl>

                    <dl class="filtrate-wrap">
                        <dt>兑换方式</dt>
                        <dd
                            v-for="item in dhfs"
                            :key="item.id"
                            :class="dhfsActive === item.id ? 'active': ''"
                            @click="setdhfs(item.id)"
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
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :immediate-check="immediate"
                @load="onLoad"
                v-show="!isEmpty"
            >
                <list :list="list"></list>
            </van-list>

            <van-empty description="暂无数据" v-show="isEmpty" />
        </div>
    </div>
</template>

<script>
import qs from "qs";
import List from "@/components/index/list.vue";
export default {
    data() {
        return {
            searchValue: "",
            value1: "tjsj-",
            value2: "dhrs-",
            value3: "dhjf-",
            option1: [
                { text: "时间排序", value: "tjsj-" },
                { text: "时间升序", value: "tjsj-asc" },
                { text: "时间降序", value: "tjsj-desc" }
            ],
            option2: [
                { text: "热度排序", value: "dhrs-" },
                { text: "热度升序", value: "dhrs-asc" },
                { text: "热度降序", value: "dhrs-desc" }
            ],
            option3: [
                { text: "积分排序", value: "dhjf-" },
                { text: "积分升序", value: "dhjf-asc" },
                { text: "积分降序", value: "dhjf-desc" }
            ],
            jfqj: [],
            jfqjActive: "",
            dhfs: [
                {
                    id: "",
                    name: "不限"
                },
                {
                    id: "1",
                    name: "全积分"
                },
                {
                    id: "2",
                    name: "积分+金额"
                }
            ],
            dhfsActive: "",
            list: [],
            loading: false,
            finished: false,
            refreshing: false,
            immediate: false,
            goodsParams: {
                page: 1,
                pageSize: 12,
                mc: "",
                flid: "",
                bq: "",
                jf: "",
                dhfs: "",
                mymax: "",
                order: [],
                order_by: []
            },
            isEmpty: false
        };
    },
    components: {
        List
    },
    methods: {
        onClickLeft() {
            window.history.go(-1);
        },
        //搜索
        onSearch(val) {
            this.goodsParams.mc = val;
            this.goodsParams.page = 1;
            // 清空列表数据
            this.refreshing = true;
            // 重新加载数据
            this.loading = true;
            this.onLoad();
        },
        //清除搜索内容
        onClear() {
            this.goodsParams.mc = "";
            this.goodsParams.page = 1;
            // 清空列表数据
            this.refreshing = true;
            // 重新加载数据
            this.loading = true;
            this.onLoad();
        },
        setJfqj: function(id) {
            this.jfqjActive = id;
        },
        setdhfs: function(id) {
            this.dhfsActive = id;
        },
        //筛选确认
        onConfirm() {
            this.$refs.item.toggle();
            this.goodsParams.jf = this.jfqjActive;
            this.goodsParams.dhfs = this.dhfsActive;
            this.goodsParams.page = 1;
            // 清空列表数据
            this.refreshing = true;
            // 重新加载数据
            this.loading = true;
            this.onLoad();
        },
        //筛选重置
        onReset() {
            this.$refs.item.toggle();
            this.jfqjActive = "";
            this.dhfsActive = "";
            this.value1 = "tjsj-";
            this.value2 = "dhrs-";
            this.value3 = "dhjf-";
            this.goodsParams = {
                page: 1,
                pageSize: 12,
                mc: "",
                flid: "",
                bq: "",
                jf: "",
                dhfs: "",
                mymax: "",
                order: [],
                order_by: []
            };
            // 清空列表数据
            this.refreshing = true;
            // 重新加载数据
            this.loading = true;
            this.onLoad();
        },
        //排序选择
        changeDrop(value) {
            //多个排序规则组合
            let order = this.goodsParams.order;
            let order_by = this.goodsParams.order_by;
            let px = value.split("-");
            let idx = order.indexOf(px[0]);
            if (idx < 0) {
                order.push(px[0]);
                order_by.push(px[1]);
            } else {
                if (px[1]) {
                    order.splice(idx, 1, px[0]);
                    order_by.splice(idx, 1, px[1]);
                } else {
                    order.splice(idx, 1);
                    order_by.splice(idx, 1);
                }
            }
            this.goodsParams.page = 1;
            // 清空列表数据
            this.refreshing = true;
            // 重新加载数据
            this.loading = true;
            this.onLoad();
        },
        async onLoad() {
            let { status, data } = await this.$axios.post(
                process.env.baseUrl + "main/p_goods_list",
                this.goodsParams,
                {
                    headers: {
                        "X-Requested-With": "xmlhttprequest"
                    }
                }
            );

            if (this.refreshing) {
                window.scrollTo(0, 0);
                this.list = [];
                this.refreshing = false;
            }

            if (status === 200 && data.code === 1) {
                let { count, data: list } = data.data;
                if (list.length) {
                    this.isEmpty = false;
                }
                this.list = this.list.concat(list);
                // 加载状态结束
                this.loading = false;
                this.goodsParams.page++;
                // 数据全部加载完成
                if (this.list.length >= count) {
                    this.finished = true;
                }
            } else {
                this.isEmpty = true;
            }
        }
    },
    async mounted() {
        //积分区间接口
        let { status, data } = await this.$axios.get(
            process.env.baseUrl + "main/jfList"
        );

        let result = null;
        if (typeof data == "string") {
            result = eval("(" + data + ")");
        } else {
            result = eval(data);
        }
        let { code, data: jfqj } = result;

        if (status === 200 && code === 1) {
            let jfqjValues = Object.values(jfqj);
            let jfqjKeys = Object.keys(jfqj);
            let jfqjArray = [{ id: "", name: "不限" }];
            for (let i = 0; i < jfqjValues.length; i++) {
                jfqjArray.push({ id: jfqjKeys[i], name: jfqjValues[i].nr });
            }
            this.jfqj = jfqjArray;
        }

        this.goodsParams.flid = this.$route.params.flid;
        this.goodsParams.bq =
            this.$route.params.bq == "不限" ? "" : this.$route.params.bq;

        this.onLoad();
    }
};
</script>

<style lang="less">
@import "../assets/css/product/index.less";
</style>
