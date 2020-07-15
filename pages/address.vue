<template>
    <div>
        <nav-bar :title="title" ref="navBar"></nav-bar>

        <van-address-edit
            :area-list="areaList"
            show-postal
            :show-delete="showDelete"
            :show-set-default="showDefault"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            :address-info="AddressInfo"
            @change-area="onChangeArea"
            @save="onSave"
        />
    </div>
</template>

<script>
import NavBar from "@/components/public/navBar/index";
import areaList from "@/static/js/area";
export default {
    layout: "detail",
    components: {
        NavBar
    },
    data() {
        return {
            title: "添加地址",
            areaList: areaList,
            //收货人信息初始值
            AddressInfo: {},
            showDefault: false,
            showDelete: false
        };
    },
    methods: {
        onChangeArea(values) {
            //this.AddressInfo.areaCode = values[2].code;
        },
        async onSave(content) {
            let {
                name: zsxm,
                tel: sj,
                province: sheng,
                city: shi,
                county: qu,
                addressDetail: address,
                postalCode: yb
            } = content;

            let params = {
                zsxm,
                sj,
                sheng,
                shi,
                qu,
                address,
                yb
            };

            console.log(params);
            //新增、编辑地址
            let {
                status,
                data: { code, msg }
            } = await this.$axios.post(
                process.env.baseUrl + "user_jf/edit_address",
                params,
                {
                    headers: {
                        "X-Requested-With": "xmlhttprequest"
                    }
                }
            );
            if (status === 200 && code === 1) {
                this.$toast({
                    message: res.msg,
                    onClose: function() {
                        console.log("1111");
                    }
                });
            }
        }
    },
    async created() {
        let id = this.$route.query.id;
        //修改地址逻辑
        if (id) {
            this.title = "修改地址";
            this.showDelete = true;
            this.showDefault = true;

            //获取地址详情数据回显到表单
            let {
                status,
                data: { code, data: addressInfo }
            } = await this.$axios.post(
                process.env.baseUrl + "user_jf/p_address_info",
                { id },
                {
                    headers: {
                        "X-Requested-With": "xmlhttprequest"
                    }
                }
            );

            let countyObject = Object.entries(areaList.county_list);
            let areaCode = "";
            for (let i = 0; i < countyObject.length; i++) {
                if (countyObject[i][1] === addressInfo.qu) {
                    areaCode = countyObject[i][0];
                }
            }

            if (status === 200 && code === 1) {
                this.AddressInfo = {
                    id: addressInfo.id,
                    name: addressInfo.zsxm,
                    tel: addressInfo.sj,
                    province: addressInfo.sheng,
                    city: addressInfo.shi,
                    country: addressInfo.qu,
                    areaCode: areaCode,
                    postalCode: addressInfo.yb,
                    addressDetail: addressInfo.address,
                    isDefault: addressInfo.isdefault != "1" ? false : true
                };
            }
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/address/index.less";
</style>
