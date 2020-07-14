<template>
    <div class="swipe-wrap">
        <van-swipe @change="onChange">
            <van-swipe-item v-for="(image, index) in thumb" :key="index">
                <img v-lazy="image" />
            </van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">{{ current + 1 }}/{{ thumb.length }}</div>
            </template>
        </van-swipe>
    </div>
</template>

<script>
export default {
    props: {
        thumb: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            current: 0
        };
    },
    methods: {
        onChange(index) {
            this.current = index;
        }
    }
};
</script>

<style lang="less" scope>
.swipe-wrap {
    width: 100%;
    .van-swipe-item {
        font-size: 0;
        img {
            width: 100%;
            height: auto;
        }
    }
    .custom-indicator {
        position: absolute;
        right: 30px;
        bottom: 30px;
        padding: 7px 24px;
        font-size: 24px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 19px;
        color: #fff;
    }
}
</style>
