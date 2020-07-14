<template>
    <div class="jftabs-content">
        <div class="flsp-list">
            <nuxt-link
                :to="{path:'/detail', query: {id: item.id}}"
                tag="div"
                class="flsp-item"
                v-for="item in list"
                :key="item.id"
            >
                <div class="img">
                    <van-image lazy-load :src="item.img" />
                </div>
                <div class="mc">{{ item.mc }}</div>
                <div class="dhjf">{{ item.dhjf }}积分+0元</div>
                <div class="nums">{{ item.dhrs }}人已兑换</div>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};
</script>

<style lang="less">
@import "../../assets/css/index/list.less";
</style>
