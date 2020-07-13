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
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                immediate-check="false"
            >
                <list :list="list"></list>
            </van-list>
        </div>
    </div>
</template>

<script>
import qs from "qs";
import List from "@/components/index/list.vue";
export default {
    data() {
        return {
            value: "",
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
            finished: false,
            goodsParams: {
                page: 1,
                pageSize: 12,
                mc: "",
                flid: "",
                bq: "",
                jf: "",
                dhfs: "",
                mymax: "",
                order: "",
                order_by: ""
            }
        };
    },
    components: {
        List
    },
    methods: {
        onClickLeft() {
            window.history.go(-1);
        },
        setJfqj: function(id) {
            this.jfqjActive = id;
        },
        setdhfs: function(index) {
            this.dhfsActive = index;
        },
        onConfirm() {
            this.$refs.item.toggle();
            this.goodsParams.jf = this.jfqjActive;
            onLoad(this.goodsParams);
        },
        onReset() {
            this.$refs.item.toggle();
            this.jfqjActive = 0;
            this.dhfsActive = 0;
        },
        changeDrop(value) {
            let px = value.split("-");
            this.goodsParams.order = px[0];
            this.goodsParams.order_by = px[1];
            onLoad(this.goodsParams);
        },
        async onLoad(params) {
            let {
                status,
                data: {
                    code,
                    data: { count, data: list }
                }
            } = await this.$axios.post(
                "http://192.168.1.182/main/p_goods_list",
                params,
                {
                    headers: {
                        "X-Requested-With": "xmlhttprequest"
                    }
                }
            );

            if (status === 200 && code === 1) {
                this.list = this.list.concat(list);
                // 加载状态结束
                this.loading = false;
                this.listPage.page++;
                // 数据全部加载完成
                if (this.list.length >= count) {
                    this.finished = true;
                }
            }
        }
    },
    async mounted() {
        //积分区间接口
        let { status, data } = await this.$axios.get(
            "http://192.168.1.182/main/jfList"
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

        this.flid = this.$route.params.flid;
        this.bq = this.$route.params.bq == "不限" ? "" : this.$route.params.bq;

        onLoad(this.goodsParams);
    }
};
</script>

<style lang="less">
@import "../assets/css/product/index.less";
</style>
