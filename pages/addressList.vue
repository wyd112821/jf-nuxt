<template>
    <div>
        <nav-bar :title="title" ref="navBar"></nav-bar>

        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
        />
    </div>
</template>

<script>
import NavBar from "@/components/public/navBar/index";
export default {
    layout: "detail",
    components: {
        NavBar
    },
    data() {
        return {
            title: "我的地址",
            chosenAddressId: "",
            list: []
        };
    },
    methods: {
        onAdd() {
            this.$router.push({ name: "address" });
        },
        onEdit(item) {
            this.$router.push({ name: "address", query: { id: item.id } });
        },
        onSelect(item) {
            this.$router.push({ name: "exchange", query: { id: item.id } });
        }
    },
    async mounted() {
        //地址列表接口
        let {
            status,
            data: { code, data: addressList }
        } = await this.$axios.get(
            process.env.baseUrl + "user_jf/p_address_list",
            {
                headers: {
                    "X-Requested-With": "xmlhttprequest"
                }
            }
        );
        this.list = addressList.map(item => {
            return {
                id: item.id,
                name: item.zsxm,
                tel: item.sj,
                address: item.address,
                isDefault: item.isdefault != "1" ? false : true
            };
        });

        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].isDefault) {
                this.chosenAddressId = this.list[i].id;
            }
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/address/index.less";
</style>
