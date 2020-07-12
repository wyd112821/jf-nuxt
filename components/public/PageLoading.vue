<style lang="less">
.page-loading {
    position: fixed;
    z-index: 995;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.7);

    &__tip {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        color: #fff;
        border-radius: 20px;
        padding: 36px 26px;
        background-color: #0091ff;
        box-shadow: 6px 10px 40px rgba(10, 132, 234, 0.5);
        text-align: center;
        .van-loading {
            margin-bottom: 20px;
        }
        p {
            margin: 0;
            font-size: 24px;
        }
    }
}
</style>

<template>
    <transition name="fade">
        <div v-if="loading" class="page-loading">
            <div class="page-loading__tip">
                <van-loading color="#fff" size="34" />
                <p>内容加载中...</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "PageLoading",
    props: {},
    data: () => ({
        loading: false
    }),
    computed: {},
    mounted() {},
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
};
</script>
