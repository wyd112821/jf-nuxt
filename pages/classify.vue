<template>
    <div>
        <nav-bar :title="title" ref="navBar"></nav-bar>

        <van-tree-select
            :height="height"
            :items="items"
            :main-active-index.sync="active"
            class="spfl-wrapper"
            @click-nav="clickNav"
        >
            <template #content>
                <div
                    class="spbq-box"
                    v-for="(item, idx) in tags"
                    :key="idx"
                    v-show="active === idx"
                    ref="spbqBox"
                >
                    <h3>商品标签</h3>
                    <div class="tags-content">
                        <ul>
                            <li v-for="(tag, idx) in item" :key="idx">
                                <nuxt-link to="/product">{{ tag.mc }}</nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
        </van-tree-select>
    </div>
</template>

<script>
import NavBar from "@/components/public/navBar/index";
export default {
    components: {
        NavBar
    },
    data() {
        return {
            height: 700,
            title: "商品分类",
            active: 0,
            items: [],
            tags: []
        };
    },
    methods: {
        //点击treeSelect右侧内容回到顶部
        clickNav: function() {
            const spbqWrap = document.querySelector(
                ".van-tree-select__content"
            );
            let scrollTop = spbqWrap.scrollTop;
            if (scrollTop > 0) {
                spbqWrap.scrollTop = 0;
            }
        },
        //动态计算treeSelect高度
        treeSelectH: function() {
            let h =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight; //浏览器高度
            let navBarH = this.$refs["navBar"].$el.offsetHeight; //navBar高度
            this.height = h - navBarH;
        }
    },
    async mounted() {
        let {
            status,
            data: { code, data: items }
        } = await this.$axios.get("http://192.168.1.182/main/flList");
        if (status === 200 && code === 1) {
            let all = { text: "全部", id: "0" };
            let classics = Object.values(items).map(item => {
                return {
                    text: item.mc.substr(0, 4),
                    id: item.id
                };
            });
            classics.splice(0, 0, all);
            this.items = classics;
        }

        let {
            status: status2,
            data: { code: code2, data: tags }
        } = await this.$axios.get("http://192.168.1.182/main/bqList");
        if (status === 200 && code === 1) {
            let tagsValue = Object.values(tags);
            let tagsArray = [];
            for (const tag of tagsValue) {
                let tagsObject = Object.values(tag);
                tagsArray.push(tagsObject);
            }
            this.tags = tagsArray;
        }

        this.treeSelectH();

        const flid = this.$route.query.flid;
        if (flid) {
            this.active = flid;
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/classify/index.less";
</style>
